# Markdown Now

A minimal, live markdown editor. Type on the left, see the preview on the right — instantly.

**[markdown-now.vercel.app](https://markdown-now.vercel.app/)**

## Features

- **Live preview** — renders as you type, no delay
- **GitHub Flavored Markdown** — tables, task lists, strikethrough, autolinks
- **Syntax highlighting** — code blocks with language detection
- **Mermaid diagrams** — flowcharts, sequence diagrams, and more
- **Raw HTML** — `<details>`, `<mark>`, and other HTML tags rendered inline
- **Dark / light mode** — toggle with a click, preference saved locally
- **PDF export** — print-optimized layout via Save as PDF

## Tech Stack

- [React](https://react.dev) 19
- [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS](https://tailwindcss.com) v4
- [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm)
- [rehype-highlight](https://github.com/rehypejs/rehype-highlight) + [rehype-raw](https://github.com/rehypejs/rehype-raw)
- [Mermaid](https://mermaid.js.org)
- [Geist](https://vercel.com/font) font family

## Getting Started

```bash
npm install
npm run dev
```

Runs at [localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run preview
```

## Tests

```bash
npm run test
```

## License

MIT
