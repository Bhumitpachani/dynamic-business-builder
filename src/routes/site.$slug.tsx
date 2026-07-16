import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { store, isExpired, newId, type Business, type Inquiry, type Appointment } from "@/lib/store";

import { Phone, MessageCircle, MapPin, Globe, Star, Facebook, Instagram, Twitter, Linkedin, Youtube, UserPlus, QrCode, X, Download, Loader2 } from "lucide-react";
import { LazySection } from "@/components/lazy-section";

export const Route = createFileRoute("/site/$slug")({
  component: PublicSite,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-slate-50 p-4 text-center">
      <div>
        <h1 className="text-3xl font-bold">Site Not Found</h1>
        <p className="text-slate-500 mt-2">This business website doesn't exist.</p>
      </div>
    </div>
  ),
});

// ── Skeleton ────────────────────────────────────────────────────────────────

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />;
}

function SiteSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Cover skeleton */}
      <div className="h-56 md:h-72 bg-slate-300 animate-pulse" />

      <div className="max-w-3xl mx-auto px-4 -mt-20 relative">
        {/* Hero card skeleton */}
        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6">
          <div className="flex items-start gap-4">
            <Skeleton className="h-28 w-28 rounded-2xl shrink-0 -mt-16" />
            <div className="flex-1 min-w-0 pt-1 space-y-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-5">
            {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
          </div>
        </div>

        {/* Content skeletons */}
        {[0, 1, 2].map((i) => (
          <div key={i} className="mt-4 bg-white rounded-2xl border p-5 space-y-3">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main ────────────────────────────────────────────────────────────────────

function PublicSite() {
  const { slug } = useParams({ from: "/site/$slug" });
  const [biz, setBiz] = useState<Business | null | undefined>(undefined);
  const [showInquiry, setShowInquiry] = useState(false);
  const [showAppt, setShowAppt] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showSaveContact, setShowSaveContact] = useState(false);
  const [downloadingCard, setDownloadingCard] = useState(false);

  useEffect(() => {
    store.getBySlug(slug).then((b) => {
      setBiz(b ?? null);
      if (b) {
        store.incrementVisit(slug).catch(() => {});
        // Show save-contact prompt once per session — minimal delay so modal
        // appears right after the hero card paints, not seconds later.
        const key = `tapvybe_saved_${slug}`;
        if (!sessionStorage.getItem(key)) {
          setTimeout(() => setShowSaveContact(true), 300);
        }
      }
    });
  }, [slug]);

  // Show skeleton while loading (instead of bare "Loading…")
  if (biz === undefined) return <SiteSkeleton />;

  if (biz === null) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 p-4 text-center">
        <div>
          <h1 className="text-3xl font-bold">Site Not Found</h1>
          <p className="text-slate-500 mt-2">This business website doesn't exist.</p>
        </div>
      </div>
    );
  }

  if (isExpired(biz)) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 p-4 text-center">
        <div>
          <h1 className="text-2xl font-bold">Site Temporarily Unavailable</h1>
          <p className="text-slate-500 mt-2">This business website is currently inactive. Please contact the owner.</p>
        </div>
      </div>
    );
  }

  const primary = biz.theme.primary || "#2563eb";
  const waLink = biz.whatsapp ? `https://wa.me/${biz.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%2C%20I%20found%20you%20via%20your%20website` : "";
  const liveUrl = `${window.location.origin}/site/${slug}`;

  // vCard as a data URI so the "Save Contact" tile still works when the page
  // has been cloned into a standalone downloaded file (no React/JS there).
  const vcardHref = (() => {
    const vc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
    const displayName = biz.name?.trim() || "Contact";
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${vc(displayName)}`,
      `ORG:${vc(displayName)}`,
      biz.phone ? `TEL;TYPE=CELL:${biz.phone.replace(/\s/g, "")}` : "",
      biz.whatsapp && biz.whatsapp !== biz.phone ? `TEL;TYPE=WORK:${biz.whatsapp.replace(/\s/g, "")}` : "",
      biz.email ? `EMAIL:${biz.email.trim()}` : "",
      biz.address ? `ADR:;;${vc(biz.address)};;;;` : "",
      biz.websiteLink ? `URL:${biz.websiteLink.trim()}` : "",
      "END:VCARD",
    ].filter(Boolean).join("\r\n");
    return `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`;
  })();

  function saveContact() {
    const b = biz!;

    // Escape a string for vCard 3.0 (backslash, semicolon, comma, newlines).
    const vc = (s: string) =>
      s.replace(/\\/g, "\\\\")
       .replace(/;/g, "\\;")
       .replace(/,/g, "\\,")
       .replace(/\r?\n/g, "\\n");

    const displayName = b.name?.trim() || "Contact";
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${vc(displayName)}`,
      `ORG:${vc(displayName)}`,
      b.phone    ? `TEL;TYPE=CELL:${b.phone.replace(/\s/g, "")}`   : "",
      b.whatsapp && b.whatsapp !== b.phone
                 ? `TEL;TYPE=WORK:${b.whatsapp.replace(/\s/g, "")}` : "",
      b.email    ? `EMAIL:${b.email.trim()}`                         : "",
      b.address  ? `ADR:;;${vc(b.address)};;;;`                      : "",
      b.websiteLink ? `URL:${b.websiteLink.trim()}`                   : "",
      "END:VCARD",
    ].filter(Boolean).join("\r\n");

    // Serve the vCard directly (no `download` attribute, no intermediate
    // HTML page) — mobile browsers recognize the text/vcard MIME type and
    // open the native "Add to Contacts" screen instead of saving a file.
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, "_blank");
    if (!w) window.location.href = url;
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  async function downloadCard() {
    const b = biz!;
    const he = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const displayName = b.name?.trim() || "Business";
    const safeName = displayName.replace(/[^a-z0-9]/gi, "_").replace(/_+/g, "_").replace(/^_|_$/g, "") || "card";

    const root = document.getElementById("tapvybe-card-root");
    if (!root) return;
    if (downloadingCard) return;
    setDownloadingCard(true);
    try {
    const clone = root.cloneNode(true) as HTMLElement;

    // Strip anything that only makes sense on the live, scripted page (the
    // "Download Card" button itself would be dead weight inside its own file).
    clone.querySelectorAll("[data-dl-remove]").forEach((el) => el.remove());

    // The quick actions / CTA buttons rely on React onClick handlers that
    // won't exist in a plain downloaded file — swap each for a real <a> so
    // it still works standalone.
    clone.querySelectorAll<HTMLElement>("[data-dl-href]").forEach((el) => {
      const href = el.getAttribute("data-dl-href")!;
      const a = document.createElement("a");
      a.href = href;
      a.className = el.className;
      a.innerHTML = el.innerHTML;
      if (!href.startsWith("data:") && !href.startsWith("tel:")) a.target = "_blank";
      el.replaceWith(a);
    });

    // Lazily-loaded images stay invisible (opacity-0 + shimmer skeleton)
    // until their onLoad fires — there's no React here to fire it, so force
    // every image visible and drop the now-permanent shimmer placeholders.
    clone.querySelectorAll(".animate-pulse").forEach((el) => el.remove());
    clone.querySelectorAll("img").forEach((img) => {
      img.classList.remove("opacity-0");
      img.classList.add("opacity-100");
    });

    // Inline every image as base64 so the file is genuinely self-contained —
    // works offline, and never breaks if the original URL later changes.
    // Bounded by a timeout so one slow/CORS-blocked image can't hang the
    // whole download — it just falls back to the original URL instead.
    const toDataUri = (src: string) =>
      fetch(src)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.blob();
        })
        .then(
          (blob) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = () => reject(reader.error);
              reader.readAsDataURL(blob);
            })
        );
    const withTimeout = <T,>(p: Promise<T>, ms: number) =>
      new Promise<T>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error("timed out")), ms);
        p.then(
          (v) => { clearTimeout(timer); resolve(v); },
          (e) => { clearTimeout(timer); reject(e); },
        );
      });
    await Promise.all(
      Array.from(clone.querySelectorAll("img")).map(async (img) => {
        const src = img.getAttribute("src");
        if (!src || src.startsWith("data:")) return;
        try {
          img.src = await withTimeout(toDataUri(src), 8000);
        } catch (err) {
          // Leave the original URL — better a working link than a broken one.
          console.warn("[downloadCard] couldn't inline image, keeping original URL:", src, err);
        }
      })
    );

    // Inline the site's actual CSS as text (not a <link>) — reading it straight
    // off document.styleSheets/adoptedStyleSheets works no matter how the
    // build tool injected it, and keeps the file working fully offline.
    const cssParts: string[] = [];
    const seen = new Set<CSSStyleSheet>();
    const addSheet = (sheet: CSSStyleSheet) => {
      if (seen.has(sheet)) return;
      seen.add(sheet);
      try {
        const text = Array.from(sheet.cssRules).map((r) => r.cssText).join("\n");
        if (text) cssParts.push(text);
      } catch {
        if (sheet.href) cssParts.push(`@import url("${sheet.href}");`);
      }
    };
    Array.from(document.styleSheets).forEach(addSheet);
    (document.adoptedStyleSheets || []).forEach(addSheet);

    const html = `<!DOCTYPE html>
<html lang="en" class="${document.documentElement.className}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${he(displayName)} — tapvybe Card</title>
<style>${cssParts.join("\n")}</style>
</head>
<body class="${document.body.className}">
${clone.outerHTML}
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeName}_tapvybe_card.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    } finally {
      setDownloadingCard(false);
    }
  }

  return (
    <div id="tapvybe-card-root" className="min-h-screen bg-slate-50 pb-24" style={{ ["--brand" as any]: primary }}>
      {/* Cover — proper <img> so browser can prioritize it immediately */}
      <div className="relative h-56 md:h-72 bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden">
        {biz.coverImage && (
          <img
            src={biz.coverImage}
            alt=""
            aria-hidden
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-20 relative">
        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6">
          <div className="flex items-start gap-4">
            {biz.logo ? (
              // Logo is above the fold — load eagerly
              <img
                src={biz.logo}
                className="h-28 w-28 rounded-2xl object-cover border-4 border-white shadow-xl -mt-16 shrink-0 p-1 bg-white"
                alt={biz.name}
                fetchPriority="high"
                decoding="async"
                loading="eager"
              />
            ) : (
              <div className="h-28 w-28 rounded-2xl grid place-items-center text-white text-4xl font-black border-4 border-white shadow-xl -mt-16 shrink-0" style={{ background: primary }}>
                {biz.name[0]?.toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1 pt-1">
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 truncate">{biz.name}</h1>
              {biz.category && <span className="inline-block text-xs px-2.5 py-0.5 rounded-full mt-1.5 font-semibold" style={{ background: primary + "20", color: primary }}>{biz.category}</span>}
              {biz.tagline && <p className="text-sm text-slate-600 mt-2 leading-relaxed">{biz.tagline}</p>}
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
            {biz.phone && <a href={`tel:${biz.phone}`} className="flex flex-col items-center gap-1 p-3 rounded-xl border hover:shadow text-xs font-medium transition-shadow"><Phone className="h-5 w-5" style={{ color: primary }} /> Call</a>}
            {waLink && <a href={waLink} target="_blank" className="flex flex-col items-center gap-1 p-3 rounded-xl border hover:shadow text-xs font-medium transition-shadow"><MessageCircle className="h-5 w-5 text-green-600" /> WhatsApp</a>}
            {biz.mapsLink && <a href={biz.mapsLink} target="_blank" className="flex flex-col items-center gap-1 p-3 rounded-xl border hover:shadow text-xs font-medium transition-shadow"><MapPin className="h-5 w-5 text-red-600" /> Directions</a>}
            <button onClick={saveContact} data-dl-href={vcardHref} className="flex flex-col items-center gap-1 p-3 rounded-xl border hover:shadow text-xs font-medium transition-shadow"><UserPlus className="h-5 w-5" style={{ color: primary }} /> Save Contact</button>
          </div>
        </div>

        {/* About */}
        {biz.about && (
          <LazySection rootMargin="500px">
            <Section title="About">
              <p className="text-sm text-slate-700 whitespace-pre-wrap">{biz.about}</p>
            </Section>
          </LazySection>
        )}

        {/* Products */}
        {biz.products.length > 0 && (
          <LazySection rootMargin="500px">
            <Section title="Products & Services">
              <div className="grid sm:grid-cols-2 gap-3">
                {biz.products.map((p, idx) => (
                  <div key={p.id} className="border rounded-xl overflow-hidden bg-white">
                    {p.image && (
                      <LazyImage
                        src={p.image}
                        alt={p.name}
                        className="w-full h-40 object-cover"
                        eager={idx < 2}
                      />
                    )}
                    <div className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-sm">{p.name}</h3>
                        {p.price && <span className="text-sm font-bold shrink-0" style={{ color: primary }}>{p.price}</span>}
                      </div>
                      {p.description && <p className="text-xs text-slate-600 mt-1">{p.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </LazySection>
        )}

        {/* Gallery */}
        {biz.gallery.length > 0 && (
          <LazySection rootMargin="500px">
            <Section title="Gallery">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {biz.gallery.map((g) => (
                  <div key={g.id} className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                    {g.image && (
                      <LazyImage
                        src={g.image}
                        alt={g.caption}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </Section>
          </LazySection>
        )}

        {/* CTA */}
        <LazySection rootMargin="500px">
          <Section title="Get in Touch">
            <div className="grid sm:grid-cols-2 gap-2">
              <button onClick={() => setShowInquiry(true)} data-dl-href={liveUrl} className="py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90" style={{ background: primary }}>Send Inquiry</button>
              <button onClick={() => setShowAppt(true)} data-dl-href={liveUrl} className="py-3 rounded-xl font-semibold border-2 transition-colors hover:opacity-90" style={{ borderColor: primary, color: primary }}>Book Appointment</button>
            </div>
          </Section>
        </LazySection>

        {/* Location */}
        {(biz.address || biz.mapsLink) && (
          <LazySection rootMargin="500px">
            <Section title="Location">
              {biz.address && <p className="text-sm text-slate-700">{biz.address}</p>}
              {biz.mapsLink && <a href={biz.mapsLink} target="_blank" className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium" style={{ color: primary }}><MapPin className="h-4 w-4" /> Open in Google Maps</a>}
            </Section>
          </LazySection>
        )}

        {/* Links */}
        <LazySection rootMargin="500px">
          <Section title="Links">
            <div className="flex flex-wrap gap-2">
              {biz.websiteLink && <LinkChip icon={Globe} label="Website" href={biz.websiteLink} />}
              {biz.googleReviewLink && <LinkChip icon={Star} label="Review on Google" href={biz.googleReviewLink} color="#f59e0b" />}
              {biz.social.facebook && <LinkChip icon={Facebook} label="Facebook" href={biz.social.facebook} color="#1877f2" />}
              {biz.social.instagram && <LinkChip icon={Instagram} label="Instagram" href={biz.social.instagram} color="#e4405f" />}
              {biz.social.twitter && <LinkChip icon={Twitter} label="Twitter" href={biz.social.twitter} color="#1da1f2" />}
              {biz.social.linkedin && <LinkChip icon={Linkedin} label="LinkedIn" href={biz.social.linkedin} color="#0a66c2" />}
              {biz.social.youtube && <LinkChip icon={Youtube} label="YouTube" href={biz.social.youtube} color="#ff0000" />}
              {(biz.paymentQr || biz.upiId) && <button onClick={() => setShowQR(true)} data-dl-href={liveUrl} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm font-medium hover:bg-slate-50"><QrCode className="h-4 w-4" /> Pay</button>}
            </div>
          </Section>
        </LazySection>

        <LazySection rootMargin="500px">
          <div data-dl-remove="true" className="mt-4 bg-white rounded-2xl border p-5 text-center">
            <p className="text-sm font-semibold text-slate-700 mb-1">Save this card for later</p>
            <p className="text-xs text-slate-500 mb-4">Download a copy of this profile you can open anytime, even offline.</p>
            <button
              onClick={downloadCard}
              disabled={downloadingCard}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: primary }}
            >
              {downloadingCard ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Preparing…
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download Card
                </>
              )}
            </button>
          </div>
        </LazySection>

        <LazySection rootMargin="500px">
          <p className="text-center text-xs text-slate-400 py-6">Powered by tapvybe</p>
        </LazySection>
      </div>

      {/* Sticky bottom bar mobile */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t p-2 grid grid-cols-3 gap-2 sm:hidden z-40">
        {biz.phone && <a href={`tel:${biz.phone}`} className="py-2.5 rounded-lg text-white text-sm font-semibold text-center" style={{ background: primary }}>Call</a>}
        {waLink && <a href={waLink} target="_blank" className="py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold text-center">WhatsApp</a>}
        <button onClick={() => setShowInquiry(true)} data-dl-href={liveUrl} className="py-2.5 rounded-lg border text-sm font-semibold">Inquiry</button>
      </div>

      {showInquiry && <InquiryModal biz={biz} onClose={() => setShowInquiry(false)} />}
      {showAppt && <AppointmentModal biz={biz} onClose={() => setShowAppt(false)} />}
      {showQR && <QRModal biz={biz} onClose={() => setShowQR(false)} />}
      {showSaveContact && (
        <SaveContactModal
          biz={biz}
          primary={primary}
          onSave={() => {
            saveContact();
            sessionStorage.setItem(`tapvybe_saved_${slug}`, "1");
            setShowSaveContact(false);
          }}
          onClose={() => {
            sessionStorage.setItem(`tapvybe_saved_${slug}`, "1");
            setShowSaveContact(false);
          }}
        />
      )}
    </div>
  );
}

// ── LazyImage — shows a shimmer placeholder until the image loads ─────────────

function LazyImage({ src, alt, className, eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-slate-200" />}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

// ── Shared components ─────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 bg-white rounded-2xl border p-5">
      <h2 className="font-bold text-slate-900 mb-3">{title}</h2>
      {children}
    </div>
  );
}

function LinkChip({ icon: Icon, label, href, color }: any) {
  return (
    <a href={href} target="_blank" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm font-medium hover:bg-slate-50 transition-colors">
      <Icon className="h-4 w-4" style={color ? { color } : undefined} /> {label}
    </a>
  );
}

function Modal({ children, onClose, title }: any) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 grid place-items-end sm:place-items-center p-0 sm:p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md p-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <button onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function InquiryModal({ biz, onClose }: { biz: Business; onClose: () => void }) {
  const [f, setF] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const inquiry: Inquiry = { id: newId(), ...f, createdAt: new Date().toISOString() };
    await store.addInquiry(biz.id, inquiry);
    setSent(true);
    setLoading(false);
    setTimeout(onClose, 1800);
  }
  return (
    <Modal title="Send Inquiry" onClose={onClose}>
      {sent ? <p className="text-green-700 text-center py-6 font-semibold">✓ Thank you! We'll get back to you soon.</p> : (
        <form onSubmit={submit} className="space-y-3">
          <input required placeholder="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="w-full border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          <input required placeholder="Phone" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className="w-full border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          <input placeholder="Email (optional)" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className="w-full border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          <textarea required placeholder="Your message" rows={4} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className="w-full border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none" />
          <button disabled={loading} className="w-full py-2.5 rounded-xl text-white font-semibold disabled:opacity-60 transition-opacity" style={{ background: biz.theme.primary }}>
            {loading ? "Sending…" : "Send"}
          </button>
        </form>
      )}
    </Modal>
  );
}

function AppointmentModal({ biz, onClose }: { biz: Business; onClose: () => void }) {
  const [f, setF] = useState({ name: "", phone: "", date: "", time: "", service: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const appt: Appointment = { id: newId(), ...f, status: "pending", createdAt: new Date().toISOString() };
    await store.addAppointment(biz.id, appt);
    setSent(true);
    setLoading(false);
    setTimeout(onClose, 1800);
  }
  return (
    <Modal title="Book Appointment" onClose={onClose}>
      {sent ? <p className="text-green-700 text-center py-6 font-semibold">✓ Appointment requested! We'll confirm shortly.</p> : (
        <form onSubmit={submit} className="space-y-3">
          <input required placeholder="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="w-full border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          <input required placeholder="Phone" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className="w-full border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          <input placeholder="Service / reason" value={f.service} onChange={(e) => setF({ ...f, service: e.target.value })} className="w-full border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          <div className="grid grid-cols-2 gap-2">
            <input required type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} className="border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            <input required type="time" value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })} className="border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <button disabled={loading} className="w-full py-2.5 rounded-xl text-white font-semibold disabled:opacity-60 transition-opacity" style={{ background: biz.theme.primary }}>
            {loading ? "Booking…" : "Book"}
          </button>
        </form>
      )}
    </Modal>
  );
}

function QRModal({ biz, onClose }: { biz: Business; onClose: () => void }) {
  return (
    <Modal title="Payment" onClose={onClose}>
      <div className="text-center">
        {biz.paymentQr ? (
          <img src={biz.paymentQr} alt="Payment QR" className="mx-auto rounded-lg max-h-72" loading="lazy" decoding="async" />
        ) : (
          <div className="p-8 bg-slate-100 rounded-lg text-slate-500">No QR uploaded</div>
        )}
        {biz.upiId && <p className="mt-3 text-sm">UPI: <span className="font-mono font-semibold">{biz.upiId}</span></p>}
      </div>
    </Modal>
  );
}

// ── Save Contact Modal — shown once on page open ──────────────────────────────
function SaveContactModal({
  biz,
  primary,
  onSave,
  onClose,
}: {
  biz: Business;
  primary: string;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 grid place-items-end sm:place-items-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm p-6 text-center animate-in slide-in-from-bottom duration-300">
        {/* Logo / Avatar */}
        <div className="flex justify-center mb-4">
          {biz.logo ? (
            <img
              src={biz.logo}
              alt={biz.name}
              className="h-20 w-20 rounded-2xl object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div
              className="h-20 w-20 rounded-2xl grid place-items-center text-white text-3xl font-black shadow-lg"
              style={{ background: primary }}
            >
              {biz.name[0]?.toUpperCase()}
            </div>
          )}
        </div>

        {/* Text */}
        <h3 className="text-lg font-extrabold text-slate-900">{biz.name}</h3>
        {biz.phone && (
          <p className="text-sm text-slate-500 mt-1 font-medium">{biz.phone}</p>
        )}
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
          Save our contact so you can reach us anytime — directly from your phone.
        </p>

        {/* Actions */}
        <div className="mt-5 space-y-2">
          <button
            onClick={onSave}
            className="w-full py-3 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            style={{ background: primary }}
          >
            <UserPlus className="h-4 w-4" />
            Save Contact
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl text-slate-500 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
