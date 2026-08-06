import Link from "next/link";

export default function PageHeader({
  eyebrow,
  title,
  lede,
  meta,
  actions,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  meta?: { label: string; value: string; href?: string }[];
  actions?: { label: string; href: string; accent?: boolean }[];
}) {
  return (
    <header className="relative overflow-hidden bg-bone">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, #121412 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, #121412 6%, transparent) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="shell relative pt-16 pb-14 md:pt-24 md:pb-20">
        <p className="chapter-marker text-clay-text">{eyebrow}</p>
        <h1 className="display-xl mt-5 max-w-4xl">{title}</h1>
        {lede && <p className="lede mt-6 max-w-2xl text-ink/75">{lede}</p>}

        {meta && meta.length > 0 && (
          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 border-t border-ink/12 pt-6">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="mono-label text-ink/70">{m.label}</dt>
                <dd className="mono-data mt-1.5">
                  {m.href ? (
                    <a href={m.href} className="hover:text-clay-text transition-colors underline-offset-2 hover:underline">{m.value}</a>
                  ) : m.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {actions && actions.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-3">
            {actions.map((a) => (
              <Link key={a.href} href={a.href} className={`btn ${a.accent ? "btn-primary" : "btn-outline"}`}>
                {a.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
