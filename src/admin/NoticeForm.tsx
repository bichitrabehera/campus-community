import { useState } from "react";
import { api } from "@/services/api";

export default function NoticeForm() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleCreate() {
    setLoading(true);
    setMessage(null);
    try {
      await api.post("/notices", form);
      setMessage("✅ Notice created successfully!");
      setForm({ title: "", content: "" });
    } catch (e: any) {
      setMessage(e?.response?.data?.detail || e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold">Create Notice</h2>

      <input
        className="w-full border rounded-md px-3 py-2"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full border rounded-md px-3 py-2"
        placeholder="Content"
        rows={3}
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Create Notice"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}
