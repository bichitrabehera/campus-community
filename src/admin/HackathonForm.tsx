import { useState } from "react";
import { api } from "@/services/api";

export default function HackathonForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    organizer: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleCreate() {
    if (
      !form.title ||
      !form.description ||
      !form.start_date ||
      !form.end_date ||
      !form.location ||
      !form.organizer
    ) {
      setMessage("⚠️ Please fill all required fields.");
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      await api.post("/hackathons", form);
      setMessage("✅ Hackathon created successfully!");
      setForm({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        location: "",
        organizer: "",
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
      <h2 className="text-xl font-semibold">Create Hackathon</h2>

      <input
        required
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        placeholder="Hackathon Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        required
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        placeholder="Description"
        rows={3}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

        <label className="block text-sm text-gray-600 mb-1">Start Date & Time</label>
        <input
          required
          type="date"
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
          value={form.start_date}
          onChange={(e) => setForm({ ...form, start_date: e.target.value })}
        />
        <label className="block text-sm text-gray-600 mb-1">End Date & Time</label>
        <input
          required
          type="date"
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
          value={form.end_date}
          onChange={(e) => setForm({ ...form, end_date: e.target.value })}
        />

      <input
        required
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <input
        required
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        placeholder="Organizer"
        value={form.organizer}
        onChange={(e) => setForm({ ...form, organizer: e.target.value })}
      />

      {/* <input
        required
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 focus:outline-2 focus:outline-sky-600 focus:border-sky-600 placeholder:text-gray-400 sm:text-sm/6"
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      /> */}

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full px-6 py-2 rounded-md bg-sky-600 text-white font-medium hover:bg-sky-700 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : "Create Hackathon"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}
