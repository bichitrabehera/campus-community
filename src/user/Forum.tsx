// import { useEffect, useState } from "react";
// import { api } from "@/services/api";

// type Post = {
//   id: number;
//   title: string;
//   content: string;
//   author_id: number;
//   created_at: string;
//   upvotes: number;
// };

// type Reply = {
//   id: number;
//   body: string;
//   author_id: number;
//   created_at: string;
//   upvotes: number;
// };

// export default function Forum() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [form, setForm] = useState<{ title?: string; content?: string }>({});
//   const [replyForms, setReplyForms] = useState<Record<number, string>>({});
//   const [replies, setReplies] = useState<Record<number, Reply[]>>({});
//   const [expanded, setExpanded] = useState<Record<number, boolean>>({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   async function load() {
//     try {
//       const { data } = await api.get("/forum/posts");
//       setPosts(data);
//     } catch (e: any) {
//       setError(e?.response?.data?.detail || e.message);
//     }
//   }

//   async function loadReplies(postId: number) {
//     try {
//       const { data } = await api.get(`/forum/questions/${postId}/answers`);
//       setReplies((p) => ({ ...p, [postId]: data }));
//     } catch (e: any) {
//       console.error(e);
//     }
//   }

//   async function handleReply(postId: number) {
//     if (!replyForms[postId]) return;
//     try {
//       await api.post(`/forum/questions/${postId}/answers`, {
//         body: replyForms[postId],
//       });
//       setReplyForms((p) => ({ ...p, [postId]: "" }));
//       await loadReplies(postId);
//     } catch (e: any) {
//       console.error(e);
//     }
//   }

//   async function handleUpvotePost(id: number) {
//     try {
//       await api.post(`/forum/questions/${id}/upvote`);
//       await load();
//     } catch (e: any) {
//       console.error(e);
//     }
//   }

//   async function handleUpvoteReply(id: number, postId: number) {
//     try {
//       await api.post(`/forum/answers/${id}/upvote`);
//       await loadReplies(postId);
//     } catch (e: any) {
//       console.error(e);
//     }
//   }

//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto space-y-6 p-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900">Forum</h1>
//         <p className="text-gray-600">
//           Discuss, share, and learn together.
//         </p>
//       </div>

//       {/* New Post Box */}
//       <div className="bg-white border rounded-lg shadow-sm p-4 space-y-3">
//         <input
//           className="w-full border rounded-md px-3 py-2 text-sm"
//           placeholder="Post title"
//           value={form.title || ""}
//           onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
//         />
//         <textarea
//           className="w-full border rounded-md px-3 py-2 text-sm"
//           placeholder="Write something..."
//           rows={3}
//           value={form.content || ""}
//           onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
//         />
//         <div className="flex justify-end">
//           <button
//             onClick={async () => {
//               setLoading(true);
//               try {
//                 await api.post("/forum/posts", form);
//                 setForm({});
//                 await load();
//               } catch (e: any) {
//                 setError(e?.response?.data?.detail || e.message);
//               } finally {
//                 setLoading(false);
//               }
//             }}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
//           >
//             {loading ? "Posting..." : "Post"}
//           </button>
//         </div>
//       </div>

//       {/* Posts */}
//       <div className="space-y-4">
//         {posts.map((post) => (
//           <div
//             key={post.id}
//             className="bg-white border rounded-lg shadow-md flex p-4 gap-4"
//           >
//             {/* Upvote Column */}
//             <div className="flex flex-col items-center text-gray-500">
//               <button
//                 onClick={() => handleUpvotePost(post.id)}
//                 className="hover:text-blue-600"
//               >
//                 ▲
//               </button>
//               <span className="font-semibold">{post.upvotes}</span>
//             </div>

//             {/* Post Content */}
//             <div className="flex-1 space-y-2">
//               <h2 className="text-lg font-semibold">{post.title}</h2>
//               <p className="text-gray-700">{post.content}</p>
//               <div className="text-xs text-gray-500">
//                 Posted {new Date(post.created_at).toLocaleString()}
//               </div>

//               {/* Show/Hide Replies */}
//               <button
//                 onClick={async () => {
//                   setExpanded((p) => ({
//                     ...p,
//                     [post.id]: !p[post.id],
//                   }));
//                   if (!expanded[post.id]) {
//                     await loadReplies(post.id);
//                   }
//                 }}
//                 className="text-xs text-blue-600 mt-2 hover:underline"
//               >
//                 {expanded[post.id]
//                   ? "Hide Replies"
//                   : `Show Replies (${replies[post.id]?.length || 0})`}
//               </button>

