import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { store, session, isExpired, daysLeft, newId, slugify, type Business, type Product, type GalleryItem, type Lead } from "@/lib/store";
import { LogOut, ExternalLink, Save, Trash2, Plus, BarChart3, MessageSquare, Calendar, Users as UsersIcon, Image as ImgIcon, Package, Settings as SettingsIcon, Phone } from "lucide-react";

export const Route = createFileRoute("/client/dashboard")({
  head: () => ({ meta: [{ title: "Client Dashboard" }] }),
  component: ClientDash,
});

type Tab = "overview" | "profile" | "contact" | "products" | "gallery" | "inquiries" | "appointments" | "leads" | "settings";

function ClientDash() {
  const navigate = useNavigate();
  const [biz, setBiz] = useState<Business | null>(null);
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    const s = session.get();
    if (!s || (s.kind !== "client" && s.kind !== "super")) {
      navigate({ to: "/client/login" });
      return;
    }
    if (s.kind === "client") {
      const b = store.get(s.businessId);
      if (!b) { session.clear(); navigate({ to: "/client/login" }); return; }
      if (isExpired(b)) { session.clear(); navigate({ to: "/client/login" }); return; }
      setBiz(b);
    } else {
      // super admin editing - take the most recent or redirect
      const all = store.all();
      if (all.length === 0) { navigate({ to: "/super-admin/dashboard" }); return; }
      setBiz(all[all.length - 1]);
    }
    const h = () => {
      const cur = session.get();
      if (cur?.kind === "client") {
        const b = store.get(cur.businessId);
        if (b) setBiz(b);
      }
    };
    window.addEventListener("biz:update", h);
    return () => window.removeEventListener("biz:update", h);
  }, [navigate]);

  function save(updated: Business) {
    store.upsert(updated);
    setBiz(updated);
  }
  function logout() {
    const s = session.get();
    session.clear();
    navigate({ to: s?.kind === "super" ? "/super-admin/dashboard" : "/" });
  }

  if (!biz) return <div className="min-h-screen grid place-items-center text-slate-500">Loading…</div>;

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "profile", label: "Business Profile", icon: SettingsIcon },
    { id: "contact", label: "Contact & Links", icon: Phone },
    { id: "products", label: "Products", icon: Package },
    { id: "gallery", label: "Gallery", icon: ImgIcon },
    { id: "inquiries", label: "Inquiries", icon: MessageSquare },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "leads", label: "Leads / CRM", icon: UsersIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-blue-600 text-white grid place-items-center font-bold shrink-0">{biz.name[0]?.toUpperCase() || "B"}</div>
            <div className="min-w-0">
              <h1 className="font-bold truncate">{biz.name || "My Business"}</h1>
              <p className="text-xs text-slate-500">{daysLeft(biz)} days left on plan</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/site/$slug" params={{ slug: biz.slug }} target="_blank" className="flex items-center gap-1.5 px-3 py-2 text-sm border rounded-md hover:bg-slate-50">
              <ExternalLink className="h-4 w-4" /> <span className="hidden sm:inline">View Site</span>
            </Link>
            <button onClick={logout} className="flex items-center gap-1.5 px-3 py-2 text-sm border rounded-md hover:bg-slate-50">
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        <nav className="bg-white rounded-xl border p-2 h-fit lg:sticky lg:top-20 overflow-x-auto">
          <ul className="flex lg:flex-col gap-1 min-w-max lg:min-w-0">
            {tabs.map((t) => (
              <li key={t.id}>
                <button onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm w-full text-left whitespace-nowrap ${tab === t.id ? "bg-blue-50 text-blue-700 font-semibold" : "hover:bg-slate-50 text-slate-700"}`}>
                  <t.icon className="h-4 w-4 shrink-0" /> {t.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          {tab === "overview" && <Overview biz={biz} />}
          {tab === "profile" && <ProfileTab biz={biz} save={save} />}
          {tab === "contact" && <ContactTab biz={biz} save={save} />}
          {tab === "products" && <ProductsTab biz={biz} save={save} />}
          {tab === "gallery" && <GalleryTab biz={biz} save={save} />}
          {tab === "inquiries" && <InquiriesTab biz={biz} save={save} />}
          {tab === "appointments" && <AppointmentsTab biz={biz} save={save} />}
          {tab === "leads" && <LeadsTab biz={biz} save={save} />}
          {tab === "settings" && <SettingsTab biz={biz} save={save} />}
        </div>
      </div>
    </div>
  );
}

function Card({ children, title, action }: any) {
  return (
    <div className="bg-white rounded-xl border">
      {title && (
        <div className="p-4 border-b flex items-center justify-between flex-wrap gap-2">
          <h2 className="font-semibold">{title}</h2>
          {action}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", textarea = false, placeholder }: any) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      {textarea ? (
        <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
      ) : (
        <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
      )}
    </label>
  );
}

function ImagePicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  }
  return (
    <div>
      <span className="text-xs font-medium text-slate-600 block mb-1">{label}</span>
      <div className="flex items-center gap-3">
        {value && <img src={value} alt="" className="h-16 w-16 rounded-md object-cover border" />}
        <label className="cursor-pointer px-3 py-2 text-sm border rounded-md hover:bg-slate-50">
          Upload
          <input type="file" accept="image/*" onChange={pick} className="hidden" />
        </label>
        {value && <button onClick={() => onChange("")} className="text-xs text-red-600">Remove</button>}
      </div>
    </div>
  );
}

function Overview({ biz }: { biz: Business }) {
  const stats = [
    { label: "Site Visits", value: biz.visits || 0 },
    { label: "Inquiries", value: biz.inquiries.length },
    { label: "Appointments", value: biz.appointments.length },
    { label: "Leads", value: biz.leads.length },
  ];
  const recent = [...biz.inquiries].slice(-5).reverse();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</p>
            <p className="text-2xl font-bold mt-1">{s.value}</p>
          </div>
        ))}
      </div>
      <Card title="Recent Inquiries">
        {recent.length === 0 ? (
          <p className="text-sm text-slate-500">No inquiries yet.</p>
        ) : (
          <ul className="divide-y">
            {recent.map((i) => (
              <li key={i.id} className="py-3 text-sm">
                <p className="font-medium">{i.name} <span className="text-slate-400 font-normal">· {i.phone}</span></p>
                <p className="text-slate-600">{i.message}</p>
                <p className="text-xs text-slate-400 mt-1">{new Date(i.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function ProfileTab({ biz, save }: { biz: Business; save: (b: Business) => void }) {
  const [d, setD] = useState(biz);
  useEffect(() => setD(biz), [biz.id]);
  return (
    <Card title="Business Profile" action={<button onClick={() => save(d)} className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"><Save className="h-4 w-4" /> Save</button>}>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Business Name" value={d.name} onChange={(v: string) => setD({ ...d, name: v })} />
        <Field label="Category (e.g., Restaurant)" value={d.category} onChange={(v: string) => setD({ ...d, category: v })} />
        <div className="md:col-span-2"><Field label="Tagline" value={d.tagline} onChange={(v: string) => setD({ ...d, tagline: v })} placeholder="One-line description" /></div>
        <div className="md:col-span-2"><Field label="About" value={d.about} onChange={(v: string) => setD({ ...d, about: v })} textarea /></div>
        <ImagePicker label="Logo" value={d.logo} onChange={(v) => setD({ ...d, logo: v })} />
        <ImagePicker label="Cover Image" value={d.coverImage} onChange={(v) => setD({ ...d, coverImage: v })} />
      </div>
    </Card>
  );
}

function ContactTab({ biz, save }: { biz: Business; save: (b: Business) => void }) {
  const [d, setD] = useState(biz);
  useEffect(() => setD(biz), [biz.id]);
  return (
    <Card title="Contact & Links" action={<button onClick={() => save(d)} className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"><Save className="h-4 w-4" /> Save</button>}>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Phone" value={d.phone} onChange={(v: string) => setD({ ...d, phone: v })} placeholder="+91XXXXXXXXXX" />
        <Field label="WhatsApp Number" value={d.whatsapp} onChange={(v: string) => setD({ ...d, whatsapp: v })} placeholder="+91XXXXXXXXXX (with country code)" />
        <Field label="Email" value={d.email} onChange={(v: string) => setD({ ...d, email: v })} type="email" />
        <Field label="Address" value={d.address} onChange={(v: string) => setD({ ...d, address: v })} />
        <Field label="Google Maps Link" value={d.mapsLink} onChange={(v: string) => setD({ ...d, mapsLink: v })} placeholder="https://maps.google.com/..." />
        <Field label="Website Link" value={d.websiteLink} onChange={(v: string) => setD({ ...d, websiteLink: v })} />
        <Field label="Google Review Link" value={d.googleReviewLink} onChange={(v: string) => setD({ ...d, googleReviewLink: v })} />
        <Field label="UPI ID (for QR)" value={d.upiId} onChange={(v: string) => setD({ ...d, upiId: v })} placeholder="yourname@upi" />
        <ImagePicker label="Payment QR Image" value={d.paymentQr} onChange={(v) => setD({ ...d, paymentQr: v })} />
        <div className="md:col-span-2 pt-4 border-t">
          <h3 className="font-semibold mb-3">Social Media</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Facebook" value={d.social.facebook} onChange={(v: string) => setD({ ...d, social: { ...d.social, facebook: v } })} />
            <Field label="Instagram" value={d.social.instagram} onChange={(v: string) => setD({ ...d, social: { ...d.social, instagram: v } })} />
            <Field label="Twitter / X" value={d.social.twitter} onChange={(v: string) => setD({ ...d, social: { ...d.social, twitter: v } })} />
            <Field label="LinkedIn" value={d.social.linkedin} onChange={(v: string) => setD({ ...d, social: { ...d.social, linkedin: v } })} />
            <Field label="YouTube" value={d.social.youtube} onChange={(v: string) => setD({ ...d, social: { ...d.social, youtube: v } })} />
          </div>
        </div>
      </div>
    </Card>
  );
}

function ProductsTab({ biz, save }: { biz: Business; save: (b: Business) => void }) {
  const [items, setItems] = useState<Product[]>(biz.products);
  useEffect(() => setItems(biz.products), [biz.id]);
  function update(i: number, p: Product) { const next = [...items]; next[i] = p; setItems(next); }
  function add() { setItems([...items, { id: newId(), name: "", description: "", price: "", image: "" }]); }
  function del(i: number) { setItems(items.filter((_, j) => j !== i)); }
  return (
    <Card title="Product Catalogue" action={
      <div className="flex gap-2">
        <button onClick={add} className="flex items-center gap-1.5 px-3 py-2 text-sm border rounded-md hover:bg-slate-50"><Plus className="h-4 w-4" /> Add</button>
        <button onClick={() => save({ ...biz, products: items })} className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"><Save className="h-4 w-4" /> Save</button>
      </div>
    }>
      {items.length === 0 ? <p className="text-sm text-slate-500">No products. Click Add.</p> : (
        <div className="space-y-3">
          {items.map((p, i) => (
            <div key={p.id} className="border rounded-lg p-3 grid md:grid-cols-[80px_1fr_auto] gap-3 items-start">
              <ImagePicker label="" value={p.image} onChange={(v) => update(i, { ...p, image: v })} />
              <div className="grid sm:grid-cols-2 gap-2">
                <Field label="Name" value={p.name} onChange={(v: string) => update(i, { ...p, name: v })} />
                <Field label="Price" value={p.price} onChange={(v: string) => update(i, { ...p, price: v })} />
                <div className="sm:col-span-2"><Field label="Description" value={p.description} onChange={(v: string) => update(i, { ...p, description: v })} textarea /></div>
              </div>
              <button onClick={() => del(i)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function GalleryTab({ biz, save }: { biz: Business; save: (b: Business) => void }) {
  const [items, setItems] = useState<GalleryItem[]>(biz.gallery);
  useEffect(() => setItems(biz.gallery), [biz.id]);
  function update(i: number, g: GalleryItem) { const n = [...items]; n[i] = g; setItems(n); }
  function add() { setItems([...items, { id: newId(), image: "", caption: "" }]); }
  function del(i: number) { setItems(items.filter((_, j) => j !== i)); }
  return (
    <Card title="Gallery" action={
      <div className="flex gap-2">
        <button onClick={add} className="flex items-center gap-1.5 px-3 py-2 text-sm border rounded-md hover:bg-slate-50"><Plus className="h-4 w-4" /> Add</button>
        <button onClick={() => save({ ...biz, gallery: items })} className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"><Save className="h-4 w-4" /> Save</button>
      </div>
    }>
      {items.length === 0 ? <p className="text-sm text-slate-500">No gallery items.</p> : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((g, i) => (
            <div key={g.id} className="border rounded-lg p-3 space-y-2">
              <ImagePicker label="Image" value={g.image} onChange={(v) => update(i, { ...g, image: v })} />
              <Field label="Caption" value={g.caption} onChange={(v: string) => update(i, { ...g, caption: v })} />
              <button onClick={() => del(i)} className="text-xs text-red-600 hover:underline">Delete</button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function InquiriesTab({ biz, save }: { biz: Business; save: (b: Business) => void }) {
  return (
    <Card title={`Inquiries (${biz.inquiries.length})`}>
      {biz.inquiries.length === 0 ? <p className="text-sm text-slate-500">No inquiries yet.</p> : (
        <ul className="divide-y">
          {[...biz.inquiries].reverse().map((i) => (
            <li key={i.id} className="py-3 flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-sm">{i.name}</p>
                <p className="text-xs text-slate-500">{i.phone} · {i.email}</p>
                <p className="text-sm mt-1 text-slate-700">{i.message}</p>
                <p className="text-xs text-slate-400 mt-1">{new Date(i.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => {
                  const lead: Lead = { id: newId(), name: i.name, phone: i.phone, email: i.email, source: "Inquiry", status: "new", notes: i.message, followUpDate: "", createdAt: new Date().toISOString() };
                  save({ ...biz, leads: [...biz.leads, lead] });
                  alert("Added to leads");
                }} className="text-xs px-2 py-1 border rounded hover:bg-slate-50">→ Lead</button>
                <button onClick={() => save({ ...biz, inquiries: biz.inquiries.filter((x) => x.id !== i.id) })} className="text-xs px-2 py-1 border border-red-200 text-red-600 rounded hover:bg-red-50"><Trash2 className="h-3 w-3" /></button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function AppointmentsTab({ biz, save }: { biz: Business; save: (b: Business) => void }) {
  return (
    <Card title={`Appointments (${biz.appointments.length})`}>
      {biz.appointments.length === 0 ? <p className="text-sm text-slate-500">No appointments yet.</p> : (
        <ul className="divide-y">
          {[...biz.appointments].reverse().map((a) => (
            <li key={a.id} className="py-3 flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p className="font-medium text-sm">{a.name} <span className="text-xs text-slate-500 font-normal">· {a.service}</span></p>
                <p className="text-xs text-slate-500">{a.phone}</p>
                <p className="text-sm text-slate-700 mt-1">{a.date} at {a.time}</p>
              </div>
              <div className="flex gap-1 items-center">
                <select value={a.status} onChange={(e) => save({ ...biz, appointments: biz.appointments.map((x) => x.id === a.id ? { ...x, status: e.target.value as any } : x) })} className="text-xs border rounded px-2 py-1">
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button onClick={() => save({ ...biz, appointments: biz.appointments.filter((x) => x.id !== a.id) })} className="text-xs px-2 py-1 border border-red-200 text-red-600 rounded hover:bg-red-50"><Trash2 className="h-3 w-3" /></button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function LeadsTab({ biz, save }: { biz: Business; save: (b: Business) => void }) {
  const [adding, setAdding] = useState(false);
  return (
    <Card title={`Leads / CRM (${biz.leads.length})`} action={<button onClick={() => setAdding(true)} className="flex items-center gap-1.5 px-3 py-2 text-sm border rounded-md hover:bg-slate-50"><Plus className="h-4 w-4" /> Add Lead</button>}>
      {adding && (
        <AddLeadForm onCancel={() => setAdding(false)} onAdd={(l) => { save({ ...biz, leads: [...biz.leads, l] }); setAdding(false); }} />
      )}
      {biz.leads.length === 0 ? <p className="text-sm text-slate-500 mt-3">No leads yet.</p> : (
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm">
            <thead className="text-xs text-slate-500 uppercase">
              <tr><th className="text-left p-2">Name</th><th className="text-left p-2">Contact</th><th className="text-left p-2">Status</th><th className="text-left p-2">Follow-up</th><th className="text-left p-2">Notes</th><th></th></tr>
            </thead>
            <tbody>
              {[...biz.leads].reverse().map((l) => (
                <tr key={l.id} className="border-t">
                  <td className="p-2 font-medium">{l.name}</td>
                  <td className="p-2 text-slate-600">{l.phone}<br /><span className="text-xs">{l.email}</span></td>
                  <td className="p-2">
                    <select value={l.status} onChange={(e) => save({ ...biz, leads: biz.leads.map((x) => x.id === l.id ? { ...x, status: e.target.value as any } : x) })} className="text-xs border rounded px-2 py-1">
                      {["new", "contacted", "qualified", "converted", "lost"].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-2">
                    <input type="date" value={l.followUpDate} onChange={(e) => save({ ...biz, leads: biz.leads.map((x) => x.id === l.id ? { ...x, followUpDate: e.target.value } : x) })} className="text-xs border rounded px-2 py-1" />
                  </td>
                  <td className="p-2 text-xs text-slate-600 max-w-[200px] truncate">{l.notes}</td>
                  <td className="p-2"><button onClick={() => save({ ...biz, leads: biz.leads.filter((x) => x.id !== l.id) })} className="text-red-600"><Trash2 className="h-3.5 w-3.5" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function AddLeadForm({ onAdd, onCancel }: { onAdd: (l: Lead) => void; onCancel: () => void }) {
  const [l, setL] = useState<Lead>({ id: newId(), name: "", phone: "", email: "", source: "Manual", status: "new", notes: "", followUpDate: "", createdAt: new Date().toISOString() });
  return (
    <div className="border rounded-lg p-3 grid sm:grid-cols-2 gap-2 bg-slate-50">
      <Field label="Name" value={l.name} onChange={(v: string) => setL({ ...l, name: v })} />
      <Field label="Phone" value={l.phone} onChange={(v: string) => setL({ ...l, phone: v })} />
      <Field label="Email" value={l.email} onChange={(v: string) => setL({ ...l, email: v })} />
      <Field label="Source" value={l.source} onChange={(v: string) => setL({ ...l, source: v })} />
      <div className="sm:col-span-2"><Field label="Notes" value={l.notes} onChange={(v: string) => setL({ ...l, notes: v })} textarea /></div>
      <div className="sm:col-span-2 flex gap-2 justify-end">
        <button onClick={onCancel} className="px-3 py-2 text-sm border rounded-md">Cancel</button>
        <button onClick={() => l.name && onAdd(l)} className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md">Add Lead</button>
      </div>
    </div>
  );
}

function SettingsTab({ biz, save }: { biz: Business; save: (b: Business) => void }) {
  const [d, setD] = useState(biz);
  useEffect(() => setD(biz), [biz.id]);
  return (
    <Card title="Site Settings" action={<button onClick={() => save({ ...d, slug: slugify(d.slug) || biz.slug })} className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"><Save className="h-4 w-4" /> Save</button>}>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Site URL Slug" value={d.slug} onChange={(v: string) => setD({ ...d, slug: v })} />
        <label className="block">
          <span className="text-xs font-medium text-slate-600">Theme Color</span>
          <input type="color" value={d.theme.primary} onChange={(e) => setD({ ...d, theme: { primary: e.target.value } })} className="w-full h-10 border rounded-md mt-1" />
        </label>
        <div className="md:col-span-2 p-3 bg-slate-50 rounded-md text-sm">
          <p className="font-medium">Your site URL:</p>
          <p className="text-blue-600 break-all">{typeof window !== "undefined" ? `${window.location.origin}/site/${biz.slug}` : `/site/${biz.slug}`}</p>
        </div>
      </div>
    </Card>
  );
}
