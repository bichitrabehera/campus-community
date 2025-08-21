import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const links = [
  ["Events", "/events", "#FF6B6B"],
  ["Forum", "/forum", "#4ECDC4"],
  ["Projects", "/projects", "#FFD166"],
  ["Clubs", "/clubs", "#06D6A0"],
  ["Marketplace", "/marketplace", "#118AB2"],
  ["Lost & Found", "/lostfound", "#073B4C"],
  ["Alumni", "/alumni", "#7209B7"],
  ["Hackathons", "/hackathons", "#F72585"],
  ["Notices", "/notices", "#3A86FF"],
] as const;

export default function Shell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuthStore();
  const isAuthPage = ["/login", "/register", "/verify"].some((p) =>
    pathname.startsWith(p)
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-purple-50">
      {!isAuthPage && (
        <aside className="w-80 bg-indigo-600 border-r hidden md:block shadow-xl">
          <div className="p-6 font-bold text-2xl text-white flex items-center">
            <div className="bg-white text-indigo-600 p-2 rounded-lg mr-3">
              <CampusIcon />
            </div>
            Campus Community
          </div>
          <nav className="p-4 space-y-3">
            {links.map(([label, href, color]) => (
              <Link
                key={href}
                to={href}
                className={`flex items-center px-4 py-3 rounded hover:scale-105 hover:border-2 ${
                  pathname.startsWith(href)
                    ? "text-white font-bold bg-[#171717]"
                    : "text-indigo-100 hover:text-white"
                }`}
                style={{
                  border: pathname.startsWith(href) ? "none" : `none`,
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-0 w-full p-4">
            {user && (
              <div className="flex items-center text-white">
                <div className="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold mr-3">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">Hi, {user.name}</p>
                  <p className="text-xs text-indigo-200">{user.email}</p>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}
      <main className="flex-1">
        {!isAuthPage && (
          <header className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-end">
            <div className="md:hidden">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-xl">
                Campus
              </span>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <span className="text-sm text-gray-600 hidden md:block">
                  Welcome back, <span className="font-medium">{user.name}</span>
                  !
                </span>
              )}
              <button
                onClick={logout}
                className="text-sm px-4 py-2 rounded border border-indigo-100 bg-red-400 text-white hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </header>
        )}
        <div className="p-6 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

// Simple campus icon component
function CampusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}
