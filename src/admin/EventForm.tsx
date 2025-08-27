import { useState } from "react";
import { api } from "@/services/api";

export default function EventForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    starts_at: "",
    ends_at: "",
    location: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleCreate() {
    setLoading(true);
    setMessage(null);
    try {
      await api.post("/events", form);
      setMessage("✅ Event created successfully!");
      setForm({
        title: "",
        description: "",
        category: "",
        starts_at: "",
        ends_at: "",
        location: "",
        image: "",
      });
    } catch (e: any) {
      setMessage(e?.response?.data?.detail || e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold">Create Event</h2>

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

      <div className="grid grid-cols-2 gap-3">
        <input
          type="datetime-local"
          className="border rounded-md px-3 py-2"
          value={form.starts_at}
          onChange={(e) => setForm({ ...form, starts_at: e.target.value })}
        />
        <input
          type="datetime-local"
          className="border rounded-md px-3 py-2"
          value={form.ends_at}
          onChange={(e) => setForm({ ...form, ends_at: e.target.value })}
        />
      </div>

      <input
        className="w-full border rounded-md px-3 py-2"
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <input
        className="w-full border rounded-md px-3 py-2"
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Create Event"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}
