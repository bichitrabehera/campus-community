import { useState } from 'react'
import { useAuthStore } from '@/store/auth'

export default function Login() {
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-10">
          <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h1>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={async e => {
              e.preventDefault(); setLoading(true); setError(null);
              try { await login(email, password) } catch (e: any) { setError(e?.response?.data?.detail || e.message) } finally { setLoading(false) }
            }} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input required className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-indigo-600 focus:border-indigo-600 placeholder:text-gray-400 sm:text-sm/6"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input required className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-indigo-600 focus:border-indigo-600 placeholder:text-gray-400 sm:text-sm/6"
                    type="password"
                    value={password} onChange={e => setPassword(e.target.value)} />
                </div>
              </div>
              <div>
                <button disabled={loading} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
          <p className="mt-10 text-center text-sm/6 text-gray-500">No account? <a className="font-semibold text-indigo-600 hover:text-indigo-500" href="/register">Register</a></p>
        </div>
      </div>
    </div>
  )
}
