import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type { PendingSubmission } from "@/data/types";

const submissionsDir = path.join(process.cwd(), "data", "submissions");
const uploadsDir = path.join(process.cwd(), "public", "uploads", "pending");

export async function savePendingSubmission(input: {
  authorName: string;
  email?: string;
  placeName: string;
  address: string;
  decade: number;
  yearExact?: number;
  caption?: string;
  rightsAccepted: boolean;
  file: File;
}): Promise<PendingSubmission> {
  await mkdir(submissionsDir, { recursive: true });
  await mkdir(uploadsDir, { recursive: true });

  const id = randomUUID();
  const extension = getExtension(input.file.name, input.file.type);
  const filename = `${id}${extension}`;
  const imagePath = `/uploads/pending/${filename}`;
  const buffer = Buffer.from(await input.file.arrayBuffer());

  await writeFile(path.join(uploadsDir, filename), buffer);

  const submission: PendingSubmission = {
    id,
    status: "pending",
    createdAt: new Date().toISOString(),
    authorName: input.authorName,
    email: input.email,
    placeName: input.placeName,
    address: input.address,
    decade: input.decade,
    yearExact: input.yearExact,
    caption: input.caption,
    rightsAccepted: input.rightsAccepted,
    imagePath,
    originalFilename: input.file.name,
  };

  await writeFile(
    path.join(submissionsDir, `${id}.json`),
    JSON.stringify(submission, null, 2),
    "utf8",
  );

  return submission;
}

function getExtension(filename: string, mime: string): string {
  const fromName = path.extname(filename).toLowerCase();
  if (fromName) return fromName;
  if (mime === "image/jpeg") return ".jpg";
  if (mime === "image/png") return ".png";
  if (mime === "image/webp") return ".webp";
  return ".bin";
}
