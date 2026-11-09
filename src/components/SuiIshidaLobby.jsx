import React, { useEffect, useState } from 'react';
import {
  GhouldleCrestLogo,
  HiganbanaCluster,
  ModeEmblem,
} from './visuals/TgArtwork';
import {
  ChoujindleCrestLogo,
  ChoujinTankobonCover,
  ChoujinModeEmblem,
  ChoujinSplatterX,
  XemberSyringeArt,
  ShatteredGlassOverlay,
} from './visuals/ChoujinArtwork';
import { getTimeUntilMidnight } from '../utils/gameLogic';

const TG_MODES = [
  { id: 'classic', kanji: '壱', label: 'Clássico', desc: 'Atributos da CCG' },
  { id: 'quote', kanji: '弐', label: 'Citação', desc: 'Falas da Obra' },
  { id: 'mask', kanji: '参', label: 'Máscara & Olho', desc: 'Kakugan & Hysy' },
];

const CX_MODES = [
  {
    id: 'classic',
    issue: '#01',
    label: 'CLÁSSICO',
    desc: 'Complexo & Caos',
    bg: 'bg-[#FFE600] hover:bg-[#A3FF00] text-[#0a0a0c]',
    shadow: 'shadow-[4px_4px_0_#FF0055]',
  },
  {
    id: 'quote',
    issue: '#02',
    label: 'CITAÇÃO',
    desc: 'Vozes de Yamato',
    bg: 'bg-[#FF0055] hover:bg-[#ff2970] text-[#f4f1ea]',
    shadow: 'shadow-[4px_4px_0_#FFE600]',
  },
  {
    id: 'mask',
    issue: '#03',
    label: 'FORMA / CAOS',
    desc: 'Forma Choujin & Raise',
    bg: 'bg-[#00F0FF] hover:bg-[#A3FF00] text-[#0a0a0c]',
    shadow: 'shadow-[4px_4px_0_#FFE600]',
  },
];

