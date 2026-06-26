import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { store, session, emptyBusiness, isExpired, daysLeft, type Business } from "@/lib/store";
import { LogOut, Plus, Trash2, ExternalLink, Edit3, Copy, Check, Shield, TrendingUp, Users, Globe, AlertCircle, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/super-admin/dashboard")({
  head: () => ({ meta: [{ title: "Super Admin" }] }),
  component: SuperDash,
});

function SuperDash() {
  const navigate = useNavigate();
  const [list, setList] = useState<Business[]>([]);
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState("");

  useEffect(() => {
    const s = session.get();
    if (!s || s.kind !== "super") {
      navigate({ to: "/super-admin/login" });
      return;
    }
    refresh();
    const h = () => refresh();
    window.addEventListener("biz:update", h);
    return () => window.removeEventListener("biz:update", h);
  }, [navigate]);

  function refresh() {
    setList([...store.all()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  }

  function logout() {
    session.clear();
    navigate({ to: "/" });
  }

  const totalVisits = list.reduce((s, b) => s + (b.visits || 0), 0);
  const activeCount = list.filter((b) => !isExpired(b)).length;
  const expiredCount = list.filter((b) => isExpired(b)).length;

  const stats = [
    { label: "Total Clients", value: list.length, icon: Users, bg: "bg-blue-50", iconColor: "text-blue-600", numColor: "text-blue-700" },
    { label: "Active", value: activeCount, icon: CheckCircle, bg: "bg-emerald-50", iconColor: "text-emerald-600", numColor: "text-emerald-700" },
    { label: "Expired", value: expiredCount, icon: AlertCircle, bg: "bg-rose-50", iconColor: "text-rose-500", numColor: "text-rose-600" },
    { label: "Total Visits", value: totalVisits, icon: TrendingUp, bg: "bg-amber-50", iconColor: "text-amber-700", numColor: "text-amber-800" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-[#18130E] sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-700 text-white grid place-items-center shrink-0">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base leading-tight">Super Admin</h1>
              <p className="text-stone-400 text-xs mt-0.5">Business Management Platform</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/8 hover:bg-white/12 text-stone-300 hover:text-white rounded-xl text-sm border border-white/10 transition-colors font-medium"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
              <div className={`inline-flex items-center justify-center h-11 w-11 rounded-xl ${s.bg} mb-4`}>
                <s.icon className={`h-5 w-5 ${s.iconColor}`} />
              </div>
              <p className={`text-3xl font-bold ${s.numColor}`}>{s.value}</p>
              <p className="text-xs text-stone-500 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Client list */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-stone-800">Client Businesses</h2>
              <p className="text-xs text-stone-500 mt-0.5">{list.length} client{list.length !== 1 ? "s" : ""} registered</p>
            </div>
            <button
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-[#7B3F1A] hover:bg-[#6A3416] text-white rounded-xl font-semibold transition-colors"
            >
              <Plus className="h-4 w-4" />
              New Client
            </button>
          </div>

          {list.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="h-14 w-14 rounded-2xl bg-stone-100 grid place-items-center mx-auto mb-4">
                <Users className="h-7 w-7 text-stone-400" />
              </div>
              <p className="text-stone-700 font-semibold">No clients yet</p>
              <p className="text-sm text-stone-400 mt-1">Click "New Client" to onboard your first business.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[780px]">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-100">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Business</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Login Credentials</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Plan</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Site URL</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {list.map((b) => {
                    const expired = isExpired(b);
                    const remaining = daysLeft(b);
                    return (
                      <tr key={b.id} className="hover:bg-stone-50/80 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-amber-100 text-amber-800 grid place-items-center font-bold text-sm shrink-0">
                              {b.name[0]?.toUpperCase() || "B"}
                            </div>
                            <div>
                              <p className="font-semibold text-stone-900">{b.name}</p>
                              <p className="text-xs text-stone-400">{b.category || "Business"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-mono text-xs bg-stone-100 text-stone-700 px-2 py-1 rounded-lg">{b.username}</span>
                            <span className="text-stone-300 text-xs">/</span>
                            <span className="font-mono text-xs bg-stone-100 text-stone-700 px-2 py-1 rounded-lg">{b.password}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-stone-800">{b.planDays}d total</p>
                          <p className={`text-xs mt-0.5 font-medium ${expired ? "text-rose-500" : remaining <= 7 ? "text-amber-600" : "text-stone-400"}`}>
                            {expired ? "Expired" : `${remaining}d left`}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            expired
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${expired ? "bg-rose-500" : "bg-emerald-500"}`} />
                            {expired ? "Expired" : "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(window.location.origin + `/site/${b.slug}`);
                              setCopiedId(b.id);
                              setTimeout(() => setCopiedId(""), 1500);
                            }}
                            className="inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-900 transition-colors text-xs font-medium group/copy"
                          >
                            {copiedId === b.id ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                            <span className="font-mono">/site/{b.slug}</span>
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 justify-end">
                            <Link
                              to="/site/$slug"
                              params={{ slug: b.slug }}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs border border-stone-300 rounded-xl hover:bg-stone-50 text-stone-600 transition-colors font-medium"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View
                            </Link>
                            <button
                              onClick={() => { session.set({ kind: "client", businessId: b.id }); navigate({ to: "/client/dashboard" }); }}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs border border-stone-300 rounded-xl hover:bg-stone-50 text-stone-600 transition-colors font-medium"
                            >
                              <Edit3 className="h-3 w-3" />
                              Edit
                            </button>
                            <button
                              onClick={() => { if (confirm("Delete this business and all its data?")) { store.remove(b.id); refresh(); } }}
                              className="inline-flex items-center gap-1 p-1.5 text-xs bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 text-rose-600 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {creating && <CreateModal onClose={() => { setCreating(false); refresh(); }} />}
    </div>
  );
}

function CreateModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [days, setDays] = useState(30);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !username || !password) return;
    const biz = emptyBusiness(name, username, password, days);
    store.upsert(biz);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="px-6 py-5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-amber-100 text-amber-700 grid place-items-center">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-800">Create New Client</h3>
              <p className="text-xs text-stone-500 mt-0.5">Set up a new business account</p>
            </div>
          </div>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <label className="block">
            <span className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Business Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sharma Electronics"
              className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-600 transition-colors"
              required
            />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Client Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. sharma123"
              className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-600 transition-colors"
              required
            />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Client Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a secure password"
              className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-600 transition-colors"
              required
            />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Plan Duration (days)</span>
            <input
              type="number"
              min={1}
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value) || 1)}
              className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-600 transition-colors"
              required
            />
          </label>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-stone-300 rounded-xl py-2.5 text-sm text-stone-600 hover:bg-stone-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#7B3F1A] hover:bg-[#6A3416] text-white rounded-xl py-2.5 text-sm font-bold transition-colors"
            >
              Create Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
