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
    desc: 'Atributos Yamato Mori',
    bg: 'bg-[#eaff00] hover:bg-[#f4ff4d] text-[#0b0b0e]',
  },
  {
    id: 'quote',
    issue: '#02',
    label: 'CITAÇÃO',
    desc: 'Vozes de Yamato',
    bg: 'bg-[#ff1e56] hover:bg-[#ff3868] text-[#f4f0e6]',
  },
  {
    id: 'mask',
    issue: '#03',
    label: 'FORMA & OLHAR',
    desc: 'Besta, Raise & Noh',
    bg: 'bg-[#00e5ff] hover:bg-[#33ecff] text-[#0b0b0e]',
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
    <div className="relative flex-1 min-h-[calc(100vh-41px)] w-full flex flex-col select-none overflow-hidden">
      {/* =====================================================================
          SPLIT-CANVAS DUAL WORLD STAGE:
          LEFT HALF  -> Dark Gothic Tragedy (Tokyo Ghoul / #080709 + #d9141e)
          RIGHT HALF -> Pop-Art Punk Zine Tankobon (Choujin X / #f4f0e6 + #eaff00 + #ff1e56)
         ===================================================================== */}
      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-41px)]">
        {/* CENTER FLOATING SUI ISHIDA EXHIBITION BADGE (Desktop) */}
        <div className="hidden lg:flex flex-col items-center justify-center pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 z-30">
          <div className="pointer-events-auto bg-[#0b0b0e] border-[3px] border-[#efe9dd] shadow-[6px_6px_0_#d9141e,-6px_-6px_0_#eaff00] px-3.5 py-4 flex flex-col items-center gap-3">
            <span className="px-2 py-0.5 bg-[#efe9dd] text-[#0b0b0e] font-serif text-xs font-black tracking-widest">
              石田スイ
            </span>
            <span className="writing-vertical font-display text-lg font-bold tracking-[0.28em] text-[#efe9dd] uppercase">
              SUI ISHIDA DLE
            </span>
            <div className="w-full h-[1px] bg-[#efe9dd]/25" />
            <div className="text-center font-mono text-[9px] text-[#cfc6b6] leading-tight">
              <span className="block text-[#eaff00] font-bold">#{editionNumber}</span>
              <span>{countdown}</span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            LEFT REALM: TOKYO GHOUL (/ghouldle) — DARK GOTHIC TRAGEDY
           =================================================================== */}
        <section
          aria-label="Universo Tokyo Ghoul — Ghouldle"
          className="relative overflow-hidden bg-[#080709] text-[#efe9dd] border-b-4 lg:border-b-0 lg:border-r-4 border-[#0b0b0e] p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between"
        >
          {/* Kaneki Checkered Floor & Higanbana */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-15%] bottom-0 h-[40vh] kaneki-sanctum-floor z-0"
          />
          <HiganbanaCluster className="hidden sm:block absolute bottom-0 left-0 w-48 z-0 opacity-75" />

          {/* Top Gothic Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#efe9dd]/15 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#d9141e]" />
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#d9141e]">
                2011–2018 // 東京喰種 TOKYO GHOUL &amp; :RE
              </span>
            </div>
            <span className="px-2 py-0.5 bg-[#1b080b] border border-[#d9141e]/60 font-mono text-[10px] text-[#efe9dd]">
              {tgSolvedCount}/3 HOJE • {tgStats.gamesWon}V
            </span>
          </div>

          {/* Center Gothic Showcase */}
          <div className="relative z-10 my-auto py-6 max-w-lg mx-auto w-full space-y-5">
            <div className="flex flex-col items-center text-center space-y-2">
              <GhouldleCrestLogo />
              <p className="font-serif text-xs sm:text-sm italic text-[#cfc6b6]/85 pt-1">
                「1000 − 7 = 993... Entre o café da Anteiku e o aço frio das Quinques」
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
                    <span className="block font-mono text-[8px] text-[#ef4444] uppercase tracking-wider">
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
              className="w-full py-3.5 px-5 bg-[#b80f17] hover:bg-[#d9141e] border-2 border-[#efe9dd] text-[#efe9dd] font-display text-base uppercase tracking-[0.16em] shadow-[5px_5px_0_#000] flex items-center justify-between transition-all hover:-translate-y-0.5"
            >
              <span>ENTRAR EM /GHOULDLE (56 PERSONAGENS)</span>
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
                          : 'bg-[#111015] hover:bg-[#1d090d] border-[#efe9dd]/35 hover:border-[#d9141e] text-[#efe9dd]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-xs font-bold text-[#d9141e]">
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
          <div className="relative z-10 pt-3 border-t border-[#efe9dd]/12 flex items-center justify-between text-[10px] font-mono text-[#8d857b] uppercase tracking-widest">
            <span>ARQUIVO CCG // 20ª ALA</span>
            <span className="text-[#d9141e]">ROTA: /GHOULDLE</span>
          </div>
        </section>

        {/* ===================================================================
            RIGHT REALM: CHOUJIN X (/choujinxdle) — POP-ART PUNK ZINE TANKOBON
           =================================================================== */}
        <section
          aria-label="Universo Choujin X — ChoujinXdle"
          className="relative overflow-hidden bg-[#f4f0e6] text-[#0b0b0e] p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between"
        >
          {/* Pop-Art Halftone & Sulfur Yellow / Magenta Geometric Shapes */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-cx-halftone-dark z-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#eaff00] border-[3px] border-[#0b0b0e] z-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-10 -right-12 w-56 h-24 bg-[#ff1e56] border-[3px] border-[#0b0b0e] -rotate-6 z-0"
          />

          {/* Top Punk Zine Header */}
          <div className="relative z-10 flex items-center justify-between border-b-[3px] border-[#0b0b0e] pb-3">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 bg-[#0b0b0e] text-[#eaff00] font-mono text-[10px] font-black">
                超人X
              </span>
              <span className="font-mono text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#0b0b0e]">
                2021–PRESENTE // CHOUJIN X (YAMATO 1998)
              </span>
            </div>
            <span className="px-2 py-0.5 bg-[#ff1e56] border-2 border-[#0b0b0e] font-mono text-[10px] font-bold text-[#f4f0e6] shadow-[2px_2px_0_#0b0b0e]">
              {cxSolvedCount}/3 HOJE • {cxStats.gamesWon}V
            </span>
          </div>

          {/* Center Pop-Art Tankobon & Collage Showcase */}
          <div className="relative z-10 my-auto py-6 max-w-lg mx-auto w-full space-y-5">
            <div className="flex flex-col items-center text-center space-y-2">
              <ChoujindleCrestLogo lightBg />
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b0b0e] bg-[#eaff00] border-2 border-[#0b0b0e] px-3 py-0.5 shadow-[3px_3px_0_#0b0b0e] rotate-[0.5deg]">
                WAKE UP! RAISE! • POP-ART TANKŌBON ZINE
              </p>
            </div>

            {/* Mini Tankobon Spread + Zine Sticker Callouts */}
            <div className="grid grid-cols-12 gap-3 items-stretch">
              <div className="col-span-5">
                <ChoujinTankobonCover
                  editionNumber={editionNumber}
                  className="h-44 sm:h-48 w-full"
                />
              </div>
              <div className="col-span-7 flex flex-col justify-between gap-2">
                <div className="p-3 bg-[#0b0b0e] text-[#f4f0e6] border-[2.5px] border-[#0b0b0e] shadow-[4px_4px_0_#ff1e56]">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#eaff00] block">
                    ESTÉTICA AUTORAL DE CHOUJIN X
                  </span>
                  <p className="font-display text-lg uppercase tracking-wide leading-tight mt-0.5">
                    YAMATO MORI VS. TORRE DO LUTO
                  </p>
                  <p className="font-sans text-[11px] text-[#f4f0e6]/80 mt-1">
                    Tokio, Azuma, Ely, Sandek, Zora e Batista em um lobby Pop-Punk exclusivo.
                  </p>
                </div>

                {/* Daily vs Infinite Toggle on Right Zine Side */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onTogglePlayType(true)}
                    className={`py-2 px-2 border-[2.5px] border-[#0b0b0e] font-display text-xs font-bold uppercase tracking-wider transition-all ${
                      isDaily
                        ? 'bg-[#eaff00] text-[#0b0b0e] shadow-[3px_3px_0_#0b0b0e]'
                        : 'bg-[#f4f0e6] text-[#0b0b0e]/60 hover:text-[#0b0b0e]'
                    }`}
                  >
                    Diário #{editionNumber}
                  </button>
                  <button
                    type="button"
                    onClick={() => onTogglePlayType(false)}
                    className={`py-2 px-2 border-[2.5px] border-[#0b0b0e] font-display text-xs font-bold uppercase tracking-wider transition-all ${
                      !isDaily
                        ? 'bg-[#00e5ff] text-[#0b0b0e] shadow-[3px_3px_0_#0b0b0e]'
                        : 'bg-[#f4f0e6] text-[#0b0b0e]/60 hover:text-[#0b0b0e]'
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
              className="w-full py-3.5 px-5 bg-[#0b0b0e] hover:bg-[#ff1e56] text-[#eaff00] hover:text-[#f4f0e6] border-[3px] border-[#0b0b0e] font-display font-bold text-base uppercase tracking-[0.16em] shadow-[6px_6px_0_#eaff00] flex items-center justify-between transition-all hover:-translate-y-0.5"
            >
              <span>ABRIR ZINE /CHOUJINXDLE (30 PERSONAGENS)</span>
              <span className="font-mono text-xl">»</span>
            </button>

            {/* Quick Mode Cutouts for ChoujinXdle */}
            <div className="space-y-1.5">
              <span className="block font-mono text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#0b0b0e]">
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
                      className={`p-2.5 border-[2.5px] border-[#0b0b0e] shadow-[4px_4px_0_#0b0b0e] text-left transition-transform hover:-translate-y-0.5 ${
                        done ? 'bg-[#4ade80] text-[#0b0b0e]' : m.bg
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] font-extrabold">
                          {m.issue}
                        </span>
                        <ChoujinModeEmblem modeId={m.id} className="w-4 h-4" />
                      </div>
                      <p className="font-display text-xs font-bold uppercase tracking-wider truncate">
                        {m.label}
                      </p>
                      <p className="font-mono text-[9px] font-semibold opacity-85 truncate">
                        {done ? '✓ OK' : m.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Punk Zine Caption */}
          <div className="relative z-10 pt-3 border-t-[3px] border-[#0b0b0e] flex items-center justify-between text-[10px] font-mono font-bold text-[#0b0b0e] uppercase tracking-widest">
            <span>YAMATO PREFECTURE // 1998</span>
            <span className="px-1.5 py-0.5 bg-[#0b0b0e] text-[#eaff00]">
              ROTA: /CHOUJINXDLE
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