export default function SuiIshidaLobby({
  onEnterUniverseHub,
  onEnterUniverseMode,
  isDaily,
  onTogglePlayType,
  editionNumber,
  tgCompletedModes = {},
  cxCompletedModes = {},
  tgStats,
  cxStats,
}) {
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const tgSolvedCount = Object.values(tgCompletedModes).filter(Boolean).length;
  const cxSolvedCount = Object.values(cxCompletedModes).filter(Boolean).length;

  return (
    <div className="relative flex-1 min-h-[calc(100vh-45px)] w-full flex flex-col select-none overflow-hidden">
      {/* =====================================================================
          SPLIT-CANVAS DUAL WORLD STAGE:
          LEFT HALF  -> Gothic Tragedy, Shattered Glass, Crimson #dc2626 & Higanbana
          RIGHT HALF -> Explosive Pop-Punk Neo-Brutalist Zine (#0a0a0c, #FFE600, #FF0055, #A3FF00)
         ===================================================================== */}
      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-45px)]">
        {/* CENTER FLOATING SUI ISHIDA EXHIBITION BADGE (Desktop) */}
        <div className="hidden lg:flex flex-col items-center justify-center pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 z-30">
          <div className="pointer-events-auto bg-[#0a0a0c] border-[3px] border-[#f4f1ea] shadow-[6px_6px_0_#dc2626,-6px_-6px_0_#FFE600] px-3.5 py-4 flex flex-col items-center gap-3">
            <span className="px-2 py-0.5 bg-[#f4f1ea] text-[#0a0a0c] font-serif text-xs font-black tracking-widest">
              石田スイ
            </span>
            <span className="writing-vertical font-display text-lg font-bold tracking-[0.28em] text-[#f4f1ea] uppercase">
              SUI ISHIDA DLE
            </span>
            <div className="w-full h-[1px] bg-[#f4f1ea]/25" />
            <div className="text-center font-mono text-[9px] text-[#cfc6b6] leading-tight">
              <span className="block text-[#FFE600] font-bold">#{editionNumber}</span>
              <span>{countdown}</span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            LEFT REALM: TOKYO GHOUL (/ghouldle) — GOTHIC, SHATTERED GLASS & ANTEIKU TRAGEDY
           =================================================================== */}
        <section
          aria-label="Universo Tokyo Ghoul — Ghouldle"
          className="relative overflow-hidden bg-[#080709] text-[#efe9dd] border-b-4 lg:border-b-0 lg:border-r-4 border-[#dc2626]/60 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between"
        >
          {/* Shattered Glass Overlay + Crimson Vignette */}
          <ShatteredGlassOverlay className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-85" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#dc2626]/12 blur-3xl z-0"
          />

          {/* Kaneki Checkered Floor & Higanbana Petals */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-15%] bottom-0 h-[40vh] kaneki-sanctum-floor z-0"
          />
          <HiganbanaCluster className="hidden sm:block absolute bottom-0 left-0 w-52 z-0 opacity-85" />
          <HiganbanaCluster
            flip
            className="hidden xl:block absolute bottom-0 right-4 w-40 z-0 opacity-50"
          />

          {/* Top Gothic Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#dc2626]/35 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#dc2626] shadow-[0_0_10px_#dc2626]" />
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#dc2626]">
                2011–2018 // 東京喰種 TOKYO GHOUL &amp; :RE
              </span>
            </div>
            <span className="px-2.5 py-0.5 bg-[#1b080b] border border-[#dc2626]/70 font-mono text-[10px] text-[#efe9dd]">
              {tgSolvedCount}/3 HOJE • {tgStats.gamesWon}V
            </span>
          </div>

          {/* Center Gothic Showcase */}
          <div className="relative z-10 my-auto py-6 max-w-lg mx-auto w-full space-y-5">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-[#140709]/90 border border-[#dc2626]/45 text-[10px] font-mono uppercase tracking-[0.25em] text-[#f87171]">
                <span>☕ CAFETERIA ANTEIKU</span>
                <span>•</span>
                <span>VIDRO ESTILHAÇADO &amp; HIGANBANA</span>
              </div>
              <GhouldleCrestLogo />
              <p className="font-serif text-xs sm:text-sm italic text-[#cfc6b6]/90 pt-1">
                「Eu não sou o protagonista de um romance... Sou um universitário que gosta de ler, como qualquer outro. Mas... se você fosse escrever uma história comigo como protagonista, certamente seria... uma tragédia.」
              </p>
            </div>

            {/* 3 Manga Portrait Panels */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { name: 'Ken Kaneki', tag: 'SS // TAPA-OLHO', img: '/characters/ken-kaneki.jpg', pos: '54% 22%' },
                { name: 'Kishou Arima', tag: 'CCG // CEIFADOR', img: '/characters/kishou-arima.jpg', pos: 'center 26%' },
                { name: 'Eto Yoshimura', tag: 'SSS // CORUJA', img: '/characters/eto-yoshimura.jpg', pos: 'center 18%' },
              ].map((p) => (
                <div
                  key={p.name}
                  className="group relative h-28 sm:h-32 border border-[#efe9dd]/65 bg-[#0c0b0f] overflow-hidden shadow-[4px_4px_0_#7d090f]"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{ objectPosition: p.pos }}
                    className="w-full h-full object-cover contrast-125 saturate-[0.75] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080709] via-transparent to-transparent" />
                  <div className="absolute bottom-1.5 left-2 right-2">
                    <span className="block font-mono text-[8px] text-[#dc2626] uppercase tracking-wider">
                      {p.tag}
                    </span>
                    <span className="font-serif text-xs font-bold text-[#efe9dd]">
                      {p.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Enter /ghouldle Hub Button */}
            <button
              type="button"
              onClick={() => onEnterUniverseHub('tg')}
              className="w-full py-3.5 px-5 bg-[#dc2626] hover:bg-[#b91c1c] border-2 border-[#efe9dd] text-[#efe9dd] font-display text-base uppercase tracking-[0.16em] shadow-[5px_5px_0_#000] flex items-center justify-between transition-all hover:-translate-y-0.5"
            >
              <span>🩸 ENTRAR EM /GHOULDLE (56 PERSONAGENS)</span>
              <span className="font-mono text-xl">»</span>
            </button>

            {/* Quick Mode Selector for Ghouldle */}
            <div className="space-y-1.5">
              <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-[#8d857b]">
                ATALHO DIRETO PARA OS MODOS DE TOKYO GHOUL:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {TG_MODES.map((m) => {
                  const done = Boolean(tgCompletedModes[m.id]);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onEnterUniverseMode('tg', m.id)}
                      className={`p-2.5 border text-left transition-all ${
                        done
                          ? 'bg-[#0f291a] border-[#4ade80] text-[#efe9dd]'
                          : 'bg-[#111015]/90 hover:bg-[#1d090d] border-[#efe9dd]/35 hover:border-[#dc2626] text-[#efe9dd]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-xs font-bold text-[#dc2626]">
                          {m.kanji}
                        </span>
                        <ModeEmblem modeId={m.id} className="w-4 h-4" />
                      </div>
                      <p className="font-display text-xs uppercase tracking-wider truncate">
                        {m.label}
                      </p>
                      <p className="font-mono text-[9px] text-[#8d857b] truncate">
                        {done ? '済 OK' : m.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Gothic Caption */}
          <div className="relative z-10 pt-3 border-t border-[#dc2626]/25 flex items-center justify-between text-[10px] font-mono text-[#8d857b] uppercase tracking-widest">
            <span>ARQUIVO CCG &amp; ANTEIKU // 20ª ALA</span>
            <span className="text-[#dc2626]">ROTA: /GHOULDLE</span>
          </div>
        </section>

        {/* ===================================================================
            RIGHT REALM: CHOUJIN X (/choujinxdle) — EXPLOSIVE POP-PUNK NEO-BRUTALIST ZINE
           =================================================================== */}
        <section
          aria-label="Universo Choujin X — ChoujinXdle"
          className="relative overflow-hidden bg-[#0a0a0c] bg-halftone text-[#f4f1ea] p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between"
        >
          {/* Giant Dry-Brush / Spray-Paint Shattered "X" & Xember Syringe */}
          <ChoujinSplatterX className="pointer-events-none absolute -right-16 top-6 w-[430px] h-[430px] opacity-30 z-0" />
          <XemberSyringeArt className="hidden sm:block pointer-events-none absolute -left-8 bottom-12 w-52 h-52 opacity-25 -rotate-12 z-0" />

          {/* Diagonal Acid Yellow & Shocking Magenta Hazard Cuts */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 w-64 h-28 bg-[#FFE600] border-[3px] border-[#0a0a0c] rotate-12 shadow-[6px_6px_0_#FF0055] z-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-12 -right-14 w-60 h-20 bg-[#FF0055] border-[3px] border-[#0a0a0c] -rotate-6 shadow-[5px_5px_0_#A3FF00] z-0"
          />

          {/* Top Pop-Punk Zine Header */}
          <div className="relative z-10 flex items-center justify-between border-b-[3px] border-[#FFE600] pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#FFE600] text-[#0a0a0c] border-2 border-[#0a0a0c] font-mono text-[10px] font-black -skew-x-6 shadow-[2px_2px_0_#FF0055]">
                超人X
              </span>
              <span className="font-mono text-[10px] font-black tracking-[0.2em] uppercase text-[#FFE600]">
                2021–PRESENTE // CHOUJIN X (YAMATO 1998)
              </span>
            </div>
            <span className="px-2.5 py-0.5 bg-[#FF0055] border-2 border-[#0a0a0c] font-mono text-[10px] font-black text-[#f4f1ea] shadow-[3px_3px_0_#FFE600] -skew-x-3">
              {cxSolvedCount}/3 HOJE • {cxStats.gamesWon}V
            </span>
          </div>

          {/* Center Pop-Punk Street-Art & Tankobon Showcase */}
          <div className="relative z-10 my-auto py-6 max-w-lg mx-auto w-full space-y-5">
            <div className="flex flex-col items-center text-center space-y-2">
              <ChoujindleCrestLogo />
              <p className="font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0c] bg-[#A3FF00] border-[2.5px] border-[#0a0a0c] px-3 py-0.5 shadow-[4px_4px_0_#FF0055] -skew-x-3">
                ⚡ ATIVAR RAISE! • POP-PUNK NEO-BRUTALIST ZINE
              </p>
            </div>

            {/* Mini Tankobon Spread + Off-White Manga Paper Block */}
            <div className="grid grid-cols-12 gap-3 items-stretch">
              <div className="col-span-5">
                <ChoujinTankobonCover
                  editionNumber={editionNumber}
                  className="h-44 sm:h-48 w-full"
                />
              </div>
              <div className="col-span-7 flex flex-col justify-between gap-2">
                <div className="p-3 bg-[#f4f1ea] bg-halftone-dark text-[#0a0a0c] border-[3px] border-[#0a0a0c] shadow-[5px_5px_0_#FFE600] -rotate-[0.5deg]">
                  <span className="inline-block px-1.5 py-0.5 bg-[#FF0055] text-[#f4f1ea] font-mono text-[9px] font-black uppercase tracking-widest -skew-x-3">
                    SERINGA XEMBER &amp; ESTADO DE CAOS
                  </span>
                  <p className="font-display text-lg font-bold uppercase tracking-wide leading-tight mt-1 text-[#0a0a0c]">
                    YAMATO MORI VS. TORRE DO LUTO
                  </p>
                  <p className="font-sans text-[11px] font-semibold text-[#0a0a0c]/85 mt-1">
                    Tokio Kurohara, Azuma Higashi, Ely Otta, Zora e Noh Mask em estética Street-Art/Punk.
                  </p>
                </div>

                {/* Daily vs Infinite Toggle on Right Zine Side */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onTogglePlayType(true)}
                    className={`py-2 px-2 border-[2.5px] border-[#0a0a0c] font-display text-xs font-bold uppercase tracking-wider transition-all -skew-x-3 ${
                      isDaily
                        ? 'bg-[#FFE600] text-[#0a0a0c] shadow-[4px_4px_0_#FF0055]'
                        : 'bg-[#16161a] text-[#f4f1ea]/75 border-[#f4f1ea]/35 hover:border-[#FFE600] hover:text-[#FFE600]'
                    }`}
                  >
                    Diário #{editionNumber}
                  </button>
                  <button
                    type="button"
                    onClick={() => onTogglePlayType(false)}
                    className={`py-2 px-2 border-[2.5px] border-[#0a0a0c] font-display text-xs font-bold uppercase tracking-wider transition-all -skew-x-3 ${
                      !isDaily
                        ? 'bg-[#A3FF00] text-[#0a0a0c] shadow-[4px_4px_0_#FF0055]'
                        : 'bg-[#16161a] text-[#f4f1ea]/75 border-[#f4f1ea]/35 hover:border-[#A3FF00] hover:text-[#A3FF00]'
                    }`}
                  >
                    Modo Infinito
                  </button>
                </div>
              </div>
            </div>

            {/* Enter /choujinxdle Zine Lobby Button */}
            <button
              type="button"
              onClick={() => onEnterUniverseHub('cx')}
              className="w-full py-3.5 px-5 bg-[#FFE600] hover:bg-[#A3FF00] text-[#0a0a0c] border-[3px] border-[#0a0a0c] font-display font-bold text-base uppercase tracking-[0.16em] shadow-[6px_6px_0_#FF0055] flex items-center justify-between transition-all hover:-translate-y-0.5 -skew-x-2"
            >
              <span>⚡ ABRIR ZINE /CHOUJINXDLE (30 PERSONAGENS)</span>
              <span className="font-mono text-xl font-black">»</span>
            </button>

            {/* Quick Mode Cutouts for ChoujinXdle */}
            <div className="space-y-1.5">
              <span className="block font-mono text-[9px] font-black uppercase tracking-[0.22em] text-[#FFE600]">
                ATALHO DIRETO PARA OS MODOS DE CHOUJIN X:
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {CX_MODES.map((m) => {
                  const done = Boolean(cxCompletedModes[m.id]);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onEnterUniverseMode('cx', m.id)}
                      className={`p-2.5 border-[2.5px] border-[#0a0a0c] text-left transition-transform hover:-translate-y-0.5 -skew-x-2 ${
                        done
                          ? 'bg-[#A3FF00] text-[#0a0a0c] shadow-[4px_4px_0_#000000]'
                          : `${m.bg} ${m.shadow}`
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] font-black">
                          {m.issue}
                        </span>
                        <ChoujinModeEmblem modeId={m.id} className="w-4 h-4" />
                      </div>
                      <p className="font-display text-xs font-bold uppercase tracking-wider truncate">
                        {m.label}
                      </p>
                      <p className="font-mono text-[9px] font-bold opacity-90 truncate">
                        {done ? '✓ RAISE OK' : m.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Punk Zine Caption */}
          <div className="relative z-10 pt-3 border-t-[3px] border-[#FFE600] flex items-center justify-between text-[10px] font-mono font-black text-[#f4f1ea] uppercase tracking-widest">
            <span>YAMATO PREFECTURE // 1998 • XEMBER</span>
            <span className="px-2 py-0.5 bg-[#FFE600] text-[#0a0a0c] border border-[#0a0a0c] -skew-x-3">
              ROTA: /CHOUJINXDLE
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
