import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, RotateCcw } from 'lucide-react';
import CharacterAvatar from './visuals/CharacterAvatar';
import {
  generateShareSummary,
  getTimeUntilMidnight,
  GAME_MODES,
} from '../utils/gameLogic';
import { localizeCharacter } from '../utils/i18n';

export default function VictoryModal({
  universe = 'tg',
  isOpen,
  onClose,
  mode,
  isDaily,
  editionNumber,
  target,
  guesses,
  stats,
  charactersById,
  completedModes = {},
  onSelectMode,
  onNewInfiniteRound,
  lang = 'pt',
}) {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());
  const isEn = lang === 'en';

  useEffect(() => {
    if (!isOpen) return;
    setCopied(false);
    const timer = setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen || !target) return null;

  const localizedTarget = localizeCharacter(target, lang);

  const winRate =
    stats.gamesPlayed > 0
      ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
      : 100;

  const shareText = generateShareSummary({
    mode,
    isDaily,
    editionNumber,
    guesses,
    target,
    charactersById,
    universe,
    lang,
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = shareText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    }
  };

  const nextUnsolvedMode = GAME_MODES.find(
    (m) => m.id !== mode && !completedModes[m.id]
  );

  const getModeLabel = (modeObj) => {
    if (!modeObj) return '';
    if (modeObj.id === 'classic') return isEn ? 'Classic' : 'Clássico';
    if (modeObj.id === 'quote') return isEn ? 'Quote' : 'Citação';
    return universe === 'cx'
      ? isEn
        ? 'Choujin Form'
        : 'Forma / Caos'
      : isEn
      ? 'Mask & Eye'
      : 'Máscara & Olho';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fade-sharp"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0d0c10] border-2 border-[#efe9dd] shadow-[8px_8px_0_#8f0a11] p-6 space-y-5 overflow-y-auto max-h-[92vh] bg-manga-halftone"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Dossier Bar */}
        <div className="flex items-center justify-between border-b border-[#efe9dd]/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-[#b80f17] text-[#efe9dd] font-serif text-xs font-bold">
              済
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#cfc6b6]">
              {universe === 'cx'
                ? isEn
                  ? 'YAMATO MORI // COMPLETION REPORT'
                  : 'YAMATO MORI // RELATÓRIO DE CONCLUSÃO'
                : isEn
                ? 'CCG // COMPLETION REPORT'
                : 'CCG // RELATÓRIO DE CONCLUSÃO'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 border border-[#efe9dd]/25 hover:border-[#d9141e] text-[#cfc6b6] hover:text-[#efe9dd] transition-colors"
            aria-label={isEn ? 'Close report' : 'Fechar relatório'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Target Dossier Card with Rotated Stamp */}
        <div className="relative flex items-center gap-4 p-4 bg-[#080709] border border-[#efe9dd]/30">
          <CharacterAvatar character={target} size="lg" className="border-[#d9141e]" />
          <div className="min-w-0 flex-1 space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d9141e]">
              {localizedTarget.epithet}
            </p>
            <h2 className="font-display text-2xl uppercase tracking-wide text-[#efe9dd] truncate">
              {target.name}
            </h2>
            <p className="font-mono text-xs text-[#cfc6b6]">
              {isEn ? 'Solved in ' : 'Solucionado em '}
              <strong className="text-[#86efac]">
                {guesses.length}{' '}
                {guesses.length === 1
                  ? isEn
                    ? 'guess'
                    : 'palpite'
                  : isEn
                  ? 'guesses'
                  : 'palpites'}
              </strong>
            </p>
          </div>

          <span className="hidden sm:inline-block px-2 py-1 border-2 border-[#d9141e] text-[#d9141e] font-display text-[11px] uppercase tracking-[0.18em] -rotate-12 select-none">
            {isEn ? 'IDENTIFIED' : 'IDENTIFICADO'}
          </span>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2.5 bg-[#080709] border border-[#efe9dd]/15">
            <p className="font-display text-xl text-[#efe9dd]">{stats.gamesPlayed}</p>
            <p className="font-mono text-[10px] uppercase text-[#8d857b]">
              {isEn ? 'Cases' : 'Casos'}
            </p>
          </div>
          <div className="p-2.5 bg-[#080709] border border-[#efe9dd]/15">
            <p className="font-display text-xl text-[#86efac]">{winRate}%</p>
            <p className="font-mono text-[10px] uppercase text-[#8d857b]">
              {isEn ? 'Win Rate' : 'Êxito'}
            </p>
          </div>
          <div className="p-2.5 bg-[#080709] border border-[#efe9dd]/15">
            <p className="font-display text-xl text-[#f59e0b]">{stats.currentStreak}</p>
            <p className="font-mono text-[10px] uppercase text-[#8d857b]">
              {isEn ? 'Streak' : 'Sequência'}
            </p>
          </div>
          <div className="p-2.5 bg-[#080709] border border-[#efe9dd]/15">
            <p className="font-display text-xl text-[#d9141e]">{stats.maxStreak}</p>
            <p className="font-mono text-[10px] uppercase text-[#8d857b]">
              {isEn ? 'Best' : 'Recorde'}
            </p>
          </div>
        </div>

        {/* Emoji Share Preview */}
        <div className="p-3.5 bg-[#080709] border border-[#efe9dd]/20 space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8d857b]">
            {isEn ? 'SHAREABLE SUMMARY' : 'TRANSCRIÇÃO PARA COMPARTILHAMENTO'}
          </p>
          <pre className="text-xs sm:text-sm font-mono text-[#efe9dd] whitespace-pre-wrap leading-relaxed">
            {shareText}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#b80f17] hover:bg-[#d9141e] border border-[#efe9dd]/50 text-[#efe9dd] font-display text-sm uppercase tracking-[0.14em] shadow-[3px_3px_0_#000] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>{isEn ? 'Copied to Clipboard' : 'Copiado para a Área de Transferência'}</span>
              </>
            ) : (
              <span>{isEn ? 'Copy Result' : 'Copiar Resultado'}</span>
            )}
          </button>

          {!isDaily ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onNewInfiniteRound();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#efe9dd] hover:bg-white text-[#080709] font-display text-sm uppercase tracking-[0.14em] shadow-[3px_3px_0_#000] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isEn ? 'Next Target' : 'Próximo Alvo'}</span>
            </button>
          ) : nextUnsolvedMode ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectMode(nextUnsolvedMode.id);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#efe9dd] hover:bg-white text-[#080709] font-display text-sm uppercase tracking-[0.14em] shadow-[3px_3px_0_#000] transition-colors"
            >
              <span>
                {isEn
                  ? `${getModeLabel(nextUnsolvedMode)} Mode`
                  : `Modo ${getModeLabel(nextUnsolvedMode)}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : null}
        </div>

        {/* Daily Countdown Footer */}
        {isDaily && (
          <div className="pt-3 border-t border-[#efe9dd]/15 text-center font-mono text-xs text-[#8d857b]">
            {isEn ? 'NEXT DAILY DOSSIER IN: ' : 'PRÓXIMO EXPEDIENTE DIÁRIO EM: '}
            <strong className="text-[#efe9dd]">{countdown}</strong>{' '}
            <span className="text-[10px]">(00:00 UTC)</span>
          </div>
        )}
      </div>
    </div>
  );
}
