# tellstone-website

The marketing site and documentation for [Tellstone](https://github.com/Saxy/Tellstone),
an in-memory key/value store written in Go. Deployed at [tellstone.io](https://tellstone.io).

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build) —
a static site framework and docs theme, chosen so the project stays small
enough for the community to maintain: Markdown/MDX content, built-in search
(Pagefind), dark mode, and sidebar generation, with no bespoke templating
system to keep alive.

## Structure

```
src/
  pages/index.astro        Marketing landing page (route: /)
  components/               Landing page sections (Hero, Features, ...)
  layouts/Landing.astro     HTML shell for the landing page
  styles/tokens.css         Design tokens (colors, type) — edit here to re-skin
  styles/starlight-overrides.css   Maps tokens onto Starlight's theme variables
  content/docs/docs/        Docs content (route: /docs/**)
    getting-started/
    concepts/
    commands/
    operations/
astro.config.mjs            Starlight config: sidebar, social links, integrations
```

The docs are intentionally nested one level deeper
(`src/content/docs/docs/...`) so Starlight's generated routes land under
`/docs/*`, leaving `/` free for the custom landing page.

## Logo

`src/assets/tellstone-logo.svg` and `public/logo.svg` are **placeholders**.
Replace both with the real `tsd_logo.svg` from the
[Tellstone repo](https://github.com/Saxy/Tellstone/blob/main/tsd_logo.svg),
keeping the filenames as-is so `astro.config.mjs` and the nav in
`src/pages/index.astro` don't need to change. Regenerate `public/favicon.svg`
from it too (a square-cropped, simplified version usually works best at
favicon size).

## Local development

Requires Node 18.17+.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to ./dist
npm run preview   # preview the production build
```

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes `./dist` to
GitHub Pages on every push to `main`. To use it:

1. In the repo's **Settings → Pages**, set the source to **GitHub Actions**.
2. Keep `public/CNAME` (already set to `tellstone.io`) if you're using a
   custom domain, or delete it to use the default `*.github.io` URL.
3. Point your domain's DNS at GitHub Pages per
   [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

Any other static host (Cloudflare Pages, Netlify, Vercel) works too — just
point it at `npm run build` and serve `./dist`.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for where things live and how to
add a docs page.

## License

Apache-2.0 — see [LICENSE](./LICENSE), matching the main Tellstone project.
