import React, { useEffect, useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { GhouldleCrestLogo, ModeEmblem } from './visuals/TgArtwork';
import { ChoujindleCrestLogo, ChoujinModeEmblem } from './visuals/ChoujinArtwork';
import { GAME_MODES, getTimeUntilMidnight } from '../utils/gameLogic';

const MODE_KANJI = {
  classic: '壱',
  quote: '弐',
  mask: '参',
};

export default function ArenaHeader({
  universe = 'tg',
  activeMode,
  onSelectMode,
  onBackToHub,
  completedModes = {},
  isDaily,
  onTogglePlayType,
  onNewInfiniteRound,
  editionNumber,
  streak,
  onOpenStats,
  onOpenHelp,
  lang = 'pt',
}) {
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());
  const isChoujin = universe === 'cx';
  const isEn = lang === 'en';

  const getModeLabel = (mode) => {
    if (isChoujin) {
      if (mode.id === 'classic') return isEn ? 'Classic' : 'Clássico';
      if (mode.id === 'quote') return isEn ? 'Quote' : 'Citação';
      return isEn ? 'Choujin Form' : 'Forma / Caos';
    }
    if (mode.id === 'classic') return isEn ? 'Classic' : 'Clássico';
    if (mode.id === 'quote') return isEn ? 'Quote' : 'Citação';
    return isEn ? 'Mask & Eye' : 'Máscara & Olho';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isChoujin) {
    return (
      <header className="relative z-30 border-b-[3px] border-[#FFE600] bg-[#0a0a0c] bg-halftone select-none">
        {/* Top Hazard Strip */}
        <div className="border-b-2 border-[#0a0a0c] bg-[#FFE600] text-[#0a0a0c] px-4 py-1 text-[10px] font-mono font-extrabold tracking-[0.2em] uppercase flex flex-wrap items-center justify-between max-w-6xl mx-auto">
          <span>
            {isEn
              ? '⚡ YAMATO MORI // FIELD ARCHIVE — CHAOS STATE'
              : '⚡ YAMATO MORI // ARQUIVO DE CAMPO — ESTADO DE CAOS'}
          </span>
          <span>
            {isDaily
              ? isEn
                ? `EDITION #${editionNumber} • NEW TARGET IN ${countdown} (00:00 UTC)`
                : `EDIÇÃO #${editionNumber} • NOVO ALVO EM ${countdown} (00:00 UTC)`
              : isEn
              ? 'INFINITE MODE // FREE CHAOS'
              : 'MODO INFINITO // CAOS LIVRE'}
          </span>
        </div>

        {/* Main Neo-Brutalist Control Strip */}
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Back to Hub + Compact Emblem */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onBackToHub}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#f4f1ea] hover:bg-[#FFE600] border-2 border-[#0a0a0c] text-[#0a0a0c] text-xs font-mono font-extrabold uppercase tracking-wider transition-transform hover:-translate-y-0.5 shadow-[3px_3px_0_#FF0055] -skew-x-3"
                title={isEn ? 'Back to ChoujinXdle Hub' : 'Voltar à Entrada de ChoujinXdle'}
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2.8]" />
                <span className="hidden sm:inline">Zine</span>
              </button>

              <button
                type="button"
                onClick={onBackToHub}
                className="focus:outline-none"
                title={isEn ? 'Back to ChoujinXdle Hub' : 'Voltar à Entrada de ChoujinXdle'}
              >
                <ChoujindleCrestLogo compact />
              </button>
            </div>

            {/* Mobile Quick Seals */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={onOpenStats}
                className="px-2.5 py-1.5 bg-[#16161a] border-2 border-[#FFE600] text-xs font-mono font-bold text-[#FFE600] shadow-[2px_2px_0_#FF0055] -skew-x-3"
              >
                録 {streak > 0 ? `(${streak})` : ''}
              </button>
              <button
                type="button"
                onClick={onOpenHelp}
                className="px-2.5 py-1.5 bg-[#16161a] border-2 border-[#00F0FF] text-xs font-mono font-bold text-[#00F0FF] shadow-[2px_2px_0_#FFE600] -skew-x-3"
              >
                則
              </button>
            </div>
          </div>

          {/* Center: 3-Mode Neo-Brutalist Switcher */}
          <nav aria-label="Alternar Modo Choujin X" className="grid grid-cols-3 gap-2">
            {GAME_MODES.map((mode) => {
              const isActive = activeMode === mode.id;
              const isSolved = Boolean(completedModes[mode.id]);
              const modeLabel = getModeLabel(mode);

              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onSelectMode(mode.id)}
                  className={`group relative flex items-center justify-center sm:justify-start gap-2 px-3 py-2 border-2 transition-all -skew-x-3 ${
                    isActive
                      ? 'bg-[#FFE600] border-[#0a0a0c] text-[#0a0a0c] shadow-[4px_4px_0_#FF0055] -translate-y-0.5 font-extrabold'
                      : 'bg-[#16161a] border-[#f4f1ea]/40 text-[#f4f1ea] hover:border-[#FFE600] hover:text-[#FFE600]'
                  }`}
                >
                  <ChoujinModeEmblem
                    modeId={mode.id}
                    className={`w-5 h-5 shrink-0 ${
                      isActive ? 'text-[#0a0a0c]' : 'text-[#FFE600]'
                    }`}
                  />
                  <div className="hidden sm:block text-left min-w-0">
                    <span className="block font-display text-xs uppercase tracking-[0.06em] leading-none truncate">
                      {modeLabel}
                    </span>
                  </div>
                  <span className="sm:hidden font-serif text-[11px] font-bold">
                    {MODE_KANJI[mode.id]}
                  </span>

                  {isSolved && (
                    <span
                      title={isEn ? 'Solved' : 'Concluído'}
                      className="absolute -top-2 -right-2 px-1 bg-[#A3FF00] border-2 border-[#0a0a0c] text-[9px] font-mono font-black text-[#0a0a0c] leading-tight"
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Daily/Infinite Controls + Seals */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2.5">
            <div className="inline-flex border-2 border-[#f4f1ea] bg-[#16161a] p-0.5 shadow-[3px_3px_0_#FFE600] -skew-x-3">
              <button
                type="button"
                onClick={() => onTogglePlayType(true)}
                className={`px-2.5 py-1 text-[11px] font-display font-bold uppercase tracking-[0.12em] transition-colors ${
                  isDaily
                    ? 'bg-[#FFE600] text-[#0a0a0c]'
                    : 'text-[#f4f1ea]/70 hover:text-[#FFE600]'
                }`}
              >
                {isEn ? 'Daily' : 'Diário'}
              </button>
              <button
                type="button"
                onClick={() => onTogglePlayType(false)}
                className={`px-2.5 py-1 text-[11px] font-display font-bold uppercase tracking-[0.12em] transition-colors ${
                  !isDaily
                    ? 'bg-[#00F0FF] text-[#0a0a0c]'
                    : 'text-[#f4f1ea]/70 hover:text-[#00F0FF]'
                }`}
              >
                {isEn ? 'Infinite' : 'Infinito'}
              </button>
            </div>

            {!isDaily && (
              <button
                type="button"
                onClick={onNewInfiniteRound}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF0055] hover:bg-[#FFE600] hover:text-[#0a0a0c] border-2 border-[#0a0a0c] text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#f4f1ea] shadow-[3px_3px_0_#A3FF00] -skew-x-3 transition-colors"
                title={isEn ? 'Roll another Choujin in this mode' : 'Sortear outro Choujin neste modo'}
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{isEn ? 'New Target' : 'Novo Alvo'}</span>
              </button>
            )}

            <div className="hidden lg:flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenStats}
                className="px-3 py-1.5 bg-[#16161a] hover:bg-[#FFE600] hover:text-[#0a0a0c] border-2 border-[#f4f1ea] text-xs font-mono font-bold uppercase tracking-wider text-[#f4f1ea] shadow-[3px_3px_0_#FF0055] -skew-x-3 transition-colors flex items-center gap-1.5"
              >
                <span>{isEn ? 'Records' : 'Registro'}</span>
                {streak > 0 && (
                  <span className="px-1.5 py-0.2 bg-[#A3FF00] text-[#0a0a0c] text-[10px] font-black">
                    {streak}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={onOpenHelp}
                className="px-2.5 py-1.5 bg-[#f4f1ea] hover:bg-[#00F0FF] border-2 border-[#0a0a0c] text-xs font-mono font-extrabold text-[#0a0a0c] shadow-[3px_3px_0_#FFE600] -skew-x-3 transition-colors"
              >
                {isEn ? '則 Guide' : '則 Guia'}
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // ===========================================================================
  // TOKYO GHOUL HEADER (100% IDENTICAL)
  // ===========================================================================
  return (
    <header className="relative z-30 border-b border-[#efe9dd]/18 bg-[#0b0a0e]">
      {/* Top Hairline Info Strip */}
      <div className="border-b border-[#efe9dd]/10 bg-[#070608] px-4 py-1 text-[10px] font-mono tracking-[0.2em] uppercase text-[#8d857b] flex items-center justify-between max-w-6xl mx-auto">
        <span>
          {isEn
            ? 'CCG // INVESTIGATION ARCHIVE — 20TH WARD'
            : 'CCG // ARQUIVO DE INVESTIGAÇÃO — 20ª ALA'}
        </span>
        <span className="text-[#cfc6b6]">
          {isDaily
            ? isEn
              ? `DAILY DOSSIER #${editionNumber} • NEW TARGET IN ${countdown} (00:00 UTC)`
              : `EXPEDIENTE DIÁRIO #${editionNumber} • NOVO ALVO EM ${countdown} (00:00 UTC)`
            : isEn
            ? 'INFINITE MODE // SOLO TRAINING'
            : 'MODO INFINITO // TREINO INDIVIDUAL'}
        </span>
      </div>

      {/* Main Arena Control Strip */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Back to Hub + Compact Emblem */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHub}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 bg-[#141218] hover:bg-[#b80f17] border border-[#efe9dd]/30 hover:border-[#efe9dd] text-[#efe9dd] text-xs font-mono uppercase tracking-wider transition-colors shadow-[2px_2px_0_#000]"
              title={isEn ? 'Back to Main Hub' : 'Voltar à Entrada Principal'}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isEn ? 'Hub' : 'Entrada'}</span>
            </button>

            <button
              type="button"
              onClick={onBackToHub}
              className="focus:outline-none"
              title={isEn ? 'Back to Main Hub' : 'Voltar à Entrada Principal'}
            >
              <GhouldleCrestLogo compact />
            </button>
          </div>

          {/* Mobile Quick Seals */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              type="button"
              onClick={onOpenStats}
              className="px-2.5 py-1.5 bg-[#141218] border border-[#efe9dd]/25 text-xs font-serif font-bold text-[#efe9dd] hover:border-[#d9141e]"
              title={isEn ? 'CCG Records' : 'Registro da CCG'}
            >
              録 {streak > 0 ? `(${streak})` : ''}
            </button>
            <button
              type="button"
              onClick={onOpenHelp}
              className="px-2.5 py-1.5 bg-[#141218] border border-[#efe9dd]/25 text-xs font-serif font-bold text-[#efe9dd] hover:border-[#d9141e]"
              title={isEn ? 'Manual' : 'Manual'}
            >
              則
            </button>
          </div>
        </div>

        {/* Center: Compact 3-Mode Blade Switcher */}
        <nav aria-label="Alternar Modo" className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {GAME_MODES.map((mode) => {
            const isActive = activeMode === mode.id;
            const isSolved = Boolean(completedModes[mode.id]);
            const modeLabel = getModeLabel(mode);

            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => onSelectMode(mode.id)}
                className={`group relative flex items-center justify-center sm:justify-start gap-2 px-2.5 sm:px-3 py-2 border transition-all ${
                  isActive
                    ? 'bg-[#1c090d] border-[#efe9dd] text-[#efe9dd] shadow-[3px_3px_0_#b80f17] -translate-y-0.5'
                    : 'bg-[#121116] border-[#efe9dd]/20 text-[#8d857b] hover:text-[#efe9dd] hover:border-[#efe9dd]/50'
                }`}
              >
                <ModeEmblem
                  modeId={mode.id}
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? 'text-[#efe9dd]' : 'text-[#8d857b] group-hover:text-[#efe9dd]'
                  }`}
                />
                <div className="hidden sm:block text-left min-w-0">
                  <span className="block font-display text-xs uppercase tracking-[0.08em] leading-none truncate">
                    {modeLabel}
                  </span>
                </div>
                <span className="sm:hidden font-serif text-[11px] font-bold">
                  {MODE_KANJI[mode.id]}
                </span>

                {isSolved && (
                  <span
                    title={isEn ? 'Solved' : 'Concluído'}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#166534] border border-[#86efac] text-[9px] font-serif font-bold text-[#efe9dd] flex items-center justify-center leading-none"
                  >
                    済
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Daily/Infinite Controls + Seals */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2">
          <div className="inline-flex border border-[#efe9dd]/25 bg-[#09080b] p-0.5">
            <button
              type="button"
              onClick={() => onTogglePlayType(true)}
              className={`px-2.5 py-1 text-[11px] font-display uppercase tracking-[0.12em] transition-colors ${
                isDaily
                  ? 'bg-[#b80f17] text-[#efe9dd]'
                  : 'text-[#8d857b] hover:text-[#efe9dd]'
              }`}
            >
              {isEn ? 'Daily' : 'Diário'}
            </button>
            <button
              type="button"
              onClick={() => onTogglePlayType(false)}
              className={`px-2.5 py-1 text-[11px] font-display uppercase tracking-[0.12em] transition-colors ${
                !isDaily
                  ? 'bg-[#efe9dd] text-[#080709]'
                  : 'text-[#8d857b] hover:text-[#efe9dd]'
              }`}
            >
              {isEn ? 'Infinite' : 'Infinito'}
            </button>
          </div>

          {!isDaily && (
            <button
              type="button"
              onClick={onNewInfiniteRound}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#1b080b] hover:bg-[#b80f17] border border-[#d9141e]/60 text-[11px] font-mono uppercase tracking-wider text-[#efe9dd] transition-colors"
              title={isEn ? 'Roll another character in this mode' : 'Sortear outro personagem neste modo'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isEn ? 'New Target' : 'Novo Alvo'}</span>
            </button>
          )}

          <div className="hidden lg:flex items-center gap-1.5">
            <button
              type="button"
              onClick={onOpenStats}
              className="px-3 py-1.5 bg-[#121116] hover:bg-[#1a1820] border border-[#efe9dd]/25 hover:border-[#d9141e] text-xs font-mono uppercase tracking-wider text-[#efe9dd] transition-colors flex items-center gap-1.5"
              title={isEn ? 'Statistics' : 'Estatísticas'}
            >
              <span className="font-serif text-[#d9141e] font-bold">録</span>
              <span>{isEn ? 'Records' : 'Registro'}</span>
              {streak > 0 && (
                <span className="px-1.5 py-0.5 bg-[#b80f17] text-[#efe9dd] text-[10px] font-bold">
                  {streak}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenHelp}
              className="px-2.5 py-1.5 bg-[#121116] hover:bg-[#1a1820] border border-[#efe9dd]/25 hover:border-[#d9141e] text-xs font-serif font-bold text-[#efe9dd] transition-colors"
              title={isEn ? 'Rules & Arc Chronology' : 'Manual de Regras e Cronologia de Arcos'}
            >
              {isEn ? '則 Guide' : '則 Guia'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
