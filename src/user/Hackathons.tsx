import { useEffect, useState } from "react";
import { api } from "@/services/api";

type Item = any;

export default function Hackathons() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "upcoming" | "ongoing">("all");

  async function load() {
    try {
      const { data } = await api.get("/hackathons");
      setItems(data);
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Filtered items
  const filteredItems = items.filter((it: any) => {
    const now = new Date();
    const start = it.start_date ? new Date(it.start_date) : null;
    const end = it.end_date ? new Date(it.end_date) : null;

    if (filter === "upcoming") {
      return start && start > now;
    }
    if (filter === "ongoing") {
      return start && end && start <= now && now <= end;
    }
    return true; // all
  });

  return (
    <div className="space-y-6 p-4">
      {/* Hackathons List */}
        <div className="flex items-center justify-between mb-4">
          <div>
          <h2 className="text-2xl font-bold text-gray-800">Hackathons</h2>
          <p className="text-sm text-gray-600 mt-2 mb-8">
              Discover upcoming and ongoing hackathons. Stay updated and never miss a chance to showcase your skills!
            </p>
            </div>

          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring"
          >
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </div>

        {/* Hackathon Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((it: any, i: number) => (
            <div
              key={i}
              className="bg-gray-50 border rounded-lg shadow-sm p-4 hover:shadow-md transition-all"
            >
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900">
                {it.name || "Unnamed Hackathon"}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {it.description || "No description available."}
              </p>

              {/* Details */}
              <div className="mt-4 text-sm text-gray-700 space-y-1">
                {it.start_date && (
                  <p>
                    📅 <span className="font-medium">Start:</span>{" "}
                    {new Date(it.start_date).toLocaleDateString()}
                  </p>
                )}
                {it.end_date && (
                  <p>
                    ⏳ <span className="font-medium">End:</span>{" "}
                    {new Date(it.end_date).toLocaleDateString()}
                  </p>
                )}
                {it.location && (
                  <p>
                    📍 <span className="font-medium">Location:</span>{" "}
                    {it.location}
                  </p>
                )}
                {it.organizer && (
                  <p>
                    🏢 <span className="font-medium">Organizer:</span>{" "}
                    {it.organizer}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <p className="text-gray-500 text-sm mt-4">
            No hackathons found for this filter.
          </p>
        )}

      {/* Error Message */}
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}
