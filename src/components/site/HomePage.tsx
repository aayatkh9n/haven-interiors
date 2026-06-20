import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { Navbar } from "@/components/site/Navbar";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { WhatsAppButton, buildWaUrl } from "@/components/site/WhatsAppButton";
import { Counter } from "@/components/site/Counter";

import heroImg from "@/assets/hero-living.jpg";
import projKitchen from "@/assets/project-kitchen.jpg";
import projBedroom from "@/assets/project-bedroom.jpg";
import projLiving2 from "@/assets/project-living2.jpg";
import projDining from "@/assets/project-dining.jpg";
import projOffice from "@/assets/project-office.jpg";
import projFoyer from "@/assets/project-foyer.jpg";
import aboutImg from "@/assets/project-foyer.jpg";

const PHONE_DISPLAY = "+91 90288 80339";
const PHONE_TEL = "+919028880339";

const trustStats = [
  { label: "Google Rating", value: "4.9", suffix: "/5", icon: StarIcon },
  { label: "Projects Completed", value: 120, suffix: "+", icon: HomeIcon },
  { label: "Satisfied Clients", value: 100, suffix: "+", icon: SmileIcon },
  { label: "Years of Experience", value: 8, suffix: "+", icon: ClockIcon },
];

const services = [
  { n: "01", t: "Residential Interiors", d: "Complete homes designed around how you live." },
  { n: "02", t: "Modular Kitchens", d: "Engineered for daily ritual — durable, considered, beautiful." },
  { n: "03", t: "Living Rooms", d: "Quiet compositions where family and conversation gather." },
  { n: "04", t: "Bedrooms", d: "Calm, restorative rooms with bespoke storage." },
  { n: "05", t: "False Ceiling", d: "Architectural light planes that shape every space." },
  { n: "06", t: "Space Planning", d: "Functional layouts that respect proportion and flow." },
  { n: "07", t: "Custom Furniture", d: "Pieces made to measure, to last, to belong." },
  { n: "08", t: "Turnkey Projects", d: "From first sketch to final handover, end-to-end." },
  { n: "09", t: "Renovation", d: "Thoughtful transformations of existing homes." },
  { n: "10", t: "Interior Consultation", d: "Considered guidance for confident decisions." },
];

const projects = [
  { img: projLiving2, name: "The Arched Residence", location: "Badlapur", area: "1450 sqft", timeline: "14 weeks", style: "Modern Minimal", cat: "Residential" },
  { img: projKitchen, name: "Matte & Oak Kitchen", location: "Ambernath", area: "210 sqft", timeline: "5 weeks", style: "Contemporary", cat: "Kitchen" },
  { img: projBedroom, name: "Linen Suite", location: "Kalyan", area: "280 sqft", timeline: "6 weeks", style: "Japandi", cat: "Bedroom" },
  { img: projDining, name: "Banquette Dining", location: "Badlapur", area: "180 sqft", timeline: "4 weeks", style: "Warm Modern", cat: "Living" },
  { img: projOffice, name: "The Reading Room", location: "Dombivli", area: "160 sqft", timeline: "5 weeks", style: "Editorial", cat: "Residential" },
  { img: projFoyer, name: "Travertine Foyer", location: "Badlapur", area: "120 sqft", timeline: "3 weeks", style: "Minimal", cat: "Residential" },
];
const projectCats = ["All", "Residential", "Kitchen", "Bedroom", "Living"];

const why = [
  { t: "Personalized Designs", d: "Every home is shaped to its family — never templated." },
  { t: "Transparent Pricing", d: "Itemized estimates, no hidden costs, no surprises." },
  { t: "Dedicated Project Manager", d: "One point of contact through the entire journey." },
  { t: "Premium Quality Materials", d: "Sourced from trusted suppliers and verified at every stage." },
  { t: "End-to-End Execution", d: "Design, procurement, installation — managed in-house." },
  { t: "Timely Delivery", d: "On-schedule handovers backed by structured site planning." },
  { t: "Modern Design Approach", d: "Architectural, restrained, built to age well." },
  { t: "Client Satisfaction", d: "A 4.9★ rating across 81+ Google reviews." },
];

