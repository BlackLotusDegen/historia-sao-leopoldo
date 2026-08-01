import Link from "next/link";
import { projectContact } from "@/data/contact";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-moss-deep text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-2xl">História São Leopoldo</p>
          <p className="mt-2 max-w-md text-sm text-paper/75">
            Preservar o que o tempo e a demolição apagam — com a ajuda da
            comunidade e de quem apoia a memória da cidade.
          </p>
          <a
            href={projectContact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-tile hover:text-paper"
          >
            WhatsApp: {projectContact.name} · {projectContact.phoneDisplay}
          </a>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-paper/80">
          <Link href="/mapa" className="hover:text-tile">
            Explorar mapa
          </Link>
          <Link href="/contribuir" className="hover:text-tile">
            Enviar foto
          </Link>
          <Link href="/apoie" className="hover:text-tile">
            Patrocinar
          </Link>
        </div>
      </div>
    </footer>
  );
}
