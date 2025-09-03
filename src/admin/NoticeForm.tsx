import { useState } from "react";
import { api } from "@/services/api";

export default function NoticeForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    posted_by: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleCreate() {
    if (!form.title || !form.content || !form.category || !form.posted_by || !form.date) {
      setMessage("⚠️ Please fill all required fields.");
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      await api.post("/notices", form);
      setMessage("✅ Notice created successfully!");
      setForm({
        title: "",
        content: "",
        category: "",
        posted_by: "",
        date: "",
      });
    } catch (e: any) {
      setMessage(e?.response?.data?.detail || e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold">Create Notice</h2>

      {/* Title */}
      <input
        required
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        placeholder="Notice Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* Content */}
      <textarea
        required
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        placeholder="Notice Content"
        rows={4}
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />

      {/* Category */}
      <select
        required
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="">Select Category</option>
        <option value="Academic">Academic</option>
        <option value="Events">Events</option>
        <option value="Placements">Placements</option>
        <option value="General">General</option>
      </select>

      {/* Posted By */}
      <input
        required
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        placeholder="Posted By"
        value={form.posted_by}
        onChange={(e) => setForm({ ...form, posted_by: e.target.value })}
      />

      {/* Date */}
      <input
        required
        type="date"
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      {/* Submit */}
      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full px-6 py-2 rounded-md bg-sky-600 text-white font-medium hover:bg-sky-700 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : "Create Notice"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}
