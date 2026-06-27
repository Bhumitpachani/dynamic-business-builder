import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { store, session, isExpired } from "@/lib/store";
import { Users } from "lucide-react";

export const Route = createFileRoute("/client/login")({
  head: () => ({ meta: [{ title: "Client Login — tapvybe" }] }),
  component: ClientLogin,
});

function ClientLogin() {
  const navigate = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!u.trim() || !p.trim()) return setErr("Please enter username and password");
    setLoading(true);
    setErr("");
    const biz = await store.getByLogin(u.trim(), p);
    setLoading(false);
    if (!biz) return setErr("Invalid credentials");
    if (isExpired(biz)) return setErr("Your plan has expired. Contact your administrator.");
    session.set({ kind: "client", businessId: biz.id });
    navigate({ to: "/client/dashboard" });
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-lg bg-blue-600 text-white grid place-items-center">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Client Login</h1>
            <p className="text-xs text-slate-500">Manage your business website</p>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input
            value={u}
            onChange={(e) => setU(e.target.value)}
            placeholder="Username"
            className="w-full border rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <input
            value={p}
            onChange={(e) => setP(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full border rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          {err && <p className="text-sm text-red-600">{err}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-xs text-slate-500 text-center">Credentials are issued by your Super Admin</p>
        <Link to="/" className="block mt-4 text-center text-sm text-blue-600 hover:underline">← Back to home</Link>
      </div>
    </div>
  );
}
