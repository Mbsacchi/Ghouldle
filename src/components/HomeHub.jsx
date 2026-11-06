import React, { useEffect, useState } from 'react';
import {
  GhouldleCrestLogo,
  HiganbanaCluster,
  ModeEmblem,
} from './visuals/TgArtwork';
import { getTimeUntilMidnight } from '../utils/gameLogic';

const HUB_MODES = [
  {
    id: 'classic',
    kanji: '壱',
    code: 'DOSSIÊ-01',
    title: 'Clássico',
    tagline: 'Obtenha pistas de atributos a cada tentativa',
  },
  {
    id: 'quote',
    kanji: '弐',
    code: 'VOZES-02',
    title: 'Citação',
    tagline: 'Descubra quem proferiu a fala na obra',
  },
  {
    id: 'mask',
    kanji: '参',
    code: 'HYSY-03',
    title: 'Máscara & Olho',
    tagline: 'Reconheça pelo olhar, Kakugan ou disfarce',
  },
];

const LEFT_GHOUL_PANELS = [
  {
    name: 'Ken Kaneki',
    stamp: 'SS // TAPA-OLHO',
    image: '/characters/ken-kaneki.jpg',
    pos: '54% 22%',
    tilt: '-rotate-[2deg]',
    height: 'h-44 xl:h-48',
  },
  {
    name: 'Touka Kirishima',
    stamp: 'S // RABBIT',
    image: '/characters/touka-kirishima.jpg',
    pos: 'center 18%',
    tilt: 'rotate-[1.5deg] translate-x-4',
    height: 'h-36 xl:h-40',
  },
  {
    name: 'Eto Yoshimura',
    stamp: 'SSS // CORUJA',
    image: '/characters/eto-yoshimura.jpg',
    pos: 'center 18%',
    tilt: '-rotate-[1deg] translate-x-1',
    height: 'h-40 xl:h-44',
  },
];

const RIGHT_CCG_PANELS = [
  {
    name: 'Kishou Arima',
    stamp: 'CCG // CEIFADOR BRANCO',
    image: '/characters/kishou-arima.jpg',
    pos: 'center 28%',
    tilt: 'rotate-[2deg]',
    height: 'h-44 xl:h-48',
  },
  {
    name: 'Juuzou Suzuya',
    stamp: 'CCG // XIII JASON',
    image: '/characters/juuzou-suzuya.jpg',
    pos: '52% 24%',
    tilt: '-rotate-[1.5deg] -translate-x-4',
    height: 'h-36 xl:h-40',
  },
  {
    name: 'Haise Sasaki',
    stamp: 'QUINX // MENTOR',
    image: '/characters/haise-sasaki.jpg',
    pos: 'center 32%',
    tilt: 'rotate-[1deg] -translate-x-1',
    height: 'h-40 xl:h-44',
  },
];

