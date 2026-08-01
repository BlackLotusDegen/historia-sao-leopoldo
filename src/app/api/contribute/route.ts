import { NextResponse } from "next/server";
import { savePendingSubmission } from "@/lib/submissions";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const authorName = String(formData.get("authorName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim() || undefined;
    const placeName = String(formData.get("placeName") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const caption = String(formData.get("caption") ?? "").trim() || undefined;
    const decadeRaw = String(formData.get("decade") ?? "");
    const yearRaw = String(formData.get("yearExact") ?? "").trim();
    const rightsAccepted = formData.get("rightsAccepted") === "true";
    const photo = formData.get("photo");

    if (!authorName || !placeName || !address) {
      return NextResponse.json(
        { error: "Preencha nome, local e endereço." },
        { status: 400 },
      );
    }

    if (!rightsAccepted) {
      return NextResponse.json(
        { error: "É necessário autorizar o uso da imagem." },
        { status: 400 },
      );
    }

    const decade = Number(decadeRaw);
    if (!Number.isFinite(decade) || decade < 1820 || decade > 2030) {
      return NextResponse.json(
        { error: "Década inválida." },
        { status: 400 },
      );
    }

    let yearExact: number | undefined;
    if (yearRaw) {
      yearExact = Number(yearRaw);
      if (!Number.isFinite(yearExact)) {
        return NextResponse.json({ error: "Ano inválido." }, { status: 400 });
      }
    }

    if (!(photo instanceof File) || photo.size === 0) {
      return NextResponse.json(
        { error: "Envie uma foto válida." },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.has(photo.type)) {
      return NextResponse.json(
        { error: "Use JPG, PNG ou WebP." },
        { status: 400 },
      );
    }

    if (photo.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "A imagem deve ter no máximo 8 MB." },
        { status: 400 },
      );
    }

    const submission = await savePendingSubmission({
      authorName,
      email,
      placeName,
      address,
      decade,
      yearExact,
      caption,
      rightsAccepted,
      file: photo,
    });

    return NextResponse.json({
      ok: true,
      id: submission.id,
      status: submission.status,
    });
  } catch (error) {
    console.error("contribute error", error);
    return NextResponse.json(
      { error: "Erro interno ao salvar a contribuição." },
      { status: 500 },
    );
  }
}
