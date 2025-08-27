import { useEffect, useState } from "react";
import { api } from "@/services/api";

type Project = any;
type CollabRequest = any;

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [collabs, setCollabs] = useState<Record<number, CollabRequest[]>>({});
  const [collabMsg, setCollabMsg] = useState<Record<number, string>>({});
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("latest");

  async function loadProjects() {
    try {
      const { data } = await api.get("/projects");
      setProjects(data);
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    }
  }

  async function createProject() {
    setLoading(true);
    setError(null);
    try {
      await api.post("/projects", {
        title: form.name,
        description: form.description,
        github: form.github || "",
        demo_url: form.demo_url || "",
        category: form.category || "",
      });
      setForm({});
      setShowForm(false);
      await loadProjects();
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadCollabs(pid: number) {
    try {
      const { data } = await api.get(`/projects/${pid}/collaborators`);
      setCollabs((prev) => ({ ...prev, [pid]: data }));
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    }
  }

  async function requestCollab(pid: number) {
    try {
      await api.post(`/projects/${pid}/collaborators`, {
        message: collabMsg[pid] || "I'd like to join!",
      });
      setCollabMsg((prev) => ({ ...prev, [pid]: "" }));
      await loadCollabs(pid);
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  {/*Filtering and sorting*/ }

  const filteredProjects = projects
    .filter((p) => (category === "all" ? true : p.category === category))
    .sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return 0;
    });

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Student Projects Hub</h1>
          <p className="text-black text-sm">
            Discover, showcase, and collaborate on exciting student-built projects.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-full shadow hover:bg-sky-700 transition"
        >
          <span className="text-xl font-bold">+</span>
          <span>New Project</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
        >
          <option value="all">All Categories</option>
          <option value="web">Web Development</option>
          <option value="app">App Development</option>
          <option value="ai">AI/ML</option>
          <option value="iot">IoT</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Popup Form (modal) */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold">Create a New Project</h2>

            <input
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Project Name"
              value={form.name || ""}
              onChange={(e) =>
                setForm((p: any) => ({ ...p, name: e.target.value }))
              }
            />
            <textarea
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Description"
              rows={3}
              value={form.description || ""}
              onChange={(e) =>
                setForm((p: any) => ({ ...p, description: e.target.value }))
              }
            />
            <input
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="GitHub URL"
              value={form.github || ""}
              onChange={(e) =>
                setForm((p: any) => ({ ...p, github: e.target.value }))
              }
            />
            <input
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Demo URL"
              value={form.demo_url || ""}
              onChange={(e) =>
                setForm((p: any) => ({ ...p, demo_url: e.target.value }))
              }
            />

            {/* Category selection */}
            <select
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={form.category || ""}
              onChange={(e) =>
                setForm((p: any) => ({ ...p, category: e.target.value }))
              }
            >
              <option value="">Select Category</option>
              <option value="web">Web Development</option>
              <option value="app">App Development</option>
              <option value="ai">AI/ML</option>
              <option value="iot">IoT</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                onClick={createProject}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                {loading ? "Posting..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-lg font-bold">{proj.title}</h2>
              <p className="text-xs text-gray-500 italic mb-1">
                {proj.category || "Uncategorized"}
              </p>
              <p className="text-sm text-gray-600 mt-1 flex-1">{proj.description}</p>

              <div className="flex gap-3 text-sm mt-2 text-blue-600">
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {proj.demo_url && (
                  <a
                    href={proj.demo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    Demo
                  </a>
                )}
              </div>
              <div className="mt-4">
                <button
                  onClick={() => loadCollabs(proj.id)}
                  className="text-xs underline text-blue-600"
                >
                  View collaborator requests
                </button>

                {collabs[proj.id] && (
                  <div className="space-y-1 text-xs bg-gray-50 p-2 rounded-md mt-2 max-h-32 overflow-y-auto">
                    {collabs[proj.id].map((c: any) => (
                      <div
                        key={c.id}
                        className="p-2 border rounded bg-white shadow-sm"
                      >
                        {c.message} —{" "}
                        <span className="text-gray-500">user {c.user_id}</span>
                      </div>
                    ))}
                    {collabs[proj.id].length === 0 && (
                      <div className="text-gray-400">No requests yet</div>
                    )}
                  </div>
                )}
              </div>

              {/* Collab input */}
              <div className="flex gap-2 mt-3">
                <input
                  className="border rounded-md px-2 py-1 text-xs flex-1"
                  placeholder="Message"
                  value={collabMsg[proj.id] || ""}
                  onChange={(e) =>
                    setCollabMsg((p) => ({ ...p, [proj.id]: e.target.value }))
                  }
                />
                <button
                  onClick={() => requestCollab(proj.id)}
                  className="text-xs px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}
