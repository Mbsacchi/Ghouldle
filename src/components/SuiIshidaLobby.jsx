import React, { useEffect, useState } from 'react';
import {
  GhouldleCrestLogo,
  HiganbanaCluster,
  ModeEmblem,
} from './visuals/TgArtwork';
import {
  ChoujindleCrestLogo,
  ChoujinBeastPlumes,
  ChoujinModeEmblem,
  ChoujinPanelIllustration,
} from './visuals/ChoujinArtwork';
import { getTimeUntilMidnight } from '../utils/gameLogic';

const TG_MODES = [
  { id: 'classic', kanji: '壱', label: 'Clássico', desc: 'Atributos da CCG' },
  { id: 'quote', kanji: '弐', label: 'Citação', desc: 'Falas da Obra' },
  { id: 'mask', kanji: '参', label: 'Máscara & Olho', desc: 'Kakugan & Hysy' },
];

const CX_MODES = [
  { id: 'classic', kanji: '壱', label: 'Clássico', desc: 'Atributos Yamato Mori' },
  { id: 'quote', kanji: '弐', label: 'Citação', desc: 'Vozes de Yamato' },
  { id: 'mask', kanji: '参', label: 'Forma & Olhar', desc: 'Caos, Besta & Noh' },
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
  const totalSolved = tgSolvedCount + cxSolvedCount;

  return (
    <div className="relative flex-1 min-h-[calc(100vh-41px)] w-full overflow-hidden bg-[#070609] text-[#efe9dd] flex flex-col justify-between select-none">
      {/* Perspective Floor at Horizon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-20%] bottom-0 h-[42vh] kaneki-sanctum-floor z-0 opacity-85"
      />

      {/* Split Crimson (Left) & Acid-Lime (Right) Atmospheric Ink Wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_22%_35%,rgba(184,15,23,0.14),transparent_48%),radial-gradient(circle_at_78%_35%,rgba(132,204,22,0.12),transparent_48%)]"
      />

      {/* Left Higanbana (Tokyo Ghoul) & Right Beast Plumes (Choujin X) */}
      <HiganbanaCluster className="hidden md:block absolute bottom-0 left-0 w-52 lg:w-64 z-10 opacity-85" />
      <ChoujinBeastPlumes
        flip
        className="hidden md:block absolute bottom-0 right-0 w-52 lg:w-64 z-10 opacity-85"
      />

      {/* Main Container */}
      <main className="relative z-20 flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 flex flex-col justify-center gap-6">
        {/* Lobby Center Masthead */}
        <header className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-[#111015] border border-[#efe9dd]/30 shadow-[3px_3px_0_#000]">
            <span className="px-1.5 py-0.5 bg-[#efe9dd] text-[#070609] font-serif text-xs font-extrabold tracking-widest leading-none">
              石田スイ
            </span>
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.24em] uppercase text-[#cfc6b6]">
              ARQUIVO OFICIAL DE INVESTIGAÇÃO // LOBBY CENTRAL
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.1em] text-[#efe9dd] leading-none">
            SUI ISHIDA{' '}
            <span className="text-[#d9141e] drop-shadow-[2px_2px_0_#000]">D</span>
            <span className="text-[#a3e635] drop-shadow-[2px_2px_0_#000]">L</span>
            <span className="text-[#efe9dd] drop-shadow-[2px_2px_0_#000]">E</span>
          </h1>

          <p className="font-serif text-xs sm:text-sm text-[#cfc6b6]/85">
            Escolha a obra e o modo de investigação abaixo — ou entre no hub completo de{' '}
            <strong className="text-[#ef4444]">Tokyo Ghoul</strong> ou{' '}
            <strong className="text-[#a3e635]">Choujin X</strong>.
          </p>

          {/* Global Daily vs Infinite Switch + UTC Countdown */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-grid grid-cols-2 bg-[#0d0c10] border border-[#efe9dd]/30 p-0.5 shadow-[3px_3px_0_#000]">
              <button
                type="button"
                onClick={() => onTogglePlayType(true)}
                className={`px-4 py-1.5 font-display text-xs tracking-[0.15em] uppercase transition-colors ${
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
                className={`px-4 py-1.5 font-display text-xs tracking-[0.15em] uppercase transition-colors ${
                  !isDaily
                    ? 'bg-[#efe9dd] text-[#080709] font-bold'
                    : 'text-[#8d857b] hover:text-[#efe9dd]'
                }`}
              >
                Caçada Infinita
              </button>
            </div>

            {isDaily && (
              <div className="px-3 py-1.5 bg-[#0d0c10] border border-[#efe9dd]/20 font-mono text-[11px] text-[#cfc6b6] shadow-[3px_3px_0_#000]">
                REINICIA EM <strong className="text-[#d9141e]">{countdown}</strong>{' '}
                <span className="text-[#8d857b]">(00:00 UTC)</span> •{' '}
                <strong className="text-[#efe9dd]">{totalSolved}/6</strong> MODOS
              </div>
            )}
          </div>
        </header>

        {/* Dual Universe Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 items-stretch">
          {/* ============================================================
              LEFT DOSSIER: GHOULDLE (TOKYO GHOUL & :RE)
             ============================================================ */}
          <article className="relative flex flex-col justify-between bg-[#0d0b10]/95 border-2 border-[#efe9dd]/80 hover:border-[#d9141e] shadow-[7px_7px_0_#7d090f] p-5 sm:p-6 bg-manga-halftone transition-colors">
            {/* Top Header Strip */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#efe9dd]/15 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#d9141e]" />
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#ef4444]">
                    OBRA I // 東京喰種 TOKYO GHOUL &amp; :RE
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-[#1b080b] border border-[#d9141e]/60 font-mono text-[10px] text-[#efe9dd]">
                  {tgSolvedCount}/3 CONCLUÍDOS • {tgStats.gamesWon}V
                </span>
              </div>

              {/* Manga Character Banner Strip */}
              <div className="relative h-28 sm:h-32 border border-[#efe9dd]/35 bg-[#070609] overflow-hidden grid grid-cols-3">
                {[
                  { src: '/characters/ken-kaneki.jpg', name: 'Ken Kaneki', pos: '54% 22%' },
                  { src: '/characters/kishou-arima.jpg', name: 'Kishou Arima', pos: 'center 26%' },
                  { src: '/characters/eto-yoshimura.jpg', name: 'Eto Yoshimura', pos: 'center 18%' },
                ].map((c, idx) => (
                  <div
                    key={c.name}
                    className={`relative h-full overflow-hidden ${
                      idx < 2 ? 'border-r border-[#efe9dd]/25' : ''
                    }`}
                  >
                    <img
                      src={c.src}
                      alt={c.name}
                      style={{ objectPosition: c.pos }}
                      className="w-full h-full object-cover contrast-125 saturate-[0.8]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080709] via-transparent to-transparent" />
                  </div>
                ))}

                {/* Center Floating Compact Crest */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                  <div className="px-3 py-1.5 bg-[#080709]/95 border border-[#efe9dd]/60 shadow-[4px_4px_0_#b80f17]">
                    <GhouldleCrestLogo compact />
                  </div>
                </div>
              </div>

              {/* Primary Button to Open Identical Ghouldle Hub */}
              <button
                type="button"
                onClick={() => onEnterUniverseHub('tg')}
                className="w-full py-3 px-4 bg-[#b80f17] hover:bg-[#d9141e] border border-[#efe9dd] text-[#efe9dd] font-display text-sm sm:text-base uppercase tracking-[0.16em] shadow-[4px_4px_0_#000] flex items-center justify-between transition-all hover:-translate-y-0.5"
              >
                <span>Abrir /ghouldle (56 Personagens)</span>
                <span className="font-mono text-lg">»</span>
              </button>

              {/* Direct Mode Selector inside Lobby */}
              <div className="space-y-2 pt-1">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8d857b]">
                  OU ESCOLHA O MODO DIRETAMENTE:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {TG_MODES.map((m) => {
                    const done = Boolean(tgCompletedModes[m.id]);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => onEnterUniverseMode('tg', m.id)}
                        className={`group relative p-3 border text-left transition-all flex flex-col justify-between gap-2 ${
                          done
                            ? 'bg-[#0f291a] border-[#4ade80] text-[#efe9dd]'
                            : 'bg-[#121016] hover:bg-[#1c090e] border-[#efe9dd]/35 hover:border-[#d9141e] text-[#efe9dd]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-serif text-xs font-bold text-[#d9141e] group-hover:text-[#efe9dd]">
                            {m.kanji}
                          </span>
                          <ModeEmblem modeId={m.id} className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-display text-sm uppercase tracking-wider leading-tight">
                            {m.label}
                          </p>
                          <p className="font-mono text-[10px] text-[#cfc6b6]/75 truncate">
                            {done ? '済 Concluído' : m.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>

          {/* ============================================================
              RIGHT DOSSIER: CHOUJINDLE (CHOUJIN X)
             ============================================================ */}
          <article className="relative flex flex-col justify-between bg-[#0b0e09]/95 border-2 border-[#efe9dd]/80 hover:border-[#a3e635] shadow-[7px_7px_0_#4d7c0f] p-5 sm:p-6 bg-manga-halftone transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#efe9dd]/15 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#a3e635]" />
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#a3e635]">
                    OBRA II // 超人X CHOUJIN X (YAMATO MORI)
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-[#141d0b] border border-[#a3e635]/60 font-mono text-[10px] text-[#efe9dd]">
                  {cxSolvedCount}/3 CONCLUÍDOS • {cxStats.gamesWon}V
                </span>
              </div>

              {/* Manga Panel Illustration Strip */}
              <div className="relative h-28 sm:h-32 border border-[#efe9dd]/35 bg-[#070906] overflow-hidden grid grid-cols-3">
                {['tokio', 'azuma', 'batista'].map((panelId, idx) => (
                  <div
                    key={panelId}
                    className={`relative h-full overflow-hidden ${
                      idx < 2 ? 'border-r border-[#efe9dd]/25' : ''
                    }`}
                  >
                    <ChoujinPanelIllustration panelId={panelId} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080907] via-transparent to-transparent" />
                  </div>
                ))}

                {/* Center Floating Compact Crest */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                  <div className="px-3 py-1.5 bg-[#080907]/95 border border-[#efe9dd]/60 shadow-[4px_4px_0_#65a30d]">
                    <ChoujindleCrestLogo compact />
                  </div>
                </div>
              </div>

              {/* Primary Button to Open Choujindle Hub */}
              <button
                type="button"
                onClick={() => onEnterUniverseHub('cx')}
                className="w-full py-3 px-4 bg-[#65a30d] hover:bg-[#84cc16] border border-[#efe9dd] text-[#080907] font-display font-bold text-sm sm:text-base uppercase tracking-[0.16em] shadow-[4px_4px_0_#000] flex items-center justify-between transition-all hover:-translate-y-0.5"
              >
                <span>Abrir /choujinxdle (30 Personagens)</span>
                <span className="font-mono text-lg">»</span>
              </button>

              {/* Direct Mode Selector inside Lobby */}
              <div className="space-y-2 pt-1">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8d857b]">
                  OU ESCOLHA O MODO DIRETAMENTE:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {CX_MODES.map((m) => {
                    const done = Boolean(cxCompletedModes[m.id]);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => onEnterUniverseMode('cx', m.id)}
                        className={`group relative p-3 border text-left transition-all flex flex-col justify-between gap-2 ${
                          done
                            ? 'bg-[#0f291a] border-[#4ade80] text-[#efe9dd]'
                            : 'bg-[#10140d] hover:bg-[#172110] border-[#efe9dd]/35 hover:border-[#a3e635] text-[#efe9dd]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-serif text-xs font-bold text-[#a3e635] group-hover:text-[#efe9dd]">
                            {m.kanji}
                          </span>
                          <ChoujinModeEmblem modeId={m.id} className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-display text-sm uppercase tracking-wider leading-tight">
                            {m.label}
                          </p>
                          <p className="font-mono text-[10px] text-[#cfc6b6]/75 truncate">
                            {done ? '済 Concluído' : m.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-3 px-4 border-t border-[#efe9dd]/10 bg-[#070609]/90 text-center text-xs text-[#8d857b] font-serif">
        <strong className="font-display tracking-[0.14em] text-[#efe9dd]">SUI ISHIDA DLE</strong>{' '}
        — Arquivo Unificado de <em className="text-[#ef4444]">Tokyo Ghoul</em> &amp;{' '}
        <em className="text-[#a3e635]">Choujin X</em>
      </footer>
    </div>
  );
}
