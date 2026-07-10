import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  /** Extra margin before the section enters view — starts loading earlier */
  rootMargin?: string;
}

/**
 * Wraps a page section so it fades + slides in only when the user
 * scrolls near it. The hero above the fold is NOT wrapped — it always
 * renders instantly.
 */
export function LazySection({ children, rootMargin = "120px" }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      style={
        mounted
          ? {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.55s ease, transform 0.55s ease",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
