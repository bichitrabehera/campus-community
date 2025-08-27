import { useState } from "react";
import { api } from "@/services/api";

export default function LostFoundForm() {
  const [form, setForm] = useState({ item: "", location: "", status: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleCreate() {
    setLoading(true);
    setMessage(null);
    try {
      await api.post("/lostfound", form);
      setMessage("✅ Lost/Found item created successfully!");
      setForm({ item: "", location: "", status: "" });
    } catch (e: any) {
      setMessage(e?.response?.data?.detail || e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold">Create Lost/Found</h2>

      <input
        className="w-full border rounded-md px-3 py-2"
        placeholder="Item"
        value={form.item}
        onChange={(e) => setForm({ ...form, item: e.target.value })}
      />

      <input
        className="w-full border rounded-md px-3 py-2"
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <input
        className="w-full border rounded-md px-3 py-2"
        placeholder="Status (lost/found)"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Create Entry"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}
