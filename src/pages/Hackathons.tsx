import { useEffect, useState } from "react";
import { api } from "@/services/api";

type Item = any;

export default function Hackathons() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const { data } = await api.get("/hackathons");
      setItems(data);
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function createHackathon() {
    setLoading(true);
    setError(null);
    try {
      await api.post("/hackathons", form);
      setForm({});
      await load();
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 p-4">
      {/* Hackathons List */}
      <div className="bg-white border rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Hackathons</h2>
          <button
            onClick={createHackathon}
            disabled={loading}
            className="text-sm px-3 py-1.5 rounded-md border bg-black text-white hover:bg-gray-800 transition"
          >
            {loading ? "Saving..." : "Create"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((it, i) => (
            <div key={i} className="border rounded-lg p-3 bg-gray-50">
              <pre className="text-xs overflow-auto max-h-48">
                {JSON.stringify(it, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* New Hackathon Form */}
      <div className="bg-white border rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-3">New Hackathon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="border rounded-md px-3 py-2"
            placeholder="Title"
            type="text"
            value={form["title"] || ""}
            onChange={(e) =>
              setForm((p: any) => ({ ...p, title: e.target.value }))
            }
          />
          <input
            className="border rounded-md px-3 py-2"
            placeholder="Description"
            type="text"
            value={form["description"] || ""}
            onChange={(e) =>
              setForm((p: any) => ({ ...p, description: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}
