import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { store, session, emptyBusiness, isExpired, daysLeft, type Business } from "@/lib/store";
import { LogOut, Plus, Trash2, ExternalLink, Edit3, Copy, Check } from "lucide-react";

export const Route = createFileRoute("/super-admin/dashboard")({
  head: () => ({ meta: [{ title: "Super Admin Dashboard" }] }),
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

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-slate-900 text-white grid place-items-center font-bold shrink-0">S</div>
            <div className="min-w-0">
              <h1 className="font-bold truncate">Super Admin</h1>
              <p className="text-xs text-slate-500">Manage all client businesses</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-1.5 px-3 py-2 text-sm border rounded-md hover:bg-slate-50">
            <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Total Clients" value={list.length} />
          <Stat label="Active" value={list.filter((b) => !isExpired(b)).length} />
          <Stat label="Expired" value={list.filter((b) => isExpired(b)).length} />
          <Stat label="Total Visits" value={list.reduce((s, b) => s + (b.visits || 0), 0)} />
        </div>

        <div className="bg-white rounded-xl border">
          <div className="p-4 flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-semibold">Client Businesses</h2>
            <button onClick={() => setCreating(true)} className="flex items-center gap-1.5 px-3 py-2 text-sm bg-slate-900 text-white rounded-md hover:bg-slate-800">
              <Plus className="h-4 w-4" /> New Client
            </button>
          </div>
          <div className="border-t overflow-x-auto">
            {list.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-sm">No clients yet. Click "New Client" to create one.</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left p-3">Business</th>
                    <th className="text-left p-3">Login</th>
                    <th className="text-left p-3">Plan</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Site URL</th>
                    <th className="text-right p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((b) => {
                    const expired = isExpired(b);
                    const url = `/site/${b.slug}`;
                    return (
                      <tr key={b.id} className="border-t">
                        <td className="p-3 font-medium">{b.name}</td>
                        <td className="p-3 text-slate-600">{b.username} / {b.password}</td>
                        <td className="p-3">{b.planDays}d • {daysLeft(b)}d left</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${expired ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                            {expired ? "Expired" : "Active"}
                          </span>
                        </td>
                        <td className="p-3">
                          <button onClick={() => { navigator.clipboard.writeText(window.location.origin + url); setCopiedId(b.id); setTimeout(() => setCopiedId(""), 1500); }} className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                            {copiedId === b.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {b.slug}
                          </button>
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <Link to="/site/$slug" params={{ slug: b.slug }} className="inline-flex items-center gap-1 px-2 py-1 text-xs border rounded hover:bg-slate-50 mr-1">
                            <ExternalLink className="h-3 w-3" /> View
                          </Link>
                          <button onClick={() => { session.set({ kind: "client", businessId: b.id }); navigate({ to: "/client/dashboard" }); }} className="inline-flex items-center gap-1 px-2 py-1 text-xs border rounded hover:bg-slate-50 mr-1">
                            <Edit3 className="h-3 w-3" /> Edit
                          </button>
                          <button onClick={() => { if (confirm("Delete this business?")) store.remove(b.id); }} className="inline-flex items-center gap-1 px-2 py-1 text-xs border border-red-200 text-red-600 rounded hover:bg-red-50">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {creating && <CreateModal onClose={() => setCreating(false)} />}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl border p-4">
      <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
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
    <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl w-full max-w-md p-6">
        <h3 className="text-lg font-bold mb-4">Create New Client</h3>
        <form onSubmit={submit} className="space-y-3">
          <label className="block">
            <span className="text-xs font-medium text-slate-600">Business Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-md px-3 py-2 mt-1" required />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-600">Client Username</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border rounded-md px-3 py-2 mt-1" required />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-600">Client Password</span>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-md px-3 py-2 mt-1" required />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-600">Plan Duration (days)</span>
            <input type="number" min={1} value={days} onChange={(e) => setDays(parseInt(e.target.value) || 1)} className="w-full border rounded-md px-3 py-2 mt-1" required />
          </label>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border rounded-md py-2 text-sm">Cancel</button>
            <button className="flex-1 bg-slate-900 text-white rounded-md py-2 text-sm font-semibold">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
