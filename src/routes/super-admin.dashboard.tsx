import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { store, session, emptyBusiness, isExpired, daysLeft, type Business } from "@/lib/store";
import { auth, SUPER_ADMIN_EMAIL } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  LogOut, Plus, Trash2, ExternalLink, Edit3, Copy, Check,
  TrendingUp, Users, Globe, AlertCircle, CheckCircle, Layers, X,
} from "lucide-react";

export const Route = createFileRoute("/super-admin/dashboard")({
  head: () => ({ meta: [{ title: "Super Admin — Business Builder" }] }),
  component: SuperDash,
});

function SuperDash() {
  const navigate = useNavigate();
  const [list, setList] = useState<Business[]>([]);
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState("");
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    let firestoreUnsub: (() => void) | null = null;

    const authUnsub = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== SUPER_ADMIN_EMAIL) {
        setAuthReady(false);
        navigate({ to: "/super-admin/login" });
        return;
      }
      setAuthReady(true);
      // Subscribe to real-time Firestore updates
      firestoreUnsub = store.onAll((businesses) => {
        setList(businesses);
      });
    });

    return () => {
      authUnsub();
      firestoreUnsub?.();
    };
  }, [navigate]);

  async function logout() {
    session.clear(); // signs out Firebase Auth + clears localStorage
    navigate({ to: "/" });
  }

  const totalVisits = list.reduce((s, b) => s + (b.visits || 0), 0);
  const activeCount = list.filter((b) => !isExpired(b)).length;
  const expiredCount = list.filter((b) => isExpired(b)).length;

  const stats = [
    { label: "Total Clients", value: list.length, icon: Users, bg: "bg-indigo-50", iconColor: "text-indigo-600", numColor: "text-indigo-700" },
    { label: "Active", value: activeCount, icon: CheckCircle, bg: "bg-emerald-50", iconColor: "text-emerald-600", numColor: "text-emerald-700" },
    { label: "Expired", value: expiredCount, icon: AlertCircle, bg: "bg-rose-50", iconColor: "text-rose-500", numColor: "text-rose-600" },
    { label: "Total Visits", value: totalVisits, icon: TrendingUp, bg: "bg-sky-50", iconColor: "text-sky-600", numColor: "text-sky-700" },
  ];

  if (!authReady) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <p className="text-slate-400 text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Header ── */}
      <header className="bg-[#0F172A] sticky top-0 z-40 shadow-[0_1px_0_rgba(255,255,255,.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white grid place-items-center shrink-0 shadow-lg shadow-indigo-900/40">
              <Layers className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <span className="text-white font-bold text-sm sm:text-base leading-none">Business Builder</span>
              <span className="hidden sm:block text-slate-500 text-xs mt-0.5">Super Admin Panel</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4 shrink-0" />
              <span className="hidden xs:inline">New Client</span>
              <span className="xs:hidden">New</span>
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/8 border border-white/8 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5 sm:space-y-6">

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
              <div className={`inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl ${s.bg} mb-3 sm:mb-4`}>
                <s.icon className={`h-5 w-5 ${s.iconColor}`} />
              </div>
              <p className={`text-2xl sm:text-3xl font-bold font-[tabular-nums] ${s.numColor}`}>{s.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Client list ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-800 text-base">Client Businesses</h2>
              <p className="text-xs text-slate-500 mt-0.5">{list.length} client{list.length !== 1 ? "s" : ""} registered</p>
            </div>
            <button
              onClick={() => setCreating(true)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              New Client
            </button>
          </div>

          {list.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="h-14 w-14 rounded-2xl bg-indigo-50 grid place-items-center mx-auto mb-4">
                <Users className="h-7 w-7 text-indigo-400" />
              </div>
              <p className="text-slate-700 font-semibold">No clients yet</p>
              <p className="text-sm text-slate-400 mt-1 max-w-xs mx-auto">Click "New Client" to onboard your first business website.</p>
              <button
                onClick={() => setCreating(true)}
                className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <Plus className="h-4 w-4" /> Create First Client
              </button>
            </div>
          ) : (
            <>
              {/* ── Desktop table (md+) ── */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      {["Business", "Login Credentials", "Plan", "Status", "Site URL", ""].map((h) => (
                        <th key={h} className={`px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider ${h === "" ? "text-right" : "text-left"}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {list.map((b) => {
                      const expired = isExpired(b);
                      const remaining = daysLeft(b);
                      return (
                        <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                          {/* Business */}
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <BizAvatar name={b.name} />
                              <div>
                                <p className="font-semibold text-slate-900 leading-tight">{b.name}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{b.category || "Business"}</p>
                              </div>
                            </div>
                          </td>
                          {/* Credentials */}
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-1 flex-wrap">
                              <CredChip>{b.username}</CredChip>
                              <span className="text-slate-300 text-xs">/</span>
                              <CredChip>{b.password}</CredChip>
                            </div>
                          </td>
                          {/* Plan */}
                          <td className="px-5 py-3.5">
                            <p className="font-semibold text-slate-800 tabular-nums">{b.planDays}d total</p>
                            <p className={`text-xs mt-0.5 font-medium tabular-nums ${expired ? "text-rose-500" : remaining <= 7 ? "text-amber-600" : "text-slate-400"}`}>
                              {expired ? "Expired" : `${remaining}d left`}
                            </p>
                          </td>
                          {/* Status */}
                          <td className="px-5 py-3.5">
                            <StatusPill expired={expired} />
                          </td>
                          {/* Site URL */}
                          <td className="px-5 py-3.5">
                            <CopySlugBtn
                              slug={b.slug}
                              copied={copiedId === b.id}
                              onCopy={() => {
                                navigator.clipboard.writeText(window.location.origin + `/site/${b.slug}`);
                                setCopiedId(b.id);
                                setTimeout(() => setCopiedId(""), 1500);
                              }}
                            />
                          </td>
                          {/* Actions */}
                          <td className="px-5 py-3.5">
                            <RowActions b={b} navigate={navigate} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* ── Mobile cards (< md) ── */}
              <div className="md:hidden divide-y divide-slate-100">
                {list.map((b) => {
                  const expired = isExpired(b);
                  const remaining = daysLeft(b);
                  return (
                    <div key={b.id} className="p-4 space-y-3">
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <BizAvatar name={b.name} />
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 leading-tight truncate">{b.name}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{b.category || "Business"}</p>
                          </div>
                        </div>
                        <StatusPill expired={expired} />
                      </div>

                      {/* Meta rows */}
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-slate-500 font-medium">Login</span>
                          <div className="flex items-center gap-1 flex-wrap justify-end">
                            <CredChip>{b.username}</CredChip>
                            <span className="text-slate-300">/</span>
                            <CredChip>{b.password}</CredChip>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-slate-500 font-medium">Plan</span>
                          <span className={`font-semibold tabular-nums ${expired ? "text-rose-500" : remaining <= 7 ? "text-amber-600" : "text-slate-700"}`}>
                            {b.planDays}d · {expired ? "Expired" : `${remaining}d left`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-slate-500 font-medium">Site</span>
                          <span className="font-mono text-indigo-600 truncate max-w-[160px]">/site/{b.slug}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-1">
                        <Link
                          to="/site/$slug"
                          params={{ slug: b.slug }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs border border-slate-300 rounded-xl hover:bg-slate-50 text-slate-600 font-medium transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> View
                        </Link>
                        <button
                          onClick={() => {
                            session.set({ kind: "client", businessId: b.id, fromAdmin: true });
                            navigate({ to: "/client/dashboard" });
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs border border-indigo-200 bg-indigo-50 rounded-xl hover:bg-indigo-100 text-indigo-700 font-semibold transition-colors"
                        >
                          <Edit3 className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm("Delete this business and all its data?")) {
                              await store.remove(b.id);
                            }
                          }}
                          className="inline-flex items-center justify-center p-2 text-xs bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 text-rose-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      {creating && <CreateModal onClose={() => setCreating(false)} />}
    </div>
  );
}

/* ── Shared small components ── */

function BizAvatar({ name }: { name: string }) {
  const colors = [
    "bg-indigo-100 text-indigo-800",
    "bg-violet-100 text-violet-800",
    "bg-sky-100 text-sky-800",
    "bg-emerald-100 text-emerald-800",
    "bg-amber-100 text-amber-800",
    "bg-rose-100 text-rose-800",
  ];
  const color = colors[(name.charCodeAt(0) || 0) % colors.length];
  return (
    <div className={`h-9 w-9 rounded-xl ${color} grid place-items-center font-bold text-sm shrink-0`}>
      {name[0]?.toUpperCase() || "B"}
    </div>
  );
}

function CredChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-lg border border-slate-200">
      {children}
    </span>
  );
}

function StatusPill({ expired }: { expired: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${expired ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${expired ? "bg-rose-500" : "bg-emerald-500"}`} />
      {expired ? "Expired" : "Active"}
    </span>
  );
}

function CopySlugBtn({ slug, copied, onCopy }: { slug: string; copied: boolean; onCopy: () => void }) {
  return (
    <button
      onClick={onCopy}
      className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 transition-colors text-xs font-medium group"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> : <Copy className="h-3.5 w-3.5 shrink-0" />}
      <span className="font-mono truncate max-w-[140px]">/site/{slug}</span>
    </button>
  );
}

function RowActions({ b, navigate }: { b: Business; navigate: any }) {
  return (
    <div className="flex items-center gap-1.5 justify-end">
      <Link
        to="/site/$slug"
        params={{ slug: b.slug }}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors font-medium"
      >
        <ExternalLink className="h-3 w-3" /> View
      </Link>
      <button
        onClick={() => {
          session.set({ kind: "client", businessId: b.id, fromAdmin: true });
          navigate({ to: "/client/dashboard" });
        }}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs border border-indigo-200 bg-indigo-50 rounded-xl hover:bg-indigo-100 text-indigo-700 transition-colors font-semibold"
      >
        <Edit3 className="h-3 w-3" /> Edit
      </button>
      <button
        onClick={async () => {
          if (confirm("Delete this business and all its data?")) {
            await store.remove(b.id);
          }
        }}
        className="inline-flex items-center p-1.5 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 text-rose-600 transition-colors"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ── Create modal ── */

function CreateModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [days, setDays] = useState(30);
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !username || !password) return;
    setSaving(true);
    await store.upsert(emptyBusiness(name, username, password, days));
    setSaving(false);
    onClose();
  }

  const inputCls = "w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition-colors placeholder:text-slate-400";
  const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Modal header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-100 text-indigo-600 grid place-items-center">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">New Client Website</h3>
              <p className="text-xs text-slate-500 mt-0.5">Set up login & plan duration</p>
            </div>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-xl hover:bg-slate-100 grid place-items-center text-slate-400 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="p-6 space-y-4">
          <label className="block">
            <span className={labelCls}>Business Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sharma Electronics" className={inputCls} required />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className={labelCls}>Username</span>
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="sharma123" className={inputCls} required />
            </label>
            <label className="block">
              <span className={labelCls}>Password</span>
              <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputCls} required />
            </label>
          </div>
          <label className="block">
            <span className={labelCls}>Plan Duration</span>
            <div className="relative">
              <input
                type="number"
                min={1}
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                className={inputCls + " pr-12"}
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium pointer-events-none">days</span>
            </div>
          </label>

          {/* Quick presets */}
          <div className="flex gap-2">
            {[30, 60, 90, 365].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${days === d ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300"}`}
              >
                {d}d
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-slate-300 rounded-xl py-2.5 text-sm text-slate-600 hover:bg-slate-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2.5 text-sm font-bold transition-colors shadow-sm disabled:opacity-60"
            >
              {saving ? "Creating…" : "Create Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
