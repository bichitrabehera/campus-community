import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  FolderKanban,
  Building2,
  ShoppingBag,
  Search,
  GraduationCap,
  Trophy,
  Bell,
} from "lucide-react";

export default function Dashboard() {
  const cards = [
    {
      label: "Events",
      path: "/events",
      icon: Calendar,
      desc: "Explore and join upcoming campus events.",
    },
    {
      label: "Forum",
      path: "/forum",
      icon: Users,
      desc: "Engage in discussions and share ideas.",
    },
    {
      label: "Projects",
      path: "/projects",
      icon: FolderKanban,
      desc: "Showcase and collaborate on projects.",
    },
    {
      label: "Clubs",
      path: "/clubs",
      icon: Building2,
      desc: "Find and connect with student clubs.",
    },
    {
      label: "Marketplace",
      path: "/marketplace",
      icon: ShoppingBag,
      desc: "Buy and sell within the campus community.",
    },
    {
      label: "Lost & Found",
      path: "/lostfound",
      icon: Search,
      desc: "Report and recover lost items.",
    },
    {
      label: "Alumni",
      path: "/alumni",
      icon: GraduationCap,
      desc: "Connect with alumni for mentorship.",
    },
    {
      label: "Hackathons",
      path: "/hackathons",
      icon: Trophy,
      desc: "Participate in hackathons and challenges.",
    },
    {
      label: "Notices",
      path: "/notices",
      icon: Bell,
      desc: "Stay updated with campus announcements.",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to Campus Connect 🎓</h1>
      <p className="text-gray-600 mb-10">
        Select a section below to get started.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, path, icon: Icon, desc }, i) => (
          <Link
            key={i}
            to={path}
            className="block border rounded-xl p-5 bg-white shadow hover:shadow-lg transition group"
          >
            <div className="flex items-center gap-3 mb-3">
              <Icon className="h-6 w-6 text-blue-600 group-hover:text-blue-800 transition" />
              <h2 className="text-lg font-semibold">{label}</h2>
            </div>
            <p className="text-sm text-gray-600">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
