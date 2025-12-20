// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: '5q6708nl',
      dataset: 'production',
      useCdn: false,
    }),
    react(),
  ],
  image: {
    domains: ['cdn.sanity.io'],
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
