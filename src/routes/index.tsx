import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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

function Landing() {
  return (
    <PublicLayout>
      <HeroSection />
      <HowItWorksSection />
      <MetalCardSection />
      <CtaSection />
    </PublicLayout>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="bg-white min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center py-16 md:py-24">

          {/* Left — Text */}
          <div className="max-w-lg">
            <h1 className="text-4xl sm:text-5xl font-black text-black leading-[1.1] tracking-tight">
              The only business<br />card you'll ever need.
            </h1>
            <p className="mt-6 text-base text-gray-600 leading-relaxed">
              Introducing tapvybe - a revolutionary smart business card that allows you to exchange contact, collect data, and direct your potential customer, guest, or attendee to the info they need to know!
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ backgroundColor: "#E8735A" }}
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-black border-2 border-black transition-all hover:bg-black hover:text-white"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right — Phone mockup (tilted) */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative w-72 sm:w-80 lg:w-96"
              style={{ transform: "perspective(1200px) rotateY(-15deg) rotateX(5deg) rotate(3deg)" }}
            >
              <img
                src="/hero-phone-mockup.jpeg"
                alt="tapvybe app on phone"
                className="w-full rounded-[2.5rem] shadow-2xl"
                style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.18), 0 10px 30px rgba(0,0,0,0.12)" }}
              />
              {/* Phone frame overlay */}
              <div
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
                  border: "1.5px solid rgba(255,255,255,0.3)"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── How it Works ──────────────────────────────────────────────────────── */
const HOW_STEPS = [
  {
    title: "Smart NFC Card",
    desc: "Design your NFC card with our design tool or send us your details so we will design your card using your logo and industry. We will send preview for your approval before printing.",
    img: "/how-it-works.jpeg",
    objectPosition: "left center",
  },
  {
    title: "Your Online Profile",
    desc: "Our platform generates free online profile/website associated with your NFC card. You can alter and update the content at any time by utilizing your tapvybe dashboard.",
    img: "/how-it-works.jpeg",
    objectPosition: "center center",
  },
  {
    title: "Tap, Share & Save",
    desc: "Share business profile and contact info easily by tapping card on devices. No app needed, saves time and makes connections quickly.",
    img: "/how-it-works.jpeg",
    objectPosition: "right center",
  },
];

function HowItWorksSection() {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-3xl md:text-4xl font-black text-black text-center mb-14 tracking-tight">
          How it Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {HOW_STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {/* Circular image */}
              <div className="relative h-52 w-52 rounded-full overflow-hidden mb-7 bg-gray-200">
                <img
                  src={step.img}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: step.objectPosition }}
                />
              </div>
              <h3 className="text-xl font-black text-black mb-3">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">{step.desc}</p>
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
    <section className="bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 items-center">

          {/* Left — Text */}
          <div className="px-8 sm:px-12 lg:px-16 py-20 md:py-28">
            <h2 className="text-3xl sm:text-4xl font-black text-black leading-tight tracking-tight">
              Premium Metal,<br />Powerful Tech
            </h2>
            <p className="mt-5 text-base text-gray-600 leading-relaxed max-w-sm">
              tapvybe Metal NFC Cards are where elegance meets innovation. One tap is all it takes.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center mt-8 px-7 py-3 rounded-full text-sm font-bold text-white tracking-wide uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: "#E8735A" }}
            >
              tapvybe Metal Cards
            </Link>
          </div>

          {/* Right — Full-height image */}
          <div className="relative h-80 lg:h-[560px]">
            <img
              src="/metal-card-laser.jpeg"
              alt="Metal NFC card laser engraving"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────────────── */
function CtaSection() {
  return (
    <section className="bg-black py-20 md:py-24 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          Ready to tap in?
        </h2>
        <p className="mt-4 text-base text-gray-400 leading-relaxed">
          Join thousands of professionals already using tapvybe to make lasting impressions.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#E8735A" }}
          >
            Get Your tapvybe Card <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center px-8 py-3.5 rounded-full text-sm font-bold text-black bg-white hover:bg-gray-100 transition-all"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
