import Image from "next/image";
import type { Screen } from "@/lib/screens";

type FrameProps = {
  screen: Screen;
  className?: string;
  sizes: string;
  /** Above-the-fold image: fetch it first instead of lazily. */
  eager?: boolean;
};

/** A web screen shown as an elevated, rounded window. */
export function ScreenFrame({ screen, className = "", sizes, eager }: FrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-screen border border-white/10 bg-white shadow-stage ${className}`}
    >
      <Image
        src={screen.src}
        width={screen.width}
        height={screen.height}
        alt={screen.alt}
        sizes={sizes}
        quality={90}
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
        className="h-full w-full object-cover object-left-top"
      />
    </div>
  );
}

/** A field-app screen inside a phone bezel. */
export function PhoneFrame({ screen, className = "", sizes, eager }: FrameProps) {
  return (
    <div
      className={`aspect-[645/1398] overflow-hidden rounded-phone border-[7px] border-bezel bg-white ${className}`}
    >
      <Image
        src={screen.src}
        width={screen.width}
        height={screen.height}
        alt={screen.alt}
        sizes={sizes}
        quality={90}
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}