//               {/* Replies */}
//               {expanded[post.id] && (
//                 <div className="mt-3 space-y-3 border-t pt-3">
//                   {replies[post.id]?.map((r) => (
//                     <div
//                       key={r.id}
//                       className="flex items-start justify-between gap-2 bg-gray-50 p-2 rounded-md"
//                     >
//                       <div className="flex-1">
//                         <p className="text-sm">{r.body}</p>
//                         <span className="text-xs text-gray-400">
//                           {new Date(r.created_at).toLocaleString()}
//                         </span>
//                       </div>
//                       <button
//                         onClick={() => handleUpvoteReply(r.id, post.id)}
//                         className="flex flex-col items-center text-gray-500 hover:text-blue-600"
//                       >
//                         <span>▲</span>
//                         <span className="text-xs">{r.upvotes}</span>
//                       </button>
//                     </div>
//                   ))}

//                   {/* Reply Input */}
//                   <div className="flex gap-2">
//                     <input
//                       className="flex-1 border rounded-md px-2 py-1 text-sm"
//                       placeholder="Reply..."
//                       value={replyForms[post.id] || ""}
//                       onChange={(e) =>
//                         setReplyForms((p) => ({
//                           ...p,
//                           [post.id]: e.target.value,
//                         }))
//                       }
//                     />
//                     <button
//                       onClick={() => handleReply(post.id)}
//                       className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700"
//                     >
//                       Reply
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {error && <div className="text-red-600">{error}</div>}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { MessageCircle, ThumbsUp, UserCircle2, Plus } from "lucide-react";

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
  const [showForm, setShowForm] = useState(false);

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

  async function handleCreatePost() {
    setLoading(true);
    try {
      await api.post("/forum/posts", form);
      setForm({});
      setShowForm(false);
      await load();
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4 sm:p-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Campus Forum
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Discuss, share, and learn together.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 shadow-md text-sm sm:text-base self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Create Post</span>
          <span className="sm:hidden">Post</span>
        </button>
      </div>

      {/* Modal for Create Post */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md space-y-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <h2 className="text-lg sm:text-xl font-semibold">
              Create a new post
            </h2>
            <input
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Post title"
              value={form.title || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
            />
            <textarea
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Write something..."
              rows={4}
              value={form.content || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, content: e.target.value }))
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-3 sm:px-4 py-2 border rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                disabled={loading}
                className="px-3 sm:px-4 py-2 bg-sky-600 text-white rounded-md text-sm hover:bg-sky-700"
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-5">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border rounded-lg shadow-sm p-4 sm:p-5 hover:shadow-md transition"
          >
            {/* Post Header */}
            <div className="flex items-center gap-3">
              <UserCircle2 className="text-gray-400 w-7 h-7 sm:w-8 sm:h-8" />
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  {post.title}
                </h2>
                <span className="text-xs text-gray-500 block">
                  Posted {new Date(post.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Post Body */}
            <p className="text-gray-700 mt-2 text-sm sm:text-base">
              {post.content}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-3 text-xs sm:text-sm">
              <button
                onClick={() => handleUpvotePost(post.id)}
                className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
              >
                <ThumbsUp size={14} className="sm:w-4 sm:h-4" /> {post.upvotes}
              </button>
              <button
                onClick={async () => {
                  setExpanded((p) => ({
                    ...p,
                    [post.id]: !p[post.id],
                  }));
                  if (!expanded[post.id]) await loadReplies(post.id);
                }}
                className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
              >
                <MessageCircle size={14} className="sm:w-4 sm:h-4" />{" "}
                {expanded[post.id]
                  ? "Hide Replies"
                  : `Show Replies (${replies[post.id]?.length || 0})`}
              </button>
            </div>

            {/* Replies */}
            {expanded[post.id] && (
              <div className="mt-3 sm:mt-4 space-y-3 border-t pt-3">
                {replies[post.id]?.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-start gap-3 bg-gray-50 p-2 sm:p-3 rounded-lg"
                  >
                    <UserCircle2 className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm">{r.body}</p>
                      <span className="text-[10px] sm:text-xs text-gray-400">
                        {new Date(r.created_at).toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleUpvoteReply(r.id, post.id)}
                      className="flex items-center gap-1 text-gray-400 hover:text-blue-600 text-[10px] sm:text-xs"
                    >
                      <ThumbsUp size={12} className="sm:w-3 sm:h-3" />{" "}
                      {r.upvotes}
                    </button>
                  </div>
                ))}

                {/* Reply Input */}
                <div className="flex gap-2">
                  <input
                    className="flex-1 border rounded-md px-2 py-1 text-xs sm:text-sm focus:ring-1 focus:ring-blue-500"
                    placeholder="Write a reply..."
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
                    className="px-2 sm:px-3 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700"
                  >
                    Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
}
