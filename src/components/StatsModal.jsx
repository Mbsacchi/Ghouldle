import React from 'react';
import { X } from 'lucide-react';
import { GAME_MODES } from '../utils/gameLogic';

export default function StatsModal({ isOpen, onClose, stats, universe = 'tg', lang = 'pt' }) {
  if (!isOpen) return null;
  const isChoujin = universe === 'cx';
  const isEn = lang === 'en';

  const getModeLabel = (modeObj) => {
    if (modeObj.id === 'classic') return isEn ? 'Classic' : 'Clássico';
    if (modeObj.id === 'quote') return isEn ? 'Quote' : 'Citação';
    return isChoujin
      ? isEn
        ? 'Choujin Form'
        : 'Forma / Caos'
      : isEn
      ? 'Mask & Eye'
      : 'Máscara & Olho';
  };

  const winRate =
    stats.gamesPlayed > 0
      ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
      : 0;

  const avgAttempts =
    stats.gamesWon > 0
      ? (stats.totalGuessesOnWins / stats.gamesWon).toFixed(1)
      : '—';

  const buckets = Object.entries(stats.distribution || {});
  const maxBucket = Math.max(1, ...buckets.map(([, val]) => val));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fade-sharp"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0d0c10] border-2 border-[#efe9dd] shadow-[8px_8px_0_#000] p-6 space-y-6 max-h-[90vh] overflow-y-auto bg-manga-halftone"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#efe9dd]/20 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 bg-[#b80f17] text-[#efe9dd] font-serif text-sm font-bold flex items-center justify-center">
              録
            </span>
            <div>
              <h2 className="font-display text-xl uppercase tracking-[0.08em] text-[#efe9dd] leading-none">
                {isChoujin
                  ? isEn
                    ? 'Service Record — Yamato Mori'
                    : 'Histórico de Serviço — Yamato Mori'
                  : isEn
                  ? 'Service Record — CCG'
                  : 'Histórico de Serviço — CCG'}
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#8d857b] mt-1">
                {isEn
                  ? 'Data stored locally on this device'
                  : 'Dados armazenados localmente neste terminal'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 border border-[#efe9dd]/25 hover:border-[#d9141e] text-[#cfc6b6] hover:text-[#efe9dd] transition-colors"
            aria-label={isEn ? 'Close records' : 'Fechar registro'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          <div className="p-3 bg-[#080709] border border-[#efe9dd]/20">
            <p className="font-display text-2xl text-[#efe9dd]">{stats.gamesPlayed}</p>
            <p className="font-mono text-[10px] uppercase text-[#8d857b]">
              {isEn ? 'Cases' : 'Casos'}
            </p>
          </div>
          <div className="p-3 bg-[#080709] border border-[#efe9dd]/20">
            <p className="font-display text-2xl text-[#86efac]">{winRate}%</p>
            <p className="font-mono text-[10px] uppercase text-[#8d857b]">
              {isEn ? 'Win Rate' : 'Taxa Êxito'}
            </p>
          </div>
          <div className="p-3 bg-[#080709] border border-[#efe9dd]/20">
            <p className="font-display text-2xl text-[#f59e0b]">{stats.currentStreak}</p>
            <p className="font-mono text-[10px] uppercase text-[#8d857b]">
              {isEn ? 'Streak' : 'Sequência'}
            </p>
          </div>
          <div className="p-3 bg-[#080709] border border-[#efe9dd]/20">
            <p className="font-display text-2xl text-[#d9141e]">{stats.maxStreak}</p>
            <p className="font-mono text-[10px] uppercase text-[#8d857b]">
              {isEn ? 'Best Streak' : 'Recorde'}
            </p>
          </div>
        </div>

        {/* Distribution Bars */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#8d857b]">
            <span>{isEn ? 'Guess Distribution' : 'Distribuição de Tentativas'}</span>
            <span>
              {isEn ? 'Average: ' : 'Média: '}
              <strong className="text-[#efe9dd]">{avgAttempts}</strong>
            </span>
          </div>
          <div className="space-y-2">
            {buckets.map(([label, count]) => {
              const pct = Math.max(9, Math.round((count / maxBucket) * 100));
              return (
                <div key={label} className="flex items-center gap-3 text-xs">
                  <span className="w-10 font-mono text-[#cfc6b6] text-right">{label}</span>
                  <div className="flex-1 bg-[#080709] h-6 border border-[#efe9dd]/15">
                    <div
                      style={{ width: `${pct}%` }}
                      className="h-full bg-[#b80f17] border-r border-[#efe9dd]/60 flex items-center justify-end pr-2 font-mono text-[11px] font-bold text-[#efe9dd] transition-all"
                    >
                      {count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Per Mode Breakdown */}
        <div className="space-y-2">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8d857b]">
            {isEn ? 'PERFORMANCE BY DIVISION' : 'DESEMPENHO POR DIVISÃO'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {GAME_MODES.map((m) => {
              const mStat = stats.byMode?.[m.id] || { won: 0, bestAttempts: null };
              return (
                <div
                  key={m.id}
                  className="p-3 bg-[#080709] border border-[#efe9dd]/20 flex items-center justify-between"
                >
                  <div>
                    <p className="font-display text-sm uppercase tracking-wide text-[#efe9dd]">
                      {getModeLabel(m)}
                    </p>
                    <p className="font-mono text-[10px] text-[#8d857b]">
                      {isEn ? 'Solved: ' : 'Solucionados: '}
                      <strong className="text-[#cfc6b6]">{mStat.won}</strong>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[9px] uppercase text-[#8d857b] block">
                      {isEn ? 'Best' : 'Melhor'}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#86efac]">
                      {mStat.bestAttempts ? `${mStat.bestAttempts}x` : '—'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
