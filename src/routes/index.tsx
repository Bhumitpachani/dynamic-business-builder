import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2, Globe, Users, Zap, Shield, Smartphone,
  ArrowRight, Check, Star, BarChart3, Package, Calendar,
  MessageSquare, ChevronRight, TrendingUp, Award, Clock, Target,
} from "lucide-react";
import { PublicLayout } from "@/components/public-layout";

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
    <PublicLayout>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyUsSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
    </PublicLayout>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 pt-16 pb-20 md:pt-24 md:pb-32">
      {/* decorative blobs */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-purple-100/50 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-6 border border-indigo-200">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Trusted by 500+ Businesses
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Launch your{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  business website
                </span>
              </span>{" "}
              in minutes.
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
              A complete platform for digital agencies. Create stunning client websites, manage content, track leads, and grow revenue — all from one powerful dashboard.
            </p>
            <ul className="mt-7 space-y-2.5">
              {["No coding required — publish in minutes", "Clients manage their own content", "Built-in CRM, leads & appointments"].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                  <span className="h-5 w-5 rounded-full bg-emerald-100 grid place-items-center shrink-0">
                    <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
                Start for Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold border-2 border-slate-300 text-slate-700 rounded-2xl hover:border-indigo-400 hover:text-indigo-600 transition-all hover:-translate-y-0.5">
                View Services <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right — dashboard mockup */}
          <div className="hidden lg:block">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rounded-3xl blur-2xl scale-95" />
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top bar */}
        <div className="bg-slate-900 px-5 py-3.5 flex items-center gap-2">
          <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div>
          <div className="flex-1 mx-3 bg-slate-800 rounded-md px-3 py-1 text-xs text-slate-400">bizplatform.in/site/sharma-boutique</div>
        </div>
        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 grid place-items-center text-white font-bold text-lg">S</div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Sharma's Boutique</p>
              <p className="text-xs text-slate-500">Fashion & Lifestyle • Active</p>
            </div>
            <span className="ml-auto text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-semibold">Live</span>
          </div>
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[["2,450", "Visits", "text-indigo-600", "bg-indigo-50"], ["38", "Leads", "text-emerald-600", "bg-emerald-50"], ["₹1.2L", "Revenue", "text-amber-600", "bg-amber-50"]].map(([v, l, tc, bg]) => (
              <div key={l} className={`${bg} rounded-xl p-3 text-center`}>
                <p className={`font-black text-lg ${tc}`}>{v}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{l}</p>
              </div>
            ))}
          </div>
          {/* Products */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Latest Products</p>
            <div className="grid grid-cols-2 gap-2">
              {[["Silk Saree", "₹4,500", "bg-pink-100"], ["Designer Kurti", "₹1,800", "bg-violet-100"]].map(([n, p, bg]) => (
                <div key={n} className={`${bg} rounded-xl p-3`}>
                  <p className="text-xs font-semibold text-slate-800">{n}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{p}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Inquiry */}
          <div className="border border-slate-100 rounded-xl p-3 flex items-center gap-3 bg-slate-50">
            <div className="h-7 w-7 rounded-lg bg-indigo-100 grid place-items-center shrink-0">
              <MessageSquare className="h-3.5 w-3.5 text-indigo-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800">New inquiry from Priya K.</p>
              <p className="text-xs text-slate-500 truncate">Interested in silk saree collection...</p>
            </div>
            <span className="text-xs px-2 py-0.5 bg-sky-100 text-sky-700 rounded-full font-semibold">New</span>
          </div>
        </div>
      </div>
      {/* Floating badge */}
      <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl border border-slate-200 px-4 py-3 flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-xl bg-emerald-100 grid place-items-center">
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900">+34% leads this month</p>
          <p className="text-xs text-slate-500">vs. last month</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Stats ─────────────────────────────────────────────────────────────── */
function StatsSection() {
  const stats = [
    { value: "500+", label: "Businesses Created" },
    { value: "100+", label: "Happy Agencies" },
    { value: "99.9%", label: "Platform Uptime" },
    { value: "24/7", label: "Customer Support" },
  ];
  return (
    <section className="bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-black text-white">{s.value}</p>
              <p className="mt-1.5 text-sm text-slate-400 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ──────────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: Building2, title: "Instant Website Builder", desc: "Create a fully functional, mobile-responsive business website in under 5 minutes. No design skills needed.", color: "bg-indigo-100 text-indigo-600" },
  { icon: Smartphone, title: "WhatsApp & Click-to-Call", desc: "One-tap WhatsApp chat and call buttons on every site. Convert visitors into customers instantly.", color: "bg-emerald-100 text-emerald-600" },
  { icon: Package, title: "Product Catalogue", desc: "Showcase products with photos, descriptions, and prices. Beautiful grid layout works on any device.", color: "bg-amber-100 text-amber-600" },
  { icon: Users, title: "Leads & CRM", desc: "Capture inquiries, track appointments, manage leads with status tags and follow-up reminders.", color: "bg-violet-100 text-violet-600" },
  { icon: Globe, title: "Maps & Social Media", desc: "Google Maps integration, website links, and all social media profiles — everything in one place.", color: "bg-sky-100 text-sky-600" },
  { icon: Shield, title: "Plan Expiry Control", desc: "Set subscription duration per client. Sites auto-disable on expiry, keeping your agency in control.", color: "bg-rose-100 text-rose-600" },
];

function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold border border-indigo-100 mb-4">Platform Features</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Everything your clients need to grow</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">One platform, infinite possibilities. Give each client a complete digital presence with all the tools to attract and convert customers.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="group p-6 rounded-2xl border border-slate-100 bg-white hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300">
              <div className={`h-12 w-12 rounded-xl ${f.color} grid place-items-center mb-5 group-hover:scale-110 transition-transform`}>
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{f.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How it works ──────────────────────────────────────────────────────── */
const STEPS = [
  { step: "01", icon: Zap, title: "Create a Business Profile", desc: "Set up your client's brand — logo, name, tagline, contact details, working hours, and social links. Takes under 5 minutes.", color: "from-indigo-500 to-purple-500" },
  { step: "02", icon: Package, title: "Add Products & Gallery", desc: "Upload product photos with descriptions and pricing. Add gallery images to showcase the business. Everything is mobile-first and beautiful.", color: "from-emerald-500 to-teal-500" },
  { step: "03", icon: BarChart3, title: "Watch Leads & Sales Grow", desc: "Customers inquire via WhatsApp, call, or contact form. Track every lead, appointment, and follow-up from one clean CRM dashboard.", color: "from-amber-500 to-orange-500" },
];

function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold border border-emerald-100 mb-4">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Go live in 3 easy steps</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">No technical knowledge needed. If you can fill a form, you can create a professional business website.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-indigo-200 via-emerald-200 to-amber-200" />
          {STEPS.map((s) => (
            <div key={s.step} className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${s.color} grid place-items-center mx-auto mb-5 shadow-lg`}>
                <s.icon className="h-7 w-7 text-white" />
              </div>
              <span className="text-5xl font-black text-slate-100 absolute top-6 right-7 select-none">{s.step}</span>
              <h3 className="font-bold text-slate-900 text-lg mb-3">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why us ─────────────────────────────────────────────────────────────── */
const WHY_POINTS = [
  { icon: Clock, title: "Launch in minutes, not months", desc: "Traditional web development takes weeks. With BizPlatform, your client is live in under an hour." },
  { icon: Target, title: "Built for Indian businesses", desc: "WhatsApp integration, UPI/QR ready, vernacular business types, INR pricing — designed for India first." },
  { icon: Award, title: "White-label for agencies", desc: "Brand the platform as your own. Your clients see your brand, not ours. Scale without limits." },
  { icon: TrendingUp, title: "Real ROI, real results", desc: "Our clients report 3× more inquiries within the first month of going digital with BizPlatform." },
];

function WhyUsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-semibold border border-purple-100 mb-5">Why BizPlatform</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">The platform built for agency growth</h2>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">We built BizPlatform after spending years helping businesses go digital. We know the pain — slow development, high costs, poor mobile experience. We fixed all of it.</p>
            <div className="mt-10 space-y-6">
              {WHY_POINTS.map((p) => (
                <div key={p.title} className="flex gap-4">
                  <div className="h-11 w-11 rounded-xl bg-slate-100 grid place-items-center shrink-0 mt-0.5">
                    <p.icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{p.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              Learn our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Decorative metrics card */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Average setup time", value: "< 10 min", sub: "from signup to live", bg: "bg-indigo-600", text: "text-white" },
              { label: "Lead conversion rate", value: "3.8×", sub: "vs no digital presence", bg: "bg-white", text: "text-slate-900" },
              { label: "Client satisfaction", value: "98%", sub: "recommend us to others", bg: "bg-white", text: "text-slate-900" },
              { label: "Sites managed", value: "500+", sub: "and counting", bg: "bg-slate-900", text: "text-white" },
            ].map((m, i) => (
              <div key={i} className={`${m.bg} ${m.text} rounded-3xl p-7 border border-slate-100 shadow-sm`}>
                <p className={`text-3xl font-black ${m.bg === "bg-indigo-600" ? "text-white" : m.bg === "bg-slate-900" ? "text-white" : "text-indigo-600"}`}>{m.value}</p>
                <p className={`mt-2 text-sm font-bold ${m.text}`}>{m.label}</p>
                <p className={`mt-1 text-xs ${m.bg === "bg-white" ? "text-slate-500" : "opacity-70"}`}>{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ──────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: "Rahul Mehta",
    role: "Digital Agency Owner, Mumbai",
    avatar: "R",
    color: "bg-indigo-100 text-indigo-700",
    stars: 5,
    quote: "BizPlatform transformed how I serve clients. I used to spend 2 weeks building a basic website. Now I do it in 2 hours and charge the same. My margins have tripled.",
  },
  {
    name: "Priya Sharma",
    role: "Boutique Owner, Pune",
    avatar: "P",
    color: "bg-emerald-100 text-emerald-700",
    stars: 5,
    quote: "My WhatsApp inquiries went from 5 a week to 30 a week after launching my BizPlatform site. It looks so professional and I update it myself without calling anyone.",
  },
  {
    name: "Vikram Patel",
    role: "Restaurant Chain, Ahmedabad",
    avatar: "V",
    color: "bg-amber-100 text-amber-700",
    stars: 5,
    quote: "We manage 8 restaurant branches from one dashboard. Each location has its own site, menu, and inquiry tracking. It's incredible value for what we pay.",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold border border-amber-100 mb-4">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Loved by agencies & businesses</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">Don't take our word for it — hear from the people who use BizPlatform every day.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed flex-1 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
                <div className={`h-10 w-10 rounded-xl ${t.color} grid place-items-center font-bold text-sm shrink-0`}>{t.avatar}</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ────────────────────────────────────────────────────────────── */
const PLANS = [
  {
    name: "Starter",
    price: "₹999",
    period: "/ month",
    desc: "Perfect for individuals and small businesses just getting started.",
    features: ["1 Business Website", "Product Catalogue", "WhatsApp Integration", "Inquiry Form", "Basic Analytics"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Professional",
    price: "₹2,499",
    period: "/ month",
    desc: "For growing agencies managing multiple client websites.",
    features: ["Up to 10 Business Websites", "Full CRM & Lead Tracking", "Appointments System", "Gallery & Products", "Priority Support", "Custom Domain"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large agencies with unlimited client portfolios.",
    features: ["Unlimited Websites", "White-Label Option", "API Access", "Dedicated Account Manager", "SLA Guarantee", "Custom Integrations"],
    cta: "Contact Sales",
    highlight: false,
  },
];

function PricingSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-100 mb-4">Simple Pricing</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Transparent plans, no surprises</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">Start free, scale when you're ready. Every plan includes a 14-day free trial.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((p) => (
            <div key={p.name} className={`rounded-3xl p-8 border transition-all ${p.highlight ? "bg-indigo-600 border-indigo-600 shadow-2xl shadow-indigo-200 scale-[1.03]" : "bg-white border-slate-200 hover:border-indigo-200 hover:shadow-lg"}`}>
              {p.highlight && <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full mb-4">Most Popular</span>}
              <h3 className={`font-black text-xl ${p.highlight ? "text-white" : "text-slate-900"}`}>{p.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className={`text-4xl font-black ${p.highlight ? "text-white" : "text-slate-900"}`}>{p.price}</span>
                <span className={`text-sm ${p.highlight ? "text-indigo-200" : "text-slate-500"}`}>{p.period}</span>
              </div>
              <p className={`mt-3 text-sm leading-relaxed ${p.highlight ? "text-indigo-100" : "text-slate-600"}`}>{p.desc}</p>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <span className={`h-5 w-5 rounded-full grid place-items-center shrink-0 ${p.highlight ? "bg-white/20" : "bg-emerald-100"}`}>
                      <Check className={`h-3 w-3 ${p.highlight ? "text-white" : "text-emerald-600"}`} strokeWidth={3} />
                    </span>
                    <span className={p.highlight ? "text-indigo-100" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className={`mt-8 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${p.highlight ? "bg-white text-indigo-600 hover:bg-indigo-50" : "bg-slate-900 text-white hover:bg-slate-800"}`}>
                {p.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────────────── */
function CtaSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-400/10 blur-2xl" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Ready to transform your<br className="hidden sm:block" /> clients' digital presence?
        </h2>
        <p className="mt-5 text-lg text-indigo-200 max-w-xl mx-auto">
          Join 100+ agencies already growing with BizPlatform. No credit card required. Set up your first site free.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold bg-white text-indigo-700 rounded-2xl hover:bg-indigo-50 shadow-xl transition-all hover:-translate-y-0.5">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold border-2 border-white/30 text-white rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-0.5">
            Explore Services <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-6 text-xs text-indigo-300">14-day free trial · No credit card · Cancel anytime</p>
      </div>
    </section>
  );
}
