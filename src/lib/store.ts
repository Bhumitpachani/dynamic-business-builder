// localStorage-backed multi-tenant store
export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
};

export type GalleryItem = { id: string; image: string; caption: string };

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
};

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  notes: string;
  followUpDate: string;
  createdAt: string;
};

export type Business = {
  id: string;
  slug: string;
  username: string;
  password: string;
  name: string;
  tagline: string;
  about: string;
  category: string;
  logo: string;
  coverImage: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapsLink: string;
  websiteLink: string;
  googleReviewLink: string;
  paymentQr: string;
  upiId: string;
  social: SocialLinks;
  products: Product[];
  gallery: GalleryItem[];
  inquiries: Inquiry[];
  appointments: Appointment[];
  leads: Lead[];
  planDays: number;
  startedAt: string;
  theme: { primary: string };
  visits: number;
  createdAt: string;
};

const KEY = "bizplatform_data_v1";

type DB = { businesses: Business[] };

function read(): DB {
  if (typeof window === "undefined") return { businesses: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { businesses: [] };
    return JSON.parse(raw);
  } catch {
    return { businesses: [] };
  }
}

function write(db: DB) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(db));
  window.dispatchEvent(new Event("biz:update"));
}

export const store = {
  all(): Business[] {
    return read().businesses;
  },
  get(id: string): Business | undefined {
    return read().businesses.find((b) => b.id === id);
  },
  getBySlug(slug: string): Business | undefined {
    return read().businesses.find((b) => b.slug === slug);
  },
  getByLogin(username: string, password: string): Business | undefined {
    return read().businesses.find(
      (b) => b.username === username && b.password === password,
    );
  },
  upsert(biz: Business) {
    const db = read();
    const i = db.businesses.findIndex((b) => b.id === biz.id);
    if (i >= 0) db.businesses[i] = biz;
    else db.businesses.push(biz);
    write(db);
  },
  remove(id: string) {
    const db = read();
    db.businesses = db.businesses.filter((b) => b.id !== id);
    write(db);
  },
  incrementVisit(slug: string) {
    const db = read();
    const b = db.businesses.find((x) => x.slug === slug);
    if (b) {
      b.visits = (b.visits || 0) + 1;
      write(db);
    }
  },
};

export function isExpired(b: Business): boolean {
  const start = new Date(b.startedAt).getTime();
  const expiry = start + b.planDays * 24 * 60 * 60 * 1000;
  return Date.now() > expiry;
}

export function daysLeft(b: Business): number {
  const start = new Date(b.startedAt).getTime();
  const expiry = start + b.planDays * 24 * 60 * 60 * 1000;
  return Math.max(0, Math.ceil((expiry - Date.now()) / (24 * 60 * 60 * 1000)));
}

export function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function emptyBusiness(name: string, username: string, password: string, planDays: number): Business {
  return {
    id: newId(),
    slug: slugify(name) + "-" + Math.random().toString(36).slice(2, 6),
    username,
    password,
    name,
    tagline: "",
    about: "",
    category: "",
    logo: "",
    coverImage: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    mapsLink: "",
    websiteLink: "",
    googleReviewLink: "",
    paymentQr: "",
    upiId: "",
    social: {},
    products: [],
    gallery: [],
    inquiries: [],
    appointments: [],
    leads: [],
    planDays,
    startedAt: new Date().toISOString(),
    theme: { primary: "#2563eb" },
    visits: 0,
    createdAt: new Date().toISOString(),
  };
}

// Session
const SESSION_KEY = "bizplatform_session_v1";
export type Session =
  | { kind: "super" }
  | { kind: "client"; businessId: string }
  | null;

export const session = {
  get(): Session {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  set(s: Session) {
    if (typeof window === "undefined") return;
    if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    else localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event("biz:session"));
  },
  clear() {
    this.set(null);
  },
};

export const SUPER_ADMIN = { username: "admin", password: "123" };
