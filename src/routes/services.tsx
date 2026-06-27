import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2, Globe, Users, Package, BarChart3, Smartphone,
  ArrowRight, Check, ChevronDown, ChevronUp, Zap, Shield, Calendar, MessageSquare, TrendingUp, Search,
} from "lucide-react";
import { useState } from "react";
import { PublicLayout } from "@/components/public-layout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — tapvybe" },
      { name: "description", content: "Explore tapvybe's full suite of services — website creation, CRM, lead management, product catalogues, and more for Indian businesses." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <PublicLayout>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <TechSection />
      <FaqSection />
      <CtaSection />
    </PublicLayout>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-20 md:py-32 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-800/20 via-transparent to-transparent" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 text-xs font-semibold border border-indigo-700/50 mb-6">What We Offer</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Complete digital solutions{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">for every business</span>
        </h1>
        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From a single-page business card site to a full multi-location CRM platform — tapvybe has the tools to make your clients look and perform their best online.
        </p>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: Building2,
    color: "bg-indigo-600",
    lightColor: "bg-indigo-50 text-indigo-600",
    title: "Business Website Creation",
    tagline: "Live in under an hour",
    desc: "Create a complete, mobile-responsive business website with zero coding. Set up the brand, content, and contact details — and it's ready to share with customers.",
    features: ["Mobile-first responsive design", "Google Maps integration", "Social media links & profiles", "Working hours display", "SEO-ready structure", "Custom business URL / slug"],
  },
  {
    icon: Package,
    color: "bg-amber-600",
    lightColor: "bg-amber-50 text-amber-600",
    title: "Product & Service Catalogue",
    tagline: "Showcase beautifully",
    desc: "Give your clients a professional product catalogue that loads fast, looks stunning on mobile, and is updated in seconds — no developer needed.",
    features: ["Photo upload with preview", "Product name, price & description", "Unlimited catalogue entries", "Beautiful grid & card layouts", "WhatsApp share integration", "Client self-service updates"],
  },
  {
    icon: Users,
    color: "bg-emerald-600",
    lightColor: "bg-emerald-50 text-emerald-600",
    title: "Lead & CRM Management",
    tagline: "Never miss an opportunity",
    desc: "Full CRM built into every site. Every inquiry, appointment, and call gets tracked. Manage leads with status tags, notes, and follow-up dates.",
    features: ["Inquiry form on every site", "Lead pipeline with status tracking", "Appointment booking system", "Follow-up date reminders", "Convert inquiries to leads", "Lead source attribution"],
  },
  {
    icon: Smartphone,
    color: "bg-rose-600",
    lightColor: "bg-rose-50 text-rose-600",
    title: "WhatsApp & Click-to-Call",
    tagline: "Convert visitors instantly",
    desc: "One-tap WhatsApp and call buttons on every page. Customers reach your client in one click — no forms, no friction, no lost business.",
    features: ["Pre-filled WhatsApp messages", "Click-to-call integration", "WhatsApp share button", "Multiple contact options", "Inquiry form with auto-notify", "Contact card download"],
  },
  {
    icon: BarChart3,
    color: "bg-violet-600",
    lightColor: "bg-violet-50 text-violet-600",
    title: "Analytics & Visit Tracking",
    tagline: "Data-driven decisions",
    desc: "Track how many people visit each site, where they come from, and how they engage. Help your clients understand their digital performance.",
    features: ["Site visit counter", "Lead conversion tracking", "Appointment metrics", "Inquiry response rate", "Monthly performance overview", "Export-ready reports"],
  },
  {
    icon: Search,
    color: "bg-sky-600",
    lightColor: "bg-sky-50 text-sky-600",
    title: "SEO & Discovery Optimization",
    tagline: "Get found on Google",
    desc: "Every site we create is built with SEO best practices — proper meta tags, structured data, fast load times, and mobile-first design that Google rewards.",
    features: ["Auto-generated meta tags", "Structured business schema", "Fast-loading pages (< 2s)", "Mobile-first indexing ready", "Custom page titles & descriptions", "Location-based SEO signals"],
  },
];

function ServicesSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold border border-indigo-100 mb-4">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Six powerful services, one platform</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Every service is included in every plan — no add-ons, no hidden fees.</p>
        </div>
        <div className="space-y-6">
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`grid lg:grid-cols-2 gap-8 items-center rounded-3xl border border-slate-100 p-8 md:p-10 hover:border-indigo-200 hover:shadow-lg transition-all ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
              <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${s.lightColor} text-xs font-bold mb-5`}>
                  <s.icon className="h-3.5 w-3.5" />
                  {s.tagline}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{s.desc}</p>
                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="h-4 w-4 rounded-full bg-emerald-100 grid place-items-center shrink-0">
                        <Check className="h-2.5 w-2.5 text-emerald-600" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`flex items-center justify-center ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className={`h-36 w-36 rounded-3xl ${s.color} grid place-items-center shadow-2xl`}>
                  <s.icon className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROCESS_STEPS = [
  { step: "01", icon: Zap, title: "Quick Onboarding", desc: "Sign up and set up your first business profile in under 10 minutes. We walk you through every field with smart defaults.", color: "from-indigo-500 to-purple-500" },
  { step: "02", icon: Package, title: "Customize Everything", desc: "Add products, gallery photos, contact info, social links, and branding. Your client's identity, perfectly reflected online.", color: "from-amber-500 to-orange-500" },
  { step: "03", icon: Globe, title: "Publish Instantly", desc: "One click and your client's site is live at a shareable URL. Share on WhatsApp, Google, or any platform immediately.", color: "from-emerald-500 to-teal-500" },
  { step: "04", icon: TrendingUp, title: "Track & Optimize", desc: "Monitor visits, leads, and appointments from your dashboard. Help clients understand their digital ROI every month.", color: "from-rose-500 to-pink-500" },
];

function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold border border-emerald-100 mb-4">Our Process</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">How we get you from zero to launch</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">A clear, repeatable process that works for every business type and every agency.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((s) => (
            <div key={s.step} className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <span className="absolute top-5 right-5 text-5xl font-black text-slate-100 select-none">{s.step}</span>
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${s.color} grid place-items-center mb-5 shadow-lg`}>
                <s.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TECH = [
  { name: "React 19", desc: "Blazing fast UI" },
  { name: "TypeScript", desc: "Type-safe & reliable" },
  { name: "Tailwind CSS", desc: "Beautiful design" },
  { name: "TanStack Router", desc: "File-based routing" },
  { name: "Vite", desc: "Instant builds" },
  { name: "Bun", desc: "Ultra-fast runtime" },
];

function TechSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold mb-5">Built on Modern Tech</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">Enterprise technology, startup speed</h2>
            <p className="mt-4 text-slate-600 leading-relaxed text-lg">
              tapvybe is built on the latest web technologies — the same stack used by the world's fastest-growing startups. That means faster sites, fewer bugs, and a platform that scales without limit.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: Zap, label: "Sub-2-second page loads on mobile 3G" },
                { icon: Shield, label: "99.9% uptime with automatic failover" },
                { icon: Calendar, label: "Daily backups and data protection" },
                { icon: MessageSquare, label: "Real-time updates across all devices" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <div className="h-8 w-8 rounded-xl bg-indigo-100 grid place-items-center shrink-0">
                    <p.icon className="h-4 w-4 text-indigo-600" />
                  </div>
                  {p.label}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {TECH.map((t) => (
              <div key={t.name} className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group">
                <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 grid place-items-center mx-auto mb-3 group-hover:border-indigo-200 transition-colors">
                  <span className="text-sm font-black text-indigo-600">{t.name[0]}</span>
                </div>
                <p className="text-xs font-bold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "How quickly can I get a client website live?",
    a: "Most agencies get their first client site live within 30–45 minutes of signing up. Once you're familiar with the platform, new sites take under 10 minutes from start to publish.",
  },
  {
    q: "Can clients edit their own websites?",
    a: "Yes. Each client gets their own login to update their profile, products, gallery, and contact info. They don't need any technical skills — it's designed to be as simple as filling a form.",
  },
  {
    q: "Do I need to be a developer to use tapvybe?",
    a: "Absolutely not. tapvybe is built for agency owners, marketing professionals, and business consultants — not developers. If you can use WhatsApp, you can use tapvybe.",
  },
  {
    q: "Can I manage multiple clients from one account?",
    a: "Yes. The Super Admin dashboard lets you manage all your client businesses from one place — see all sites, edit any client, track leads, and control plan expiry.",
  },
  {
    q: "What happens when a client's plan expires?",
    a: "You control this. Set the number of days for each client's plan. When it expires, their site shows an 'expired' message. You can renew in one click from the admin panel.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — every plan comes with a 14-day free trial. No credit card required. Create up to 3 client sites and explore all features before you decide to subscribe.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold border border-amber-100 mb-4">FAQs</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Common questions answered</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
              >
                {f.q}
                {open === i ? <ChevronUp className="h-4 w-4 shrink-0 text-indigo-600" /> : <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />}
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Ready to get your first client live?</h2>
        <p className="mt-5 text-lg text-indigo-200 max-w-xl mx-auto">Start your free trial today. No credit card. No commitment. Full access to all features.</p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold bg-white text-indigo-700 rounded-2xl hover:bg-indigo-50 shadow-xl transition-all hover:-translate-y-0.5">
            Start Free Trial <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/about" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold border-2 border-white/30 text-white rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-0.5">
            Learn About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
