import { useEffect, useState, useRef } from "react";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { isAdmin } from "@/utils/roles";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Event {
  id?: number;
  title: string;
  location: string;
  starts_at: string;
  description: string;
  category?: string;
  image?: string;
}

export default function Events() {
  const [items, setItems] = useState<Event[]>([]);
  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    category: "",
    starts_at: "",
    ends_at: "",
    location: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  //Scroll with arrows
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  //Load events from API
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

  //Create Event
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
        image: "",
      });
      setSuccess("Event created successfully!");
      setShowForm(false); // hide form after success
      await load();
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 relative">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Admin Form */}
        {userIsAdmin && (
          <div>
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                + Create Event
              </button>
            ) : (
              <div className="bg-white rounded-md shadow-sm p-4 sm:p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-base sm:text-lg font-medium text-gray-900">
                    New Event
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    ✕ Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Title</label>
                    <input
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-gray-900"
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
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-gray-900"
                      placeholder="Category"
                      type="text"
                      value={form.category}
                      onChange={(e) =>
                        setForm((p: any) => ({
                          ...p,
                          category: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Starts At</label>
                    <input
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-gray-900"
                      type="datetime-local"
                      value={form.starts_at}
                      onChange={(e) =>
                        setForm((p: any) => ({
                          ...p,
                          starts_at: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Ends At</label>
                    <input
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-gray-900"
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
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-gray-900"
                      placeholder="Event description"
                      rows={3}
                      value={form.description}
                      onChange={(e) =>
                        setForm((p: any) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm text-gray-600">Location</label>
                    <input
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-gray-900"
                      placeholder="Event location"
                      type="text"
                      value={form.location}
                      onChange={(e) =>
                        setForm((p: any) => ({
                          ...p,
                          location: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm text-gray-600">Image URL</label>
                    <input
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-gray-900"
                      placeholder="https://example.com/image.jpg"
                      type="text"
                      value={form.image}
                      onChange={(e) =>
                        setForm((p: any) => ({
                          ...p,
                          image: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={handleCreate}
                  disabled={loading}
                  className="mt-4 text-sm px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Saving..." : "Create"}
                </button>
              </div>
            )}
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

        {/* Events List with Horizontal Scroll */}
        <div className="p-2 relative">

          <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl p-10 mb-8 text-center shadow-lg">
            <h2 className="text-4xl font-bold mb-3">Discover Exciting Campus Events 🎉</h2>
            <p className="text-md max-w-xl mx-auto">
              Stay updated with the latest fests, hackathons, workshops, and meetups happening around your campus.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-10 flex items-center justify-between shadow-sm">
            <div>
              <h3 className="text-xl font-semibold text-yellow-800">🔥 Featured: Annual Tech Fest</h3>
              <p className="text-sm text-yellow-700">
                Don’t miss the biggest campus tech fest starting this Friday!
              </p>
            </div>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Know More
            </button>
          </div>

          <h1 className="text-3xl font-bold text-white mb-12 text-center">
            Events At AMC
          </h1>

          {/* Left Arrow */}
          <div className="relative">
            {items.length > 0 && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 transform bg-white -translate-y-1/2 shadow-md p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <div
              ref={scrollRef}
              className="overflow-x-auto scroll-smooth scrollbar-hide"
            >
              <div className="flex gap-6 pb-4">
                {items.map((it, i) => (
                  <div
                    key={i}
                    className="bg-gray-700 border border-gray-700 rounded-md shadow-md hover:shadow-md transition-all flex flex-col w-72 flex-shrink-0"
                  >
                    {/* Event Image */}
                    {it.image ? (
                      <img
                        src={it.image}
                        alt={it.title}
                        className="w-full h-40 object-cover rounded-t-md"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-500 flex items-center justify-center text-white text-sm">
                        No Image
                      </div>
                    )}

                    {/* Event Content */}
                    <div className="p-4 sm:p-6 flex flex-col flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                        <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-1">
                          {it.title}
                        </h3>
                        <span className="text-sm text-white truncate sm:ml-3 max-w-[150px]">
                          {it.location}
                        </span>
                      </div>

                      <div className="text-xs text-white mb-3">
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
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            {items.length > 0 && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 bg-white shadow-md p-2 -translate-y-1/2 rounded-full hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
