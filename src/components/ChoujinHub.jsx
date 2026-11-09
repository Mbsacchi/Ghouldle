import React, { useEffect, useState } from 'react';
import {
  ChoujinTankobonCover,
  ChoujinModeEmblem,
} from './visuals/ChoujinArtwork';
import { getTimeUntilMidnight } from '../utils/gameLogic';

const ZINE_MODES = [
  {
    id: 'classic',
    issue: 'ISSUE #01',
    kanji: '壱',
    title: 'CLÁSSICO',
    subtitle: 'COMPARAÇÃO DE ATRIBUTOS // YAMATO MORI',
    desc: 'Cruze Natureza, Afiliação, Aptidão Choujin, Classe e Arco de Estreia a cada tentativa.',
    tags: ['NATUREZA', 'AFILIAÇÃO', 'APTIDÃO', 'CLASSE', 'ARCO'],
    bg: 'bg-[#eaff00] hover:bg-[#f4ff4d]',
    text: 'text-[#0b0b0e]',
    badgeBg: 'bg-[#0b0b0e] text-[#eaff00]',
    shadow: 'shadow-[7px_7px_0_#0b0b0e]',
    span: 'col-span-1 sm:col-span-2',
    tilt: '-rotate-[0.6deg]',
  },
  {
    id: 'quote',
    issue: 'ISSUE #02',
    kanji: '弐',
    title: 'CITAÇÃO',
    subtitle: 'VOZES DO CAOS & ORÁCULO',
    desc: 'Identifique o autor da fala nos arquivos de 1998 em Yamato.',
    tags: ['DIÁLOGO', 'ARCO', 'CONTEXTO'],
    bg: 'bg-[#ff1e56] hover:bg-[#ff3868]',
    text: 'text-[#f4f0e6]',
    badgeBg: 'bg-[#eaff00] text-[#0b0b0e]',
    shadow: 'shadow-[7px_7px_0_#0b0b0e]',
    span: 'col-span-1',
    tilt: 'rotate-[0.8deg]',
  },
  {
    id: 'mask',
    issue: 'ISSUE #03',
    kanji: '参',
    title: 'FORMA & OLHAR',
    subtitle: 'BESTA, RAISE & MÁSCARA NOH',
    desc: 'Reconheça a transformação bestial ou olhar aproximado sem ver os retratos na busca.',
    tags: ['ZOOM LENS', 'SEM FOTOS NA BUSCA'],
    bg: 'bg-[#00e5ff] hover:bg-[#33ecff]',
    text: 'text-[#0b0b0e]',
    badgeBg: 'bg-[#0b0b0e] text-[#00e5ff]',
    shadow: 'shadow-[7px_7px_0_#0b0b0e]',
    span: 'col-span-1',
    tilt: '-rotate-[0.8deg]',
  },
];

