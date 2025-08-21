import { useState } from 'react'
import { useAuthStore } from '@/store/auth'

export default function VerifyEmail(){
  const { verifyEmail } = useAuthStore()
  const [code, setCode] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl border shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
      {message && <div className="text-green-700 text-sm mb-2">{message}</div>}
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <form onSubmit={async e => { 
        e.preventDefault(); 
        setLoading(true); 
        setError(null);
        try { 
          await verifyEmail(code); 
          setMessage('Email verified successfully!'); 
        } catch (e: any) { 
          setError(e?.response?.data?.detail || e.message); 
        } finally { 
          setLoading(false); 
        }
      }} className="space-y-3">
        <input 
          className="w-full border rounded-md px-3 py-2" 
          placeholder="verification code" 
          type="text" 
          value={code} 
          onChange={e => setCode(e.target.value)} 
        />
        <button 
          disabled={loading} 
          className="w-full bg-black text-white rounded-md py-2"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  )
}
