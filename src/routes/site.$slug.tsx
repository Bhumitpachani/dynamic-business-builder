import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { store, isExpired, newId, type Business, type Inquiry, type Appointment } from "@/lib/store";

import { Phone, MessageCircle, MapPin, Globe, Star, Facebook, Instagram, Twitter, Linkedin, Youtube, UserPlus, QrCode, X, Download } from "lucide-react";
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

  function saveContact() {
    const b = biz!;

    // ── helpers ──────────────────────────────────────────────────────────────
    // Escape a string for vCard 3.0 (backslash, semicolon, comma, newlines).
    const vc = (s: string) =>
      s.replace(/\\/g, "\\\\")
       .replace(/;/g, "\\;")
       .replace(/,/g, "\\,")
       .replace(/\r?\n/g, "\\n");

    // Escape a string so it is safe to embed inside an HTML attribute or text node.
    const he = (s: string) =>
      s.replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#39;");

    // ── vCard ─────────────────────────────────────────────────────────────────
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

    // Safe filename — never empty
    const safeName = (displayName.replace(/[^a-z0-9]/gi, "_").replace(/_+/g, "_").replace(/^_|_$/g, "") || "contact");

    // ── HTML launcher ─────────────────────────────────────────────────────────
    // When opened on mobile the script immediately downloads the .vcf which
    // iOS / Android handle natively ("Add to Contacts"). window.close() is
    // best-effort; the fallback copy tells users they can close the tab.
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Saving ${he(displayName)}\u2026</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{display:flex;flex-direction:column;align-items:center;justify-content:center;
     min-height:100vh;background:#f0f4ff;font-family:system-ui,sans-serif;
     gap:14px;padding:24px;text-align:center}
.icon{font-size:52px}
p{color:#333;font-size:17px;font-weight:600}
small{color:#888;font-size:13px;margin-top:4px}
</style>
</head>
<body>
<div class="icon">📱</div>
<p>Saving <em>${he(displayName)}</em> to your contacts\u2026</p>
<small>Contact saved! You can now close this tab.</small>
<script>
(function(){
  var v=${JSON.stringify(vcard)};
  var blob=new Blob([v],{type:'text/vcard;charset=utf-8'});
  var u=URL.createObjectURL(blob);
  var a=document.createElement('a');
  a.href=u; a.download=${JSON.stringify(safeName+".vcf")};
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  // Revoke after browser has had time to read the blob, then try to close.
  setTimeout(function(){URL.revokeObjectURL(u);},3000);
  setTimeout(function(){try{window.close();}catch(e){}},2000);
})();
</script>
</body>
</html>`;

    // Open the HTML launcher in a new tab — the page auto-downloads the .vcf
    const htmlBlob = new Blob([html], { type: "text/html" });
    const htmlUrl = URL.createObjectURL(htmlBlob);
    const w = window.open(htmlUrl, "_blank");
    // Fallback: if popup was blocked, download the file instead
    if (!w) {
      const link = document.createElement("a");
      link.href = htmlUrl;
      link.download = `Save_${safeName}_Contact.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setTimeout(() => URL.revokeObjectURL(htmlUrl), 8000);
  }

  function downloadCard() {
    const b = biz!;
    const he = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    const displayName = b.name?.trim() || "Business";
    const safeName = displayName.replace(/[^a-z0-9]/gi, "_").replace(/_+/g, "_").replace(/^_|_$/g, "") || "card";
    const brandColor = b.theme.primary || "#6B3EF0";

    const productsHtml = b.products.length > 0 ? `
      <div class="section">
        <h2 class="section-title">Products &amp; Services</h2>
        <div class="products-grid">
          ${b.products.map(p => `
            <div class="product-card">
              ${p.image ? `<img src="${he(p.image)}" alt="${he(p.name)}" class="product-img" />` : ""}
              <div class="product-body">
                <div class="product-name">${he(p.name)}</div>
                ${p.price ? `<div class="product-price" style="color:${brandColor}">${he(p.price)}</div>` : ""}
                ${p.description ? `<div class="product-desc">${he(p.description)}</div>` : ""}
              </div>
            </div>`).join("")}
        </div>
      </div>` : "";

    const galleryHtml = b.gallery.length > 0 ? `
      <div class="section">
        <h2 class="section-title">Gallery</h2>
        <div class="gallery-grid">
          ${b.gallery.map(g => g.image ? `<img src="${he(g.image)}" alt="${he(g.caption || "")}" class="gallery-img" />` : "").join("")}
        </div>
      </div>` : "";

    const socialLinks = [
      b.websiteLink && `<a href="${he(b.websiteLink)}" target="_blank" class="chip">🌐 Website</a>`,
      b.googleReviewLink && `<a href="${he(b.googleReviewLink)}" target="_blank" class="chip">⭐ Google Review</a>`,
      b.social?.facebook && `<a href="${he(b.social.facebook)}" target="_blank" class="chip" style="color:#1877f2;border-color:#1877f2">Facebook</a>`,
      b.social?.instagram && `<a href="${he(b.social.instagram)}" target="_blank" class="chip" style="color:#e4405f;border-color:#e4405f">Instagram</a>`,
      b.social?.twitter && `<a href="${he(b.social.twitter)}" target="_blank" class="chip" style="color:#1da1f2;border-color:#1da1f2">Twitter</a>`,
      b.social?.linkedin && `<a href="${he(b.social.linkedin)}" target="_blank" class="chip" style="color:#0a66c2;border-color:#0a66c2">LinkedIn</a>`,
      b.social?.youtube && `<a href="${he(b.social.youtube)}" target="_blank" class="chip" style="color:#ff0000;border-color:#ff0000">YouTube</a>`,
    ].filter(Boolean).join("");

    const waLink2 = b.whatsapp ? `https://wa.me/${b.whatsapp.replace(/[^0-9]/g, "")}?text=Hi` : "";

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${he(displayName)} — tapvybe Card</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;color:#1e293b;min-height:100vh;padding-bottom:40px}
.cover{height:200px;background:linear-gradient(135deg,#334155,#0f172a);position:relative;overflow:hidden}
.cover img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0}
.cover-overlay{position:absolute;inset:0;background:rgba(0,0,0,.4)}
.container{max-width:680px;margin:0 auto;padding:0 16px}
.hero{background:#fff;border-radius:20px;box-shadow:0 4px 24px rgba(0,0,0,.1);padding:20px;margin-top:-60px;position:relative}
.avatar{width:90px;height:90px;border-radius:16px;border:4px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.15);object-fit:cover;margin-top:-60px;background:${brandColor};display:flex;align-items:center;justify-content:center;color:#fff;font-size:2rem;font-weight:900;overflow:hidden;flex-shrink:0}
.hero-top{display:flex;gap:14px;align-items:flex-start}
.hero-info{flex:1;min-width:0;padding-top:4px}
h1{font-size:1.4rem;font-weight:800;color:#0f172a;word-break:break-word}
.badge{display:inline-block;padding:2px 10px;border-radius:999px;font-size:.75rem;font-weight:700;margin-top:6px}
.tagline{font-size:.85rem;color:#64748b;margin-top:6px;line-height:1.5}
.actions{display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:8px;margin-top:16px}
.btn{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 8px;border:1px solid #e2e8f0;border-radius:14px;text-decoration:none;color:#1e293b;font-size:.75rem;font-weight:600;background:#fff;cursor:pointer;transition:.15s}
.btn-icon{font-size:1.3rem}
.btn-primary{background:${brandColor};color:#fff;border-color:${brandColor}}
.section{background:#fff;border-radius:20px;padding:20px;margin-top:12px;border:1px solid #e2e8f0}
.section-title{font-size:1rem;font-weight:800;color:#0f172a;margin-bottom:12px}
.about-text{font-size:.875rem;color:#475569;line-height:1.7;white-space:pre-wrap}
.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.product-card{border:1px solid #e2e8f0;border-radius:14px;overflow:hidden}
.product-img{width:100%;height:150px;object-fit:cover}
.product-body{padding:12px}
.product-name{font-weight:700;font-size:.875rem}
.product-price{font-weight:800;font-size:.9rem;margin-top:4px}
.product-desc{font-size:.8rem;color:#64748b;margin-top:4px;line-height:1.5}
.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.gallery-img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border:1px solid #cbd5e1;border-radius:999px;font-size:.8rem;font-weight:600;text-decoration:none;color:#475569}
.contact-item{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:.875rem}
.contact-item:last-child{border-bottom:none}
.contact-icon{font-size:1.1rem;width:28px;flex-shrink:0;text-align:center}
.contact-link{color:#1e293b;text-decoration:none;font-weight:500}
.footer{text-align:center;margin-top:20px;font-size:.75rem;color:#94a3b8}
.footer a{color:#6B3EF0;font-weight:700;text-decoration:none}
@media(max-width:480px){.gallery-grid{grid-template-columns:repeat(2,1fr)}.products-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="cover">
  ${b.coverImage ? `<img src="${he(b.coverImage)}" alt="cover" />` : ""}
  <div class="cover-overlay"></div>
</div>
<div class="container">
  <div class="hero">
    <div class="hero-top">
      ${b.logo
        ? `<img src="${he(b.logo)}" alt="${he(b.name)}" class="avatar" />`
        : `<div class="avatar">${he(b.name[0]?.toUpperCase() || "?")}</div>`}
      <div class="hero-info">
        <h1>${he(displayName)}</h1>
        ${b.category ? `<span class="badge" style="background:${brandColor}22;color:${brandColor}">${he(b.category)}</span>` : ""}
        ${b.tagline ? `<p class="tagline">${he(b.tagline)}</p>` : ""}
      </div>
    </div>
    <div class="actions">
      ${b.phone ? `<a href="tel:${he(b.phone)}" class="btn"><span class="btn-icon">📞</span>Call</a>` : ""}
      ${waLink2 ? `<a href="${he(waLink2)}" target="_blank" class="btn"><span class="btn-icon">💬</span>WhatsApp</a>` : ""}
      ${b.mapsLink ? `<a href="${he(b.mapsLink)}" target="_blank" class="btn"><span class="btn-icon">📍</span>Directions</a>` : ""}
      ${b.email ? `<a href="mailto:${he(b.email)}" class="btn"><span class="btn-icon">✉️</span>Email</a>` : ""}
    </div>
  </div>

  ${b.about ? `<div class="section"><h2 class="section-title">About</h2><p class="about-text">${he(b.about)}</p></div>` : ""}

  ${productsHtml}
  ${galleryHtml}

  <div class="section">
    <h2 class="section-title">Contact</h2>
    ${b.phone ? `<div class="contact-item"><span class="contact-icon">📞</span><a href="tel:${he(b.phone)}" class="contact-link">${he(b.phone)}</a></div>` : ""}
    ${b.whatsapp ? `<div class="contact-item"><span class="contact-icon">💬</span><a href="${he(waLink2)}" class="contact-link">${he(b.whatsapp)} (WhatsApp)</a></div>` : ""}
    ${b.email ? `<div class="contact-item"><span class="contact-icon">✉️</span><a href="mailto:${he(b.email)}" class="contact-link">${he(b.email)}</a></div>` : ""}
    ${b.address ? `<div class="contact-item"><span class="contact-icon">📍</span><span>${he(b.address)}</span></div>` : ""}
  </div>

  ${socialLinks ? `<div class="section"><h2 class="section-title">Links</h2><div class="chips">${socialLinks}</div></div>` : ""}

  <div class="footer">Powered by <a href="https://tapvybe.in" target="_blank">tapvybe</a></div>
</div>
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
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24" style={{ ["--brand" as any]: primary }}>
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
            <button onClick={saveContact} className="flex flex-col items-center gap-1 p-3 rounded-xl border hover:shadow text-xs font-medium transition-shadow"><UserPlus className="h-5 w-5" style={{ color: primary }} /> Save Contact</button>
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
              <button onClick={() => setShowInquiry(true)} className="py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90" style={{ background: primary }}>Send Inquiry</button>
              <button onClick={() => setShowAppt(true)} className="py-3 rounded-xl font-semibold border-2 transition-colors hover:opacity-90" style={{ borderColor: primary, color: primary }}>Book Appointment</button>
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
              {(biz.paymentQr || biz.upiId) && <button onClick={() => setShowQR(true)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm font-medium hover:bg-slate-50"><QrCode className="h-4 w-4" /> Pay</button>}
            </div>
          </Section>
        </LazySection>

        <LazySection rootMargin="500px">
          <div className="mt-4 bg-white rounded-2xl border p-5 text-center">
            <p className="text-sm font-semibold text-slate-700 mb-1">Save this card for later</p>
            <p className="text-xs text-slate-500 mb-4">Download a copy of this profile you can open anytime, even offline.</p>
            <button
              onClick={downloadCard}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity"
              style={{ background: primary }}
            >
              <Download className="h-4 w-4" />
              Download Card
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
        <button onClick={() => setShowInquiry(true)} className="py-2.5 rounded-lg border text-sm font-semibold">Inquiry</button>
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
