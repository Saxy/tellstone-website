// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://tellstone.io',
  integrations: [
    starlight({
      title: 'Tellstone',
      description:
        'Tellstone is an ultra-high-performance, cloud-native in-memory key/value store written in Go, speaking a binary protocol and Redis-compatible RESP2.',
      logo: {
        src: './src/assets/tellstone-logo.svg',
        replacesTitle: false,
      },
      favicon: '/favicon.svg',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/Saxy/Tellstone' },
      ],
      editLink: {
        baseUrl: 'https://github.com/Saxy/tellstone-website/edit/main/',
      },
      components: {
        ThemeSelect: './src/components/DisabledThemeSelect.astro',
      },
      customCss: [
        './src/styles/tokens.css',
        './src/styles/starlight-overrides.css',
      ],
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://tellstone.io/og.png' },
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: { directory: 'docs/getting-started' },
        },
        {
          label: 'Concepts',
          autogenerate: { directory: 'docs/concepts' },
        },
        {
          label: 'Commands',
          autogenerate: { directory: 'docs/commands' },
        },
        {
          label: 'Operations',
          autogenerate: { directory: 'docs/operations' },
        },
      ],
      pagination: true,
      lastUpdated: true,
      // Keep the docs section mounted at /docs so the root path is free
      // for the marketing landing page in src/pages/index.astro.
    }),
  ],
});
