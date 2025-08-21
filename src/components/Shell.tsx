import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/auth'

const links = [
  ['Events','/events'],
  ['Forum','/forum'],
  ['Projects','/projects'],
  ['Clubs','/clubs'],
  ['Marketplace','/marketplace'],
  ['Lost & Found','/lostfound'],
  ['Alumni','/alumni'],
  ['Hackathons','/hackathons'],
  ['Notices','/notices'],
] as const

export default function Shell({ children }: { children: React.ReactNode }){
  const { pathname } = useLocation()
  const { user, logout } = useAuthStore()
  const isAuthPage = ['/login','/register','/verify'].some(p => pathname.startsWith(p))
  return (
    <div className="min-h-screen flex">
      {!isAuthPage && (
        <aside className="w-60 bg-white border-r hidden md:block">
          <div className="p-4 font-bold text-lg">Campus Community</div>
          <nav className="px-2 space-y-1">
            {links.map(([label, href]) => (
              <Link key={href} to={href}
                className={`block px-3 py-2 rounded-md hover:bg-gray-100 ${pathname.startsWith(href) ? 'bg-gray-100 font-medium' : ''}`}>
                {label}
              </Link>
            ))}
          </nav>
        </aside>
      )}
      <main className="flex-1">
        {!isAuthPage && (
          <header className="sticky top-0 z-10 bg-white border-b px-4 py-2 flex items-center justify-between">
            <div className="md:hidden"><span className="font-bold">Campus</span></div>
            <div className="flex items-center gap-3">
              {user && <span className="text-sm text-gray-600">Hi, {user.name}</span>}
              <button onClick={logout} className="text-sm px-3 py-1.5 rounded-md border hover:bg-gray-50">Logout</button>
            </div>
          </header>
        )}
        <div className="p-4 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