export default function ChoujinHub({
  onEnterMode,
  isDaily,
  onTogglePlayType,
  editionNumber,
  completedModes = {},
  stats,
  onOpenStats,
  onOpenHelp,
}) {
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const solvedCount = Object.values(completedModes).filter(Boolean).length;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f4f0e6] text-[#0b0b0e] flex flex-col justify-between select-none">
      {/* Pop-Art Halftone Screentone & Diagonal Color Slash on Raw Gallery Paper */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cx-halftone-dark z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-[#eaff00] border-[4px] border-[#0b0b0e] z-0 opacity-90 hidden lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-20 w-[420px] h-[320px] bg-[#ff1e56] border-[4px] border-[#0b0b0e] rotate-6 z-0 opacity-90 hidden lg:block"
      />

      {/* Top Caution / Tankobon Magazine Masthead Bar */}
      <div className="relative z-30 border-b-[3px] border-[#0b0b0e] bg-[#0b0b0e] text-[#f4f0e6]">
        <div className="h-2 w-full bg-cx-hazard border-b border-[#0b0b0e]" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono font-bold tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-[#eaff00] text-[#0b0b0e]">超人X</span>
            <span>TONARI NO YOUNG JUMP // PREFEITURA DE YAMATO (1998)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[#00e5ff]">
              XEMBE · RAISE · CHAOS STATE
            </span>
            <span className="px-2 py-0.5 bg-[#ff1e56] text-[#f4f0e6]">
              {isDaily ? `ISSUE #${editionNumber}` : 'FREE PLAY ZINE'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Asymmetrical Magazine Spread (Tankobon Cover Left | Punk Zine Collage Right) */}
      <main className="relative z-20 flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT 5 COLUMNS: TANKOBON VOLUME COVER ARTWORK & BARCODE SPINE */}
        <aside className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative group">
            {/* Offset Neon Pink Frame Behind Cover */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#ff1e56] border-[3px] border-[#0b0b0e]" />
            <ChoujinTankobonCover
              editionNumber={editionNumber}
              className="relative z-10 w-full max-w-[420px] mx-auto lg:max-w-none transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
            />
          </div>

          {/* Quick Roster & Stats Sticker Bar Under Tankobon */}
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={onOpenStats}
              className="p-2.5 bg-[#0b0b0e] hover:bg-[#ff1e56] text-[#f4f0e6] border-[2.5px] border-[#0b0b0e] shadow-[4px_4px_0_#eaff00] text-left transition-colors"
            >
              <span className="block font-mono text-[9px] uppercase tracking-widest text-[#eaff00]">
                REGISTRO YM
              </span>
              <span className="font-display text-base uppercase tracking-wider font-bold">
                {stats.gamesWon} Vitórias
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenHelp}
              className="p-2.5 bg-[#f4f0e6] hover:bg-[#eaff00] text-[#0b0b0e] border-[2.5px] border-[#0b0b0e] shadow-[4px_4px_0_#0b0b0e] text-left transition-colors"
            >
              <span className="block font-mono text-[9px] uppercase tracking-widest text-[#ff1e56] font-bold">
                7 ARCOS
              </span>
              <span className="font-display text-base uppercase tracking-wider font-bold">
                Manual &amp; Guia
              </span>
            </button>

            <div className="p-2.5 bg-[#00e5ff] text-[#0b0b0e] border-[2.5px] border-[#0b0b0e] shadow-[4px_4px_0_#0b0b0e]">
              <span className="block font-mono text-[9px] uppercase tracking-widest font-bold">
                STATUS HOJE
              </span>
              <span className="font-display text-base uppercase tracking-wider font-bold">
                {solvedCount}/3 Modos
              </span>
            </div>
          </div>
        </aside>

        {/* RIGHT 7 COLUMNS: PUNK COLLAGE MASTHEAD & BENTO MODE CUTOUTS */}
        <section className="lg:col-span-7 flex flex-col justify-between gap-6">
          {/* Zine Header Collage */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0b0b0e] text-[#eaff00] font-mono text-xs font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0_#ff1e56] -rotate-1">
                <span>SUI ISHIDA POP-ART ZINE</span>
                <span>//</span>
                <span>/CHOUJINXDLE</span>
              </div>

              {/* Daily vs Infinite Brutalist Switcher */}
              <div className="inline-grid grid-cols-2 bg-[#0b0b0e] border-[3px] border-[#0b0b0e] p-0.5 shadow-[5px_5px_0_#ff1e56]">
                <button
                  type="button"
                  onClick={() => onTogglePlayType(true)}
                  className={`px-3.5 py-1.5 font-display text-xs font-bold tracking-[0.14em] uppercase transition-colors ${
                    isDaily
                      ? 'bg-[#eaff00] text-[#0b0b0e]'
                      : 'text-[#f4f0e6] hover:text-[#eaff00]'
                  }`}
                >
                  Diário #{editionNumber}
                </button>
                <button
                  type="button"
                  onClick={() => onTogglePlayType(false)}
                  className={`px-3.5 py-1.5 font-display text-xs font-bold tracking-[0.14em] uppercase transition-colors ${
                    !isDaily
                      ? 'bg-[#00e5ff] text-[#0b0b0e]'
                      : 'text-[#f4f0e6] hover:text-[#00e5ff]'
                  }`}
                >
                  Modo Infinito
                </button>
              </div>
            </div>

            {/* Giant Stencil Title */}
            <div className="relative bg-[#f4f0e6] border-[3px] border-[#0b0b0e] p-5 shadow-[7px_7px_0_#0b0b0e]">
              <span className="absolute -top-3 right-4 px-2.5 py-0.5 bg-[#ff1e56] border-2 border-[#0b0b0e] font-mono text-[10px] font-bold text-[#f4f0e6] uppercase tracking-widest rotate-2">
                WAKE UP! RAISE!
              </span>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#ff1e56]">
                    ADIVINHE OS PERSONAGENS DE CHOUJIN X
                  </p>
                  <h1 className="font-display text-5xl sm:text-6xl font-bold uppercase tracking-[0.04em] text-[#0b0b0e] leading-none mt-1">
                    CHOUJINX<span className="text-[#ff1e56]">DLE</span>
                  </h1>
                </div>

                <div className="text-left sm:text-right font-mono text-xs text-[#0b0b0e]">
                  <span className="block font-bold uppercase">
                    {isDaily ? 'SINCRONIZADO GLOBALMENTE (UTC)' : 'TREINO DE CAMPO LIVRE'}
                  </span>
                  {isDaily ? (
                    <span className="inline-block mt-0.5 px-2 py-0.5 bg-[#0b0b0e] text-[#eaff00] font-bold">
                      NOVO VOLUME EM {countdown}
                    </span>
                  ) : (
                    <span className="inline-block mt-0.5 px-2 py-0.5 bg-[#0b0b0e] text-[#00e5ff] font-bold">
                      30 CHOUJINS ATIVOS
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* BENTO POP-ART ZINE MODE CUTOUTS */}
          <nav
            aria-label="Modos de Jogo ChoujinXdle"
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {ZINE_MODES.map((mode) => {
              const isSolved = Boolean(completedModes[mode.id]);

              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onEnterMode(mode.id)}
                  className={`group relative text-left p-5 border-[3px] border-[#0b0b0e] ${mode.bg} ${mode.text} ${mode.shadow} ${mode.span} ${mode.tilt} transition-all duration-200 hover:-translate-y-1 hover:translate-x-0.5 focus:outline-none`}
                >
                  {/* Top Issue & Kanji Strip */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-widest border border-[#0b0b0e] ${mode.badgeBg}`}
                      >
                        {mode.issue}
                      </span>
                      <span className="font-serif text-sm font-black opacity-85">
                        [{mode.kanji}]
                      </span>
                    </div>

                    {isSolved ? (
                      <span className="px-2.5 py-0.5 bg-[#0b0b0e] text-[#4ade80] border border-[#0b0b0e] font-mono text-[10px] font-extrabold uppercase tracking-widest -rotate-3">
                        ✓ SOLUCIONADO
                      </span>
                    ) : (
                      <ChoujinModeEmblem
                        modeId={mode.id}
                        className="w-7 h-7 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6"
                      />
                    )}
                  </div>

                  {/* Mode Title & Description */}
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] opacity-80">
                      {mode.subtitle}
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-[0.04em] leading-none">
                      {mode.title}
                    </h2>
                    <p className="font-sans text-xs font-medium opacity-90 pt-1 leading-relaxed">
                      {mode.desc}
                    </p>
                  </div>

                  {/* Bottom Stencil Tags + Launch Arrow */}
                  <div className="mt-4 pt-3 border-t-2 border-[#0b0b0e]/25 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {mode.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 bg-[#f4f0e6] text-[#0b0b0e] border border-[#0b0b0e] font-mono text-[9px] font-bold uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="px-2.5 py-1 bg-[#0b0b0e] text-[#f4f0e6] font-mono text-xs font-bold uppercase tracking-widest group-hover:bg-[#f4f0e6] group-hover:text-[#0b0b0e] border border-[#0b0b0e] transition-colors">
                      JOGAR »
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </section>
      </main>

      {/* Bottom Punk Zine Colophon Strip */}
      <footer className="relative z-20 py-3 px-4 border-t-[3px] border-[#0b0b0e] bg-[#0b0b0e] text-[#f4f0e6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 bg-[#eaff00] text-[#0b0b0e] font-bold">
            CHOUJINXDLE
          </span>
          <span className="text-[#f4f0e6]/80">
            Estética Pop-Art / Tankōbon inspirada em <em>Choujin X</em> de Sui Ishida
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <button
            type="button"
            onClick={onOpenHelp}
            className="text-[#eaff00] hover:underline uppercase font-bold"
          >
            [Manual &amp; Arcos]
          </button>
          <button
            type="button"
            onClick={onOpenStats}
            className="text-[#00e5ff] hover:underline uppercase font-bold"
          >
            [Estatísticas ({stats.gamesWon}V)]
          </button>
        </div>
      </footer>
    </div>
  );
}
