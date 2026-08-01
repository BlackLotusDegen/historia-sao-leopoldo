"use client";

import { FormEvent, useState } from "react";

const decades = [
  1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020,
];

const fieldClass =
  "w-full rounded-sm border border-[var(--line)] bg-white px-3.5 py-2.5 text-ink outline-none transition focus:border-brick focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--brick)_22%,transparent)]";

export function ContributeForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contribute", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { error?: string; id?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Não foi possível enviar. Tente novamente.");
        return;
      }

      setStatus("success");
      setMessage(
        "Obrigado! Sua contribuição entrou na fila de moderação e poderá aparecer no mapa após a curadoria.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Falha de rede. Verifique sua conexão e tente de novo.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Seu nome" htmlFor="authorName">
          <input
            id="authorName"
            name="authorName"
            required
            className={fieldClass}
            placeholder="Nome completo ou como deseja ser creditado"
          />
        </Field>
        <Field label="E-mail (opcional)" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            className={fieldClass}
            placeholder="para contato sobre a contribuição"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome do local" htmlFor="placeName">
          <input
            id="placeName"
            name="placeName"
            required
            className={fieldClass}
            placeholder="Ex.: Casa da família Schmidt"
          />
        </Field>
        <Field label="Endereço" htmlFor="address">
          <input
            id="address"
            name="address"
            required
            className={fieldClass}
            placeholder="Rua, número, bairro — São Leopoldo/RS"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Década" htmlFor="decade">
          <select
            id="decade"
            name="decade"
            required
            className={fieldClass}
            defaultValue=""
          >
            <option value="" disabled>
              Selecione
            </option>
            {decades.map((decade) => (
              <option key={decade} value={decade}>
                {decade}s
              </option>
            ))}
          </select>
        </Field>
        <Field label="Ano exato (opcional)" htmlFor="yearExact">
          <input
            id="yearExact"
            name="yearExact"
            type="number"
            min={1824}
            max={new Date().getFullYear()}
            className={fieldClass}
            placeholder="Ex.: 1954"
          />
        </Field>
      </div>

      <Field label="Legenda / história (opcional)" htmlFor="caption">
        <textarea
          id="caption"
          name="caption"
          rows={4}
          className={`${fieldClass} resize-y`}
          placeholder="O que essa foto mostra? Quem aparece? O que mudou no local?"
        />
      </Field>

      <Field label="Foto" htmlFor="photo">
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
          className="block w-full text-sm text-ink/80 file:mr-3 file:rounded-sm file:border-0 file:bg-moss file:px-3 file:py-2 file:text-paper hover:file:bg-moss-soft"
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink/80">
        <input
          type="checkbox"
          name="rightsAccepted"
          value="true"
          required
          className="mt-1"
        />
        <span>
          Autorizo o uso desta imagem no projeto História São Leopoldo para
          fins de preservação histórica e divulgação cultural, com crédito ao
          autor quando informado.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-sm bg-brick px-5 py-3 text-sm font-medium text-paper transition hover:bg-brick-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Enviar para moderação"}
      </button>

      {message && (
        <p
          className={`text-sm ${
            status === "success" ? "text-moss" : "text-brick-deep"
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block space-y-2 text-sm">
      <label htmlFor={htmlFor} className="font-medium text-ink/85">
        {label}
      </label>
      {children}
    </div>
  );
}
