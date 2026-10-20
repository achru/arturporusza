import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { atrapaTerminow } from './scripts/sesja-atrapa-terminow.mjs';

export default defineConfig({
  site: 'https://arturporusza.pl',
  integrations: [
    sitemap({
      // warianty /sesja/<reklama>/ mają kanoniczny adres /sesja/, więc nie idą do mapy
      filter: (page) => !/\/sesja\/[^/]+\/$/.test(page),
      // statyczne podstrony z public/ — poza routingiem Astro
      customPages: [
        'https://arturporusza.pl/kreatywnynauczyciel/',
        'https://arturporusza.pl/indywidualnie/',
        'https://arturporusza.pl/mezczyzni/',
        'https://arturporusza.pl/mozna-inaczej/',
      ],
    }),
    // atrapa API wolnych terminów dla /sesja, tylko w `astro dev`
    atrapaTerminow(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
