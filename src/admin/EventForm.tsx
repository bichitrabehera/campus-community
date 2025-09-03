import { useState } from "react";
import { api } from "@/services/api";

export default function AdminEventForm() {
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
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleCreate() {
    if (!form.title || !form.starts_at || !form.ends_at) {
      setMessage({ type: "error", text: "⚠️ Please fill required fields (Title, Dates)." });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      await api.post("/events", form);
      setMessage({ type: "success", text: "✅ Event created successfully!" });
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
      setMessage({
        type: "error",
        text: e?.response?.data?.detail || e.message,
      });
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setForm({
      title: "",
      description: "",
      category: "",
      starts_at: "",
      ends_at: "",
      location: "",
      image: "",
    });
    setMessage(null);
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4 max-w-2xl mx-auto">
      {/* Admin Header */}
      <h1 className="text-xl font-semibold">Events Form</h1>

      {/* Event Details */}
        <input
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
          placeholder="Event Title *"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
          placeholder="Description"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

      {/* Location */}
        <input
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
          placeholder="Location (Venue or Online Link)"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

      {/* Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block text-sm text-gray-600 mb-1">Start Date & Time</label>
          <input
            type="datetime-local"
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
            value={form.starts_at}
            onChange={(e) => setForm({ ...form, starts_at: e.target.value })}
          />
           <label className="block text-sm text-gray-600 mb-1">End Date & Time</label>
          <input
            type="datetime-local"
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
            value={form.ends_at}
            onChange={(e) => setForm({ ...form, ends_at: e.target.value })}
          />
      </div>

      {/* Image */}
        <input
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="mt-3 w-full h-40 object-cover rounded-md border"
          />
        )}

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleReset}
          className="px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200"
        >
          Reset
        </button>
        <button
          onClick={handleCreate}
          disabled={loading}
          className="px-6 py-2 rounded-md bg-sky-600 text-white font-medium hover:bg-sky-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Create Event"}
        </button>
      </div>
    </div>
  );
}
