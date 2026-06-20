const PHONE = "919028880339";

export function buildWaUrl(message?: string) {
  const text = encodeURIComponent(
    message ??
      "Hello Good Home Interiors, I'd like to know more about your interior design services.",
  );
  return `https://wa.me/${PHONE}?text=${text}`;
}

export function WhatsAppButton() {
  return (
    <a
      href={buildWaUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 group flex items-center gap-3"
    >
      <span className="hidden md:inline-flex items-center bg-foreground text-background text-[11px] tracking-[0.22em] uppercase px-4 py-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        Chat with us
      </span>
      <span className="relative grid place-items-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] hover:scale-105 transition-transform">
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" />
        <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-current" aria-hidden>
          <path d="M19.11 17.21c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.21 5.1 4.5.71.31 1.27.5 1.7.63.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
          <path d="M26.5 5.5C23.7 2.6 19.95 1 16 1 7.73 1 1 7.73 1 16c0 2.64.69 5.2 2.01 7.46L1 31l7.73-2.03A14.9 14.9 0 0 0 16 31c8.27 0 15-6.73 15-15 0-4-1.58-7.75-4.5-10.5ZM16 28.5c-2.34 0-4.62-.62-6.6-1.79l-.47-.28-4.59 1.21 1.22-4.46-.31-.49A12.4 12.4 0 0 1 3.5 16C3.5 9.1 9.1 3.5 16 3.5c3.34 0 6.47 1.3 8.82 3.66A12.4 12.4 0 0 1 28.5 16c0 6.9-5.6 12.5-12.5 12.5Z" />
        </svg>
      </span>
    </a>
  );
}
