import Link from "next/link";

export default function AdminHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/12 pb-5 mb-8">
      <div>
        <p className="chapter-marker text-clay">{eyebrow}</p>
        <h1 className="display-lg mt-3">{title}</h1>
        {description && <p className="mt-2.5 text-sm text-ink/60 max-w-2xl">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="btn btn-primary btn-sm">
          {action.label}
        </Link>
      )}
    </header>
  );
}
