import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import type { ReactNode } from "react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
] as const;

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNav />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}

export function PublicNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center shrink-0">
            <img src="/tapvybe-logo-horizontal.png" alt="tapvybe" className="h-8 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors rounded-lg"
                activeProps={{ className: "px-4 py-2 text-sm font-semibold text-black rounded-lg" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/client/login" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Login
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-5 py-2 text-sm font-bold text-white rounded-full transition-all hover:opacity-90"
              style={{ backgroundColor: "#6B3EF0" }}
            >
              Get Started
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 pt-3 pb-5 space-y-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
              activeProps={{ className: "flex items-center px-3 py-2.5 text-sm font-semibold text-black bg-gray-50 rounded-lg" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-gray-100 flex gap-2">
            <Link to="/client/login" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 text-sm font-medium border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors">
              Login
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex-1 text-center py-2.5 text-sm font-bold text-white rounded-full transition-all hover:opacity-90"
              style={{ backgroundColor: "#6B3EF0" }}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function PublicFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="inline-flex items-center">
              <img src="/tapvybe-logo-horizontal.png" alt="tapvybe" className="h-8 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-xs">
              The smart NFC business card platform. Tap in, feel the vibes.
            </p>
            <div className="mt-6 flex gap-2.5">
              {([Facebook, Twitter, Instagram, Linkedin] as const).map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-full bg-gray-800 hover:bg-[#6B3EF0] grid place-items-center transition-colors">
                  <Icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {([["Home", "/"], ["About Us", "/about"], ["Services", "/services"], ["Contact", "/contact"]] as const).map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Products</h4>
            <ul className="space-y-2.5">
              {["NFC Business Cards", "Metal Cards", "Digital Profile", "QR Code Cards", "Smart Accessories", "Bulk Orders"].map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-sm text-gray-500 hover:text-white transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#6B3EF0] shrink-0" />
                <a href="tel:+916351717272" className="text-sm text-gray-500 hover:text-white transition-colors">+91 6351717272</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#6B3EF0] shrink-0" />
                <a href="mailto:tapvybe@gmail.com" className="text-sm text-gray-500 hover:text-white transition-colors">tapvybe@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {year} tapvybe. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
