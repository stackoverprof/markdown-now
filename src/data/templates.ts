import resume from "./templates/resume.md?raw";
import coverLetter from "./templates/cover-letter.md?raw";
import paklaring from "./templates/paklaring.md?raw";
import cheatsheet from "./templates/cheatsheet.md?raw";

export type Template = { name: string; slug: string; content: string };

export const TEMPLATES: Template[] = [
  { name: "Resume", slug: "resume", content: resume },
  { name: "Cover Letter", slug: "cover-letter", content: coverLetter },
  { name: "Paklaring", slug: "paklaring", content: paklaring },
  { name: "Cheatsheet", slug: "cheatsheet", content: cheatsheet },
];

export function getTemplateBySlug(slug: string): Template | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}
