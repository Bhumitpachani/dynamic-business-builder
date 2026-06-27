import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { superAdminLogin } from "@/lib/store";
import { auth, SUPER_ADMIN_EMAIL } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/super-admin/login")({
  head: () => ({ meta: [{ title: "Super Admin Login — tapvybe" }] }),
  component: SuperLogin,
});

function SuperLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // If already authenticated, redirect immediately
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email === SUPER_ADMIN_EMAIL) {
        navigate({ to: "/super-admin/dashboard" });
      } else {
        setChecking(false);
      }
    });
    return unsubscribe;
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return setErr("Password is required");
    setLoading(true);
    setErr("");
    const error = await superAdminLogin(password);
    setLoading(false);
    if (error) {
      setErr(error);
    } else {
      navigate({ to: "/super-admin/dashboard" });
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <p className="text-slate-400 text-sm">Checking authentication…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-lg bg-slate-900 text-white grid place-items-center">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Super Admin</h1>
            <p className="text-xs text-slate-500">Platform owner access</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3">
          {/* Email (read-only — fixed to SUPER_ADMIN_EMAIL) */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              value={SUPER_ADMIN_EMAIL}
              readOnly
              className="w-full border rounded-md px-3 py-2.5 bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
            />
          </div>

          {err && <p className="text-sm text-red-600">{err}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-2.5 rounded-md font-semibold hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-400 text-center">
          First login will set up the super admin account with the password you enter.
        </p>
        <Link to="/" className="block mt-4 text-center text-sm text-blue-600 hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
