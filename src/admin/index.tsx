import { useAuthStore } from "@/store/auth";
import { isAdmin } from "@/utils/roles";
import { useNavigate } from "react-router-dom";
import { Calendar, Megaphone, PackageSearch, Rocket } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user || !isAdmin(user.role)) {
    window.location.href = "/";
    return null;
  }

  const cards = [
    {
      title: "Create Event",
      desc: "Add and manage events",
      link: "/admin/events",
      icon: <Calendar className="w-8 h-8 text-sky-600" />,
    },
    {
      title: "Create Hackathon",
      desc: "Launch new hackathons",
      link: "/admin/hackathons",
      icon: <Rocket className="w-8 h-8 text-purple-600" />,
    },
    {
      title: "Create Notice",
      desc: "Post important notices",
      link: "/admin/notices",
      icon: <Megaphone className="w-8 h-8 text-emerald-600" />,
    },
    {
      title: "Create Lost & Found",
      desc: "Add lost/found items",
      link: "/admin/lostfound",
      icon: <PackageSearch className="w-8 h-8 text-orange-600" />,
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage events, hackathons, notices, and lost & found.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, idx) => (
            <div
              key={idx}
              onClick={() => navigate(c.link)}
              className="cursor-pointer p-6 bg-white rounded-2xl shadow hover:shadow-xl transition border border-gray-100 group"
            >
              <div className="mb-3">{c.icon}</div>
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-sky-600 transition">
                {c.title}
              </h2>
              <p className="text-gray-600 mt-1 text-sm">{c.desc}</p>
              <span className="text-sm text-sky-600 mt-4 inline-block font-medium">
                Go →
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
