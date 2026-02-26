# Markdown Cheatsheet

A quick reference for all supported syntax.

---

## Text Styling

| Style | Syntax | Result |
|-------|--------|--------|
| Bold | `**text**` | **text** |
| Italic | `*text*` | *text* |
| Bold + Italic | `***text***` | ***text*** |
| Strikethrough | `~~text~~` | ~~text~~ |
| Inline Code | `` `code` `` | `code` |

## Headings

```
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

## Links & Images

```
[Link text](https://example.com)
[With title](https://example.com "Title")
![Alt text](image-url.png)
```

## Lists

```
- Unordered item
  - Nested item

1. Ordered item
   1. Nested ordered

- [x] Task complete
- [ ] Task incomplete
```

## Blockquotes

```
> Single quote

> Nested:
> > Inner quote
```

> This is what it looks like.
>
> > And this is nested.

## Code Blocks

Use triple backticks with a language name:

```javascript
const greeting = "Hello, world!";
console.log(greeting);
```

## Tables

```
| Left | Center | Right |
|:-----|:------:|------:|
| a    | b      | c     |
```

| Left | Center | Right |
|:-----|:------:|------:|
| a    | b      | c     |

## Horizontal Rule

```
---
```

---

## HTML

Some inline HTML works: `<mark>highlighted</mark>` → <mark>highlighted</mark>

<details>
<summary>Collapsible section</summary>

Content inside a `<details>` tag.

</details>
