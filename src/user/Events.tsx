import { useEffect, useState, useRef } from "react";
import { api } from "@/services/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Event {
  id?: number;
  title: string;
  location: string;
  starts_at: string;
  description: string;
  image?: string;
}

export default function Event() {
  const [items, setItems] = useState<Event[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll with arrows
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  // Load events from API
  async function load() {
    try {
      const { data } = await api.get("/events");
      setItems(data);
    } catch (e) {
      console.error("Failed to load events", e);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 text-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6 sm:p-10 text-center shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-bold mb-3">
            Discover Campus Events 🎉
          </h2>
          <p className="text-sm sm:text-md max-w-md sm:max-w-xl mx-auto">
            Stay updated with fests, hackathons, workshops, and meetups
            happening around your campus.
          </p>
        </div>

        {/* Events List with Horizontal Scroll */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Upcoming Events
        </h1>

        <div className="relative">
          {items.length > 0 && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 border shadow-md p-2 rounded-full hover:bg-gray-100 hidden sm:flex"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="overflow-x-auto scroll-smooth scrollbar-hide"
          >
            <div className="flex gap-4 sm:gap-6 pb-4">
              {items.map((it, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col w-60 sm:w-72 flex-shrink-0"
                >
                  {/* Event Image */}
                  {it.image ? (
                    <img
                      src={it.image}
                      alt={it.title}
                      className="w-full h-32 sm:h-40 object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-32 sm:h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-xs sm:text-sm rounded-t-lg">
                      No Image
                    </div>
                  )}

                  {/* Event Content */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h3 className="text-base sm:text-lg font-semibold line-clamp-1 mb-1 sm:mb-2">
                      {it.title}
                    </h3>
                    <span className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                      {it.location}
                    </span>

                    <div className="text-xs text-gray-400 mb-2 sm:mb-3">
                      {new Date(it.starts_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {it.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {items.length > 0 && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 border shadow-md p-2 rounded-full hover:bg-gray-100 hidden sm:flex"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
