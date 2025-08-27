import { useEffect, useState } from "react";
import { api } from "@/services/api";

type Notice = {
  id?: number;
  title?: string;
  content?: string;
  date?: string;
  posted_by?: string;
  category?: string; // frontend-only field
};

export default function Notices() {
  const [items, setItems] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState("All");

  // simple frontend categorization logic
  function assignCategory(notice: Notice): string {
    const text = `${notice.title} ${notice.content}`.toLowerCase();

    if (text.includes("exam") || text.includes("class") || text.includes("assignment")) {
      return "Academic";
    } else if (
      text.includes("workshop") ||
      text.includes("festival") ||
      text.includes("seminar") ||
      text.includes("event")
    ) {
      return "Events";
    } else if (
      text.includes("job") ||
      text.includes("placement") ||
      text.includes("internship") ||
      text.includes("career")
    ) {
      return "Placements";
    }
    return "General";
  }

  async function load() {
    try {
      setLoading(true);
      const { data } = await api.get("/notices");

      // attach categories on frontend
      const withCategories = data.map((n: Notice) => ({
        ...n,
        category: assignCategory(n),
      }));

      setItems(withCategories);
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // filter notices by category
  const filteredItems =
    filter === "All"
      ? items
      : items.filter((n) => n.category === filter);

  return (
    <div className="space-y-6 p-4">
      {/* Notices Section */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold text-gray-800">Notices</h2>

          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="All">All</option>
            <option value="Academic">Academic</option>
            <option value="Events">Events</option>
            <option value="Placements">Placements</option>
            <option value="General">General</option>
          </select>
        </div>

        {/* Subheading */}
        <p className="text-gray-600 text-sm mt-2 mb-8">
          Stay updated with the latest announcements, events, and opportunities
          from your campus. <br></br> From exam schedules to workshops, all important
          updates are right here. Don’t miss out!
        </p>

        {loading && <p className="text-gray-500">Loading notices...</p>}
        {error && <div className="text-red-600">{error}</div>}

        {filteredItems.length === 0 && !loading ? (
          <p className="text-gray-500">No notices available right now.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((it, i) => (
              <div
                key={i}
                className="bg-gray-50 border rounded-lg shadow-sm p-4 hover:shadow-md transition-all flex flex-col"
              >
                {/* Category Badge */}
                <span
                  className={`inline-block w-fit text-xs px-2 py-1 rounded-full mb-2 font-medium ${
                    it.category === "Academic"
                      ? "bg-blue-100 text-blue-700"
                      : it.category === "Events"
                      ? "bg-green-100 text-green-700"
                      : it.category === "Placements"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {it.category}
                </span>

                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {it.title || "Untitled Notice"}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {it.content || "No description provided."}
                </p>

                <div className="mt-3 text-xs text-gray-500 flex justify-between">
                  <span>
                    {it.date
                      ? new Date(it.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "No date"}
                  </span>
                  {it.posted_by && <span>By {it.posted_by}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  );
}
