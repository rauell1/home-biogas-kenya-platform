import Link from "next/link";
import { requireUser } from "@/lib/guard";
import { ROLE_LABELS, type Role, can } from "@/lib/rbac";
import { signOutAction } from "@/app/actions/auth";
import BrandLogo from "@/components/BrandLogo";

export const dynamic = "force-dynamic";

type Item = { href: string; label: string; permission?: Parameters<typeof can>[1] };

const GROUPS: { title: string; items: Item[] }[] = [
  {
    title: "Overview",
    items: [
      { href: "/admin/dashboard", label: "Dashboard" },
      { href: "/admin/system-health", label: "System health" },
    ],
  },
  {
    title: "Portfolio",
    items: [
      { href: "/admin/projects", label: "Projects", permission: "projects.read" },
      { href: "/admin/approvals", label: "Approvals", permission: "projects.read" },
      { href: "/admin/media", label: "Media rights", permission: "projects.read" },
      { href: "/admin/source-records", label: "Source records", permission: "projects.read" },
      { href: "/admin/articles", label: "Articles", permission: "projects.read" },
    ],
  },
  {
    title: "Pipeline",
    items: [
      { href: "/admin/leads", label: "Leads", permission: "leads.read" },
      { href: "/admin/site-surveys", label: "Site surveys", permission: "leads.read" },
    ],
  },
  {
    title: "Administration",
    items: [
      { href: "/admin/users", label: "Staff & access", permission: "users.manage" },
      { href: "/admin/audit-log", label: "Audit log", permission: "audit.read" },
      { href: "/admin/cookie-settings", label: "Cookie & GDPR settings", permission: "settings.manage" },
      { href: "/admin/consent-logs", label: "Consent logs", permission: "audit.read" },
      { href: "/admin/settings", label: "Settings", permission: "settings.manage" },
    ],
  },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const groups = GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((i) => !i.permission || can(user.role, i.permission)),
  })).filter((g) => g.items.length > 0);

  const initials = user.fullName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-cream lg:grid lg:grid-cols-[264px_1fr]">
      <a href="#admin-main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:bg-ink focus:text-bone focus:px-4 focus:py-2">
        Skip to content
      </a>

      <aside className="relative bg-ink text-bone lg:min-h-screen lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div aria-hidden className="absolute inset-0 grid-lines opacity-25" />
        <div className="relative p-6">
          <Link href="/en" className="inline-block bg-white p-2">
            <BrandLogo className="w-[145px]" />
          </Link>
          <p className="mono-label text-bone/65 mt-1.5">Operations console</p>

          <nav aria-label="Admin" className="mt-9 space-y-7">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="mono-label text-bone/35">{g.title}</p>
                <ul className="mt-2.5 space-y-0.5">
                  {g.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-3 py-2 text-sm text-bone/80 border-l-2 border-transparent hover:border-methane hover:bg-bone/[0.07] hover:text-bone transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="mt-10 border-t border-bone/15 pt-5">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid h-9 w-9 shrink-0 place-items-center bg-methane text-ink mono-label"
              >
                {initials}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold truncate">{user.fullName}</span>
                <span className="mono-label block text-methane">{ROLE_LABELS[user.role as Role] ?? user.role}</span>
              </span>
            </div>
            <form action={signOutAction} className="mt-4">
              <button type="submit" className="mono-label w-full border border-bone/25 px-3 py-2 hover:bg-bone hover:text-ink transition-colors">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      <div id="admin-main" className="min-w-0 p-6 lg:p-10 xl:p-12">
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
