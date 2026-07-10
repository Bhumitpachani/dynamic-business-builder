import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Heart,
  Target,
  Zap,
  Shield,
  Users,
  Award,
  Globe,
  TrendingUp,
  Leaf,
  Handshake,
} from "lucide-react";
import { PublicLayout } from "@/components/public-layout";
import { LazySection } from "@/components/lazy-section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — tapvybe" },
      {
        name: "description",
        content:
          "Learn about tapvybe — who we are, our mission, and why we built the smartest NFC business card platform in India.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PublicLayout>
      <HeroSection />
      <LazySection><StorySection /></LazySection>
      <LazySection><MissionSection /></LazySection>
      <LazySection><PhilosophySection /></LazySection>
      <LazySection><ValuesSection /></LazySection>
      {/* <TeamSection /> */}
      {/* <CtaSection /> */}
      <LazySection><DigitalRevolutionSection /></LazySection>
    </PublicLayout>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="bg-white py-20 md:py-28 text-center">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-6 tracking-wide uppercase"
          style={{ backgroundColor: "#6B3EF0" }}
        >
          Our Story
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-[1.1]">
          Built to change
          <br />
          how you connect.
        </h1>
        <p className="mt-6 text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
          We started tapvybe because paper business cards felt like a relic. We set out to build
          something smarter — a card that works as hard as you do.
        </p>
      </div>
    </section>
  );
}

