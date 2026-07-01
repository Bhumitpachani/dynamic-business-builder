import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, Clock, CheckCircle, ArrowRight, MessageSquare } from "lucide-react";
import { PublicLayout } from "@/components/public-layout";
import { contactInquiries } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — tapvybe" },
      { name: "description", content: "Get in touch with tapvybe. Order your NFC business card, ask a question, or get a custom quote for your team." },
    ],
  }),
  component: Contact,
});

type FormState = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

function Contact() {
  return (
    <PublicLayout>
      <HeroSection />
      <MainSection />
    </PublicLayout>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="bg-white py-20 md:py-28 text-center">
      <div className="max-w-2xl mx-auto px-6 sm:px-8">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-6 tracking-wide uppercase"
          style={{ backgroundColor: "#6B3EF0" }}
        >
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight leading-[1.1]">
          Go Digital. Reduce Paper.<br />Recycle Responsibly. Plant More Trees.
        </h1>
        <p className="mt-5 text-base text-gray-600 leading-relaxed">
          Questions about an order, need a custom design, or want to order for your whole team? We're here. Our team responds within 2 hours.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-5 text-sm text-gray-500 font-medium">
          {["Fast delivery", "Custom designs", "Bulk team orders"].map((s) => (
            <span key={s} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" style={{ color: "#6B3EF0" }} />
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Info ───────────────────────────────────────────────────────── */
const CONTACT_INFO = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 6351717272"],
    sub: "Mon–Sat, 9am – 7pm IST",
    href: "tel:+916351717272",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@tapvybe.in"],
    sub: "Response within 2 hours",
    href: "mailto:info@tapvybe.in",
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Mon – Fri: 9am – 7pm", "Saturday: 10am – 5pm"],
    sub: "Closed Sundays & public holidays",
    href: "#",
  },
];

/* ─── Form ───────────────────────────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", interest: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(k: keyof FormState, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      await contactInquiries.add({
        name: form.name,
        email: form.email,
        phone: form.phone,
        interest: form.interest,
        message: form.message,
        createdAt: new Date().toISOString(),
      });
      setSent(true);
      toast.success("Message sent! We'll get back to you within 2 hours.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:border-[#6B3EF0] transition-colors placeholder:text-gray-400";

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className="h-20 w-20 rounded-3xl grid place-items-center mb-6"
          style={{ backgroundColor: "#EDE8FE" }}
        >
          <CheckCircle className="h-10 w-10" style={{ color: "#6B3EF0" }} />
        </div>
        <h3 className="text-2xl font-black text-black mb-3">Message sent!</h3>
        <p className="text-gray-600 max-w-sm leading-relaxed text-sm">
          Thanks, <strong>{form.name}</strong>! We'll get back to you at <strong>{form.email}</strong> within 2 business hours.
        </p>
        <button
          onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", interest: "", message: "" }); }}
          className="mt-8 text-sm font-bold transition-colors hover:opacity-80"
          style={{ color: "#6B3EF0" }}
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">Full Name *</label>
          <input type="text" required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">Email Address *</label>
          <input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">Phone Number</label>
          <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 63517 17272" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">I'm interested in</label>
          <select value={form.interest} onChange={(e) => set("interest", e.target.value)} className={inputClass}>
            <option value="">Select an option</option>
            <option>Standard NFC Card</option>
            <option>Metal NFC Card</option>
            <option>Bulk / Team Order (10+)</option>
            <option>Custom Design</option>
            <option>General Question</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">Message *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us what you need — quantity, design preferences, or any questions..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white rounded-full disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:opacity-90"
        style={{ backgroundColor: "#6B3EF0" }}
      >
        {loading ? (
          <><span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Sending...</>
        ) : (
          <>Send Message <ArrowRight className="h-4 w-4" /></>
        )}
      </button>
      <p className="text-xs text-gray-400 text-center">We respond within 2 business hours. Your info is never shared.</p>
    </form>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
function MainSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Contact info cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {CONTACT_INFO.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="group bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md rounded-2xl p-6 transition-all"
            >
              <div
                className="h-11 w-11 rounded-xl grid place-items-center mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: "#EDE8FE" }}
              >
                <c.icon className="h-5 w-5" style={{ color: "#6B3EF0" }} />
              </div>
              <h3 className="font-bold text-black text-sm mb-1.5">{c.title}</h3>
              {c.lines.map((l) => <p key={l} className="text-sm text-gray-700 font-medium leading-tight">{l}</p>)}
              <p className="text-xs text-gray-400 mt-1">{c.sub}</p>
            </a>
          ))}
        </div>

        {/* Form + Sidebar */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
            <h2 className="text-2xl font-black text-black mb-1">Send us a message</h2>
            <p className="text-sm text-gray-500 mb-8">Fill in the form and we'll get back to you within 2 hours.</p>
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/916351717272?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20tapvybe"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-6 bg-[#25D366] hover:bg-[#20b558] text-white rounded-2xl transition-colors group"
            >
              <div className="h-12 w-12 rounded-xl bg-white/20 grid place-items-center shrink-0 group-hover:bg-white/30 transition-colors">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-base">Chat on WhatsApp</p>
                <p className="text-sm text-green-100">+91 6351717272</p>
                <p className="text-xs text-green-100 mt-0.5">Instant replies during office hours</p>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto shrink-0" />
            </a>

            {/* Direct call */}
            <a
              href="tel:+916351717272"
              className="flex items-center gap-4 p-6 bg-white border border-gray-100 hover:shadow-md rounded-2xl transition-all group"
            >
              <div
                className="h-12 w-12 rounded-xl grid place-items-center shrink-0 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: "#EDE8FE" }}
              >
                <Phone className="h-6 w-6" style={{ color: "#6B3EF0" }} />
              </div>
              <div>
                <p className="font-bold text-black text-base">Call Us Directly</p>
                <p className="text-sm font-semibold" style={{ color: "#6B3EF0" }}>+91 6351717272</p>
                <p className="text-xs text-gray-400 mt-0.5">Mon–Sat, 9am – 7pm IST</p>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto shrink-0 text-gray-400" />
            </a>

            {/* Quick info card */}
            <div className="bg-black rounded-2xl p-6 text-white">
              <h4 className="font-black text-base mb-3">Order in 3 easy steps</h4>
              <ol className="space-y-2.5">
                {["Send us your details & design preferences", "We send you a preview for approval", "Card printed & shipped within 5 days"].map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                    <span
                      className="h-5 w-5 rounded-full grid place-items-center shrink-0 text-xs font-black text-white mt-0.5"
                      style={{ backgroundColor: "#6B3EF0" }}
                    >
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
