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
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl border shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      {message && <div className="text-green-700 text-sm mb-2">{message}</div>}
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
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
        className="space-y-3"
      >
        {["name", "email", "password", "branch", "year"].map((k) => (
          <input
            key={k}
            className="w-full border rounded-md px-3 py-2"
            placeholder={k}
            type={
              k === "password" ? "password" : k === "year" ? "number" : "text"
            }
            value={(form as any)[k]}
            onChange={(e) =>
              setForm({
                ...form,
                [k]: k === "year" ? Number(e.target.value) : e.target.value,
              })
            }
          />
        ))}
        <select
          className="w-full border rounded-md px-3 py-2"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          {["student", "alumni", "admin"].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button className="w-full bg-black text-white rounded-md py-2">
          Register
        </button>
      </form>
      <p className="text-sm mt-3 text-gray-600">
        Already registered?{" "}
        <a className="underline" href="/verify">
          Verify email
        </a>
      </p>
    </div>
  );
}