/* ─── Story ─────────────────────────────────────────────────────────────── */
function StorySection() {
  const timeline = [
    {
      icon: Zap,
      title: "The Spark",
      desc: "We saw professionals still handing out paper cards in a digital-first world. There had to be a smarter way to connect.",
      dot: "#6B3EF0",
    },
    {
      icon: Shield,
      title: "First Tap",
      desc: "tapvybe launched its first NFC cards. One tap replaced a hundred paper cards — and professionals never looked back.",
      dot: "#000",
    },
    {
      icon: Globe,
      title: "Growing Fast",
      desc: "Metal cards, custom designs, and bulk orders launched. tapvybe expanded across India — city by city, tap by tap.",
      dot: "#6B3EF0",
    },
    {
      icon: Award,
      title: "10,000+ Identities",
      desc: "Over 10,000 digital identities created. tapvybe became the go-to NFC card platform for professionals across India.",
      dot: "#000",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Why TAPVYBE text */}
          <div>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-6 tracking-wide uppercase"
              style={{ backgroundColor: "#6B3EF0" }}
            >
              Why TAPVYBE?
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight leading-tight">
              We don't just create NFC cards.
              <br />
              <span style={{ color: "#6B3EF0" }}>We build digital identities.</span>
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-sm">
              <p className="text-gray-600">
                Every product we design is focused on helping businesses look more professional, build stronger trust, and create memorable first impressions.
              </p>
              <p className="font-bold text-black">
                Because networking shouldn't end when someone puts your card in their pocket.
              </p>
              <p className="font-bold" style={{ color: "#6B3EF0" }}>
                It should begin the moment they tap it.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {timeline.map((t, i, arr) => (
              <div key={t.title} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className="h-10 w-10 rounded-full grid place-items-center shrink-0 shadow-sm"
                    style={{ backgroundColor: t.dot }}
                  >
                    <t.icon className="h-5 w-5 text-white" />
                  </div>
                  {i < arr.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 my-1" />}
                </div>
                <div className="pb-8">
                  <h4 className="font-bold text-black text-sm">{t.title}</h4>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Mission ────────────────────────────────────────────────────────────── */
function MissionSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
            What drives us every day
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Mission — dark */}
          <div className="bg-black rounded-3xl p-10 text-white">
            <div
              className="h-14 w-14 rounded-2xl grid place-items-center mb-6"
              style={{ backgroundColor: "rgba(107,62,240,0.20)" }}
            >
              <Target className="h-7 w-7" style={{ color: "#6B3EF0" }} />
            </div>
            <h3 className="text-2xl font-black mb-4">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed text-base">
              To make professional digital identity accessible, affordable, and effortless for every
              business. Whether you're a freelancer, entrepreneur, startup, salesperson, consultant,
              or established company, we believe your identity should be available instantly — with
              just one tap.
            </p>
          </div>
          {/* Vision — light */}
          <div className="bg-gray-50 rounded-3xl p-10 border border-gray-200">
            <div
              className="h-14 w-14 rounded-2xl grid place-items-center mb-6"
              style={{ backgroundColor: "#EDE8FE" }}
            >
              <Globe className="h-7 w-7" style={{ color: "#6B3EF0" }} />
            </div>
            <h3 className="text-2xl font-black text-black mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed text-base">
              At TAPVYBE, we believe technology should create a smarter and greener future. By
              replacing disposable paper business cards with reusable NFC cards, we aim to reduce
              paper waste, encourage recycling, and inspire people to plant more trees.
              <br />
              <br />
              <span className="font-bold text-black">
                Less Paper. More Trees. Smarter Connections.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Philosophy ─────────────────────────────────────────────────────────── */
function PhilosophySection() {
  return (
    <section className="bg-black py-20 md:py-28 text-center">
      <div className="w-full mx-auto px-6 sm:px-8">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-6 tracking-wide uppercase"
          style={{ backgroundColor: "#6B3EF0" }}
        >
          Our Philosophy
        </span>
        <h5 className="text-[clamp(0.95rem,4.4vw,2.75rem)] font-black text-white tracking-tight leading-tight whitespace-nowrap">
          We don't just create NFC cards.
        </h5>
        <h2
          className="mt-1 text-[clamp(0.95rem,4.4vw,2.75rem)] font-black tracking-tight leading-tight whitespace-nowrap"
          style={{ color: "#6B3EF0" }}
        >
          We build digital identities.
        </h2>
        <p className="mt-6 text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
          Every product we design is focused on helping businesses look more professional, build
          stronger trust, and create memorable first impressions.
        </p>
        <p className="mt-4 text-base font-bold text-white leading-relaxed">
          Because networking shouldn't end when someone puts your card in their pocket.
        </p>
        <p className="mt-2 text-base font-bold" style={{ color: "#6B3EF0" }}>
          It should begin the moment they tap it.
        </p>
      </div>
    </section>
  );
}

/* ─── Values ─────────────────────────────────────────────────────────────── */
const VALUES = [
  {
    icon: Zap,
    title: "Innovation First",
    desc: "We embrace technology that simplifies business communication.",
  },
  {
    icon: Award,
    title: "Professional by Design",
    desc: "Every interaction should leave a lasting impression.",
  },
  {
    icon: Heart,
    title: "Affordable for Everyone",
    desc: "Digital transformation shouldn't be limited to large companies.",
  },
  {
    icon: TrendingUp,
    title: "Customer Success",
    desc: "Your growth is our greatest achievement.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "Every NFC card replaces hundreds of paper cards — we're building a greener way to connect.",
  },
  {
    icon: Handshake,
    title: "Trust & Transparency",
    desc: "We build long-term relationships by being honest, reliable, and always putting people first.",
  },
];

function ValuesSection() {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">Our Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="group p-7 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all"
            >
              <div
                className="h-12 w-12 rounded-xl grid place-items-center mb-5 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: "#EDE8FE" }}
              >
                <v.icon className="h-6 w-6" style={{ color: "#6B3EF0" }} />
              </div>
              <h3 className="font-bold text-black mb-2">{v.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Digital Revolution ─────────────────────────────────────────────────── */
function DigitalRevolutionSection() {
  return (
    <section className="bg-black py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-8 tracking-wide uppercase"
          style={{ backgroundColor: "#6B3EF0" }}
        >
          Join the Digital Revolution
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-8">
          The future of networking isn't paper.
        </h2>
        <div className="space-y-4 mb-10">
          {["It's instant.", "It's interactive.", "It's memorable."].map((line) => (
            <p key={line} className="text-xl md:text-2xl font-semibold text-white">
              {line}
            </p>
          ))}
        </div>
        <p className="text-base md:text-lg text-gray-400 leading-relaxed">
          Whether you're meeting a client, attending an event, closing a deal, or growing your
          brand,{" "}
          <span className="text-white font-semibold">
            TAPVYBE helps you make every connection count.
          </span>
        </p>
      </div>
    </section>
  );
}

/* ─── Team ───────────────────────────────────────────────────────────────── */
const TEAM = [
  {
    name: "Arjun Bhatia",
    role: "Co-Founder & CEO",
    bio: "Serial entrepreneur. Obsessed with product design and the way people connect in real life.",
    initials: "AB",
  },
  {
    name: "Sneha Kulkarni",
    role: "Co-Founder & CTO",
    bio: "Full-stack engineer. Built the tapvybe platform end to end. Loves clean code and fast load times.",
    initials: "SK",
  },
  {
    name: "Rohan Desai",
    role: "Head of Growth",
    bio: "Networking veteran. Has personally handed out 500+ business cards — now he hands out tapvybe cards.",
    initials: "RD",
  },
  {
    name: "Meera Nair",
    role: "Head of Design",
    bio: "Every card design, every profile layout — Meera ensures it looks stunning before it ships.",
    initials: "MN",
  },
];

function TeamSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
            The people behind tapvybe
          </h2>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
            A small, passionate team building the future of professional networking.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((t, i) => (
            <div
              key={t.name}
              className="bg-gray-50 rounded-3xl p-7 border border-gray-100 text-center hover:shadow-md transition-shadow group"
            >
              <div
                className="h-16 w-16 rounded-2xl grid place-items-center font-black text-lg text-white mx-auto mb-5 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: i % 2 === 0 ? "#6B3EF0" : "#000" }}
              >
                {t.initials}
              </div>
              <h3 className="font-bold text-black text-base">{t.name}</h3>
              <p className="text-xs font-semibold mt-0.5 mb-3" style={{ color: "#6B3EF0" }}>
                {t.role}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">{t.bio}</p>
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
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          Want to join our journey?
        </h2>
        <p className="mt-4 text-base text-gray-400 leading-relaxed">
          Whether you're a professional, a business, or a team — tapvybe has a card for you.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#6B3EF0" }}
          >
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center px-8 py-3.5 rounded-full text-sm font-bold text-black bg-white hover:bg-gray-100 transition-all"
          >
            View Our Cards
          </Link>
        </div>
      </div>
    </section>
  );
}
