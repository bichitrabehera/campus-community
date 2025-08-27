import { useAuthStore } from "@/store/auth";
import { isAdmin } from "@/utils/roles";
import { useNavigate } from "react-router-dom";

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
    },
    {
      title: "Create Hackathon",
      desc: "Launch new hackathons",
      link: "/admin/hackathons",
    },
    {
      title: "Create Notice",
      desc: "Post important notices",
      link: "/admin/notices",
    },
    {
      title: "Create Lost & Found",
      desc: "Add lost/found items",
      link: "/admin/lostfound",
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((c, idx) => (
            <div
              key={idx}
              onClick={() => navigate(c.link)}
              className="cursor-pointer p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{c.title}</h2>
              <p className="text-gray-600 mt-2">{c.desc}</p>
              <span className="text-sm text-blue-600 mt-4 inline-block">
                Go →
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
