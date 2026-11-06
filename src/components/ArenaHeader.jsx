import React, { useEffect, useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { GhouldleCrestLogo, ModeEmblem } from './visuals/TgArtwork';
import { GAME_MODES, getTimeUntilMidnight } from '../utils/gameLogic';

const MODE_KANJI = {
  classic: '壱',
  quote: '弐',
  mask: '参',
};

export default function ArenaHeader({
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
}) {
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative z-30 border-b border-[#efe9dd]/18 bg-[#0b0a0e]">
      {/* Top Hairline Info Strip */}
      <div className="border-b border-[#efe9dd]/10 bg-[#070608] px-4 py-1 text-[10px] font-mono tracking-[0.2em] uppercase text-[#8d857b] flex items-center justify-between max-w-6xl mx-auto">
        <span>CCG // ARQUIVO DE INVESTIGAÇÃO — 20ª ALA</span>
        <span className="text-[#cfc6b6]">
          {isDaily ? `EXPEDIENTE DIÁRIO #${editionNumber} • NOVO ALVO EM ${countdown} (00:00 UTC)` : 'MODO INFINITO // TREINO INDIVIDUAL'}
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
              title="Voltar à Entrada Principal"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Entrada</span>
            </button>

            <button
              type="button"
              onClick={onBackToHub}
              className="focus:outline-none"
              title="Voltar à Entrada Principal"
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
              title="Registro da CCG"
            >
              録 {streak > 0 ? `(${streak})` : ''}
            </button>
            <button
              type="button"
              onClick={onOpenHelp}
              className="px-2.5 py-1.5 bg-[#141218] border border-[#efe9dd]/25 text-xs font-serif font-bold text-[#efe9dd] hover:border-[#d9141e]"
              title="Manual"
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
                    {mode.label}
                  </span>
                </div>
                <span className="sm:hidden font-serif text-[11px] font-bold">
                  {MODE_KANJI[mode.id]}
                </span>

                {isSolved && (
                  <span
                    title="Concluído"
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
              Diário
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
              Infinito
            </button>
          </div>

          {!isDaily && (
            <button
              type="button"
              onClick={onNewInfiniteRound}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#1b080b] hover:bg-[#b80f17] border border-[#d9141e]/60 text-[11px] font-mono uppercase tracking-wider text-[#efe9dd] transition-colors"
              title="Sortear outro personagem neste modo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Novo Alvo</span>
            </button>
          )}

          <div className="hidden lg:flex items-center gap-1.5">
            <button
              type="button"
              onClick={onOpenStats}
              className="px-3 py-1.5 bg-[#121116] hover:bg-[#1a1820] border border-[#efe9dd]/25 hover:border-[#d9141e] text-xs font-mono uppercase tracking-wider text-[#efe9dd] transition-colors flex items-center gap-1.5"
              title="Estatísticas"
            >
              <span className="font-serif text-[#d9141e] font-bold">録</span>
              <span>Registro</span>
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
              title="Manual de Regras e Cronologia de Arcos"
            >
              則 Guia
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
