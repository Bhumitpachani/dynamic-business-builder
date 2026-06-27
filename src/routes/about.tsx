import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Target, Zap, Shield, Users, Award, Globe, TrendingUp } from "lucide-react";
import { PublicLayout } from "@/components/public-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — tapvybe" },
      { name: "description", content: "Learn about tapvybe — who we are, our mission, and why we built the smartest NFC business card platform in India." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PublicLayout>
      <HeroSection />
      <StorySection />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
      <CtaSection />
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
          Built to change<br />how you connect.
        </h1>
        <p className="mt-6 text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
          We started tapvybe because paper business cards felt like a relic. We set out to build something smarter — a card that works as hard as you do.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium">
          {["Founded 2022", "Mumbai, India", "10,000+ cards shipped"].map((s) => (
            <span key={s} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full inline-block" style={{ backgroundColor: "#6B3EF0" }} />
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Story ─────────────────────────────────────────────────────────────── */
function StorySection() {
  const timeline = [
    { year: "2021", title: "The Idea", desc: "Our founders were tired of printing new business cards every time their phone number changed. There had to be a better way.", dot: "#6B3EF0" },
    { year: "2022", title: "tapvybe v1", desc: "First NFC cards produced and shipped. 50 early users in Mumbai tested the product — feedback was overwhelmingly positive.", dot: "#000" },
    { year: "2023", title: "Going Wide", desc: "Metal cards launched. Dashboard v2 released. Expanded to Pune, Bangalore, and Delhi. First 1,000 cards shipped.", dot: "#6B3EF0" },
    { year: "2024", title: "10,000+ Cards", desc: "Over 10,000 tapvybe cards now in circulation across India. Bulk/team ordering launched for companies and events.", dot: "#000" },
  ];

  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-6 tracking-wide uppercase"
              style={{ backgroundColor: "#6B3EF0" }}
            >
              How We Started
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight leading-tight">
              From a frustration<br />to a movement.
            </h2>
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed text-sm">
              <p>
                In 2021, our founding team was constantly running out of business cards at networking events. And the ones they had were always out of date — wrong number, old job title, missing Instagram handle.
              </p>
              <p>
                We knew NFC technology existed, but nothing on the market was designed for the Indian professional — affordable, good-looking, and actually easy to use.
              </p>
              <p>
                So we built tapvybe. A card that never goes out of date. A profile that updates live. One tap and your entire professional world is at their fingertips.
              </p>
              <p className="font-bold text-black">
                Today, tapvybe cards are in the pockets of professionals, founders, and sales teams across India.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {timeline.map((t, i, arr) => (
              <div key={t.year} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className="h-10 w-10 rounded-full grid place-items-center shrink-0 shadow-sm"
                    style={{ backgroundColor: t.dot }}
                  >
                    <span className="text-white text-xs font-bold">{t.year.slice(2)}</span>
                  </div>
                  {i < arr.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 my-1" />}
                </div>
                <div className="pb-8">
                  <p className="text-xs font-semibold text-gray-400 mb-0.5">{t.year}</p>
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
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">What drives us every day</h2>
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
              To make professional networking effortless for every Indian professional — regardless of industry, budget, or tech-savviness. One tap should be all it takes to make a great first impression.
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
              A world where paper business cards are a thing of the past — where every professional's contact information is always up to date, always shareable, and always on-brand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Values ─────────────────────────────────────────────────────────────── */
const VALUES = [
  { icon: Zap, title: "Speed First", desc: "From order to delivery in days, not weeks. Your card should arrive before your next networking event." },
  { icon: Heart, title: "Design Obsessed", desc: "Every card we produce is reviewed by our design team. We won't ship something we wouldn't be proud to carry." },
  { icon: Shield, title: "Built to Last", desc: "NFC chips don't expire. Your tapvybe card works today, in 5 years, and beyond — guaranteed." },
  { icon: TrendingUp, title: "Always Improving", desc: "We ship new profile features and dashboard updates every month, based on real feedback from our users." },
  { icon: Users, title: "Community Driven", desc: "Our users shape our roadmap. Every feature request is read and considered by the founding team." },
  { icon: Award, title: "Quality Guaranteed", desc: "Defective card? We replace it, free of charge, no questions asked, within 12 months of purchase." },
];

function ValuesSection() {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">The principles we build by</h2>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">These aren't slogans — they're how we make every decision, every day.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="group p-7 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all">
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

/* ─── Team ───────────────────────────────────────────────────────────────── */
const TEAM = [
  { name: "Arjun Bhatia", role: "Co-Founder & CEO", bio: "Serial entrepreneur. Obsessed with product design and the way people connect in real life.", initials: "AB" },
  { name: "Sneha Kulkarni", role: "Co-Founder & CTO", bio: "Full-stack engineer. Built the tapvybe platform end to end. Loves clean code and fast load times.", initials: "SK" },
  { name: "Rohan Desai", role: "Head of Growth", bio: "Networking veteran. Has personally handed out 500+ business cards — now he hands out tapvybe cards.", initials: "RD" },
  { name: "Meera Nair", role: "Head of Design", bio: "Every card design, every profile layout — Meera ensures it looks stunning before it ships.", initials: "MN" },
];

function TeamSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">The people behind tapvybe</h2>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">A small, passionate team building the future of professional networking.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((t, i) => (
            <div key={t.name} className="bg-gray-50 rounded-3xl p-7 border border-gray-100 text-center hover:shadow-md transition-shadow group">
              <div
                className="h-16 w-16 rounded-2xl grid place-items-center font-black text-lg text-white mx-auto mb-5 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: i % 2 === 0 ? "#6B3EF0" : "#000" }}
              >
                {t.initials}
              </div>
              <h3 className="font-bold text-black text-base">{t.name}</h3>
              <p className="text-xs font-semibold mt-0.5 mb-3" style={{ color: "#6B3EF0" }}>{t.role}</p>
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
