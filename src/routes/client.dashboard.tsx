import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { store, session, isExpired, daysLeft, newId, slugify, type Business, type Product, type GalleryItem, type Lead } from "@/lib/store";
import { LogOut, ExternalLink, Save, Trash2, Plus, BarChart3, MessageSquare, Calendar, Users as UsersIcon, Image as ImgIcon, Package, Settings as SettingsIcon, Phone, TrendingUp, Globe, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/client/dashboard")({
  head: () => ({ meta: [{ title: "Client Dashboard" }] }),
  component: ClientDash,
});

type Tab = "overview" | "profile" | "contact" | "products" | "gallery" | "inquiries" | "appointments" | "leads" | "settings";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-sky-50 text-sky-700 border-sky-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  qualified: "bg-violet-50 text-violet-700 border-violet-200",
  converted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  lost: "bg-rose-50 text-rose-700 border-rose-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-sky-50 text-sky-700 border-sky-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${STATUS_COLORS[status] || "bg-stone-100 text-stone-600 border-stone-200"}`}>
      {status}
    </span>
  );
}

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

  if (!biz) return (
    <div className="min-h-screen grid place-items-center bg-stone-50">
      <div className="text-center space-y-3">
        <div className="h-14 w-14 rounded-2xl bg-amber-100 grid place-items-center mx-auto">
          <Package className="h-7 w-7 text-amber-700" />
        </div>
        <p className="text-stone-500 text-sm font-medium">Loading dashboard…</p>
      </div>
    </div>
  );

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

  const currentTab = tabs.find((t) => t.id === tab);

  return (
    <div className="min-h-screen flex bg-stone-50">
      {/* Sidebar */}
      <aside className="hidden lg:block w-[260px] shrink-0 bg-[#18130E] relative">
        <div className="sticky top-0 h-screen flex flex-col overflow-y-auto">
          {/* Sidebar header */}
          <div className="px-5 py-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              {biz.logo ? (
                <img src={biz.logo} alt="" className="h-10 w-10 rounded-xl object-cover shrink-0 ring-2 ring-white/10" />
              ) : (
                <div className="h-10 w-10 rounded-xl bg-amber-700 text-white grid place-items-center font-bold text-lg shrink-0">
                  {biz.name[0]?.toUpperCase() || "B"}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">{biz.name || "My Business"}</p>
                <p className="text-stone-500 text-xs mt-0.5">Client Panel</p>
              </div>
            </div>
            <div className="mt-4 px-3 py-2.5 rounded-xl bg-white/5 border border-white/8">
              <p className="text-stone-500 text-xs">Plan expires in</p>
              <p className="text-amber-400 font-bold text-sm mt-0.5">{daysLeft(biz)} days remaining</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left group ${
                  tab === t.id
                    ? "bg-[#3D2010] text-amber-300 font-semibold"
                    : "text-stone-400 hover:text-stone-200 hover:bg-white/5"
                }`}
              >
                <t.icon className={`h-4 w-4 shrink-0 ${tab === t.id ? "text-amber-400" : "text-stone-500 group-hover:text-stone-300"}`} />
                <span className="truncate flex-1">{t.label}</span>
                {tab === t.id && <ChevronRight className="h-3.5 w-3.5 text-amber-600 shrink-0" />}
              </button>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="px-3 py-4 border-t border-white/5 space-y-0.5">
            <Link
              to="/site/$slug"
              params={{ slug: biz.slug }}
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-400 hover:text-stone-200 hover:bg-white/5 transition-colors w-full"
            >
              <Globe className="h-4 w-4 text-stone-500" />
              View Live Site
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-400 hover:text-rose-400 hover:bg-white/5 transition-colors w-full"
            >
              <LogOut className="h-4 w-4 text-stone-500" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-stone-200">
          <div className="px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="lg:hidden h-8 w-8 rounded-lg bg-amber-700 text-white grid place-items-center font-bold text-sm shrink-0">
                {biz.name[0]?.toUpperCase() || "B"}
              </div>
              <h2 className="font-bold text-stone-800 truncate">{currentTab?.label}</h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/site/$slug"
                params={{ slug: biz.slug }}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-stone-600 border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors font-medium"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">Live Site</span>
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-stone-600 border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors lg:hidden"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* Mobile nav */}
          <div className="lg:hidden px-4 pb-3 overflow-x-auto">
            <div className="flex gap-1.5 min-w-max">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    tab === t.id ? "bg-[#7B3F1A] text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {tab === "overview" && <Overview biz={biz} />}
          {tab === "profile" && <ProfileTab biz={biz} save={save} />}
          {tab === "contact" && <ContactTab biz={biz} save={save} />}
          {tab === "products" && <ProductsTab biz={biz} save={save} />}
          {tab === "gallery" && <GalleryTab biz={biz} save={save} />}
          {tab === "inquiries" && <InquiriesTab biz={biz} save={save} />}
          {tab === "appointments" && <AppointmentsTab biz={biz} save={save} />}
          {tab === "leads" && <LeadsTab biz={biz} save={save} />}
          {tab === "settings" && <SettingsTab biz={biz} save={save} />}
        </main>
      </div>
    </div>
  );
}

function Card({ children, title, subtitle, action }: { children: React.ReactNode; title?: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-semibold text-stone-800">{title}</h2>
            {subtitle && <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}

function SaveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-[#7B3F1A] hover:bg-[#6A3416] text-white rounded-xl font-semibold transition-colors"
    >
      <Save className="h-4 w-4" />
      Save Changes
    </button>
  );
}

function Field({ label, value, onChange, type = "text", textarea = false, placeholder }: any) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">{label}</span>
      {textarea ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-600 resize-none transition-colors"
        />
      ) : (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-600 transition-colors"
        />
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
      {label && <span className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">{label}</span>}
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt="" className="h-16 w-16 rounded-xl object-cover border border-stone-200 shadow-sm" />
        ) : (
          <div className="h-16 w-16 rounded-xl bg-stone-100 border-2 border-dashed border-stone-300 grid place-items-center">
            <ImgIcon className="h-5 w-5 text-stone-400" />
          </div>
        )}
        <div className="space-y-1.5">
          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-stone-300 rounded-xl hover:bg-stone-50 font-medium text-stone-600 transition-colors">
            Upload Photo
            <input type="file" accept="image/*" onChange={pick} className="hidden" />
          </label>
          {value && (
            <button onClick={() => onChange("")} className="block text-xs text-rose-500 hover:text-rose-600 font-medium transition-colors">
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle?: string }) {
  return (
    <div className="py-12 text-center">
      <div className="h-12 w-12 rounded-2xl bg-stone-100 grid place-items-center mx-auto mb-3">
        <Icon className="h-6 w-6 text-stone-400" />
      </div>
      <p className="text-stone-600 font-medium text-sm">{title}</p>
      {subtitle && <p className="text-xs text-stone-400 mt-1">{subtitle}</p>}
    </div>
  );
}

function Overview({ biz }: { biz: Business }) {
  const stats = [
    { label: "Site Visits", value: biz.visits || 0, icon: TrendingUp, bg: "bg-blue-50", iconColor: "text-blue-600", numColor: "text-blue-700" },
    { label: "Inquiries", value: biz.inquiries.length, icon: MessageSquare, bg: "bg-violet-50", iconColor: "text-violet-600", numColor: "text-violet-700" },
    { label: "Appointments", value: biz.appointments.length, icon: Calendar, bg: "bg-emerald-50", iconColor: "text-emerald-600", numColor: "text-emerald-700" },
    { label: "Leads", value: biz.leads.length, icon: UsersIcon, bg: "bg-amber-50", iconColor: "text-amber-700", numColor: "text-amber-800" },
  ];
  const recent = [...biz.inquiries].slice(-5).reverse();

  return (
    <div className="space-y-6">
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

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100">
          <h2 className="font-semibold text-stone-800">Recent Inquiries</h2>
          <p className="text-xs text-stone-500 mt-0.5">Latest messages from your customers</p>
        </div>
        {recent.length === 0 ? (
          <div className="p-6">
            <EmptyState icon={MessageSquare} title="No inquiries yet" subtitle="Customer inquiries from your site will appear here" />
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {recent.map((i) => (
              <div key={i.id} className="px-6 py-4 hover:bg-stone-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-violet-100 text-violet-700 grid place-items-center font-bold text-sm shrink-0 mt-0.5">
                    {i.name[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm text-stone-800">{i.name} <span className="text-stone-400 font-normal">· {i.phone}</span></p>
                      <p className="text-xs text-stone-400 shrink-0">{new Date(i.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-stone-600 mt-0.5 line-clamp-2">{i.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileTab({ biz, save }: { biz: Business; save: (b: Business) => void }) {
  const [d, setD] = useState(biz);
  useEffect(() => setD(biz), [biz.id]);
  return (
    <Card title="Business Profile" subtitle="Your public-facing business information" action={<SaveBtn onClick={() => save(d)} />}>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Business Name" value={d.name} onChange={(v: string) => setD({ ...d, name: v })} />
        <Field label="Category" value={d.category} onChange={(v: string) => setD({ ...d, category: v })} placeholder="e.g. Restaurant, Salon, Retail…" />
        <div className="md:col-span-2">
          <Field label="Tagline" value={d.tagline} onChange={(v: string) => setD({ ...d, tagline: v })} placeholder="One-line description of your business" />
        </div>
        <div className="md:col-span-2">
          <Field label="About" value={d.about} onChange={(v: string) => setD({ ...d, about: v })} textarea />
        </div>
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
    <Card title="Contact & Links" subtitle="How customers can reach you" action={<SaveBtn onClick={() => save(d)} />}>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Phone" value={d.phone} onChange={(v: string) => setD({ ...d, phone: v })} placeholder="+91XXXXXXXXXX" />
        <Field label="WhatsApp Number" value={d.whatsapp} onChange={(v: string) => setD({ ...d, whatsapp: v })} placeholder="+91XXXXXXXXXX (with country code)" />
        <Field label="Email" value={d.email} onChange={(v: string) => setD({ ...d, email: v })} type="email" />
        <Field label="Address" value={d.address} onChange={(v: string) => setD({ ...d, address: v })} />
        <Field label="Google Maps Link" value={d.mapsLink} onChange={(v: string) => setD({ ...d, mapsLink: v })} placeholder="https://maps.google.com/…" />
        <Field label="Website Link" value={d.websiteLink} onChange={(v: string) => setD({ ...d, websiteLink: v })} />
        <Field label="Google Review Link" value={d.googleReviewLink} onChange={(v: string) => setD({ ...d, googleReviewLink: v })} />
        <Field label="UPI ID (for QR)" value={d.upiId} onChange={(v: string) => setD({ ...d, upiId: v })} placeholder="yourname@upi" />
        <ImagePicker label="Payment QR Image" value={d.paymentQr} onChange={(v) => setD({ ...d, paymentQr: v })} />
        <div className="md:col-span-2 pt-5 border-t border-stone-100">
          <h3 className="font-semibold text-stone-700 mb-4">Social Media Links</h3>
          <div className="grid md:grid-cols-2 gap-5">
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
    <Card
      title="Product Catalogue"
      subtitle={`${items.length} product${items.length !== 1 ? "s" : ""}`}
      action={
        <div className="flex gap-2">
          <button onClick={add} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-stone-300 rounded-xl hover:bg-stone-50 font-medium text-stone-600 transition-colors">
            <Plus className="h-4 w-4" /> Add Product
          </button>
          <button onClick={() => save({ ...biz, products: items })} className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-[#7B3F1A] hover:bg-[#6A3416] text-white rounded-xl font-semibold transition-colors">
            <Save className="h-4 w-4" /> Save
          </button>
        </div>
      }
    >
      {items.length === 0 ? (
        <EmptyState icon={Package} title="No products yet" subtitle='Click "Add Product" to add your first item' />
      ) : (
        <div className="space-y-4">
          {items.map((p, i) => (
            <div key={p.id} className="border border-stone-200 rounded-2xl p-4 grid md:grid-cols-[88px_1fr_auto] gap-4 items-start bg-stone-50/50">
              <ImagePicker label="" value={p.image} onChange={(v) => update(i, { ...p, image: v })} />
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Name" value={p.name} onChange={(v: string) => update(i, { ...p, name: v })} />
                <Field label="Price" value={p.price} onChange={(v: string) => update(i, { ...p, price: v })} placeholder="e.g. ₹999" />
                <div className="sm:col-span-2">
                  <Field label="Description" value={p.description} onChange={(v: string) => update(i, { ...p, description: v })} textarea />
                </div>
              </div>
              <button onClick={() => del(i)} className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200">
                <Trash2 className="h-4 w-4" />
              </button>
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
    <Card
      title="Gallery"
      subtitle={`${items.length} image${items.length !== 1 ? "s" : ""}`}
      action={
        <div className="flex gap-2">
          <button onClick={add} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-stone-300 rounded-xl hover:bg-stone-50 font-medium text-stone-600 transition-colors">
            <Plus className="h-4 w-4" /> Add Image
          </button>
          <button onClick={() => save({ ...biz, gallery: items })} className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-[#7B3F1A] hover:bg-[#6A3416] text-white rounded-xl font-semibold transition-colors">
            <Save className="h-4 w-4" /> Save
          </button>
        </div>
      }
    >
      {items.length === 0 ? (
        <EmptyState icon={ImgIcon} title="No gallery images yet" subtitle='Click "Add Image" to upload photos' />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((g, i) => (
            <div key={g.id} className="border border-stone-200 rounded-2xl p-4 space-y-3 bg-stone-50/50">
              <ImagePicker label="Photo" value={g.image} onChange={(v) => update(i, { ...g, image: v })} />
              <Field label="Caption" value={g.caption} onChange={(v: string) => update(i, { ...g, caption: v })} />
              <button onClick={() => del(i)} className="text-xs text-rose-500 hover:text-rose-600 font-medium transition-colors">
                Delete photo
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function InquiriesTab({ biz, save }: { biz: Business; save: (b: Business) => void }) {
  return (
    <Card title="Inquiries" subtitle={`${biz.inquiries.length} total inquiries`}>
      {biz.inquiries.length === 0 ? (
        <EmptyState icon={MessageSquare} title="No inquiries yet" subtitle="Customer messages from your site will appear here" />
      ) : (
        <div className="divide-y divide-stone-100 -mx-6 -mb-6">
          {[...biz.inquiries].reverse().map((i) => (
            <div key={i.id} className="px-6 py-4 hover:bg-stone-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-xl bg-violet-100 text-violet-700 grid place-items-center font-bold text-sm shrink-0 mt-0.5">
                    {i.name[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-stone-800">{i.name}</p>
                    <p className="text-xs text-stone-500">{i.phone} {i.email && `· ${i.email}`}</p>
                    <p className="text-sm text-stone-700 mt-1">{i.message}</p>
                    <p className="text-xs text-stone-400 mt-1">{new Date(i.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      const lead: Lead = { id: newId(), name: i.name, phone: i.phone, email: i.email, source: "Inquiry", status: "new", notes: i.message, followUpDate: "", createdAt: new Date().toISOString() };
                      save({ ...biz, leads: [...biz.leads, lead] });
                      alert("Added to leads");
                    }}
                    className="text-xs px-2.5 py-1.5 border border-amber-300 text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 font-medium transition-colors"
                  >
                    → Lead
                  </button>
                  <button
                    onClick={() => save({ ...biz, inquiries: biz.inquiries.filter((x) => x.id !== i.id) })}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function AppointmentsTab({ biz, save }: { biz: Business; save: (b: Business) => void }) {
  return (
    <Card title="Appointments" subtitle={`${biz.appointments.length} total appointments`}>
      {biz.appointments.length === 0 ? (
        <EmptyState icon={Calendar} title="No appointments yet" subtitle="Customer bookings will appear here" />
      ) : (
        <div className="divide-y divide-stone-100 -mx-6 -mb-6">
          {[...biz.appointments].reverse().map((a) => (
            <div key={a.id} className="px-6 py-4 hover:bg-stone-50 transition-colors">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center font-bold text-sm shrink-0">
                    {a.name[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-stone-800">{a.name} <span className="text-stone-400 font-normal">· {a.service}</span></p>
                    <p className="text-xs text-stone-500">{a.phone}</p>
                    <p className="text-sm text-stone-700 mt-0.5">{a.date} at {a.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={a.status} />
                  <select
                    value={a.status}
                    onChange={(e) => save({ ...biz, appointments: biz.appointments.map((x) => x.id === a.id ? { ...x, status: e.target.value as any } : x) })}
                    className="text-xs border border-stone-300 rounded-xl px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/25"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => save({ ...biz, appointments: biz.appointments.filter((x) => x.id !== a.id) })}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function LeadsTab({ biz, save }: { biz: Business; save: (b: Business) => void }) {
  const [adding, setAdding] = useState(false);
  return (
    <Card
      title="Leads / CRM"
      subtitle={`${biz.leads.length} total leads`}
      action={
        <button onClick={() => setAdding(true)} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-stone-300 rounded-xl hover:bg-stone-50 font-medium text-stone-600 transition-colors">
          <Plus className="h-4 w-4" /> Add Lead
        </button>
      }
    >
      {adding && (
        <div className="mb-5">
          <AddLeadForm onCancel={() => setAdding(false)} onAdd={(l) => { save({ ...biz, leads: [...biz.leads, l] }); setAdding(false); }} />
        </div>
      )}
      {biz.leads.length === 0 && !adding ? (
        <EmptyState icon={UsersIcon} title="No leads yet" subtitle="Add leads manually or convert inquiries" />
      ) : biz.leads.length > 0 ? (
        <div className="overflow-x-auto -mx-6 -mb-6">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-stone-50 border-y border-stone-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Contact</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Follow-up</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[...biz.leads].reverse().map((l) => (
                <tr key={l.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-xl bg-amber-100 text-amber-800 grid place-items-center font-bold text-xs shrink-0">
                        {l.name[0]?.toUpperCase() || "?"}
                      </div>
                      <span className="font-semibold text-stone-800">{l.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-600">
                    <p>{l.phone}</p>
                    {l.email && <p className="text-xs text-stone-400">{l.email}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1.5">
                      <StatusBadge status={l.status} />
                      <select
                        value={l.status}
                        onChange={(e) => save({ ...biz, leads: biz.leads.map((x) => x.id === l.id ? { ...x, status: e.target.value as any } : x) })}
                        className="block text-xs border border-stone-300 rounded-lg px-2 py-1 bg-white focus:outline-none"
                      >
                        {["new", "contacted", "qualified", "converted", "lost"].map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="date"
                      value={l.followUpDate}
                      onChange={(e) => save({ ...biz, leads: biz.leads.map((x) => x.id === l.id ? { ...x, followUpDate: e.target.value } : x) })}
                      className="text-xs border border-stone-300 rounded-xl px-3 py-1.5 bg-white focus:outline-none"
                    />
                  </td>
                  <td className="px-6 py-4 text-xs text-stone-500 max-w-[180px] truncate">{l.notes}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => save({ ...biz, leads: biz.leads.filter((x) => x.id !== l.id) })} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </Card>
  );
}

function AddLeadForm({ onAdd, onCancel }: { onAdd: (l: Lead) => void; onCancel: () => void }) {
  const [l, setL] = useState<Lead>({ id: newId(), name: "", phone: "", email: "", source: "Manual", status: "new", notes: "", followUpDate: "", createdAt: new Date().toISOString() });
  return (
    <div className="border border-amber-200 bg-amber-50/50 rounded-2xl p-5 grid sm:grid-cols-2 gap-4">
      <p className="sm:col-span-2 font-semibold text-stone-700 text-sm">New Lead</p>
      <Field label="Name" value={l.name} onChange={(v: string) => setL({ ...l, name: v })} />
      <Field label="Phone" value={l.phone} onChange={(v: string) => setL({ ...l, phone: v })} />
      <Field label="Email" value={l.email} onChange={(v: string) => setL({ ...l, email: v })} />
      <Field label="Source" value={l.source} onChange={(v: string) => setL({ ...l, source: v })} />
      <div className="sm:col-span-2">
        <Field label="Notes" value={l.notes} onChange={(v: string) => setL({ ...l, notes: v })} textarea />
      </div>
      <div className="sm:col-span-2 flex gap-2 justify-end">
        <button onClick={onCancel} className="px-4 py-2 text-sm border border-stone-300 rounded-xl text-stone-600 hover:bg-stone-50 font-medium transition-colors">
          Cancel
        </button>
        <button onClick={() => l.name && onAdd(l)} className="px-4 py-2 text-sm bg-[#7B3F1A] hover:bg-[#6A3416] text-white rounded-xl font-semibold transition-colors">
          Add Lead
        </button>
      </div>
    </div>
  );
}

function SettingsTab({ biz, save }: { biz: Business; save: (b: Business) => void }) {
  const [d, setD] = useState(biz);
  useEffect(() => setD(biz), [biz.id]);
  return (
    <Card title="Site Settings" subtitle="Customize your public site" action={<SaveBtn onClick={() => save({ ...d, slug: slugify(d.slug) || biz.slug })} />}>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Site URL Slug" value={d.slug} onChange={(v: string) => setD({ ...d, slug: v })} />
        <div>
          <span className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Theme Color</span>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={d.theme.primary}
              onChange={(e) => setD({ ...d, theme: { primary: e.target.value } })}
              className="h-11 w-16 border border-stone-300 rounded-xl cursor-pointer"
            />
            <span className="text-sm text-stone-600 font-mono">{d.theme.primary}</span>
          </div>
        </div>
        <div className="md:col-span-2 p-4 bg-stone-50 border border-stone-200 rounded-2xl">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Your Live Site URL</p>
          <p className="text-sm text-amber-700 font-medium break-all">
            {typeof window !== "undefined" ? `${window.location.origin}/site/${biz.slug}` : `/site/${biz.slug}`}
          </p>
        </div>
      </div>
    </Card>
  );
}
