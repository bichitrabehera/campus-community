import { useEffect, useState } from "react";
import { api } from "@/services/api";

type Item = any;
export default function LostFound() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const { data } = await api.get("/lostfound");
      setItems(data);
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    }
  }
  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      {/* Lost & Found Section */}
      <div className="p-4 border rounded-2xl bg-gray-50 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Lost & Found</h2>
          <button
            onClick={async () => {
              setLoading(true);
              setError(null);
              try {
                await api.post("/lostfound", form);
                setForm({} as any);
                await load();
              } catch (e: any) {
                setError(e?.response?.data?.detail || e.message);
              } finally {
                setLoading(false);
              }
            }}
            className="text-sm px-3 py-1.5 rounded-md border bg-black text-white"
          >
            {loading ? "Saving..." : "Create"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((it, i) => (
            <div key={i} className="border rounded-lg p-3 bg-white">
              <pre className="text-xs overflow-auto max-h-48">
                {JSON.stringify(it, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* New Item Form */}


    </div>
  );
}
