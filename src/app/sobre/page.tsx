import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { projectContact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "O História São Leopoldo é um mapa comunitário para preservar a memória da cidade, berço da imigração alemã no Brasil.",
};

export default function SobrePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-brick">
          Missão
        </p>
        <h1 className="font-display mt-3 text-4xl text-moss-deep sm:text-5xl">
          Navegar no passado para não esquecer o lugar
        </h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/75">
          <p>
            São Leopoldo é o berço da imigração alemã no Brasil. Ruas, praças,
            fábricas e casas carregam histórias que a demolição e o tempo
            apagam rápido demais.
          </p>
          <p>
            O <strong className="font-medium text-ink">História São Leopoldo</strong>{" "}
            nasce para reunir fotos e relatos por endereço — e deixá-los
            exploráveis em um mapa: você olha a cidade de cima, clica no local
            e escolhe a década.
          </p>
          <p>
            O projeto só cresce com a comunidade: quem guarda uma caixa de
            fotografias, quem lembra o comércio da esquina, quem ainda tem o
            endereço de uma casa que já não existe.
          </p>
          <p>
            Para manter hospedagem, armazenamento e curadoria, contamos também
            com patrocinadores locais. Memória coletiva precisa de cuidado —
            e de apoio concreto.
          </p>
          <p>
            Contato do projeto:{" "}
            <a
              href={projectContact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brick underline-offset-2 hover:underline"
            >
              {projectContact.name} · {projectContact.phoneDisplay}
            </a>
            .
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/mapa"
            className="rounded-sm bg-moss px-5 py-3 text-sm font-medium text-paper hover:bg-moss-soft"
          >
            Abrir o mapa
          </Link>
          <Link
            href="/contribuir"
            className="rounded-sm border border-[var(--line)] px-5 py-3 text-sm font-medium text-ink hover:border-brick hover:text-brick"
          >
            Contribuir
          </Link>
          <Link
            href="/apoie"
            className="rounded-sm border border-[var(--line)] px-5 py-3 text-sm font-medium text-ink hover:border-brick hover:text-brick"
          >
            Apoiar
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
