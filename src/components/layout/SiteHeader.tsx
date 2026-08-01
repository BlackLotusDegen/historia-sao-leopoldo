import Link from "next/link";

const links = [
  { href: "/mapa", label: "Mapa" },
  { href: "/contribuir", label: "Contribuir" },
  { href: "/apoie", label: "Apoie" },
  { href: "/sobre", label: "Sobre" },
];

type SiteHeaderProps = {
  variant?: "solid" | "overlay";
};

export function SiteHeader({ variant = "solid" }: SiteHeaderProps) {
  const isOverlay = variant === "overlay";

  return (
    <header
      className={
        isOverlay
          ? "absolute inset-x-0 top-0 z-40"
          : "sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--fog)_92%,transparent)] backdrop-blur-md"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group min-w-0">
          <span
            className={`font-display block truncate text-lg tracking-wide sm:text-xl ${
              isOverlay ? "text-paper" : "text-moss-deep"
            }`}
          >
            História São Leopoldo
          </span>
          <span
            className={`block text-[11px] uppercase tracking-[0.18em] ${
              isOverlay ? "text-paper/70" : "text-moss-soft"
            }`}
          >
            Mapa interativo do passado
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm sm:gap-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                isOverlay
                  ? "text-paper/85 hover:text-paper"
                  : "text-ink/75 hover:text-brick"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
