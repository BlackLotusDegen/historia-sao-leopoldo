import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { projectContact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Apoie",
  description:
    "Patrocine o História São Leopoldo: ajude a pagar hospedagem, armazenamento e a preservação da memória da cidade.",
};

const tiers = [
  {
    name: "Apoiador",
    detail: "Ajuda pontual para custos mensais de hospedagem e armazenamento.",
  },
  {
    name: "Mantenedor",
    detail:
      "Apoio recorrente com menção no site e nos materiais do projeto.",
  },
  {
    name: "Patrocinador principal",
    detail:
      "Parceria de destaque com logo na página Apoie e presença em ações públicas.",
  },
];

export default function ApoiePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-[var(--line)] bg-moss-deep text-paper">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-[11px] uppercase tracking-[0.2em] text-tile">
              Sustentabilidade
            </p>
            <h1 className="font-display mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">
              Quem apoia mantém a história no ar
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/75">
              Servidores, espaço para fotos e moderação têm custo. Patrocínios
              locais garantem que o mapa continue acessível — e que novas
              contribuições da comunidade encontrem um lar.
            </p>
            <a
              href={projectContact.whatsappSponsorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-sm bg-brick px-5 py-3 text-sm font-medium text-paper transition hover:bg-tile"
            >
              Falar no WhatsApp
            </a>
            <p className="mt-4 text-sm text-paper/70">
              {projectContact.name} · {projectContact.phoneDisplay}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl text-moss-deep">
            Faixas de apoio
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="border-t-2 border-brick pt-5"
              >
                <h3 className="font-display text-2xl text-ink">{tier.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {tier.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--line)] bg-paper">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-display text-3xl text-moss-deep">
              Espaço para parceiros
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">
              Os logos dos patrocinadores aparecerão aqui. Enquanto isso,
              empresas, associações e famílias podem iniciar a conversa com{" "}
              {projectContact.name} pelo WhatsApp{" "}
              <a
                href={projectContact.whatsappSponsorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brick underline-offset-2 hover:underline"
              >
                {projectContact.phoneDisplay}
              </a>
              .
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {["Parceiro 1", "Parceiro 2", "Parceiro 3", "Parceiro 4"].map(
                (label) => (
                  <div
                    key={label}
                    className="flex aspect-[3/2] items-center justify-center border border-dashed border-[var(--line)] text-xs uppercase tracking-[0.14em] text-ink/35"
                  >
                    {label}
                  </div>
                ),
              )}
            </div>
            <p className="mt-8 text-sm text-ink/65">
              Também quer contribuir com fotos?{" "}
              <Link href="/contribuir" className="text-brick underline-offset-2 hover:underline">
                Envie seu acervo
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
