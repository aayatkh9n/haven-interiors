import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";

const TITLE = "Good Home Interiors — Premium Interior Designers in Badlapur";
const DESCRIPTION =
  "Premium interior design studio in Badlapur, Maharashtra. Residential interiors, modular kitchens, turnkey projects. 4.9★ on Google. Book a free consultation.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "Interior Designer in Badlapur, Home Interior Designer Badlapur, Modular Kitchen Badlapur, Residential Interior Designer, Turnkey Interior Solutions, Premium Interior Designers Maharashtra, Bedroom Interior Design, Living Room Interior Design, False Ceiling Design, Interior Design Studio Near Me" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: "/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Good Home Interiors",
          image: "/og-image.jpg",
          telephone: "+91 90288 80339",
          priceRange: "₹₹₹",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sai Dham Complex, 202/G Wing, Near Anant Nagar, Near Gaondevi Mandir, Kulgaon",
            addressLocality: "Badlapur",
            addressRegion: "Maharashtra",
            postalCode: "421503",
            addressCountry: "IN",
          },
          openingHoursSpecification: [{
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            opens: "09:00",
            closes: "20:30",
          }],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "81",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});
