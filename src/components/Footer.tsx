import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function UserFooter() {
  const links = [
    ["Events", "/user/events"],
    ["Forum", "/user/forum"],
    ["Projects", "/user/projects"],
    ["Clubs", "/user/clubs"],
    ["Marketplace", "/user/marketplace"],
    ["Lost & Found", "/user/lostfound"],
    ["Alumni", "/user/alumni"],
    ["Hackathons", "/user/hackathons"],
    ["Notices", "/user/notices"],
  ];

  return (
    <footer className="bg-[#0a0a0a] text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Logo + Tagline */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-white font-bold text-xl tracking-tight">
              Campus Connect
            </span>
          </Link>
          <p className="mt-4  text-gray-500">
            A modern platform to explore campus life, connect with peers, and
            stay updated with events, projects, and opportunities.
          </p>
        </div>

        {/* Middle: Navigation */}
        <div className="flex flex-col md:items-center">
          <h3 className="text-white font-bold text-xl mb-6 tracking-wide">
            Explore
          </h3>
          <nav className="flex flex-col space-y-3">
            {links.map(([label, path], i) => (
              <Link
                key={i}
                to={path}
                className="text-base text-gray-400 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Contact & Social */}
        <div className="flex flex-col md:items-end">
          <h3 className="text-white font-semibold text-lg mb-4">
            Stay Connected
          </h3>
          <div className="flex gap-5 mb-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="h-5 w-5 hover:text-white transition-colors" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="h-5 w-5 hover:text-white transition-colors" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5 hover:text-white transition-colors" />
            </a>
            <a href="mailto:contact@campusconnect.com">
              <Mail className="h-5 w-5 hover:text-white transition-colors" />
            </a>
          </div>
          <p className="text-xs text-gray-500">contact@campusconnect.com</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Campus Connect. All rights reserved.
      </div>
    </footer>
  );
}
