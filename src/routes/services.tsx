import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Wifi,
  Layers,
  Zap,
  RefreshCw,
  Globe,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { PublicLayout } from "@/components/public-layout";
import { LazySection } from "@/components/lazy-section";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — tapvybe" },
      {
        name: "description",
        content:
          "Explore tapvybe's smart NFC business card products — standard cards, metal cards, custom designs, and digital profiles.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <PublicLayout>
      <HeroSection />
      <LazySection><ProductsSection /></LazySection>
      <LazySection><FeaturesSection /></LazySection>
      <LazySection><MetalCardFeature /></LazySection>
      <LazySection><FaqSection /></LazySection>
      <LazySection><CtaSection /></LazySection>
    </PublicLayout>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="bg-white py-20 md:py-28 text-center">
      <div className="w-full px-6 sm:px-10 lg:px-20">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-6 tracking-wide uppercase"
          style={{ backgroundColor: "#6B3EF0" }}
        >
          Our Products
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-[1.1]">
          Everything you need to
          <br />
          make a lasting impression.
        </h1>
        <p className="mt-6 text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
          tapvybe smart NFC cards let you share your digital profile, collect leads, and stay
          connected — with a single tap. No app needed.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#6B3EF0" }}
          >
            Order Now <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-black border-2 border-black transition-all hover:bg-black hover:text-white"
          >
            View Products
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Products ───────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    badge: "Most Popular",
    name: "Standard NFC Card",
    tagline: "The classic, reimagined.",
    desc: "A sleek PVC card embedded with NFC technology. Share your full digital profile — contact, social links, portfolio, and more — with one tap.",
    price: "₹699",
    priceNote: "per card",
    features: [
      "NFC + QR Code",
      "Free digital profile",
      "Custom design",
      "Unlimited profile updates",
      "Instant sharing",
      "No app required",
    ],
    highlight: false,
    accentBg: "bg-gray-50",
  },
  {
    badge: "Premium",
    name: "Metal NFC Card",
    tagline: "Elegance meets innovation.",
    desc: "Precision-crafted metal card with laser-engraved branding. The ultimate first impression — built to last a lifetime and make people remember you.",
    price: "₹1,111",
    priceNote: "per card",
    features: [
      "Stainless steel / Black metal",
      "Laser-engraved branding",
      "NFC + QR Code",
      "Free digital profile",
      "Unlimited profile updates",
      "Premium packaging",
    ],
    highlight: true,
    accentBg: "bg-black",
  },
  {
    badge: "For Teams",
    name: "Bulk / Custom Order",
    tagline: "Scale your team's presence.",
    desc: "Perfect for companies, events, and agencies. Custom designs, bulk pricing, and a unified team dashboard to manage everyone's profiles.",
    price: "Custom",
    priceNote: "contact us for pricing",
    features: [
      "Minimum 10 cards",
      "Custom brand design",
      "Team dashboard",
      "Bulk discounts",
      "Priority support",
      "Dedicated account manager",
    ],
    highlight: false,
    accentBg: "bg-gray-50",
  },
];

function ProductsSection() {
  return (
    <section id="products" className="bg-gray-50 py-20 md:py-28">
      <div className="w-full px-6 sm:px-10 lg:px-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
            Pick your card
          </h2>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
            Every card comes with a free digital profile, unlimited updates, and lifetime NFC
            functionality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-8 flex flex-col ${p.highlight ? "bg-black text-white scale-[1.03] shadow-2xl" : "bg-white border border-gray-200"}`}
            >
              <span
                className={`inline-block self-start text-xs font-bold px-3 py-1 rounded-full mb-5 ${p.highlight ? "bg-white/20 text-white" : "text-white"}`}
                style={p.highlight ? {} : { backgroundColor: "#6B3EF0" }}
              >
                {p.badge}
              </span>
              <h3
                className={`text-xl font-black mb-1 ${p.highlight ? "text-white" : "text-black"}`}
              >
                {p.name}
              </h3>
              <p className={`text-sm mb-4 ${p.highlight ? "text-gray-400" : "text-gray-500"}`}>
                {p.tagline}
              </p>
              <p
                className={`text-sm leading-relaxed mb-6 ${p.highlight ? "text-gray-300" : "text-gray-600"}`}
              >
                {p.desc}
              </p>

              <div className="mb-6">
                <span
                  className={`text-4xl font-black ${p.highlight ? "text-white" : "text-black"}`}
                >
                  {p.price}
                </span>
                <span className={`text-sm ml-2 ${p.highlight ? "text-gray-400" : "text-gray-500"}`}>
                  {p.priceNote}
                </span>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <span
                      className="h-5 w-5 rounded-full grid place-items-center shrink-0"
                      style={{ backgroundColor: p.highlight ? "rgba(107,62,240,0.20)" : "#EDE8FE" }}
                    >
                      <Check className="h-3 w-3" style={{ color: "#6B3EF0" }} strokeWidth={3} />
                    </span>
                    <span className={p.highlight ? "text-gray-200" : "text-gray-700"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold transition-all ${
                  p.highlight
                    ? "text-black bg-white hover:bg-gray-100"
                    : "text-white hover:opacity-90"
                }`}
                style={p.highlight ? {} : { backgroundColor: "#6B3EF0" }}
              >
                {p.price === "Custom" ? "Get a Quote" : "Order Now"}{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ───────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: Wifi,
    title: "NFC Technology",
    desc: "Works with all modern iPhones and Android devices. Just tap — no app download required by the receiver.",
  },
  {
    icon: Globe,
    title: "Live Digital Profile",
    desc: "Your tapvybe profile updates in real time. Change your phone number, add a new social link — it's live instantly everywhere.",
  },
  {
    icon: Layers,
    title: "QR Code Backup",
    desc: "Every card also has a QR code. Works even with devices that don't support NFC, so you never miss a connection.",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Updates",
    desc: "Update your profile as many times as you want, for life.",
  },
  {
    icon: Zap,
    title: "Lead Capture",
    desc: "Built-in enquiry form on your digital profile. Visitors can leave their name, email and message directly.",
  },
  {
    icon: Shield,
    title: "Privacy Control",
    desc: "You decide what's visible. Control which details are shown to the public and which stay private.",
  },
];

function FeaturesSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="w-full px-6 sm:px-10 lg:px-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
            What's included with every card
          </h2>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
            No hidden fees. Every tapvybe card comes loaded with features out of the box.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group p-7 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg transition-all"
            >
              <div
                className="h-12 w-12 rounded-xl grid place-items-center mb-5"
                style={{ backgroundColor: "#EDE8FE" }}
              >
                <f.icon className="h-6 w-6" style={{ color: "#6B3EF0" }} />
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
function MetalCardFeature() {
  return (
    <section className="bg-white">
      <div className="w-full">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Right image first on large screens */}
          <div className="relative h-72 lg:h-[520px] order-2 lg:order-1">
            <img
              src="/tapvybe-tap-share.png"
              alt="tapvybe NFC card in use"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Left text */}
          <div className="px-8 sm:px-12 lg:px-16 py-20 order-1 lg:order-2">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-6 tracking-wide uppercase"
              style={{ backgroundColor: "#6B3EF0" }}
            >
              Smart NFC
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-black leading-tight tracking-tight">
              One tap.
              <br />
              Infinite connections.
            </h2>
            <p className="mt-5 text-base text-gray-600 leading-relaxed max-w-sm">
              Your digital profile updates live — change your details once and every card you've
              shared is updated automatically. No reprinting ever.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Works on all iOS & Android devices",
                "No app required to receive",
                "Update your profile anytime, forever",
                "Built-in QR code for universal access",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-gray-700 font-medium"
                >
                  <span
                    className="h-5 w-5 rounded-full grid place-items-center shrink-0"
                    style={{ backgroundColor: "#EDE8FE" }}
                  >
                    <Check className="h-3 w-3" style={{ color: "#6B3EF0" }} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-9 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "#6B3EF0" }}
            >
              Get Your Card <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "How does NFC work?",
    a: "NFC (Near Field Communication) is the same technology used in contactless payments. When someone taps your card to their phone, it opens your digital profile in their browser instantly. No app download required.",
  },
  {
    q: "Which phones are compatible?",
    a: "All iPhones from iPhone 7 onwards and most Android phones manufactured after 2017 support NFC. For older devices, every card also includes a QR code as a backup.",
  },
  {
    q: "Can I update my profile after I receive the card?",
    a: "Yes, as many times as you want. Your physical card stays the same — it's just a link to your live digital profile, which you can update from your tapvybe dashboard at any time.",
  },
  {
    q: "How long does it take to receive my card?",
    a: "Standard cards ship within 3–5 business days. Metal cards take 7–10 business days for production and delivery. We send you a design preview before printing.",
  },
  {
    q: "Can I order cards for my whole team?",
    a: "Absolutely. Our bulk/custom order option is designed for teams and businesses. Contact us for pricing — we offer significant discounts for orders of 10+ cards.",
  },
  {
    q: "What if the NFC stops working?",
    a: "tapvybe cards are built to last. The NFC chip has no battery and doesn't expire. In the rare case of a defect, we'll replace your card free of charge within 12 months of purchase.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="w-full px-6 sm:px-10 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Everything you need to know about tapvybe cards.
          </p>
        </div>

        <div className="space-y-2">
          {FAQS.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left text-sm font-bold text-black hover:text-[#6B3EF0] transition-colors"
              >
                {f.q}
                {open === i ? (
                  <ChevronUp className="h-4 w-4 shrink-0" style={{ color: "#6B3EF0" }} />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
                )}
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
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

/* ─── CTA ────────────────────────────────────────────────────────────────── */
function CtaSection() {
  return (
    <section className="bg-black py-20 md:py-24 text-center">
      <div className="w-full px-6 sm:px-10 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          Ready to tap in?
        </h2>
        <p className="mt-4 text-base text-gray-400 leading-relaxed">
          Order your tapvybe card today and start making connections that last.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#6B3EF0" }}
          >
            Order Your Card <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center px-8 py-3.5 rounded-full text-sm font-bold text-black bg-white hover:bg-gray-100 transition-all"
          >
            Learn About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
