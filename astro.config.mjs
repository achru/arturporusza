import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://arturporusza.pl',
  integrations: [
    sitemap({
      // statyczne podstrony z public/ — poza routingiem Astro
      customPages: [
        'https://arturporusza.pl/kreatywnynauczyciel/',
        'https://arturporusza.pl/indywidualnie/',
        'https://arturporusza.pl/mezczyzni/',
      ],
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
