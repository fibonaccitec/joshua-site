import { shell } from "@/lib/site";

/** Light title block that opens every secondary page, matching the home's light top. */
export function PageBand({ title, lede }: { title: React.ReactNode; lede: React.ReactNode }) {
  return (
    <section>
      <div className={`${shell} pt-14 pb-12 md:pt-20 md:pb-14`}>
        <h1 className="max-w-[20ch] text-statement font-extrabold tracking-[-0.04em]">{title}</h1>
        <p className="mt-5 max-w-[48ch] text-intro text-mute">{lede}</p>
      </div>
    </section>
  );
}
