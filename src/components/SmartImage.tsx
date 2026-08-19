import manifest from "@/lib/image-manifest.json";

type Entry = { w: number; h: number; v: number[] };
const MANIFEST = manifest as Record<string, Entry>;

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  src: string;
  alt: string;
  /** `sizes` attribute — how wide the image renders at each breakpoint. */
  sizes?: string;
  /** Set on the LCP image only. */
  priority?: boolean;
};

/**
 * <img> with build-time responsive variants, intrinsic width/height (no layout
 * shift) and lazy loading everywhere except the LCP image.
 */
export default function SmartImage({
  src,
  alt,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className,
  ...rest
}: Props) {
  const entry = MANIFEST[src];
  const srcSet = entry?.v.length
    ? [...entry.v.map((w) => `${src.replace(/\.webp$/, "")}-${w}.webp ${w}w`), `${src} ${entry.w}w`].join(
        ", ",
      )
    : undefined;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={entry?.w ?? rest.width ?? 1122}
      height={entry?.h ?? rest.height ?? 1402}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      className={className}
      {...rest}
    />
  );
}

/** Smallest generated variant for a photo — handy for preloads/thumbnails. */
export function thumbFor(src: string): string {
  const entry = MANIFEST[src];
  if (!entry?.v.length) return src;
  return `${src.replace(/\.webp$/, "")}-${entry.v[0]}.webp`;
}
