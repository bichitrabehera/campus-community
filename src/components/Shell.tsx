import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";

const links = [
  ["Events", "/user/events"],
  ["Forum", "/user/forum"],
  ["Projects", "/user/projects"],
  // ["Clubs", "/user/clubs"],
  // ["Marketplace", "/user/marketplace"],
  // ["Lost & Found", "/user/lostfound"],
  // ["Alumni", "/user/alumni"],
  ["Hackathons", "/user/hackathons"],
  ["Notices", "/user/notices"],
] as const;

export default function Shell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthPage = ["/login", "/register", "/verify"].some((p) =>
    pathname.startsWith(p)
  );

  return (
    <div className=" flex flex-col">
      {!isAuthPage && (
        <header className="sticky top-0 z-20 shadow-md bg-[#111111] py-2">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between py-2">
            {/* Logo */}
            <div className="flex items-center space-x-2 font-bold text-xl text-white">
              <CampusIcon />
              <span>Campus</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              {links.map(([label, href]) => (
                <Link
                  key={href}
                  to={href}
                  className={`text-sm font-medium transition ${
                    pathname.startsWith(href)
                      ? "text-sky-400 border-b-2 border-sky-600"
                      : "text-white hover:text-sky-300"
                  }`}
                >
                  {label}
                </Link>
              ))}
              {user && (
                <button
                  onClick={logout}
                  className="text-sm px-4 py-2 rounded-md bg-red-500 text-white shadow hover:bg-red-600 transition"
                >
                  Logout
                </button>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6 text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12" // X icon
                      : "M4 6h16M4 12h16M4 18h16" // Hamburger
                  }
                />
              </svg>
            </button>
          </div>

          {/* Mobile Nav Sidebar */}
          {menuOpen && (
            <div className="fixed inset-0 z-30">
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black bg-opacity-40"
                onClick={() => setMenuOpen(false)}
              />

              {/* Sidebar */}
              <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg flex flex-col">
                <div className="pt-10 text-center">
                  <h1 className="text-xl font-bold">Campus Community</h1>
                </div>
                <div className="flex-1 overflow-y-auto p-4 mt-10 space-y-2">
                  {links.map(([label, href]) => (
                    <Link
                      key={href}
                      to={href}
                      className={`block px-3 py-2 rounded text-sm border-black border-1 ${
                        pathname.startsWith(href)
                          ? "text-indigo-700 font-semibold bg-indigo-50"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>

                {user && (
                  <div className="border-t p-4">
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="w-full text-sm px-4 py-2 rounded-md bg-red-500 text-white shadow hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </header>
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 min-h-screen">{children}</main>
    </div>
  );
}

// Simple campus icon
function CampusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white"
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
