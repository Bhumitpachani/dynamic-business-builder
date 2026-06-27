// Firebase-backed multi-tenant store
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  increment,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db, auth, SUPER_ADMIN_EMAIL } from "./firebase";

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

const COL = "businesses";
const INQ_COL = "contact_inquiries";

export type ContactInquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  createdAt: string;
};

export const contactInquiries = {
  async add(data: Omit<ContactInquiry, "id">): Promise<void> {
    if (typeof window === "undefined") return;
    const id = newId();
    await setDoc(doc(db, INQ_COL, id), { ...data, id });
  },
  onAll(callback: (list: ContactInquiry[]) => void): () => void {
    if (typeof window === "undefined") return () => {};
    return onSnapshot(collection(db, INQ_COL), (snap) => {
      const list = snap.docs.map((d) => d.data() as ContactInquiry);
      callback(list.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    });
  },
};

export const store = {
  /** Real-time listener for all businesses — returns an unsubscribe function */
  onAll(callback: (businesses: Business[]) => void): () => void {
    if (typeof window === "undefined") return () => {};
    return onSnapshot(collection(db, COL), (snap) => {
      const list = snap.docs.map((d) => d.data() as Business);
      callback(list.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    });
  },

  /** Real-time listener for a single business by ID */
  onGet(id: string, callback: (b: Business | null) => void): () => void {
    if (typeof window === "undefined") return () => {};
    return onSnapshot(doc(db, COL, id), (snap) => {
      callback(snap.exists() ? (snap.data() as Business) : null);
    });
  },

  /** One-time fetch by slug */
  async getBySlug(slug: string): Promise<Business | undefined> {
    if (typeof window === "undefined") return undefined;
    const q = query(collection(db, COL), where("slug", "==", slug));
    const snap = await getDocs(q);
    return snap.empty ? undefined : (snap.docs[0].data() as Business);
  },

  /** Login lookup — queries by username then checks password */
  async getByLogin(username: string, password: string): Promise<Business | undefined> {
    if (typeof window === "undefined") return undefined;
    const q = query(collection(db, COL), where("username", "==", username));
    const snap = await getDocs(q);
    if (snap.empty) return undefined;
    const biz = snap.docs[0].data() as Business;
    return biz.password === password ? biz : undefined;
  },

  /** Create or update a business document */
  async upsert(biz: Business): Promise<void> {
    if (typeof window === "undefined") return;
    await setDoc(doc(db, COL, biz.id), biz);
  },

  /** Delete a business */
  async remove(id: string): Promise<void> {
    if (typeof window === "undefined") return;
    await deleteDoc(doc(db, COL, id));
  },

  /** Increment visit counter for a business by slug */
  async incrementVisit(slug: string): Promise<void> {
    if (typeof window === "undefined") return;
    const q = query(collection(db, COL), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (!snap.empty) {
      await updateDoc(snap.docs[0].ref, { visits: increment(1) });
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

export function emptyBusiness(
  name: string,
  username: string,
  password: string,
  planDays: number,
): Business {
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

// ── Session ──────────────────────────────────────────────────────────────────
// Super admin session is managed by Firebase Auth.
// Client session is stored in localStorage.
// When super admin edits a client, a localStorage "client" session is set;
// clearClient() removes it without signing out of Firebase Auth.

const SESSION_KEY = "bizplatform_session_v1";

export type Session =
  | { kind: "super" }
  | { kind: "client"; businessId: string; fromAdmin?: boolean }
  | null;

export const session = {
  /** Get current session — localStorage (client) takes priority over Firebase Auth (super) */
  get(): Session {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Session;
        if (parsed?.kind === "client") return parsed;
      }
    } catch {
      /* ignore */
    }
    if (auth.currentUser?.email === SUPER_ADMIN_EMAIL) {
      return { kind: "super" };
    }
    return null;
  },

  /** Set client session in localStorage (used by both clients and super admin editing a client) */
  set(s: Session) {
    if (typeof window === "undefined") return;
    if (s === null) {
      localStorage.removeItem(SESSION_KEY);
    } else {
      localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    }
    window.dispatchEvent(new Event("biz:session"));
  },

  /** Full logout — clears localStorage AND Firebase Auth */
  clear() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(SESSION_KEY);
    if (auth.currentUser) signOut(auth).catch(() => {});
    window.dispatchEvent(new Event("biz:session"));
  },

  /** Only clear client localStorage session; keeps Firebase Auth intact (for super admin "back" navigation) */
  clearClient() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event("biz:session"));
  },
};

// ── Super admin Firebase Auth helpers ─────────────────────────────────────────

/**
 * Log in as super admin using Firebase Auth.
 * On first use (account not yet created), the account is created automatically.
 * Returns null on success, or an error message string.
 */
export async function superAdminLogin(password: string): Promise<string | null> {
  try {
    await signInWithEmailAndPassword(auth, SUPER_ADMIN_EMAIL, password);
    return null;
  } catch (err: any) {
    const code: string = err?.code ?? "";
    // First-time setup: account does not exist yet
    if (
      code === "auth/user-not-found" ||
      code === "auth/invalid-credential" ||
      code === "auth/invalid-email"
    ) {
      try {
        await createUserWithEmailAndPassword(auth, SUPER_ADMIN_EMAIL, password);
        return null;
      } catch (createErr: any) {
        const createCode: string = createErr?.code ?? "";
        if (createCode === "auth/email-already-in-use") {
          return "Invalid password. Please try again.";
        }
        return createErr?.message ?? "Failed to create super admin account.";
      }
    }
    if (code === "auth/wrong-password") return "Incorrect password.";
    return "Invalid credentials. Please try again.";
  }
}

export async function superAdminLogout(): Promise<void> {
  if (auth.currentUser) await signOut(auth);
}

// Legacy export for backward compat (super admin hardcoded creds removed)
export const SUPER_ADMIN = { username: "superadmin@tapvybe.com", password: "" };
