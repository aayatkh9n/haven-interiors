import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQs" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // active section tracking
      const y = window.scrollY + 140;
      for (const l of links) {
        const el = document.querySelector(l.href) as HTMLElement | null;
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(l.href);
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-[background,backdrop-filter,border-color,padding] duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent border-b border-transparent py-5",
      ].join(" ")}
    >
      <div className="container-editorial flex items-center justify-between gap-8">
        <a href="#home" className="flex items-baseline gap-2 group">
          <span className="font-display text-xl tracking-tight text-foreground">
            Good Home
          </span>
          <span className="font-display text-xl tracking-tight text-muted-foreground italic">
            Interiors
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-wide">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={[
                "link-underline transition-colors",
                active === l.href ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-[12px] tracking-[0.18em] uppercase hover:bg-charcoal transition-colors"
          >
            Book Consultation
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden h-10 w-10 grid place-items-center"
          >
            <span className="relative block w-5 h-[1.5px] bg-foreground before:content-[''] before:absolute before:left-0 before:-top-2 before:w-5 before:h-[1.5px] before:bg-foreground after:content-[''] after:absolute after:left-0 after:top-2 after:w-5 after:h-[1.5px] after:bg-foreground" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 bg-background border-b border-border",
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="container-editorial py-6 flex flex-col gap-4 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 border-b border-border/60 text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center bg-foreground text-background px-5 py-3 text-[12px] tracking-[0.18em] uppercase"
          >
            Book Consultation
          </a>
        </nav>
      </div>
    </header>
  );
}
