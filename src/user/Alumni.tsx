import { useEffect, useState } from "react";
import { api } from "@/services/api";

type Item = any;

export default function Alumni() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const { data } = await api.get("/alumni/mentorships");
      setItems(data);
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createMentorship() {
    setLoading(true);
    setError(null);
    try {
      await api.post("/alumni/mentorships", form);
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
      {/* Alumni Mentorships List */}
      <div className="bg-white border rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Alumni Mentorships</h2>
          <button
            onClick={createMentorship}
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

      {/* New Mentorship Form */}
      <div className="bg-white border rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-3">New Mentorship</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="border rounded-md px-3 py-2"
            placeholder="Mentee ID"
            type="text"
            value={form["mentee_id"] || ""}
            onChange={(e) =>
              setForm((p: any) => ({ ...p, mentee_id: e.target.value }))
            }
          />
          <input
            className="border rounded-md px-3 py-2"
            placeholder="Topic"
            type="text"
            value={form["topic"] || ""}
            onChange={(e) =>
              setForm((p: any) => ({ ...p, topic: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Error */}
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}
