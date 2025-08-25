import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const links = [
    ["Events", "/events"],
    ["Forum", "/forum"],
    ["Projects", "/projects"],
    ["Clubs", "/clubs"],
    ["Marketplace", "/marketplace"],
    ["Lost & Found", "/lostfound"],
    ["Alumni", "/alumni"],
    ["Hackathons", "/hackathons"],
    ["Notices", "/notices"],
  ];

  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Logo + Info */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            {/* <img src="/logo.png" alt="Campus Connect" className="h-8 w-8" /> */}
            <span className="text-white font-semibold text-lg">
              Campus Connect
            </span>
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Your all-in-one platform for campus events, projects, and
            connections.
          </p>
        </div>

        {/* Middle: Navigation */}
        <div className="flex flex-col md:items-center">
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <nav className="flex flex-wrap gap-4">
            {links.map(([label, path], i) => (
              <Link
                key={i}
                to={path}
                className="text-sm hover:text-white transition"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Social */}
        <div className="flex flex-col md:items-end">
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="h-5 w-5 hover:text-white transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="h-5 w-5 hover:text-white transition" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5 hover:text-white transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Campus Connect. All rights reserved.
      </div>
    </footer>
  );
}
