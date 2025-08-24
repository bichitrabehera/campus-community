import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { isAdmin } from "@/utils/roles";

export default function Events() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    category: "",
    starts_at: "",
    ends_at: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function load() {
    try {
      const { data } = await api.get("/events");
      setItems(data);
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const { user } = useAuthStore();
  const userIsAdmin = user && isAdmin(user.role);

  async function handleCreate() {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await api.post("/events", form);
      setForm({
        title: "",
        description: "",
        category: "",
        starts_at: "",
        ends_at: "",
        location: "",
      });
      setSuccess("Event created successfully!");
      await load();
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Create Event Form - Admin Only */}
        {userIsAdmin && (
          <div className="bg-white rounded-md shadow-sm p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-medium text-gray-900">
                Create New Event
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Title</label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  placeholder="Event title"
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p: any) => ({ ...p, title: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Category</label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  placeholder="Category"
                  type="text"
                  value={form.category}
                  onChange={(e) =>
                    setForm((p: any) => ({ ...p, category: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Starts At</label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  type="datetime-local"
                  value={form.starts_at}
                  onChange={(e) =>
                    setForm((p: any) => ({ ...p, starts_at: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Ends At</label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  type="datetime-local"
                  value={form.ends_at}
                  onChange={(e) =>
                    setForm((p: any) => ({ ...p, ends_at: e.target.value }))
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  placeholder="Event description"
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((p: any) => ({ ...p, description: e.target.value }))
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600">Location</label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  placeholder="Event location"
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm((p: any) => ({ ...p, location: e.target.value }))
                  }
                />
              </div>
              <button
                onClick={handleCreate}
                disabled={loading}
                className="mt-3 sm:mt-0 text-sm px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 transition-colors w-full sm:w-auto"
              >
                {loading ? "Saving..." : "Create"}
              </button>
            </div>
          </div>
        )}

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Events List */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Events
            </h2>
            <span className="text-sm text-gray-500 mt-1 sm:mt-0">
              {items.length} events
            </span>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No events
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new event.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((it, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-all p-4 sm:p-6 flex flex-col w-full max-w-sm mx-auto"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">
                      {it.title}
                    </h3>
                    <span className="text-sm text-gray-500 truncate sm:ml-3 max-w-[200px]">
                      {it.location}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 mb-3">
                    {new Date(it.starts_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {it.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
