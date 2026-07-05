# Contributing to tellstone-website

Thanks for helping improve the Tellstone site and docs.

## Running locally

```sh
npm install
npm run dev
```

The site runs at `http://localhost:4321`. The marketing home page lives at
`/`, and the docs live under `/docs`.

## Where things live

| You want to... | Edit this |
|---|---|
| Fix or add docs content | `src/content/docs/docs/**/*.md` (or `.mdx`) |
| Change sidebar grouping/order | `astro.config.mjs` (`sidebar`) or the page's `sidebar.order` frontmatter |
| Change colors, fonts, spacing | `src/styles/tokens.css` |
| Re-skin Starlight's own components | `src/styles/starlight-overrides.css` |
| Edit the landing page copy/sections | `src/pages/index.astro` and `src/components/*.astro` |

## Adding a docs page

Add a Markdown or MDX file under the right folder in
`src/content/docs/docs/`, e.g. `docs/commands/set.md`. Give it frontmatter:

```md
---
title: SET
description: One sentence describing what this page covers.
---
```

It will appear in the sidebar automatically — no config changes needed for
files inside an `autogenerate`-configured directory.

## Design changes

If you're proposing a visual change (color, type, layout), please open an
issue first describing the change and why, rather than a direct PR — this
keeps the site's look consistent as more people contribute.

## Commit style

Small, focused commits. Before opening a PR, run:

```sh
npm run build   # catches broken pages / invalid frontmatter
npm run check   # type-checks the project with astro check
```
