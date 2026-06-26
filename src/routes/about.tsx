import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Target, Zap, Shield, Users, Award, Globe, TrendingUp, CheckCircle } from "lucide-react";
import { PublicLayout } from "@/components/public-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — BizPlatform" },
      { name: "description", content: "Learn about BizPlatform — who we are, our mission, and why we built the leading multi-tenant business website platform for digital agencies." },
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

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-20 md:py-32 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-800/20 via-transparent to-transparent" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 text-xs font-semibold border border-indigo-700/50 mb-6">Our Story</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Built by agencies,{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">for agencies</span>
        </h1>
        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          We started BizPlatform because we were frustrated with the same problem every agency faces: clients need professional websites, but building them from scratch is slow, expensive, and hard to scale.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
          <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-400" /> Founded 2022</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-400" /> Mumbai, India</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-400" /> 500+ clients served</span>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Story text */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold border border-indigo-100 mb-5">How We Started</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">From a broken process to a platform</h2>
            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
              <p>
                In 2021, our founding team was running a small digital agency in Mumbai. We had 40+ small business clients — boutiques, restaurants, salons, clinics — each needing a professional website. We were spending 2–3 weeks per client just to get a basic site live.
              </p>
              <p>
                The problem wasn't our team's ability. It was the tools. Everything was built for developers, not for businesses. Nothing was built for the kind of scale an agency needs.
              </p>
              <p>
                So we built BizPlatform — a platform where setting up a client's complete digital presence takes under an hour, and once it's live, the client can manage it themselves without calling us for every small change.
              </p>
              <p className="font-semibold text-slate-800">
                Today, we serve agencies across India helping them manage hundreds of business websites from a single dashboard.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {[
              { year: "2021", title: "The Problem", desc: "Founding team struggles with scaling a digital agency. Each client website takes 2–3 weeks to build.", color: "bg-rose-500" },
              { year: "2022", title: "BizPlatform v1", desc: "First version launched internally. Agency cuts delivery time from weeks to hours. First 10 paying agencies onboard.", color: "bg-amber-500" },
              { year: "2023", title: "Public Launch", desc: "Platform opens to all agencies. Product catalogue, gallery, CRM, and appointment systems added.", color: "bg-indigo-500" },
              { year: "2024", title: "500+ Businesses", desc: "Platform reaches 500+ live business websites. WhatsApp integration and analytics dashboard launch.", color: "bg-emerald-500" },
            ].map((t, i, arr) => (
              <div key={t.year} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full ${t.color} grid place-items-center shrink-0 shadow-md`}>
                    <span className="text-white text-xs font-bold">{t.year.slice(2)}</span>
                  </div>
                  {i < arr.length - 1 && <div className="w-0.5 h-full bg-slate-200 my-1" />}
                </div>
                <div className={`pb-8 ${i === arr.length - 1 ? "" : ""}`}>
                  <p className="text-xs font-semibold text-slate-400 mb-0.5">{t.year}</p>
                  <h4 className="font-bold text-slate-900 text-sm">{t.title}</h4>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-semibold border border-purple-100 mb-4">Mission & Vision</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">What drives us every day</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-10 text-white">
            <div className="h-14 w-14 rounded-2xl bg-white/20 grid place-items-center mb-6">
              <Target className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-black mb-4">Our Mission</h3>
            <p className="text-indigo-100 leading-relaxed text-base">
              To make professional digital presence accessible to every business in India — regardless of size, budget, or technical ability. We believe every local business deserves a world-class online presence.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm">
            <div className="h-14 w-14 rounded-2xl bg-emerald-100 grid place-items-center mb-6">
              <Globe className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed text-base">
              A future where every Indian small business is discoverable online — where a local tailor in Jaipur has the same digital tools as a Fortune 500 company, and uses them just as easily.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const VALUES = [
  { icon: Zap, title: "Speed First", desc: "Every feature we build prioritizes speed — speed to launch, speed to update, speed to grow.", color: "bg-amber-100 text-amber-600" },
  { icon: Heart, title: "Client Obsession", desc: "We build for agencies and their clients, not for ourselves. Every decision starts with the user.", color: "bg-rose-100 text-rose-600" },
  { icon: Shield, title: "Reliability", desc: "99.9% uptime. Your clients' websites never go down. We take that responsibility seriously.", color: "bg-blue-100 text-blue-600" },
  { icon: TrendingUp, title: "Continuous Growth", desc: "We ship new features every month, driven by feedback from our agency community.", color: "bg-emerald-100 text-emerald-600" },
  { icon: Users, title: "Community", desc: "We've built a community of 100+ agency owners who share tips, strategies, and referrals.", color: "bg-violet-100 text-violet-600" },
  { icon: Award, title: "Excellence", desc: "We don't ship anything we wouldn't be proud to show our own clients. Quality is non-negotiable.", color: "bg-indigo-100 text-indigo-600" },
];

function ValuesSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-100 mb-4">Our Values</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">The principles we build by</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">These values aren't slogans — they're how we make every product decision, every day.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50 transition-all group">
              <div className={`h-12 w-12 rounded-xl ${v.color} grid place-items-center mb-4 group-hover:scale-110 transition-transform`}>
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TEAM = [
  { name: "Arjun Bhatia", role: "Co-Founder & CEO", bio: "10+ years building digital products. Previously led product at two Y Combinator startups.", avatar: "A", color: "bg-indigo-100 text-indigo-700" },
  { name: "Sneha Kulkarni", role: "Co-Founder & CTO", bio: "Full-stack engineer. Built the platform from the ground up. Loves clean architecture and fast UIs.", avatar: "S", color: "bg-emerald-100 text-emerald-700" },
  { name: "Rohan Desai", role: "Head of Growth", bio: "Agency veteran with 8 years helping businesses go digital across Mumbai, Pune, and Bangalore.", avatar: "R", color: "bg-amber-100 text-amber-700" },
  { name: "Meera Nair", role: "Head of Design", bio: "UX designer who obsesses over simplicity. Every screen she designs can be understood in 3 seconds.", avatar: "M", color: "bg-rose-100 text-rose-700" },
];

function TeamSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold border border-emerald-100 mb-4">Our Team</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">The people behind the platform</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">A small team with a big mission. We're hiring — come build the future of business websites with us.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((t) => (
            <div key={t.name} className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className={`h-16 w-16 rounded-2xl ${t.color} grid place-items-center font-black text-2xl mx-auto mb-5`}>{t.avatar}</div>
              <h3 className="font-bold text-slate-900 text-base">{t.name}</h3>
              <p className="text-xs text-indigo-600 font-semibold mt-0.5 mb-3">{t.role}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{t.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Want to join our journey?</h2>
        <p className="mt-5 text-lg text-slate-600">Whether you're an agency, a business owner, or a talented engineer — we'd love to hear from you.</p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold border-2 border-slate-300 text-slate-700 rounded-2xl hover:border-indigo-400 hover:text-indigo-600 transition-all">
            View Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
