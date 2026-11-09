export const SITE_ORIGIN = 'https://suiichidadle.vercel.app';

const MODE_LABELS_TG = {
  classic: 'Modo Clássico (Atributos CCG)',
  quote: 'Modo Citação',
  mask: 'Modo Máscara & Olho',
};

const MODE_LABELS_CX = {
  classic: 'Modo Clássico (Yamato Mori & RAISE!)',
  quote: 'Modo Citação',
  mask: 'Modo Forma Choujin / Estado de Caos',
};

export function syncDocumentSeo({ view, universe, mode }) {
  if (typeof document === 'undefined') return;

  let title =
    'Sui Ichida Dle (Sui Ishida Dle) — Ghouldle (Tokyo Ghoul) & ChoujinXdle (Choujin X)';
  let description =
    'Jogue Sui Ichida Dle (Sui Ishida Dle): o jogo diário e infinito de adivinhação das obras de Sui Ishida! Escolha entre Ghouldle (Ghoul Dle / Tokyo Ghoul) em /ghouldle e ChoujinXdle (Choujin X Dle) em /choujinxdle.';
  let canonicalUrl = `${SITE_ORIGIN}/`;
  let ogImage = `${SITE_ORIGIN}/characters/ken-kaneki.jpg`;

  if (view !== 'lobby') {
    if (universe === 'cx') {
      const modeName = view === 'game' ? MODE_LABELS_CX[mode] : null;
      canonicalUrl =
        view === 'game' && mode
          ? `${SITE_ORIGIN}/choujinxdle/${mode}`
          : `${SITE_ORIGIN}/choujinxdle`;
      title = modeName
        ? `ChoujinXdle — ${modeName} | Choujin X Dle (Sui Ichida Dle)`
        : 'ChoujinXdle (Choujin X Dle) — Jogo Diário de Choujin X | Sui Ichida Dle';
      description =
        'Jogue ChoujinXdle (Choujin X Dle / Choujindle) em suiichidadle.vercel.app/choujinxdle! Adivinhe o personagem diário ou infinito de Choujin X com dicas RAISE!, Citação e Forma Choujin / Estado de Caos.';
      ogImage = `${SITE_ORIGIN}/characters/tokio-kurohara.png`;
    } else {
      const modeName = view === 'game' ? MODE_LABELS_TG[mode] : null;
      canonicalUrl =
        view === 'game' && mode
          ? `${SITE_ORIGIN}/ghouldle/${mode}`
          : `${SITE_ORIGIN}/ghouldle`;
      title = modeName
        ? `Ghouldle — ${modeName} | Tokyo Ghoul Dle (Sui Ichida Dle)`
        : 'Ghouldle (Ghoul Dle) — Jogo Diário de Tokyo Ghoul | Sui Ichida Dle';
      description =
        'Jogue Ghouldle (Ghoul Dle / Tokyo Ghoul Dle) em suiichidadle.vercel.app/ghouldle! Adivinhe o personagem diário ou infinito de Tokyo Ghoul e Tokyo Ghoul:re pelos atributos da CCG, citações e máscaras.';
      ogImage = `${SITE_ORIGIN}/characters/ken-kaneki.jpg`;
    }
  }

  document.title = title;

  const setMeta = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  setMeta('meta[name="title"]', 'content', title);
  setMeta('meta[name="description"]', 'content', description);
  setMeta('#canonical-link', 'href', canonicalUrl);
  setMeta('#og-url', 'content', canonicalUrl);
  setMeta('#og-title', 'content', title);
  setMeta('#og-description', 'content', description);
  setMeta('#og-image', 'content', ogImage);
  setMeta('#twitter-url', 'content', canonicalUrl);
  setMeta('#twitter-title', 'content', title);
  setMeta('#twitter-description', 'content', description);
  setMeta('#twitter-image', 'content', ogImage);
}