export default function HomeHub({
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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#080709] text-[#efe9dd] flex flex-col justify-between select-none">
      {/* Subtle Top Crimson & Bone Ink Rule */}
      <div className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-2 border-b border-[#efe9dd]/12 bg-[#080709]/95 text-[10px] font-mono tracking-[0.22em] text-[#8d857b] uppercase">
        <span>東京喰種 // ARQUIVOS DA 20ª ALA</span>
        <span className="hidden sm:inline text-[#cfc6b6]">
          1000 − 7 = 993 · 986 · 979 · 972
        </span>
        <span className="text-[#d9141e]">
          {isDaily ? `EDIÇÃO #${editionNumber}` : 'TREINO LIVRE'}
        </span>
      </div>

      {/* Perspective Kaneki Checkered Floor at Horizon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-20%] bottom-0 h-[44vh] kaneki-sanctum-floor z-0"
      />

      {/* Vignette Ink Shadow over edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#080709_88%)]"
      />

      {/* Blooming Higanbana (Red Spider Lilies) on Bottom Corners */}
      <HiganbanaCluster className="hidden sm:block absolute bottom-0 left-0 w-56 lg:w-72 z-10 opacity-90" />
      <HiganbanaCluster
        flip
        className="hidden sm:block absolute bottom-0 right-0 w-56 lg:w-72 z-10 opacity-90"
      />

      {/* Far-Left Vertical Tragedy Margin */}
      <div
        aria-hidden="true"
        className="hidden xl:flex flex-col items-center gap-4 absolute left-3 top-1/2 -translate-y-1/2 z-10 text-[11px] font-serif text-[#8d857b]/45 writing-vertical tracking-[0.35em]"
      >
        <span>悲劇の始まり</span>
        <span>•</span>
        <span>あんていく</span>
      </div>

      {/* Far-Right Vertical CCG Margin */}
      <div
        aria-hidden="true"
        className="hidden xl:flex flex-col items-center gap-4 absolute right-3 top-1/2 -translate-y-1/2 z-10 text-[11px] font-serif text-[#8d857b]/45 writing-vertical tracking-[0.35em]"
      >
        <span>喰種対策局</span>
        <span>•</span>
        <span>白鳩の誇り</span>
      </div>

      {/* Main 3-Column Stage: Left Ghoul Manga Strips | Center Entrance Hub | Right CCG Manga Strips */}
      <main className="relative z-20 flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
        {/* LEFT WING: GHOULS (20th Ward / Night Side) */}
        <aside
          aria-label="Lado dos Ghouls"
          className="hidden lg:flex lg:col-span-3 xl:col-span-3 flex-col gap-3.5 pr-2"
        >
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 bg-[#d9141e]" />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#d9141e]">
              喰種 // NOITE DA 20ª ALA
            </span>
          </div>

          {LEFT_GHOUL_PANELS.map((panel) => (
            <div
              key={panel.name}
              className={`group relative w-full ${panel.height} ${panel.tilt} transition-transform duration-300 hover:translate-x-1.5`}
            >
              {/* Hard Offset Crimson Shadow */}
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[#7d090f] clip-manga-left" />

              {/* Manga Panel Frame */}
              <div className="relative w-full h-full bg-[#0c0b0f] border-2 border-[#efe9dd]/85 clip-manga-left overflow-hidden">
                <img
                  src={panel.image}
                  alt={panel.name}
                  style={{ objectPosition: panel.pos }}
                  className="w-full h-full object-cover contrast-125 saturate-[0.78] group-hover:saturate-100 group-hover:scale-105 transition-all duration-500"
                />
                {/* Manga Ink Gradient & Halftone */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080709] via-transparent to-[#080709]/30" />
                <div className="absolute inset-0 bg-manga-halftone opacity-55" />

                {/* Bottom Caption Strip */}
                <div className="absolute bottom-2 left-2.5 right-4 flex items-end justify-between gap-2">
                  <div>
                    <span className="block font-mono text-[9px] tracking-[0.18em] text-[#ef4444] uppercase">
                      {panel.stamp}
                    </span>
                    <span className="font-serif text-sm font-bold text-[#efe9dd] drop-shadow">
                      {panel.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* CENTER HUB: Emblem, Prompt, 4 Angled Mode Plates, Daily Case Box */}
        <section className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center w-full max-w-[470px] mx-auto">
          {/* Top Logo Row with Flanking Seal Triggers (Inspired in flow by Narutodle, 100% Tokyo Ghoul in execution) */}
          <div className="w-full flex items-center justify-center gap-3 sm:gap-5 mb-4">
            {/* Left Seal Trigger: Investigator Stats */}
            <button
              type="button"
              onClick={onOpenStats}
              title="Registro da CCG (Estatísticas)"
              className="group relative w-11 h-11 bg-[#111015] border border-[#efe9dd]/35 hover:border-[#d9141e] shadow-[3px_3px_0_#000] flex flex-col items-center justify-center transition-all hover:-translate-y-0.5"
            >
              <span className="font-serif text-sm font-bold text-[#efe9dd] group-hover:text-[#d9141e] leading-none">
                録
              </span>
              <span className="font-mono text-[8px] uppercase tracking-wider text-[#8d857b] mt-0.5">
                {stats.currentStreak > 0 ? `${stats.currentStreak}d` : 'CCG'}
              </span>
            </button>

            {/* Illustrated Centerpiece Logo */}
            <GhouldleCrestLogo />

            {/* Right Seal Trigger: Manual / Rules */}
            <button
              type="button"
              onClick={onOpenHelp}
              title="Manual de Extermínio (Como Jogar)"
              className="group relative w-11 h-11 bg-[#111015] border border-[#efe9dd]/35 hover:border-[#d9141e] shadow-[3px_3px_0_#000] flex flex-col items-center justify-center transition-all hover:-translate-y-0.5"
            >
              <span className="font-serif text-sm font-bold text-[#efe9dd] group-hover:text-[#d9141e] leading-none">
                則
              </span>
              <span className="font-mono text-[8px] uppercase tracking-wider text-[#8d857b] mt-0.5">
                GUIA
              </span>
            </button>
          </div>

          {/* Dramatic Callout Subtitle */}
          <div className="w-full text-center mb-5 space-y-1">
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#b80f17]" />
              <p className="font-display text-sm sm:text-base tracking-[0.18em] uppercase text-[#efe9dd]">
                Adivinhe os personagens de{' '}
                <span className="text-[#d9141e] underline decoration-[#b80f17] underline-offset-4">
                  Tokyo Ghoul
                </span>
              </p>
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#b80f17]" />
            </div>
            <p className="font-serif text-xs italic text-[#cfc6b6]/80">
              「Entre o aroma do café da Anteiku e o aço frio das Quinques」
            </p>
          </div>

          {/* Daily vs Infinite Switch Strip */}
          <div className="w-full flex items-center justify-center mb-4">
            <div className="inline-grid grid-cols-2 bg-[#0e0d11] border border-[#efe9dd]/25 p-0.5 shadow-[3px_3px_0_#000]">
              <button
                type="button"
                onClick={() => onTogglePlayType(true)}
                className={`px-4 py-1.5 font-display text-xs tracking-[0.16em] uppercase transition-colors ${
                  isDaily
                    ? 'bg-[#b80f17] text-[#efe9dd]'
                    : 'text-[#8d857b] hover:text-[#efe9dd]'
                }`}
              >
                Expediente Diário #{editionNumber}
              </button>
              <button
                type="button"
                onClick={() => onTogglePlayType(false)}
                className={`px-4 py-1.5 font-display text-xs tracking-[0.16em] uppercase transition-colors ${
                  !isDaily
                    ? 'bg-[#efe9dd] text-[#080709]'
                    : 'text-[#8d857b] hover:text-[#efe9dd]'
                }`}
              >
                Caçada Infinita
              </button>
            </div>
          </div>

          {/* 4 Stacked Asymmetric Mode Banners */}
          <nav aria-label="Escolha o Modo de Jogo" className="w-full space-y-3.5">
            {HUB_MODES.map((mode) => {
              const isSolved = Boolean(completedModes[mode.id]);

              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onEnterMode(mode.id)}
                  className="group relative w-full text-left block focus:outline-none"
                >
                  {/* Solid Offset Ink Block Behind Banner */}
                  <div
                    className={`absolute inset-0 translate-x-1.5 translate-y-1.5 clip-mode-banner transition-transform duration-200 group-hover:translate-x-2.5 group-hover:translate-y-2 ${
                      isSolved ? 'bg-[#166534]' : 'bg-[#8f0a11]'
                    }`}
                  />

                  {/* Main Mode Plate */}
                  <div className="relative flex items-stretch bg-[#111015] group-hover:bg-[#17141b] border border-[#efe9dd]/75 group-hover:border-[#efe9dd] clip-mode-banner overflow-hidden transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                    {/* Animated Diagonal Crimson Slash Sweep on Hover */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-[#d9141e]/25 to-transparent -translate-x-[180%] skew-x-[-25deg] group-hover:translate-x-[560%] transition-transform duration-700 ease-out"
                    />

                    {/* Left Blade-Guard Emblem Block */}
                    <div
                      className={`relative w-20 sm:w-22 shrink-0 flex flex-col items-center justify-center py-3 px-2 border-r border-[#efe9dd]/25 transition-colors ${
                        isSolved
                          ? 'bg-[#0f291a] text-[#86efac]'
                          : 'bg-[#1b080b] group-hover:bg-[#b80f17] text-[#efe9dd]'
                      }`}
                    >
                      <span className="absolute top-1 left-1.5 font-serif text-[10px] opacity-65 leading-none">
                        {mode.kanji}
                      </span>
                      <ModeEmblem modeId={mode.id} className="w-8 h-8" />
                    </div>

                    {/* Center Text Content */}
                    <div className="flex-1 py-3 px-4 bg-manga-halftone flex flex-col justify-center min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xl sm:text-2xl font-bold uppercase tracking-[0.06em] text-[#efe9dd] group-hover:text-white leading-none">
                          {mode.title}
                        </span>
                        <span className="hidden sm:inline font-mono text-[9px] tracking-[0.16em] text-[#8d857b] uppercase">
                          [{mode.code}]
                        </span>
                      </div>
                      <p className="text-xs text-[#cfc6b6]/85 mt-1 truncate">
                        {mode.tagline}
                      </p>
                    </div>

                    {/* Right Stamp / Slash Indicator */}
                    <div className="pr-4 pl-2 flex items-center justify-center shrink-0">
                      {isSolved ? (
                        <span className="px-2 py-0.5 border border-[#4ade80] bg-[#0f291a] font-mono text-[10px] font-bold tracking-widest text-[#86efac] uppercase -rotate-6">
                          済 OK
                        </span>
                      ) : (
                        <span className="font-mono text-lg text-[#b80f17] group-hover:text-[#efe9dd] group-hover:translate-x-1 transition-all">
                          »
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Diegetic CCG Daily Dossier Box (Replaces generic "Other Games" ad box with Tokyo Ghoul worldbuilding) */}
          <div className="w-full mt-5 p-3.5 bg-[#0e0d11]/95 border border-[#efe9dd]/25 shadow-[4px_4px_0_#000] relative">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8d857b]">
                  {isDaily ? 'RELATÓRIO DE EXTERMÍNIO DIÁRIO' : 'SIMULAÇÃO DE CAMPO'}
                </p>
                <p className="text-xs text-[#efe9dd] font-medium mt-0.5">
                  {isDaily ? (
                    <>
                      Próxima atualização em{' '}
                      <strong className="font-mono text-[#d9141e]">{countdown}</strong>
                    </>
                  ) : (
                    <span>Alvos ilimitados liberados nos 3 modos</span>
                  )}
                </p>
              </div>

              {/* 3 Hanko Progress Seals */}
              <div className="flex items-center gap-1.5" title={`${solvedCount}/3 modos concluídos`}>
                {HUB_MODES.map((m) => {
                  const done = Boolean(completedModes[m.id]);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onEnterMode(m.id)}
                      title={`${m.title}: ${done ? 'Concluído' : 'Pendente'}`}
                      className={`w-8 h-8 border flex items-center justify-center font-serif text-xs font-bold transition-colors ${
                        done
                          ? 'bg-[#b80f17] border-[#efe9dd] text-[#efe9dd]'
                          : 'bg-[#151319] border-[#efe9dd]/20 text-[#8d857b] hover:border-[#efe9dd]/50'
                      }`}
                    >
                      {done ? '済' : m.kanji}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Quick Character Strip (Only visible below lg so mobile also gets authentic manga panels) */}
          <div className="grid grid-cols-4 gap-2 w-full mt-4 lg:hidden">
            {[
              LEFT_GHOUL_PANELS[0],
              RIGHT_CCG_PANELS[0],
              LEFT_GHOUL_PANELS[1],
              RIGHT_CCG_PANELS[1],
            ].map((p) => (
              <div
                key={p.name}
                className="h-16 border border-[#efe9dd]/40 bg-[#0d0c10] overflow-hidden relative"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ objectPosition: p.pos }}
                  className="w-full h-full object-cover contrast-125 saturate-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT WING: CCG INVESTIGATORS (Doves / Countermeasures) */}
        <aside
          aria-label="Lado da CCG"
          className="hidden lg:flex lg:col-span-3 xl:col-span-3 flex-col gap-3.5 pl-2"
        >
          <div className="flex items-center justify-end gap-2 mb-0.5">
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#cfc6b6]">
              CCG // POMBOS DE AÇO
            </span>
            <span className="w-2 h-2 bg-[#efe9dd]" />
          </div>

          {RIGHT_CCG_PANELS.map((panel) => (
            <div
              key={panel.name}
              className={`group relative w-full ${panel.height} ${panel.tilt} transition-transform duration-300 hover:-translate-x-1.5`}
            >
              {/* Hard Offset Bone/Steel Shadow */}
              <div className="absolute inset-0 -translate-x-1.5 translate-y-1.5 bg-[#2d313b] clip-manga-right" />

              {/* Manga Panel Frame */}
              <div className="relative w-full h-full bg-[#0c0b0f] border-2 border-[#cfc6b6]/80 clip-manga-right overflow-hidden">
                <img
                  src={panel.image}
                  alt={panel.name}
                  style={{ objectPosition: panel.pos }}
                  className="w-full h-full object-cover grayscale-[45%] contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080709] via-transparent to-[#080709]/30" />
                <div className="absolute inset-0 bg-manga-halftone opacity-55" />

                {/* Bottom Caption Strip */}
                <div className="absolute bottom-2 left-4 right-2.5 text-right">
                  <span className="block font-mono text-[9px] tracking-[0.18em] text-[#cfc6b6] uppercase">
                    {panel.stamp}
                  </span>
                  <span className="font-serif text-sm font-bold text-[#efe9dd] drop-shadow">
                    {panel.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </aside>
      </main>

      {/* Minimal Diegetic Footer */}
      <footer className="relative z-20 py-3 px-4 border-t border-[#efe9dd]/10 bg-[#080709]/90 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[11px] text-[#8d857b]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenHelp}
            className="hover:text-[#efe9dd] font-mono uppercase tracking-wider transition-colors"
          >
            [Manual &amp; Arcos]
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={onOpenStats}
            className="hover:text-[#efe9dd] font-mono uppercase tracking-wider transition-colors"
          >
            [Registro ({stats.gamesWon}V)]
          </button>
        </div>
        <span className="hidden sm:inline text-[#efe9dd]/20">|</span>
        <p className="font-serif text-xs text-[#8d857b]">
          GHOULDLE — Tributo não-oficial à obra <em className="text-[#cfc6b6]">Tokyo Ghoul</em> de Sui Ishida
        </p>
      </footer>
    </div>
  );
}
