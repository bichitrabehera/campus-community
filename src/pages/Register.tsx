import { useState } from "react";
import { useAuthStore } from "@/store/auth";

export default function Register() {
  const { register } = useAuthStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    branch: "",
    year: 1,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-10">
          <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900">
            Create your account
          </h1>
          {message && <div className="text-green-700 text-sm mb-2">{message}</div>}
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);
                try {
                  await register(form as any);
                  setMessage("Registered! Check your email for verification code.");
                } catch (e: any) {
                  setError(e?.response?.data?.detail || e.message);
                }
              }}
              className="space-y-4"
            >

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm focus:outline-indigo-600 sm:text-sm"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm focus:outline-indigo-600 sm:text-sm"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm focus:outline-indigo-600 sm:text-sm"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch
                  </label>
                  <input
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm focus:outline-indigo-600 sm:text-sm"
                    placeholder="Branch"
                    value={form.branch}
                    onChange={(e) =>
                      setForm({ ...form, branch: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <select
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm focus:outline-indigo-600 sm:text-sm"
                    value={form.year}
                    onChange={(e) =>
                      setForm({ ...form, year: Number(e.target.value) })
                    }
                  >
                    {[1, 2, 3, 4].map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Register as
                </label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  {["Student", "Alumni", "Admin"].map((r) => (
                    <option key={r} value={r.toLowerCase()}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600">
                  Register
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already registered?{" "}
            <a
              className="font-semibold text-indigo-600 hover:text-indigo-500"
              href="/verify"
            >
              Verify email
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}