import { useEffect, useState } from 'react'
import Card from '@/components/Card'
import { api } from '@/services/api'

type Item = any
export default function Alumni(){
  const [items, setItems] = useState<Item[]>([])
  const [form, setForm] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    try {
      const { data } = await api.get('/alumni/mentorships')
      setItems(data)
    } catch(e:any) {
      setError(e?.response?.data?.detail || e.message)
    }
  }
  useEffect(() => { load() }, [])

  return (
    <div className="space-y-4">
      <Card title="Alumni" actions={
        <button onClick={async()=>{ setLoading(true); setError(null);
          try { await api.post('/alumni/mentorships', form); setForm({} as any); await load() }
          catch(e:any){ setError(e?.response?.data?.detail || e.message) }
          finally { setLoading(false) }
        }} className="text-sm px-3 py-1.5 rounded-md border bg-black text-white">{loading?'Saving...':'Create'}</button>
      }>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((it, i) => (
            <div key={i} className="border rounded-lg p-3 bg-white">
              <pre className="text-xs overflow-auto max-h-48">{JSON.stringify(it, null, 2)}</pre>
            </div>
          ))}
        </div>
      </Card>
      <Card title="New">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="border rounded-md px-3 py-2" placeholder="mentee_id" type="text" value={form["mentee_id"]||""} onChange={e=>setForm((p:any)=>({...p, "mentee_id": e.target.value}))} />
          <input className="border rounded-md px-3 py-2" placeholder="topic" type="text" value={form["topic"]||""} onChange={e=>setForm((p:any)=>({...p, "topic": e.target.value}))} />
        </div>
      </Card>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
