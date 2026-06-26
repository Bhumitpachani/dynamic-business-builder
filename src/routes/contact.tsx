import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight, MessageSquare, Users, Zap } from "lucide-react";
import { PublicLayout } from "@/components/public-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — BizPlatform" },
      { name: "description", content: "Get in touch with BizPlatform. We'll help you get your first client website live in under an hour." },
    ],
  }),
  component: Contact,
});

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  agency: string;
  message: string;
};

function Contact() {
  return (
    <PublicLayout>
      <HeroSection />
      <MainSection />
      <WhyContactSection />
    </PublicLayout>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-20 md:py-32 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-800/20 via-transparent to-transparent" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 text-xs font-semibold border border-indigo-700/50 mb-6">Get In Touch</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Let's grow your{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">agency together</span>
        </h1>
        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Whether you have questions, want a demo, or are ready to sign up — we'd love to hear from you. Our team responds within 2 hours.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-400" /> Free 14-day trial</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-400" /> No credit card needed</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-400" /> Setup in under an hour</span>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", service: "", agency: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(k: keyof FormState, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-20 w-20 rounded-3xl bg-emerald-100 grid place-items-center mb-6">
          <CheckCircle className="h-10 w-10 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-3">Message sent!</h3>
        <p className="text-slate-600 max-w-sm leading-relaxed">
          Thanks, <strong>{form.name}</strong>! We'll get back to you at <strong>{form.email}</strong> within 2 business hours.
        </p>
        <button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", service: "", agency: "", message: "" }); }} className="mt-8 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Full Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Rahul Mehta"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition-colors placeholder:text-slate-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Email Address *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="rahul@youragency.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition-colors placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Phone Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition-colors placeholder:text-slate-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Agency / Company Name</label>
          <input
            type="text"
            value={form.agency}
            onChange={(e) => set("agency", e.target.value)}
            placeholder="Your Agency Name"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition-colors placeholder:text-slate-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">I'm interested in</label>
        <select
          value={form.service}
          onChange={(e) => set("service", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition-colors text-slate-700"
        >
          <option value="">Select a service</option>
          <option>Starter Plan — 1 Business Site</option>
          <option>Professional Plan — Up to 10 Sites</option>
          <option>Enterprise Plan — Unlimited Sites</option>
          <option>Demo / Product Walkthrough</option>
          <option>Partnership / Reseller Program</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Your Message *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us about your agency, how many clients you manage, and what you're looking to achieve with BizPlatform..."
          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition-colors resize-none placeholder:text-slate-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200"
      >
        {loading ? (
          <><span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Sending...</>
        ) : (
          <>Send Message <ArrowRight className="h-4 w-4" /></>
        )}
      </button>

      <p className="text-xs text-slate-500 text-center">We respond within 2 business hours. Your information is never shared.</p>
    </form>
  );
}

const CONTACT_INFO = [
  {
    icon: Phone,
    color: "bg-indigo-100 text-indigo-600",
    title: "Call Us",
    lines: ["+91 98765 43210", "+91 91234 56789"],
    sub: "Mon–Sat, 9am – 7pm IST",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    color: "bg-emerald-100 text-emerald-600",
    title: "Email Us",
    lines: ["hello@bizplatform.in", "support@bizplatform.in"],
    sub: "Response within 2 hours",
    href: "mailto:hello@bizplatform.in",
  },
  {
    icon: MapPin,
    color: "bg-amber-100 text-amber-600",
    title: "Find Us",
    lines: ["BizPlatform HQ", "Bandra West, Mumbai 400050"],
    sub: "Maharashtra, India",
    href: "#",
  },
  {
    icon: Clock,
    color: "bg-rose-100 text-rose-600",
    title: "Office Hours",
    lines: ["Mon – Fri: 9am – 7pm", "Saturday: 10am – 5pm"],
    sub: "Closed Sundays & public holidays",
    href: "#",
  },
];

function MainSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact info cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {CONTACT_INFO.map((c) => (
            <a key={c.title} href={c.href} className="group bg-slate-50 hover:bg-white hover:border-indigo-200 hover:shadow-lg border border-slate-100 rounded-2xl p-6 transition-all">
              <div className={`h-12 w-12 rounded-xl ${c.color} grid place-items-center mb-4 group-hover:scale-110 transition-transform`}>
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">{c.title}</h3>
              {c.lines.map((l) => <p key={l} className="text-sm text-slate-700 font-medium">{l}</p>)}
              <p className="text-xs text-slate-500 mt-1">{c.sub}</p>
            </a>
          ))}
        </div>

        {/* Form + Map side by side */}
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Send us a message</h2>
            <p className="text-sm text-slate-600 mb-8">Fill in the form and our team will get back to you within 2 hours.</p>
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            {/* Map placeholder */}
            <div className="bg-slate-100 rounded-3xl overflow-hidden aspect-square relative flex items-center justify-center border border-slate-200">
              <div className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-indigo-100 grid place-items-center mx-auto mb-3">
                  <MapPin className="h-8 w-8 text-indigo-600" />
                </div>
                <p className="font-bold text-slate-700 text-sm">Bandra West</p>
                <p className="text-xs text-slate-500">Mumbai, Maharashtra</p>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                  Open in Google Maps <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20BizPlatform"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl transition-colors group"
            >
              <div className="h-11 w-11 rounded-xl bg-white/20 grid place-items-center shrink-0 group-hover:bg-white/30 transition-colors">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-sm">Chat on WhatsApp</p>
                <p className="text-xs text-emerald-100">Instant replies during office hours</p>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const WHY_ITEMS = [
  { icon: Zap, title: "Fast Onboarding", desc: "We'll help you set up your first client site on our welcome call — usually done in under 30 minutes.", color: "bg-indigo-100 text-indigo-600" },
  { icon: Users, title: "Dedicated Support", desc: "Every agency gets a dedicated account manager. Real people, real help — not just a ticket system.", color: "bg-emerald-100 text-emerald-600" },
  { icon: MessageSquare, title: "Active Community", desc: "Join our private WhatsApp group of 100+ agency owners sharing tips, leads, and success stories.", color: "bg-amber-100 text-amber-600" },
];

function WhyContactSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Why agencies choose us</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">We're not just a software company — we're a growth partner for your agency.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {WHY_ITEMS.map((w) => (
            <div key={w.title} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className={`h-14 w-14 rounded-2xl ${w.color} grid place-items-center mx-auto mb-5`}>
                <w.icon className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-3">{w.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
