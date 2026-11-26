import Image from "next/image";

/**
 * The Joshua logo for light backgrounds: the J mark in Joshua blue followed
 * by "oshua" in ink. Recoloured from the product's logo
 * (apps/web/public/logo_joshua.png), trimmed.
 */
export function Logo({
  className = "",
  eager = false,
}: {
  className?: string;
  /** The header logo is above the fold on every page. */
  eager?: boolean;
}) {
  return (
    <Image
      src="/brand/joshua-logo-color.png"
      width={494}
      height={169}
      alt="Joshua"
      loading={eager ? "eager" : undefined}
      className={`h-auto ${className}`}
    />
  );
}