const processSteps = [
  { n: "01", t: "Consultation", d: "We listen first — understanding lifestyle, taste, and intent." },
  { n: "02", t: "Site Visit", d: "Measure, photograph and assess every existing condition." },
  { n: "03", t: "Concept & Layout", d: "Spatial planning, moodboards, material direction." },
  { n: "04", t: "3D Design", d: "Photoreal visuals you can walk through before we build." },
  { n: "05", t: "Material Selection", d: "Curated finishes, hardware and fabric — sampled in-person." },
  { n: "06", t: "Execution", d: "On-site project management with weekly progress reports." },
  { n: "07", t: "Final Handover", d: "Snag-listed, styled, and ready to be lived in." },
];

const testimonials = [
  { q: "Good Home Interiors transformed our flat into a calm, beautiful home. The attention to detail was remarkable.", n: "Priya & Rohan Deshmukh", r: "3BHK Residence, Badlapur" },
  { q: "Honest, transparent and incredibly organized. Our modular kitchen turned out exactly like the 3D render.", n: "Anjali Patil", r: "Kitchen Renovation, Kalyan" },
  { q: "From the first meeting to handover, every step felt thought-through. We could not have asked for better.", n: "Mahesh Joshi", r: "Villa Interiors, Ambernath" },
  { q: "Premium quality at a fair price. The team genuinely cares about the home they're building for you.", n: "Sneha Kulkarni", r: "2BHK Apartment, Dombivli" },
];

const faqs = [
  { q: "How much does a full home interior cost?", a: "Pricing depends on size, finishes and scope. Typical 2BHK projects start at ₹4.5L, and 3BHK from ₹7L. After a free consultation we share a fully itemized estimate — no hidden costs." },
  { q: "How long does a project take?", a: "A standard 2BHK turnkey project takes 10–12 weeks from design sign-off. Renovations are usually 6–8 weeks. We commit to a written timeline and stick to it." },
  { q: "What materials and brands do you use?", a: "We work with BWP/BWR ply, premium acrylic/laminate/PU finishes, Hettich/Hafele hardware, and trusted modular brands. Every material is sampled before use." },
  { q: "Do you design modular kitchens separately?", a: "Yes. Kitchens are one of our specialisations. We can take on standalone modular kitchen projects with full design, fabrication and installation." },
  { q: "Is the consultation really free?", a: "Yes. The first consultation and site visit are complimentary. You only pay once you choose to move forward with a signed design brief." },
  { q: "What kind of warranty do you provide?", a: "We offer a 10-year warranty on modular carcasses and a 1-year service warranty on all civil and finishing work executed by us." },
];

