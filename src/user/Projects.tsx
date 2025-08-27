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

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          {showForm ? "Close" : "+ New Project"}
        </button>
      </div>

      {/* Create Project Form */}
      {showForm && (
        <div className="bg-white border rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Create a New Project</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border rounded-md px-3 py-2"
              placeholder="Project Name"
              type="text"
              value={form.name || ""}
              onChange={(e) =>
                setForm((p: any) => ({ ...p, name: e.target.value }))
              }
            />
            <input
              className="border rounded-md px-3 py-2"
              placeholder="Description"
              type="text"
              value={form.description || ""}
              onChange={(e) =>
                setForm((p: any) => ({ ...p, description: e.target.value }))
              }
            />
            <input
              className="border rounded-md px-3 py-2"
              placeholder="GitHub URL"
              type="text"
              value={form.github || ""}
              onChange={(e) =>
                setForm((p: any) => ({ ...p, github: e.target.value }))
              }
            />
            <input
              className="border rounded-md px-3 py-2"
              placeholder="Demo URL"
              type="text"
              value={form.demo_url || ""}
              onChange={(e) =>
                setForm((p: any) => ({ ...p, demo_url: e.target.value }))
              }
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={createProject}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              {loading ? "Saving..." : "Create Project"}
            </button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white border rounded-lg shadow p-4 flex flex-col"
          >
            <h2 className="text-lg font-bold">{proj.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{proj.description}</p>

            <div className="flex gap-3 text-sm mt-2 text-blue-600">
              {proj.github && (
                <a href={proj.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
              {proj.demo_url && (
                <a href={proj.demo_url} target="_blank" rel="noreferrer">
                  Demo
                </a>
              )}
            </div>

            <button
              onClick={() => loadCollabs(proj.id)}
              className="mt-3 text-xs underline text-blue-600"
            >
              View collaborator requests
            </button>

            {collabs[proj.id] && (
              <div className="space-y-1 text-xs bg-gray-50 p-2 rounded-md mt-2">
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
        ))}
      </div>

      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}
