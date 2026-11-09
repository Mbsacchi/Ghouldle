import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Generates dedicated SEO/GEO pre-rendered HTML entry points for:
 * - /ghouldle/index.html (https://suiichidadle.vercel.app/ghouldle)
 * - /choujinxdle/index.html (https://suiichidadle.vercel.app/choujinxdle)
 * so Googlebot, Bingbot, Discord/Twitter/WhatsApp and AI search crawlers
 * index both subroutes as distinct first-class pages with their own canonical URL,
 * title, description, BreadcrumbList, and VideoGame structured data.
 */
function seoMultiRouteHtmlPlugin() {
  return {
    name: 'seo-multi-route-html',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const rootHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(rootHtmlPath)) return;

      const baseHtml = fs.readFileSync(rootHtmlPath, 'utf-8');

      const routes = [
        {
          dir: 'ghouldle',
          url: 'https://suiichidadle.vercel.app/ghouldle',
          title: 'Ghouldle (Ghoul Dle) — Jogo Diário de Tokyo Ghoul | Sui Ichida Dle',
          description:
            'Jogue Ghouldle (Ghoul Dle / Tokyo Ghoul Dle) em suiichidadle.vercel.app/ghouldle! Adivinhe o personagem diário ou infinito de Tokyo Ghoul e Tokyo Ghoul:re pelos atributos da CCG, citações e máscaras. Parte do Sui Ichida Dle.',
          keywords:
            'ghouldle, ghoul dle, tokyo ghoul dle, tokyo ghoul wordle, sui ichida dle, sui ishida dle, suichidadle, jogo tokyo ghoul, ken kaneki, touka kirishima, kishou arima, juuzou suzuya',
          ogImage: 'https://suiichidadle.vercel.app/characters/ken-kaneki.jpg',
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Sui Ichida Dle (Sui Ishida Dle)',
                    item: 'https://suiichidadle.vercel.app/',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Ghouldle (Tokyo Ghoul Dle)',
                    item: 'https://suiichidadle.vercel.app/ghouldle',
                  },
                ],
              },
              {
                '@type': 'VideoGame',
                '@id': 'https://suiichidadle.vercel.app/ghouldle#game',
                name: 'Ghouldle — Tokyo Ghoul Dle (Sui Ichida Dle)',
                alternateName: [
                  'Ghouldle',
                  'Ghoul Dle',
                  'Tokyo Ghoul Dle',
                  'Tokyo Ghoul Wordle',
                  'Sui Ichida Dle Ghouldle',
                ],
                url: 'https://suiichidadle.vercel.app/ghouldle',
                isPartOf: {
                  '@type': 'WebSite',
                  name: 'Sui Ichida Dle',
                  url: 'https://suiichidadle.vercel.app/',
                },
                genre: ['Trivia', 'Puzzle', 'Wordle', 'Anime & Manga Game'],
                gamePlatform: ['Web Browser', 'Mobile Web'],
                applicationCategory: 'Game',
                inLanguage: 'pt-BR',
                description:
                  'Ghouldle é o jogo diário e infinito de adivinhação de Tokyo Ghoul e Tokyo Ghoul:re no portal Sui Ichida Dle (suiichidadle.vercel.app/ghouldle).',
              },
            ],
          },
          bodyHtml: `
      <main class="max-w-4xl mx-auto p-6 space-y-6">
        <header>
          <p><a href="https://suiichidadle.vercel.app/">← Sui Ichida Dle (Lobby Principal)</a></p>
          <h1>Ghouldle (Ghoul Dle) — O Jogo Diário e Infinito de Tokyo Ghoul &amp; :re</h1>
          <p>
            Jogue <strong>Ghouldle</strong> (<a href="https://suiichidadle.vercel.app/ghouldle">suiichidadle.vercel.app/ghouldle</a>),
            o jogo de adivinhação diário de <em>Tokyo Ghoul</em> e <em>Tokyo Ghoul:re</em> integrado ao portal
            <a href="https://suiichidadle.vercel.app/"><strong>Sui Ichida Dle (Sui Ishida Dle)</strong></a>.
          </p>
        </header>
        <section>
          <h2>Modos de Jogo do Ghouldle</h2>
          <ul>
            <li><a href="https://suiichidadle.vercel.app/ghouldle/classic">Modo Clássico (Atributos da CCG: Espécie, Afiliação, Kagune/Quinque, Rank e Arco)</a></li>
            <li><a href="https://suiichidadle.vercel.app/ghouldle/quote">Modo Citação (Frases Marcantes de Tokyo Ghoul)</a></li>
            <li><a href="https://suiichidadle.vercel.app/ghouldle/mask">Modo Máscara &amp; Olho (Kakugan e Máscaras da Hysy)</a></li>
          </ul>
          <p>Conheça também o <a href="https://suiichidadle.vercel.app/choujinxdle">ChoujinXdle (Choujin X Dle)</a> no mesmo portal.</p>
        </section>
      </main>`,
        },
        {
          dir: 'choujinxdle',
          url: 'https://suiichidadle.vercel.app/choujinxdle',
          title: 'ChoujinXdle (Choujin X Dle) — Jogo Diário de Choujin X | Sui Ichida Dle',
          description:
            'Jogue ChoujinXdle (Choujin X Dle / Choujindle) em suiichidadle.vercel.app/choujinxdle! Adivinhe o personagem diário ou infinito de Choujin X com dicas RAISE!, Citação e Forma Choujin / Estado de Caos. Parte do Sui Ichida Dle.',
          keywords:
            'choujinxdle, choujin x dle, choujindle, choujin dle, choujin x wordle, sui ichida dle, sui ishida dle, suichidadle, tokio kurohara, azuma higashi, ely otta, hoshi sandek, zora siruha, batista hoshi',
          ogImage: 'https://suiichidadle.vercel.app/characters/tokio-kurohara.png',
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Sui Ichida Dle (Sui Ishida Dle)',
                    item: 'https://suiichidadle.vercel.app/',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'ChoujinXdle (Choujin X Dle)',
                    item: 'https://suiichidadle.vercel.app/choujinxdle',
                  },
                ],
              },
              {
                '@type': 'VideoGame',
                '@id': 'https://suiichidadle.vercel.app/choujinxdle#game',
                name: 'ChoujinXdle — Choujin X Dle (Sui Ichida Dle)',
                alternateName: [
                  'ChoujinXdle',
                  'Choujin X Dle',
                  'Choujindle',
                  'Choujin Dle',
                  'Sui Ichida Dle Choujin X',
                ],
                url: 'https://suiichidadle.vercel.app/choujinxdle',
                isPartOf: {
                  '@type': 'WebSite',
                  name: 'Sui Ichida Dle',
                  url: 'https://suiichidadle.vercel.app/',
                },
                genre: ['Trivia', 'Puzzle', 'Wordle', 'Anime & Manga Game'],
                gamePlatform: ['Web Browser', 'Mobile Web'],
                applicationCategory: 'Game',
                inLanguage: 'pt-BR',
                description:
                  'ChoujinXdle é o jogo diário e infinito de adivinhação de Choujin X no portal Sui Ichida Dle (suiichidadle.vercel.app/choujinxdle).',
              },
            ],
          },
          bodyHtml: `
      <main class="max-w-4xl mx-auto p-6 space-y-6">
        <header>
          <p><a href="https://suiichidadle.vercel.app/">← Sui Ichida Dle (Lobby Principal)</a></p>
          <h1>ChoujinXdle (Choujin X Dle) — O Jogo Diário e Infinito de Choujin X</h1>
          <p>
            Jogue <strong>ChoujinXdle</strong> (<a href="https://suiichidadle.vercel.app/choujinxdle">suiichidadle.vercel.app/choujinxdle</a>),
            o jogo de adivinhação diário de <em>Choujin X</em> integrado ao portal
            <a href="https://suiichidadle.vercel.app/"><strong>Sui Ichida Dle (Sui Ishida Dle)</strong></a>.
          </p>
        </header>
        <section>
          <h2>Modos de Jogo do ChoujinXdle</h2>
          <ul>
            <li><a href="https://suiichidadle.vercel.app/choujinxdle/classic">Modo Clássico (Estado de Caos, Afiliação Yamato Mori / Torre do Luto, Complexo e Dicas RAISE!)</a></li>
            <li><a href="https://suiichidadle.vercel.app/choujinxdle/quote">Modo Citação (Vozes de Yamato)</a></li>
            <li><a href="https://suiichidadle.vercel.app/choujinxdle/mask">Modo Forma Choujin / Estado de Caos</a></li>
          </ul>
          <p>Conheça também o <a href="https://suiichidadle.vercel.app/ghouldle">Ghouldle (Tokyo Ghoul Dle)</a> no mesmo portal.</p>
        </section>
      </main>`,
        },
      ];

      for (const route of routes) {
        let html = baseHtml
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
          .replace(
            /<meta\s+name="title"\s+content="[^"]*"\s*\/>/,
            `<meta name="title" content="${route.title}" />`
          )
          .replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
            `<meta name="description" content="${route.description}" />`
          )
          .replace(
            /<meta\s+name="keywords"\s+content="[^"]*"\s*\/>/,
            `<meta name="keywords" content="${route.keywords}" />`
          )
          .replace(
            /<link rel="canonical" id="canonical-link" href="[^"]*" \/>/,
            `<link rel="canonical" id="canonical-link" href="${route.url}" />`
          )
          .replace(
            /<link rel="alternate" hreflang="pt-BR" href="[^"]*" \/>/,
            `<link rel="alternate" hreflang="pt-BR" href="${route.url}" />`
          )
          .replace(
            /<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/,
            `<link rel="alternate" hreflang="x-default" href="${route.url}" />`
          )
          .replace(
            /<meta property="og:url" id="og-url" content="[^"]*" \/>/,
            `<meta property="og:url" id="og-url" content="${route.url}" />`
          )
          .replace(
            /<meta\s+property="og:title"\s+id="og-title"\s+content="[^"]*"\s*\/>/,
            `<meta property="og:title" id="og-title" content="${route.title}" />`
          )
          .replace(
            /<meta\s+property="og:description"\s+id="og-description"\s+content="[^"]*"\s*\/>/,
            `<meta property="og:description" id="og-description" content="${route.description}" />`
          )
          .replace(
            /<meta\s+property="og:image"\s+id="og-image"\s+content="[^"]*"\s*\/>/,
            `<meta property="og:image" id="og-image" content="${route.ogImage}" />`
          )
          .replace(
            /<meta name="twitter:url" id="twitter-url" content="[^"]*" \/>/,
            `<meta name="twitter:url" id="twitter-url" content="${route.url}" />`
          )
          .replace(
            /<meta\s+name="twitter:title"\s+id="twitter-title"\s+content="[^"]*"\s*\/>/,
            `<meta name="twitter:title" id="twitter-title" content="${route.title}" />`
          )
          .replace(
            /<meta\s+name="twitter:description"\s+id="twitter-description"\s+content="[^"]*"\s*\/>/,
            `<meta name="twitter:description" id="twitter-description" content="${route.description}" />`
          )
          .replace(
            /<meta\s+name="twitter:image"\s+id="twitter-image"\s+content="[^"]*"\s*\/>/,
            `<meta name="twitter:image" id="twitter-image" content="${route.ogImage}" />`
          )
          .replace(
            /<script type="application\/ld\+json" id="schema-jsonld">[\s\S]*?<\/script>/,
            `<script type="application/ld+json" id="schema-jsonld">${JSON.stringify(
              route.jsonLd,
              null,
              2
            )}</script>`
          )
          .replace(
            /<div id="root">[\s\S]*?<\/div>/,
            `<div id="root">${route.bodyHtml}</div>`
          );

        const targetFolder = path.join(distDir, route.dir);
        fs.mkdirSync(targetFolder, { recursive: true });
        fs.writeFileSync(path.join(targetFolder, 'index.html'), html, 'utf-8');
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), seoMultiRouteHtmlPlugin()],
  server: {
    host: true,
    port: 5173,
  },
});
