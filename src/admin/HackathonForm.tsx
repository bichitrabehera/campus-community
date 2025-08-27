import { useState } from "react";
import { api } from "@/services/api";

export default function HackathonForm() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleCreate() {
    setLoading(true);
    setMessage(null);
    try {
      await api.post("/hackathons", form);
      setMessage("✅ Hackathon created successfully!");
      setForm({ title: "", description: "" });
    } catch (e: any) {
      setMessage(e?.response?.data?.detail || e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold">Create Hackathon</h2>

      <input
        className="w-full border rounded-md px-3 py-2"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full border rounded-md px-3 py-2"
        placeholder="Description"
        rows={3}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Create Hackathon"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}
