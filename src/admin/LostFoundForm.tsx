import { useState } from "react";
import { api } from "@/services/api";

export default function LostFoundForm() {
  const [form, setForm] = useState({
    item: "",
    description: "",
    location: "",
    status: "",
    date: "",
    contact: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleCreate() {
    if (!form.item || !form.status || !form.date) {
      setMessage("⚠️ Please fill required fields (Item, Status, Date).");
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      await api.post("/lostfound", form);
      setMessage("✅ Lost/Found item created successfully!");
      setForm({
        item: "",
        description: "",
        location: "",
        status: "",
        date: "",
        contact: "",
        image: "",
      });
    } catch (e: any) {
      setMessage(e?.response?.data?.detail || e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold">Create Lost/Found Entry</h2>

      {/* Item Name */}
      <input
        required
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        placeholder="Item Name *"
        value={form.item}
        onChange={(e) => setForm({ ...form, item: e.target.value })}
      />

      {/* Description */}
      <textarea
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        placeholder="Description (color, brand, details...)"
        rows={3}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* Location */}
      <input
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        placeholder="Location Found/Lost"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      {/* Status */}
      <select
        required
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="">Select Status</option>
        <option value="Lost">Lost</option>
        <option value="Found">Found</option>
      </select>

      {/* Date */}
      <input
        required
        type="date"
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      {/* Contact */}
      <input
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        placeholder="Contact Info (Phone / Email)"
        value={form.contact}
        onChange={(e) => setForm({ ...form, contact: e.target.value })}
      />

      {/* Image */}
      <input
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        placeholder="Image URL (optional)"
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

      {/* Submit */}
      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full px-6 py-2 rounded-md bg-sky-600 text-white font-medium hover:bg-sky-700 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : "Create Entry"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}
