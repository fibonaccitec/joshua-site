export type EvidenceRow = {
  label: string;
  value: string;
  /** Optional CSS colour for the value, e.g. a margin-ladder token. */
  tone?: string;
};

type SituationProps = {
  n: string;
  title: string;
  children: React.ReactNode;
  evidence: readonly EvidenceRow[];
  caption: string;
};

/**
 * One numbered "situation" of the editorial home: the pain told as a short
 * scene, then what changes, with a small typographic crop of the product as
 * evidence. No container: rows are separated by hairline rules.
 */
export function Situation({ n, title, children, evidence, caption }: SituationProps) {
  return (
    <article className="grid gap-6 border-b border-line py-12 md:grid-cols-[72px_1fr] md:gap-x-10 md:py-16 lg:grid-cols-[120px_1fr_340px] lg:gap-14">
      <span className="caption md:pt-3.5" aria-hidden="true">
        {n}
      </span>
      <div>
        <h3 className="mb-5 text-section font-light tracking-[-0.025em]">{title}</h3>
        <div className="max-w-[52ch] text-lede text-body">{children}</div>
      </div>
      <figure className="md:col-start-2 lg:col-start-auto lg:pt-3">
        <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2.5 border-t-2 border-b border-ink py-4 font-ui text-sm">
          {evidence.map((row) => (
            <div key={row.label} className="contents">
              <dt className="text-mute">{row.label}</dt>
              <dd className="text-right font-semibold" style={row.tone ? { color: row.tone } : undefined}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
        <figcaption className="caption mt-3 leading-normal tracking-[0.06em] text-mute">
          {caption}
        </figcaption>
      </figure>
    </article>
  );
}
