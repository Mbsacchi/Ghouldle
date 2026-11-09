import React, { useEffect, useState } from 'react';
import {
  ChoujinTankobonCover,
  ChoujinModeEmblem,
  ChoujinSplatterX,
  XemberSyringeArt,
  ChoujinBeastPlumes,
} from './visuals/ChoujinArtwork';
import { getTimeUntilMidnight } from '../utils/gameLogic';

const ZINE_MODES = [
  {
    id: 'classic',
    issue: 'ZINE #01',
    kanji: '壱',
    title: 'CLÁSSICO',
    subtitle: 'TIPO DE CHOUJIN · AFILIAÇÃO · ESTADO DE CAOS',
    desc: 'Compare Tipo/Complexo Choujin, Afiliação (Yamato Mori, Torre do Luto / Noh Mask, Independente) e Estado de Caos.',
    tags: ['TIPO / COMPLEXO', 'YAMATO MORI', 'TORRE DO LUTO', 'ESTADO DE CAOS'],
    bg: 'bg-[#FFE600] hover:bg-[#fff04d]',
    text: 'text-[#0a0a0c]',
    badgeBg: 'bg-[#0a0a0c] text-[#A3FF00]',
    shadow: 'shadow-[6px_6px_0_#FF0055]',
    span: 'col-span-1 sm:col-span-2',
    tilt: '-rotate-[0.75deg] -skew-x-1',
    halftone: 'bg-halftone-dark',
  },
  {
    id: 'quote',
    issue: 'ZINE #02',
    kanji: '弐',
    title: 'CITAÇÃO',
    subtitle: 'VOZES DO CAOS & ORÁCULO MADO',
    desc: 'Descubra qual Choujin proferiu a frase em Yamato e use o sistema ⚡ RAISE! para abrir pistas.',
    tags: ['DIÁLOGO', '⚡ RAISE! DICAS'],
    bg: 'bg-[#FF0055] hover:bg-[#ff1f6b]',
    text: 'text-[#f4f1ea]',
    badgeBg: 'bg-[#FFE600] text-[#0a0a0c]',
    shadow: 'shadow-[6px_6px_0_#FFE600]',
    span: 'col-span-1',
    tilt: 'rotate-[1deg] skew-x-1',
    halftone: 'bg-halftone',
  },
  {
    id: 'mask',
    issue: 'ZINE #03',
    kanji: '参',
    title: 'FORMA CHOUJIN / ESTADO DE CAOS',
    subtitle: 'METAMORFOSE BESTIAL & NOH MASK',
    desc: 'Reconheça a Forma Choujin, Estado de Caos ou Máscara Noh pelo recorte aproximado.',
    tags: ['ESTADO DE CAOS', 'LENTE ZOOM'],
    bg: 'bg-[#00F0FF] hover:bg-[#3df4ff]',
    text: 'text-[#0a0a0c]',
    badgeBg: 'bg-[#0a0a0c] text-[#00F0FF]',
    shadow: 'shadow-[6px_6px_0_#A3FF00]',
    span: 'col-span-1',
    tilt: '-rotate-[1deg] -skew-x-1',
    halftone: 'bg-halftone-dark',
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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0c] bg-halftone text-[#f4f1ea] flex flex-col justify-between select-none">
      {/* Giant Dry-Brush / Spray-Paint Shattered "X" in Background */}
      <ChoujinSplatterX className="w-[540px] sm:w-[700px] h-auto absolute -right-24 -top-16 opacity-20 z-0 rotate-6" />

      {/* Bottom Corner Feathers & Street-Art Splatters */}
      <ChoujinBeastPlumes className="hidden sm:block absolute bottom-0 left-0 w-60 z-10 opacity-85" />
      <ChoujinBeastPlumes
        flip
        className="hidden sm:block absolute bottom-0 right-0 w-60 z-10 opacity-85"
      />

      {/* Top Street-Art Hazard & Zine Masthead Bar */}
      <div className="relative z-30 border-b-[3px] border-[#FFE600] bg-[#16161a]">
        <div className="h-2.5 w-full bg-cx-hazard border-b-2 border-[#0a0a0c]" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono font-extrabold tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 bg-[#FFE600] text-[#0a0a0c] border border-[#0a0a0c] -skew-x-6">
              超人X // 1998
            </span>
            <span className="text-[#f4f1ea]">
              PREFEITURA DE YAMATO // YAMATO MORI VS. TORRE DO LUTO
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-[#A3FF00]">
              ⚡ SISTEMA RAISE! ATIVO · XEMBER · ESTADO DE CAOS
            </span>
            <span className="px-2 py-0.5 bg-[#FF0055] text-[#f4f1ea] border border-[#f4f1ea] -skew-x-6 shadow-[2px_2px_0_#FFE600]">
              {isDaily ? `EDIÇÃO #${editionNumber}` : 'ZINE INFINITO'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Asymmetrical Pop-Punk Zine Spread */}
      <main className="relative z-20 flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT 5 COLUMNS: STREET-ART TANKOBON POSTER + STATS STICKERS */}
        <aside className="lg:col-span-5 flex flex-col gap-5">
          <div className="relative group">
            <div className="absolute inset-0 translate-x-3.5 translate-y-3.5 bg-[#FF0055] border-[3px] border-[#0a0a0c]" />
            <ChoujinTankobonCover
              editionNumber={editionNumber}
              className="relative z-10 w-full max-w-[420px] mx-auto lg:max-w-none transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
            />
          </div>

          {/* 3 Skewed Neo-Brutalist Stickers */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={onOpenStats}
              className="p-2.5 bg-[#16161a] hover:bg-[#FF0055] text-[#f4f1ea] border-[2.5px] border-[#f4f1ea] shadow-[4px_4px_0_#FFE600] -skew-x-3 text-left transition-all hover:-translate-y-0.5"
            >
              <span className="block font-mono text-[9px] uppercase tracking-widest text-[#FFE600] font-bold">
                YAMATO MORI
              </span>
              <span className="font-display text-base uppercase tracking-wider font-bold">
                {stats.gamesWon} Vitórias
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenHelp}
              className="p-2.5 bg-[#f4f1ea] hover:bg-[#FFE600] text-[#0a0a0c] border-[2.5px] border-[#0a0a0c] shadow-[4px_4px_0_#00F0FF] -skew-x-3 text-left transition-all hover:-translate-y-0.5"
            >
              <span className="block font-mono text-[9px] uppercase tracking-widest text-[#FF0055] font-extrabold">
                7 ARCOS
              </span>
              <span className="font-display text-base uppercase tracking-wider font-bold">
                Guia &amp; Regras
              </span>
            </button>

            <div className="p-2.5 bg-[#A3FF00] text-[#0a0a0c] border-[2.5px] border-[#0a0a0c] shadow-[4px_4px_0_#FF0055] -skew-x-3">
              <span className="block font-mono text-[9px] uppercase tracking-widest font-extrabold">
                PROGRESSO
              </span>
              <span className="font-display text-base uppercase tracking-wider font-bold">
                {solvedCount}/3 Modos
              </span>
            </div>
          </div>
        </aside>

        {/* RIGHT 7 COLUMNS: POP-PUNK COLLAGE HEADER & BENTO MODE CARDS */}
        <section className="lg:col-span-7 flex flex-col justify-between gap-6">
          {/* Zine Header Block */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFE600] text-[#0a0a0c] border-[2.5px] border-[#0a0a0c] font-mono text-xs font-black uppercase tracking-[0.18em] shadow-[4px_4px_0_#FF0055] -skew-x-3 -rotate-1">
                <span>⚡ POP-PUNK STREET ZINE</span>
                <span>//</span>
                <span>/CHOUJINXDLE</span>
              </div>

              {/* Daily vs Infinite Brutalist Switcher */}
              <div className="inline-grid grid-cols-2 bg-[#16161a] border-[3px] border-[#f4f1ea] p-0.5 shadow-[5px_5px_0_#A3FF00] -skew-x-3">
                <button
                  type="button"
                  onClick={() => onTogglePlayType(true)}
                  className={`px-3.5 py-1.5 font-display text-xs font-bold tracking-[0.14em] uppercase transition-colors ${
                    isDaily
                      ? 'bg-[#FFE600] text-[#0a0a0c]'
                      : 'text-[#f4f1ea] hover:text-[#FFE600]'
                  }`}
                >
                  Diário #{editionNumber}
                </button>
                <button
                  type="button"
                  onClick={() => onTogglePlayType(false)}
                  className={`px-3.5 py-1.5 font-display text-xs font-bold tracking-[0.14em] uppercase transition-colors ${
                    !isDaily
                      ? 'bg-[#00F0FF] text-[#0a0a0c]'
                      : 'text-[#f4f1ea] hover:text-[#00F0FF]'
                  }`}
                >
                  Caçada Infinita
                </button>
              </div>
            </div>

            {/* Off-White Manga Paper Banner with Xember Syringe */}
            <div className="relative bg-[#f4f1ea] bg-halftone-dark text-[#0a0a0c] border-[3px] border-[#0a0a0c] p-5 shadow-[7px_7px_0_#FFE600] -rotate-[0.4deg]">
              <span className="absolute -top-3.5 right-4 px-3 py-0.5 bg-[#A3FF00] border-[2.5px] border-[#0a0a0c] font-mono text-[10px] font-black text-[#0a0a0c] uppercase tracking-widest rotate-2 shadow-[3px_3px_0_#0a0a0c]">
                ⚡ ATIVAR RAISE!
              </span>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-2 bg-[#0a0a0c] border-2 border-[#0a0a0c] shadow-[3px_3px_0_#FF0055] shrink-0">
                    <XemberSyringeArt className="w-11 h-11" />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[#FF0055]">
                      DESPERTE SEU ESTADO DE CAOS
                    </p>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.04em] text-[#0a0a0c] leading-none mt-0.5">
                      CHOUJINX<span className="text-[#FF0055]">DLE</span>
                    </h1>
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono text-xs text-[#0a0a0c]">
                  <span className="block font-extrabold uppercase text-[10px] tracking-wider">
                    {isDaily ? 'ALVO GLOBAL (00:00 UTC)' : 'MODO TREINO LIVRE'}
                  </span>
                  {isDaily ? (
                    <span className="inline-block mt-1 px-2.5 py-1 bg-[#0a0a0c] text-[#FFE600] border border-[#0a0a0c] font-bold shadow-[3px_3px_0_#FF0055]">
                      RESET: {countdown}
                    </span>
                  ) : (
                    <span className="inline-block mt-1 px-2.5 py-1 bg-[#0a0a0c] text-[#00F0FF] font-bold">
                      30 CHOUJINS
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* BENTO POP-PUNK ZINE MODE CUTOUTS */}
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
                  className={`group relative text-left p-5 border-[3px] border-[#0a0a0c] ${mode.bg} ${mode.halftone} ${mode.text} ${mode.shadow} ${mode.span} ${mode.tilt} transition-all duration-200 hover:-translate-y-1 hover:translate-x-0.5 focus:outline-none`}
                >
                  {/* Top Issue & Kanji Strip */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest border-2 border-[#0a0a0c] -skew-x-6 ${mode.badgeBg}`}
                      >
                        {mode.issue}
                      </span>
                      <span className="font-serif text-sm font-black opacity-90">
                        [{mode.kanji}]
                      </span>
                    </div>

                    {isSolved ? (
                      <span className="px-2.5 py-0.5 bg-[#0a0a0c] text-[#A3FF00] border-2 border-[#0a0a0c] font-mono text-[10px] font-black uppercase tracking-widest -rotate-3">
                        ⚡ RAISE! CONCLUÍDO
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
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] opacity-85">
                      {mode.subtitle}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-[0.04em] leading-none">
                      {mode.title}
                    </h2>
                    <p className="font-sans text-xs font-bold opacity-90 pt-1 leading-relaxed">
                      {mode.desc}
                    </p>
                  </div>

                  {/* Bottom Stencil Tags + Launch Arrow */}
                  <div className="mt-4 pt-3 border-t-2 border-[#0a0a0c]/30 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {mode.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-[#f4f1ea] text-[#0a0a0c] border-2 border-[#0a0a0c] font-mono text-[9px] font-black uppercase tracking-wider -skew-x-3"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="px-3 py-1 bg-[#0a0a0c] text-[#FFE600] font-mono text-xs font-black uppercase tracking-widest group-hover:bg-[#f4f1ea] group-hover:text-[#0a0a0c] border-2 border-[#0a0a0c] transition-colors -skew-x-6">
                      ENTRAR »
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </section>
      </main>

      {/* Bottom Punk Zine Colophon Strip */}
      <footer className="relative z-20 py-3 px-4 border-t-[3px] border-[#FFE600] bg-[#16161a] text-[#f4f1ea] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 bg-[#FFE600] text-[#0a0a0c] font-black -skew-x-6">
            CHOUJINXDLE
          </span>
          <span className="text-[#f4f1ea]/80">
            Zine Pop-Punk / Neo-Brutalista inspirado em <em>Choujin X</em> (Sui Ishida)
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <button
            type="button"
            onClick={onOpenHelp}
            className="text-[#A3FF00] hover:underline uppercase font-extrabold"
          >
            [Manual &amp; Arcos]
          </button>
          <button
            type="button"
            onClick={onOpenStats}
            className="text-[#00F0FF] hover:underline uppercase font-extrabold"
          >
            [Estatísticas ({stats.gamesWon}V)]
          </button>
        </div>
      </footer>
    </div>
  );
}
