"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <main className="relative flex min-h-[100dvh] flex-col overflow-hidden">
        <div className="hero-grain absolute inset-0" />
        <SiteHeader variant="overlay" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-tile">
              Berço da imigração alemã · RS
            </p>
            <h1 className="font-display mt-4 text-[clamp(2.6rem,8vw,5.4rem)] leading-[0.95] text-paper">
              História São Leopoldo
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg">
              Veja a cidade de cima, clique em um endereço e viaje pelas décadas
              — antes que mais um pedaço da nossa memória desapareça.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/mapa"
                className="rounded-sm bg-brick px-5 py-3 text-sm font-medium text-paper transition hover:bg-tile"
              >
                Explorar o mapa
              </Link>
              <Link
                href="/contribuir"
                className="rounded-sm border border-paper/35 bg-paper/5 px-5 py-3 text-sm font-medium text-paper backdrop-blur-sm transition hover:bg-paper/15"
              >
                Enviar uma foto
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <section className="border-y border-[var(--line)] bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3">
          {[
            {
              title: "Mapa do tempo",
              text: "Pins nos locais com acervo. Cada clique abre décadas de fotos e relatos daquele endereço.",
            },
            {
              title: "Feito com a cidade",
              text: "Famílias, arquivos e vizinhos enviam imagens. A curadoria publica o que fortalece a memória coletiva.",
            },
            {
              title: "Apoio que sustenta",
              text: "Hospedagem e preservação custam. Patrocinadores mantêm o mapa vivo para as próximas gerações.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
            >
              <h2 className="font-display text-2xl text-moss-deep">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
