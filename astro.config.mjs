// @ts-check
import { defineConfig } from 'astro/config';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

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
});
