export type Template = { name: string; content: string };

export const TEMPLATES: Template[] = [
  {
    name: "README",
    content: `# Project Name

A brief description of what this project does.

## Installation

\`\`\`bash
npm install my-project
\`\`\`

## Usage

\`\`\`typescript
import { something } from "my-project";

something();
\`\`\`

## API

| Method | Description | Returns |
|--------|-------------|---------|
| \`init()\` | Initialize the client | \`void\` |
| \`fetch(id)\` | Fetch a resource | \`Promise<Resource>\` |
| \`destroy()\` | Clean up | \`void\` |

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

[MIT](https://choosealicense.com/licenses/mit/)
`,
  },
  {
    name: "Blog Post",
    content: `# Title of the Post

*Published on February 2026*

A compelling introduction that hooks the reader and sets up what you'll cover.

---

## The Problem

Describe the problem or question you're addressing. Use **bold** for emphasis and *italic* for nuance.

> "A relevant quote that frames the discussion."
> — Someone Wise

## The Approach

Walk through your thinking step by step:

1. First, we considered this
2. Then, we tried that
3. Finally, we landed on this approach

Here's the key insight in code:

\`\`\`typescript
function solve(problem: Problem): Solution {
  const insight = analyze(problem);
  return implement(insight);
}
\`\`\`

## What We Learned

- **Lesson one** — a brief explanation
- **Lesson two** — another takeaway
- **Lesson three** — the most surprising finding

## Conclusion

Wrap up with a concise summary and a forward-looking thought.

---

*Thanks for reading. [Follow me](https://example.com) for more.*
`,
  },
  {
    name: "Meeting Notes",
    content: `# Meeting Notes — Project Sync

**Date:** February 26, 2026
**Attendees:** Alice, Bob, Charlie
**Facilitator:** Alice

---

## Agenda

1. Sprint review
2. Blockers
3. Next steps

## Discussion

### Sprint Review

Completed this cycle:

- [x] User authentication flow
- [x] Dashboard redesign
- [ ] API rate limiting (carried over)

### Blockers

> **Bob:** Waiting on API credentials from the vendor. ETA unclear.

> **Charlie:** CI pipeline is flaky — tests pass locally but fail in CI ~30% of the time.

### Decisions Made

| Decision | Owner | Deadline |
|----------|-------|----------|
| Switch to new CI provider | Charlie | Mar 3 |
| Follow up with vendor | Bob | Feb 28 |
| Write API rate limiting spec | Alice | Mar 1 |

## Action Items

- [ ] **Charlie** — Evaluate GitHub Actions vs current setup
- [ ] **Bob** — Escalate vendor request
- [ ] **Alice** — Draft spec and share by Friday

## Next Meeting

**March 5, 2026** at 10:00 AM
`,
  },
  {
    name: "Cheatsheet",
    content: `# Markdown Cheatsheet

A quick reference for all supported syntax.

---

## Text Styling

| Style | Syntax | Result |
|-------|--------|--------|
| Bold | \`**text**\` | **text** |
| Italic | \`*text*\` | *text* |
| Bold + Italic | \`***text***\` | ***text*** |
| Strikethrough | \`~~text~~\` | ~~text~~ |
| Inline Code | \`\\\`code\\\`\` | \`code\` |

## Headings

\`\`\`
# H1
## H2
### H3
#### H4
##### H5
###### H6
\`\`\`

## Links & Images

\`\`\`
[Link text](https://example.com)
[With title](https://example.com "Title")
![Alt text](image-url.png)
\`\`\`

## Lists

\`\`\`
- Unordered item
  - Nested item

1. Ordered item
   1. Nested ordered

- [x] Task complete
- [ ] Task incomplete
\`\`\`

## Blockquotes

\`\`\`
> Single quote

> Nested:
> > Inner quote
\`\`\`

> This is what it looks like.
>
> > And this is nested.

## Code Blocks

Use triple backticks with a language name:

\`\`\`javascript
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`

## Tables

\`\`\`
| Left | Center | Right |
|:-----|:------:|------:|
| a    | b      | c     |
\`\`\`

| Left | Center | Right |
|:-----|:------:|------:|
| a    | b      | c     |

## Horizontal Rule

\`\`\`
---
\`\`\`

---

## HTML

Some inline HTML works: \`<mark>highlighted</mark>\` → <mark>highlighted</mark>

<details>
<summary>Collapsible section</summary>

Content inside a \`<details>\` tag.

</details>
`,
  },
];
