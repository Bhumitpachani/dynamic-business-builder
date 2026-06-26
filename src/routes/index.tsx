import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Shield, Users, Globe, Smartphone, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BizPlatform — Dynamic Business Websites" },
      { name: "description", content: "Create professional, mobile-responsive business websites in minutes. Multi-tenant SaaS for digital agencies." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 grid place-items-center text-white font-bold">B</div>
            <span className="font-bold text-lg">BizPlatform</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/client/login" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-slate-100">Client Login</Link>
            <Link to="/super-admin/login" className="text-sm font-medium px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800">Super Admin</Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-6">Multi-Tenant Business Website Platform</span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Launch dynamic business websites <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">in minutes, not weeks.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
          A complete platform for digital agencies. Create client websites, manage plans, track leads, and let clients edit their own content.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/super-admin/login" className="px-6 py-3 rounded-md bg-slate-900 text-white font-semibold hover:bg-slate-800">Super Admin Dashboard</Link>
          <Link to="/client/login" className="px-6 py-3 rounded-md border border-slate-300 font-semibold hover:bg-slate-50">Client Login</Link>
        </div>
        <p className="mt-4 text-xs text-slate-500">Super Admin demo: <code className="bg-slate-100 px-1.5 py-0.5 rounded">admin / 123</code></p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-10">Everything your clients need</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-slate-200 p-5 bg-white hover:shadow-md transition">
              <f.icon className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} BizPlatform. Built for agencies.
      </footer>
    </div>
  );
}

const features = [
  { icon: Building2, title: "Business Profile", desc: "Logo, tagline, hours, address — all editable by your client." },
  { icon: Smartphone, title: "WhatsApp & Call", desc: "One-tap WhatsApp chat and call buttons on every site." },
  { icon: Globe, title: "Maps & Social", desc: "Google Maps, website, and all social media links." },
  { icon: Zap, title: "Catalogue & Gallery", desc: "Showcase products and photos professionally." },
  { icon: Users, title: "Leads & CRM", desc: "Inquiry forms, appointments, lead tracking, follow-ups." },
  { icon: Shield, title: "Plan Expiry Control", desc: "Set days plan per client — site auto-disables on expiry." },
];
