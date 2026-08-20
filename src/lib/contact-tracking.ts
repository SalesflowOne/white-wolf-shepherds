import { trackConversion } from "@/lib/conversions";

/** Delegated click tracking for tel: and mailto: links (not click-to-pay CTAs). */
export function handleContactLinkClick(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const anchor = target.closest("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return;

  const href = anchor.getAttribute("href") ?? "";
  if (!href.startsWith("tel:") && !href.startsWith("mailto:")) return;

  trackConversion("contact_click");
}
