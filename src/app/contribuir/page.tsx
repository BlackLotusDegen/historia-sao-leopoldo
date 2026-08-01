import type { Metadata } from "next";
import { ContributeForm } from "@/components/contribute/ContributeForm";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { projectContact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contribuir",
  description:
    "Envie fotos históricas de São Leopoldo com endereço e década. Sua contribuição passa por moderação antes de entrar no mapa.",
};

export default function ContribuirPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-brick">
          Comunidade
        </p>
        <h1 className="font-display mt-3 text-4xl text-moss-deep sm:text-5xl">
          Envie uma foto do passado
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70">
          Cada imagem com endereço e década ajuda a reconstruir a cidade que
          está desaparecendo. Após o envio, a curadoria revisa e publica no
          mapa. Dúvidas? Fale com {projectContact.name} no WhatsApp{" "}
          <a
            href={projectContact.whatsappContributeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brick underline-offset-2 hover:underline"
          >
            {projectContact.phoneDisplay}
          </a>
          .
        </p>
        <div className="mt-10 rounded-sm border border-[var(--line)] bg-paper p-5 sm:p-8">
          <ContributeForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