export function HomePage() {
  useReveal();

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Navbar />
      <WhatsAppButton />

      <Hero />
      <TrustStrip />
      <About />
      <Services />
      <Portfolio />
      <WhyUs />
      <Process />
      <Testimonials />
      <Lead />
      <Faq />
      <Contact />
      <Footer />

      {/* Mobile sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 border-t border-border bg-background/95 backdrop-blur">
        <a href={`tel:${PHONE_TEL}`} className="py-3.5 text-center text-[12px] tracking-[0.22em] uppercase border-r border-border">
          Call Now
        </a>
        <a href="#contact" className="py-3.5 text-center text-[12px] tracking-[0.22em] uppercase bg-foreground text-background">
          Book Consultation
        </a>
      </div>
    </div>
  );
}

/* ——————————————————— Sections ——————————————————— */

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 md:pt-32 pb-28 md:pb-24"
    >
      <img
        src={heroImg}
        alt="Editorial interior with travertine table and arched windows"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/15 to-background/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-background/10 to-transparent" />

      <div className="container-editorial relative w-full">
        <div className="max-w-3xl fade-up">
          <p className="eyebrow hairline mb-6 md:mb-8 text-foreground/80">
            Interior Design Studio · Badlapur
          </p>
          <h1 className="display-xl text-foreground text-balance">
            Designing spaces<br className="hidden sm:block" />{" "}
            that feel like{" "}
            <em className="not-italic text-charcoal italic font-light">home.</em>
          </h1>
          <p className="mt-6 md:mt-8 max-w-xl text-[15px] md:text-lg text-charcoal leading-relaxed">
            Good Home Interiors is a premium design studio crafting calm, considered residences across
            Maharashtra. Architectural detail, honest materials, and end-to-end execution.
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href="#contact-form"
              className="group inline-flex items-center justify-center gap-3 bg-foreground text-background px-7 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-charcoal transition-colors"
            >
              Book Free Consultation
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={buildWaUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border border-foreground/30 text-foreground px-7 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-charcoal">
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <span className="h-10 w-px bg-foreground/30 relative overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-3 bg-foreground scroll-cue" />
        </span>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="bg-beige border-y border-border">
      <div className="container-editorial py-12 md:py-16">
        <div className="reveal-stagger grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
          {trustStats.map(({ label, value, suffix, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <Icon className="h-6 w-6 text-charcoal mb-4" />
              <div className="display-md text-foreground">
                {typeof value === "number" ? <Counter to={value} suffix={suffix} /> : `${value}${suffix}`}
              </div>
              <div className="mt-2 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-28 md:py-40">
      <div className="container-editorial grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-6 reveal">
          <div className="img-zoom aspect-[4/5]">
            <img src={aboutImg} alt="Editorial interior detail" className="h-full w-full object-cover" width={1600} height={1200} loading="lazy" />
          </div>
        </div>
        <div className="lg:col-span-6 reveal-stagger">
          <p className="eyebrow hairline">About the Studio</p>
          <h2 className="display-lg mt-6">
            Quiet homes,<br />
            crafted with care.
          </h2>
          <p className="mt-8 text-charcoal leading-relaxed text-lg">
            Good Home Interiors is a Badlapur-based design studio working with families across Maharashtra
            on residential interiors, modular kitchens and full home renovations.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We believe a good home is built on three things: an honest brief, a precise plan, and a craftsman's
            attention to detail. Every project is managed by a dedicated lead, every estimate is itemized,
            and every finish is sampled before it reaches your wall.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
            {[
              ["Personalized", "Designs"],
              ["Transparent", "Pricing"],
              ["Premium", "Craftsmanship"],
              ["End-to-End", "Execution"],
            ].map(([a, b]) => (
              <div key={a + b}>
                <dt className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">{a}</dt>
                <dd className="font-display text-2xl mt-1">{b}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-28 md:py-40 bg-secondary/50">
      <div className="container-editorial">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="eyebrow hairline">What We Do</p>
            <h2 className="display-lg mt-6 max-w-2xl">A full design and build studio.</h2>
          </div>
          <p className="max-w-md text-charcoal leading-relaxed">
            From single-room refreshes to complete turnkey homes — every service is delivered in-house with
            the same standard of detail.
          </p>
        </div>

        <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-border">
          {services.map((s) => (
            <article key={s.t} className="group relative border-r border-b border-border p-8 md:p-10 bg-background hover:bg-beige transition-colors duration-500">
              <div className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">{s.n}</div>
              <h3 className="font-display text-2xl md:text-3xl mt-6">{s.t}</h3>
              <p className="mt-4 text-charcoal leading-relaxed text-sm">{s.d}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                Enquire <span>→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<typeof projects[number] | null>(null);
  const filtered = filter === "All" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <section id="portfolio" className="py-28 md:py-40">
      <div className="container-editorial">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <p className="eyebrow hairline">Selected Work</p>
            <h2 className="display-lg mt-6 max-w-2xl">Recent projects.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {projectCats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={[
                  "px-4 py-2 text-[11px] tracking-[0.22em] uppercase border transition-colors",
                  filter === c
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-charcoal hover:border-foreground",
                ].join(" ")}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="reveal-stagger grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setOpen(p)}
              className={[
                "group text-left img-zoom relative",
                i % 5 === 0 ? "md:row-span-2 md:aspect-[3/4]" : "aspect-[4/5]",
              ].join(" ")}
            >
              <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute left-6 bottom-6 right-6 text-background translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <div className="text-[10px] tracking-[0.3em] uppercase opacity-80">{p.cat} · {p.location}</div>
                <div className="font-display text-2xl mt-1">{p.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] bg-foreground/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-10" onClick={() => setOpen(null)}>
          <div className="bg-background max-w-5xl w-full max-h-[90vh] overflow-auto grid md:grid-cols-2" onClick={(e) => e.stopPropagation()}>
            <img src={open.img} alt={open.name} className="h-full w-full object-cover max-h-[90vh]" />
            <div className="p-8 md:p-12 flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <p className="eyebrow">{open.cat}</p>
                <button onClick={() => setOpen(null)} aria-label="Close" className="text-2xl leading-none -mt-1">×</button>
              </div>
              <h3 className="font-display text-4xl mt-4">{open.name}</h3>
              <dl className="mt-10 space-y-5 text-sm">
                {[["Location", open.location], ["Area", open.area], ["Timeline", open.timeline], ["Design Style", open.style]].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground tracking-[0.18em] uppercase text-[11px]">{k}</dt>
                    <dd className="text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-8">
                <a
                  href={buildWaUrl(
                    `Hello Good Home Interiors, I'm interested in a project similar to "${open.name}" (${open.cat}, ${open.location}). Could we discuss?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(null)}
                  className="flex-1 inline-flex items-center justify-center bg-foreground text-background px-6 py-3.5 text-[12px] tracking-[0.22em] uppercase hover:bg-charcoal transition-colors"
                >
                  Enquire on WhatsApp
                </a>
                <a
                  href="#contact-form"
                  onClick={() => setOpen(null)}
                  className="flex-1 inline-flex items-center justify-center border border-foreground/30 px-6 py-3.5 text-[12px] tracking-[0.22em] uppercase hover:bg-foreground hover:text-background transition-colors"
                >
                  Book Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function WhyUs() {
  return (
    <section className="py-28 md:py-40 bg-foreground text-background">
      <div className="container-editorial grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5 reveal">
          <p className="eyebrow hairline text-background/60">Why Good Home</p>
          <h2 className="display-lg mt-6 text-background">
            Built on detail.<br />Delivered on time.
          </h2>
          <p className="mt-8 text-background/70 leading-relaxed">
            We bring a studio-grade design process to every project — large or small — backed by a dedicated
            project manager and a transparent estimate from day one.
          </p>
          <a href="#contact" className="mt-10 inline-flex items-center gap-2 link-underline text-[12px] tracking-[0.22em] uppercase">
            Start Your Project <span>→</span>
          </a>
        </div>
        <ul className="lg:col-span-7 reveal-stagger grid sm:grid-cols-2 gap-x-8 gap-y-10">
          {why.map((w, i) => (
            <li key={w.t} className="border-t border-background/15 pt-6">
              <div className="text-[11px] tracking-[0.22em] uppercase text-background/50">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="font-display text-2xl mt-3">{w.t}</h3>
              <p className="mt-3 text-background/70 text-sm leading-relaxed">{w.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="py-28 md:py-40">
      <div className="container-editorial">
        <div className="reveal max-w-2xl mb-16">
          <p className="eyebrow hairline">How We Work</p>
          <h2 className="display-lg mt-6">A seven-step process.</h2>
          <p className="mt-6 text-charcoal leading-relaxed">
            Designed to be transparent at every stage — from first conversation to keys in hand.
          </p>
        </div>

        <ol className="reveal-stagger relative grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {processSteps.map((s, i) => (
            <li key={s.n} className="relative">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-5xl text-stone-warm">{s.n}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h3 className="font-display text-2xl mt-6">{s.t}</h3>
              <p className="mt-3 text-charcoal text-sm leading-relaxed">{s.d}</p>
              {i < processSteps.length - 1 && (
                <span className="hidden lg:block absolute top-7 -right-4 text-stone-warm">·</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Testimonials() {
  // duplicate for seamless marquee
  const items = [...testimonials, ...testimonials];
  return (
    <section id="testimonials" className="py-28 md:py-40 bg-beige overflow-hidden">
      <div className="container-editorial">
        <div className="reveal max-w-2xl mb-16">
          <p className="eyebrow hairline">Client Voices</p>
          <h2 className="display-lg mt-6">Trusted by 100+ homes.</h2>
        </div>
      </div>
      <div className="relative">
        <div className="marquee">
          {items.map((t, i) => (
            <figure key={i} className="w-[420px] md:w-[480px] shrink-0 bg-background border border-border p-8 md:p-10">
              <div className="flex gap-1 text-foreground" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, k) => (
                  <StarIcon key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="font-display text-xl md:text-2xl leading-snug mt-6">
                “{t.q}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="h-10 w-10 rounded-full bg-stone-warm grid place-items-center text-background text-sm font-medium">
                  {t.n.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                </span>
                <span>
                  <div className="text-sm text-foreground">{t.n}</div>
                  <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">{t.r}</div>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-beige to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-beige to-transparent" />
      </div>
    </section>
  );
}

function Lead() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", property: "2BHK Apartment", city: "Badlapur", budget: "₹5–8 Lakhs", message: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    const msg =
`Hello Good Home Interiors,

I'd like to book a free consultation.

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || "—"}
Property: ${form.property}
City: ${form.city}
Budget: ${form.budget}

${form.message || ""}`.trim();
    window.open(buildWaUrl(msg), "_blank");
  };

  return (
    <section id="contact-form" className="py-28 md:py-40 bg-foreground text-background">
      <div className="container-editorial grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5 reveal">
          <p className="eyebrow hairline text-background/60">Begin</p>
          <h2 className="display-lg mt-6 text-background">
            Let's design<br />your dream space.
          </h2>
          <p className="mt-8 text-background/70 leading-relaxed">
            Share a few details and we'll get in touch within 24 hours with next steps and a free consultation slot.
          </p>
          <div className="mt-10 space-y-4 text-background/80 text-sm">
            <a href={`tel:${PHONE_TEL}`} className="block link-underline">{PHONE_DISPLAY}</a>
            <a href={buildWaUrl()} target="_blank" rel="noopener noreferrer" className="block link-underline">Chat on WhatsApp</a>
            <div className="text-background/60 text-[12px] tracking-[0.18em] uppercase pt-4">Open Daily · 9:00 AM – 8:30 PM</div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-7 reveal-stagger grid sm:grid-cols-2 gap-5">
          {[
            { k: "name" as const, label: "Full Name", type: "text", req: true, span: 1 },
            { k: "phone" as const, label: "Phone Number", type: "tel", req: true, span: 1 },
            { k: "email" as const, label: "Email", type: "email", req: false, span: 2 },
          ].map((f) => (
            <Field key={f.k} className={f.span === 2 ? "sm:col-span-2" : ""} label={f.label}>
              <input
                required={f.req}
                type={f.type}
                value={form[f.k]}
                onChange={set(f.k)}
                className="w-full bg-transparent border-b border-background/30 focus:border-background py-3 text-background placeholder-background/40 outline-none transition-colors"
              />
            </Field>
          ))}

          <Field label="Property Type">
            <Select value={form.property} onChange={set("property")} options={["1BHK Apartment", "2BHK Apartment", "3BHK Apartment", "Villa / Bungalow", "Modular Kitchen", "Renovation"]} />
          </Field>
          <Field label="City">
            <Select value={form.city} onChange={set("city")} options={["Badlapur", "Ambernath", "Kalyan", "Dombivli", "Mumbai", "Other"]} />
          </Field>
          <Field label="Budget" className="sm:col-span-2">
            <Select value={form.budget} onChange={set("budget")} options={["Under ₹3 Lakhs", "₹3–5 Lakhs", "₹5–8 Lakhs", "₹8–12 Lakhs", "₹12–20 Lakhs", "₹20 Lakhs+"]} />
          </Field>
          <Field label="Tell us about your space" className="sm:col-span-2">
            <textarea
              value={form.message}
              onChange={set("message")}
              rows={4}
              className="w-full bg-transparent border-b border-background/30 focus:border-background py-3 text-background placeholder-background/40 outline-none transition-colors resize-none"
            />
          </Field>

          <div className="sm:col-span-2 flex flex-wrap gap-4 pt-4">
            <button type="submit" className="bg-background text-foreground px-7 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-beige transition-colors">
              Book Free Consultation
            </button>
            <a href={buildWaUrl()} target="_blank" rel="noopener noreferrer" className="border border-background/30 px-7 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-background hover:text-foreground transition-colors">
              Chat on WhatsApp
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] tracking-[0.22em] uppercase text-background/50">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: React.ChangeEventHandler<HTMLSelectElement>; options: string[] }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border-b border-background/30 focus:border-background py-3 text-background outline-none appearance-none cursor-pointer"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-foreground text-background">{o}</option>
      ))}
    </select>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-28 md:py-40">
      <div className="container-editorial grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 reveal">
          <p className="eyebrow hairline">Questions</p>
          <h2 className="display-lg mt-6">Frequently asked.</h2>
          <p className="mt-6 text-charcoal leading-relaxed">
            Still wondering about something? Reach out — we're happy to help over WhatsApp or a quick call.
          </p>
        </div>
        <div className="lg:col-span-8 reveal-stagger">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-t border-border last:border-b">
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-6 py-7 text-left">
                  <span className="font-display text-xl md:text-2xl">{f.q}</span>
                  <span className={`text-2xl text-charcoal transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-7 pr-4 md:pr-10">
                      <p className="text-charcoal leading-relaxed">{f.a}</p>
                      <a
                        href={buildWaUrl(
                          `Hello Good Home Interiors, I have a question: ${f.q}`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase link-underline text-foreground"
                      >
                        Ask this on WhatsApp <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-28 md:py-40 bg-secondary/50">
      <div className="container-editorial grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5 reveal">
          <p className="eyebrow hairline">Visit & Connect</p>
          <h2 className="display-lg mt-6">Come by the studio.</h2>
          <dl className="mt-12 space-y-8 text-charcoal">
            <div>
              <dt className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">Studio</dt>
              <dd className="mt-2 font-display text-xl text-foreground">Good Home Interiors</dd>
              <dd className="mt-1 leading-relaxed text-sm">
                Sai Dham Complex, 202/G Wing,<br />
                Near Anant Nagar, Near Gaondevi Mandir,<br />
                Kulgaon, Badlapur,<br />
                Maharashtra – 421503
              </dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">Phone</dt>
              <dd className="mt-2"><a href={`tel:${PHONE_TEL}`} className="link-underline text-foreground">{PHONE_DISPLAY}</a></dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">WhatsApp</dt>
              <dd className="mt-2"><a href={buildWaUrl()} target="_blank" rel="noopener noreferrer" className="link-underline text-foreground">Chat with the studio</a></dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">Hours</dt>
              <dd className="mt-2 text-foreground">Open Daily · 9:00 AM – 8:30 PM</dd>
            </div>
          </dl>

          <div className="mt-12 flex flex-wrap gap-3">
            <a href="#contact-form" className="bg-foreground text-background px-6 py-3.5 text-[12px] tracking-[0.22em] uppercase">Book Consultation</a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Sai+Dham+Complex+Kulgaon+Badlapur"
              target="_blank" rel="noopener noreferrer"
              className="border border-foreground/30 px-6 py-3.5 text-[12px] tracking-[0.22em] uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 reveal">
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full border border-border overflow-hidden">
            <iframe
              title="Good Home Interiors – Studio Location"
              src="https://www.google.com/maps?q=Kulgaon+Badlapur+Maharashtra+421503&output=embed"
              className="h-full w-full grayscale-[20%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-editorial pt-20 pb-12 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="font-display text-3xl">Good Home <em className="italic text-background/70">Interiors</em></div>
          <p className="mt-6 text-background/60 max-w-md text-sm leading-relaxed">
            A premium interior design studio crafting calm, considered homes across Maharashtra.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 border border-background/20 px-4 py-2.5">
            <StarIcon className="h-4 w-4 fill-current" />
            <span className="text-sm">4.9 / 5 · 81+ Google Reviews</span>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="text-[10px] tracking-[0.22em] uppercase text-background/50">Quick Links</div>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              ["About", "#about"],
              ["Services", "#services"],
              ["Portfolio", "#portfolio"],
              ["Process", "#process"],
              ["Testimonials", "#testimonials"],
              ["FAQs", "#faq"],
              ["Contact", "#contact"],
            ].map(([l, href]) => (
              <li key={l}><a href={href} className="link-underline text-background/80">{l}</a></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="text-[10px] tracking-[0.22em] uppercase text-background/50">Contact</div>
          <ul className="mt-6 space-y-3 text-sm text-background/80">
            <li><a href={`tel:${PHONE_TEL}`} className="link-underline">{PHONE_DISPLAY}</a></li>
            <li><a href={buildWaUrl()} target="_blank" rel="noopener noreferrer" className="link-underline">WhatsApp</a></li>
            <li className="text-background/60 leading-relaxed">Sai Dham Complex, Kulgaon, Badlapur, MH 421503</li>
            <li className="text-background/60">Open Daily · 9:00 AM – 8:30 PM</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/15">
        <div className="container-editorial py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.18em] uppercase text-background/50">
          <div>© {new Date().getFullYear()} Good Home Interiors · गुड होम इंटीरियर्स</div>
          <a href="#home" className="link-underline">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

/* ——————————————————— Tiny inline icons (no extra deps) ——————————————————— */

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8L12 3.5z" />
    </svg>
  );
}
function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9z" />
    </svg>
  );
}
function SmileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <circle cx="9" cy="10" r=".6" fill="currentColor" />
      <circle cx="15" cy="10" r=".6" fill="currentColor" />
    </svg>
  );
}
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
