import { useEffect, useState } from "react";
import { api } from "@/services/api";

type Post = {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: string;
  upvotes: number;
};

type Reply = {
  id: number;
  body: string;
  author_id: number;
  created_at: string;
  upvotes: number;
};

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<{ title?: string; content?: string }>({});
  const [replyForms, setReplyForms] = useState<Record<number, string>>({});
  const [replies, setReplies] = useState<Record<number, Reply[]>>({});
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const { data } = await api.get("/forum/posts");
      setPosts(data);
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    }
  }

  async function loadReplies(postId: number) {
    try {
      const { data } = await api.get(`/forum/questions/${postId}/answers`);
      setReplies((p) => ({ ...p, [postId]: data }));
    } catch (e: any) {
      console.error(e);
    }
  }

  async function handleReply(postId: number) {
    if (!replyForms[postId]) return;
    try {
      await api.post(`/forum/questions/${postId}/answers`, {
        body: replyForms[postId],
      });
      setReplyForms((p) => ({ ...p, [postId]: "" }));
      await loadReplies(postId);
    } catch (e: any) {
      console.error(e);
    }
  }

  async function handleUpvotePost(id: number) {
    try {
      await api.post(`/forum/questions/${id}/upvote`);
      await load();
    } catch (e: any) {
      console.error(e);
    }
  }

  async function handleUpvoteReply(id: number, postId: number) {
    try {
      await api.post(`/forum/answers/${id}/upvote`);
      await loadReplies(postId);
    } catch (e: any) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Welcome </h1>
      <p className="text-gray-600">Discuss, share, and learn together</p>

      {/* New Post */}
      <div className="bg-white border rounded-lg shadow-sm p-4 space-y-3">
        <input
          className="w-full border rounded-md px-3 py-2 text-sm"
          placeholder="Post title"
          value={form.title || ""}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
        />
        <textarea
          className="w-full border rounded-md px-3 py-2 text-sm"
          placeholder="Write something..."
          rows={3}
          value={form.content || ""}
          onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
        />
        <button
          onClick={async () => {
            setLoading(true);
            try {
              await api.post("/forum/posts", form);
              setForm({});
              await load();
            } catch (e: any) {
              setError(e?.response?.data?.detail || e.message);
            } finally {
              setLoading(false);
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border rounded-lg shadow-sm p-4 space-y-3"
          >
            <div className="flex justify-between items-start gap-3">
              {/* Post Content */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-gray-700 text-sm">{post.content}</p>
                <div className="text-xs text-gray-500 mt-1">
                  Posted {new Date(post.created_at).toLocaleString()}
                </div>

                {/* Toggle replies */}
                <button
                  onClick={async () => {
                    setExpanded((p) => ({
                      ...p,
                      [post.id]: !p[post.id],
                    }));
                    if (!expanded[post.id]) {
                      await loadReplies(post.id);
                    }
                  }}
                  className="text-xs text-blue-600 mt-2 hover:underline"
                >
                  {expanded[post.id]
                    ? "Hide Replies"
                    : `Show Replies (${replies[post.id]?.length || 0})`}
                </button>

                {/* Replies Section */}
                {expanded[post.id] && (
                  <div className="mt-3 space-y-2 border-l pl-3">
                    {replies[post.id]?.map((r) => (
                      <div
                        key={r.id}
                        className="flex justify-between items-start"
                      >
                        <p className="text-sm text-gray-700 flex-1">{r.body}</p>
                        <button
                          onClick={() => handleUpvoteReply(r.id, post.id)}
                          className="flex flex-col items-center text-gray-500 hover:text-blue-600 ml-2"
                        >
                          <span className="text-lg">▲</span>
                          <span className="text-xs">{r.upvotes}</span>
                        </button>
                      </div>
                    ))}

                    {/* Reply Input (always visible) */}
                    <div className="flex gap-2 pt-2">
                      <input
                        className="flex-1 border rounded-md px-2 py-1 text-sm"
                        placeholder="Reply..."
                        value={replyForms[post.id] || ""}
                        onChange={(e) =>
                          setReplyForms((p) => ({
                            ...p,
                            [post.id]: e.target.value,
                          }))
                        }
                      />
                      <button
                        onClick={() => handleReply(post.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Upvote Button (Right side) */}
              <button
                onClick={() => handleUpvotePost(post.id)}
                className="flex flex-col items-center text-gray-500 hover:text-blue-600 ml-2"
              >
                <span className="text-2xl">▲</span>
                <span className="text-sm font-semibold">{post.upvotes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}
