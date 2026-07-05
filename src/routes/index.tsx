import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Wifi, RefreshCw, Globe, Shield, Zap, Star, ChevronRight } from "lucide-react";
import { PublicLayout } from "@/components/public-layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "tapvybe — tap in. feel the vibes." },
      { name: "description", content: "tapvybe - a revolutionary smart NFC business card that allows you to exchange contact, collect data, and direct your potential customer to the info they need." },
    ],
  }),
  component: Landing,
});

const BRAND = "#6B3EF0";
const BRAND_LIGHT = "#EDE8FE";

function Landing() {
  return (
    <PublicLayout>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FutureSection />
      <MetalCardSection />
      <CardsShowcaseSection />
      <TestimonialsSection />
      <PricingTeaser />
      <CtaSection />
    </PublicLayout>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="bg-white min-h-[92vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 md:py-20">

          {/* Left — Text */}
          <div className="max-w-xl">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white mb-7"
              style={{ backgroundColor: BRAND }}
            >
              <Wifi className="h-3.5 w-3.5" />
              Smart NFC Business Cards
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black leading-[1.0] tracking-tight">
              Tap in.<br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, #4B35D9, #9B35D9)` }}
              >
                Feel the vibes.
              </span>
            </h1>
            <p className="mt-6 text-base text-gray-600 leading-relaxed max-w-md">
              One tap. Your entire professional world — contact, socials, portfolio — shared instantly. No app needed. Never goes out of date.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
                style={{ backgroundColor: BRAND, boxShadow: `0 8px 25px rgba(107,62,240,0.35)` }}
              >
                Order Your Card <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-black border-2 border-black transition-all hover:bg-black hover:text-white"
              >
                View Products
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-5">
              {["No app needed to receive", "Updates live, forever", "Works on all phones"].map((f) => (
                <span key={f} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  <span className="h-5 w-5 rounded-full grid place-items-center shrink-0" style={{ backgroundColor: BRAND_LIGHT }}>
                    <Check className="h-3 w-3" style={{ color: BRAND }} strokeWidth={3} />
                  </span>
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Card image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm lg:max-w-md">
              <img
                src="/hero-card.png"
                alt="tapvybe NFC business card"
                className="w-full drop-shadow-2xl"
                fetchPriority="high"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Bar ──────────────────────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { value: "10,000+", label: "Cards Shipped" },
    { value: "50+", label: "Cities in India" },
    { value: "99.9%", label: "Uptime" },
    { value: "< 1 sec", label: "Profile Load Time" },
  ];
  return (
    <section className="bg-black py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-black text-white">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How it Works ──────────────────────────────────────────────────────── */
const HOW_STEPS = [
  {
    step: "01",
    title: "Design Your Card",
    desc: "Send us your logo and details. We design your NFC card and send a preview for approval before printing.",
    img: "/tapvybe-design-step.png",
  },
  {
    step: "02",
    title: "Your Digital Profile",
    desc: "Your tapvybe profile goes live instantly. Update your contact info, socials, and links anytime from your dashboard.",
    img: "/tapvybe-profile-phone.png",
  },
  {
    step: "03",
    title: "Tap, Share & Connect",
    desc: "Just tap your card on any phone. No app download. Your contact info, profile and links appear instantly.",
    img: "/tapvybe-tap-share.png",
  },
];

function HowItWorksSection() {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-4 tracking-wide uppercase"
            style={{ backgroundColor: BRAND }}
          >
            How it Works
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
            From order to connection in 3 steps
          </h2>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
            Getting started with tapvybe is simple. Here's how it works.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {HOW_STEPS.map((step) => (
            <div key={step.step} className="flex flex-col items-center text-center">
              {/* Circular image */}
              <div
                className="relative h-52 w-52 rounded-full overflow-hidden mb-7 ring-4"
                style={{ boxShadow: `0 0 0 4px ${BRAND_LIGHT}` }}
              >
                <img
                  src={step.img}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: BRAND }}>
                Step {step.step}
              </span>
              <h3 className="text-xl font-black text-black mb-3">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ───────────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: Wifi, title: "NFC + QR Code", desc: "Works with all iPhones & Android. Also has a QR code backup — so you never miss a connection." },
  { icon: Globe, title: "Live Digital Profile", desc: "Change your number, add a new link — your profile updates everywhere instantly, no reprinting." },
  { icon: RefreshCw, title: "Unlimited Updates", desc: "Update your profile as many times as you want, for life. Basics are always free." },
  { icon: Zap, title: "Instant Sharing", desc: "One tap is all it takes. The receiver sees your profile in their browser — no download required." },
  { icon: Shield, title: "Privacy Control", desc: "Choose exactly what's visible publicly and what stays private. You're always in control." },
  { icon: Star, title: "Lead Capture", desc: "Built-in enquiry form on your profile. Visitors can drop their details — you capture every lead." },
];

function FeaturesSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
            Everything packed into one card
          </h2>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
            Every tapvybe card comes loaded with features — no hidden costs.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group p-7 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all"
            >
              <div
                className="h-12 w-12 rounded-xl grid place-items-center mb-5 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: BRAND_LIGHT }}
              >
                <f.icon className="h-6 w-6" style={{ color: BRAND }} />
              </div>
              <h3 className="font-bold text-black text-base mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Metal Card Feature ─────────────────────────────────────────────────── */
function MetalCardSection() {
  return (
    <section className="bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 items-stretch">
          {/* Text */}
          <div className="px-8 sm:px-12 lg:px-16 py-20 md:py-28 flex flex-col justify-center">
            <span
              className="inline-block self-start px-4 py-1.5 rounded-full text-xs font-bold text-white mb-6 tracking-wide uppercase"
              style={{ backgroundColor: BRAND }}
            >
              Premium
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Premium Metal.<br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, #8B70F8, #C470F8)` }}
              >
                Powerful Tech.
              </span>
            </h2>
            <p className="mt-5 text-base text-gray-400 leading-relaxed max-w-sm">
              Precision-crafted stainless steel with laser-engraved branding. Built to outlast any paper card — and infinitely smarter.
            </p>
            <ul className="mt-7 space-y-3">
              {["Stainless steel / Black metal finish", "Laser-engraved custom branding", "NFC chip embedded — lasts forever", "Arrives in premium gift packaging"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                  <span
                    className="h-5 w-5 rounded-full grid place-items-center shrink-0"
                    style={{ backgroundColor: "rgba(107,62,240,0.3)" }}
                  >
                    <Check className="h-3 w-3" style={{ color: "#9B70F8" }} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 self-start mt-9 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              Explore Metal Cards <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative h-72 lg:h-auto min-h-[400px]">
            <img
              src="/tapvybe-metal-card.png"
              alt="tapvybe Premium Metal NFC Card"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Future ──────────────────────────────────────────────────────────────── */
function FutureSection() {
  return (
    <section className="bg-black py-20 md:py-28">
      <div className="w-full mx-auto px-6 sm:px-8 lg:px-12">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-6 tracking-wide uppercase"
          style={{ backgroundColor: BRAND }}
        >
          Join The Digital Revolution
        </span>
        <h2 className="text-[clamp(1.1rem,5.4vw,3rem)] font-black text-white leading-tight tracking-tight whitespace-nowrap">
          The future of networking
        </h2>
        <h2 className="text-[clamp(1.1rem,5.4vw,3rem)] font-black tracking-tight leading-tight whitespace-nowrap" style={{ color: BRAND }}>
          Isn't paper.
        </h2>
        <div className="mt-8 space-y-2">
          {["It's instant.", "It's interactive.", "It's memorable."].map((line) => (
            <p key={line} className="text-base sm:text-lg font-medium text-gray-300">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Cards Showcase ─────────────────────────────────────────────────────── */
function CardsShowcaseSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-6 tracking-wide uppercase"
              style={{ backgroundColor: BRAND }}
            >
              Always Up to Date
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-black leading-tight tracking-tight">
              One card.<br />Infinite updates.
            </h2>
            <p className="mt-5 text-base text-gray-600 leading-relaxed max-w-md">
              Change jobs? New phone number? Launch a new Instagram? Update your tapvybe profile once and every card you've ever handed out is updated automatically. No reprinting. Ever.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "Update from your phone in seconds",
                "All previously shared cards update automatically",
                "Add new links, remove old ones anytime",
                "No limits on how many times you update",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <span
                    className="h-5 w-5 rounded-full grid place-items-center shrink-0"
                    style={{ backgroundColor: BRAND_LIGHT }}
                  >
                    <Check className="h-3 w-3" style={{ color: BRAND }} strokeWidth={3} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-9 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              Get Your Card Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square shadow-2xl">
            <img
              src="/tapvybe-hero-card-alt.png"
              alt="tapvybe premium NFC card design"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: "Bhargav Dodiya",
    role: "Real Estate",
    quote: "The NFC Digital Card has been a great addition to my real estate business. It helps me share my contact information instantly and creates a professional impression. Highly recommended!",
    rating: 5,
  },
  {
    name: "Dhruv Sompura",
    role: "Architect",
    quote: "I recently started using this NFC Digital Business Card, and I'm really impressed with it. As an architect, it has made networking so much easier. I can instantly share my contact details, portfolio, and social media with just a tap. I'm genuinely happy with the experience and would definitely recommend it to anyone looking for a professional way to connect.",
    rating: 5,
  },
  {
    name: "Girirajstudio Madhada",
    role: "Photography",
    quote: "Great experience with the Digital NFC Card! As a photographer, it helps me instantly share my contact details, portfolio, and social media with clients. It's professional, easy to use, and perfect for networking. Highly recommended!",
    rating: 5,
  },
];

function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
            Loved by professionals across India
          </h2>
          <p className="mt-3 text-base text-gray-600">Real people. Real results.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" style={{ color: BRAND }} />
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed flex-1 italic">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full grid place-items-center font-black text-white text-sm shrink-0"
                  style={{ backgroundColor: BRAND }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-black text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing Teaser ─────────────────────────────────────────────────────── */
const PLANS = [
  {
    name: "Standard NFC Card",
    price: "₹699",
    desc: "PVC card with NFC chip, QR code, and free digital profile.",
    highlight: false,
  },
  {
    name: "Metal NFC Card",
    price: "₹1,111",
    desc: "Stainless steel with laser engraving, premium packaging.",
    highlight: true,
  },
  {
    name: "Bulk / Team Order",
    price: "Custom",
    desc: "10+ cards, custom design, team dashboard, bulk pricing.",
    highlight: false,
  },
];

function PricingTeaser() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">Simple pricing</h2>
          <p className="mt-3 text-base text-gray-600 max-w-lg mx-auto">
            Every card includes a free digital profile, unlimited updates, and lifetime NFC functionality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl p-8 text-center flex flex-col items-center ${p.highlight ? "text-white scale-[1.04] shadow-2xl" : "bg-gray-50 border border-gray-200"}`}
              style={p.highlight ? { backgroundColor: BRAND } : {}}
            >
              <p className={`text-sm font-bold mb-3 ${p.highlight ? "text-purple-200" : "text-gray-500"}`}>{p.name}</p>
              <p className={`text-4xl font-black mb-3 ${p.highlight ? "text-white" : "text-black"}`}>{p.price}</p>
              <p className={`text-sm leading-relaxed mb-6 flex-1 ${p.highlight ? "text-purple-100" : "text-gray-600"}`}>{p.desc}</p>
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${p.highlight ? "bg-white text-black hover:bg-gray-100" : "text-white hover:opacity-90"}`}
                style={p.highlight ? {} : { backgroundColor: BRAND }}
              >
                Order Now <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm text-gray-500">
          All cards include free design review, digital profile & lifetime NFC.{" "}
          <Link to="/services" className="font-semibold hover:underline" style={{ color: BRAND }}>
            See full details →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────────────── */
function CtaSection() {
  return (
    <section
      className="py-20 md:py-28 text-center text-white"
      style={{ background: `linear-gradient(135deg, #3B2ED9 0%, #8B35D9 100%)` }}
    >
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
          Ready to tap in?
        </h2>
        <p className="mt-4 text-base text-purple-200 leading-relaxed max-w-lg mx-auto">
          Join thousands of Indian professionals already using tapvybe to make connections that last.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-white text-black hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-0.5"
          >
            Order Your tapvybe Card <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center px-8 py-4 rounded-full text-sm font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
