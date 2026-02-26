import readme from "./templates/readme.md?raw";
import blogPost from "./templates/blog-post.md?raw";
import meetingNotes from "./templates/meeting-notes.md?raw";
import cheatsheet from "./templates/cheatsheet.md?raw";

export type Template = { name: string; content: string };

export const TEMPLATES: Template[] = [
  { name: "README", content: readme },
  { name: "Blog Post", content: blogPost },
  { name: "Meeting Notes", content: meetingNotes },
  { name: "Cheatsheet", content: cheatsheet },
];
