import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SUPER_ADMIN, session } from "@/lib/store";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/super-admin/login")({
  head: () => ({ meta: [{ title: "Super Admin Login — BizPlatform" }] }),
  component: SuperLogin,
});

function SuperLogin() {
  const navigate = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (u === SUPER_ADMIN.username && p === SUPER_ADMIN.password) {
      session.set({ kind: "super" });
      navigate({ to: "/super-admin/dashboard" });
    } else setErr("Invalid credentials");
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-lg bg-slate-900 text-white grid place-items-center"><Shield className="h-5 w-5" /></div>
          <div>
            <h1 className="text-xl font-bold">Super Admin</h1>
            <p className="text-xs text-slate-500">Platform owner access</p>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input value={u} onChange={(e) => setU(e.target.value)} placeholder="Username" className="w-full border rounded-md px-3 py-2.5" />
          <input value={p} onChange={(e) => setP(e.target.value)} type="password" placeholder="Password" className="w-full border rounded-md px-3 py-2.5" />
          {err && <p className="text-sm text-red-600">{err}</p>}
          <button className="w-full bg-slate-900 text-white py-2.5 rounded-md font-semibold hover:bg-slate-800">Login</button>
        </form>
        <p className="mt-4 text-xs text-slate-500 text-center">Demo: admin / 123</p>
        <Link to="/" className="block mt-4 text-center text-sm text-blue-600 hover:underline">← Back to home</Link>
      </div>
    </div>
  );
}
