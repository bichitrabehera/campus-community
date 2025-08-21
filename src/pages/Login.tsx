import { useState } from 'react'
import { useAuthStore } from '@/store/auth'

export default function Login(){
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl border shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <form onSubmit={async e => { e.preventDefault(); setLoading(true); setError(null);
        try { await login(email, password) } catch (e: any){ setError(e?.response?.data?.detail || e.message) } finally { setLoading(false) }
       }} className="space-y-3">
        <input required className="w-full border rounded-md px-3 py-2" type="email" placeholder="campus email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input required className="w-full border rounded-md px-3 py-2" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button disabled={loading} className="w-full bg-black text-white rounded-md py-2">{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>
      <p className="text-sm mt-3 text-gray-600">No account? <a className="underline" href="/register">Register</a></p>
    </div>
  )
}
