import React from 'react';
import { X, ArrowUp, ArrowDown } from 'lucide-react';
import { ARCS_CHRONOLOGY, CHOUJIN_ARCS_CHRONOLOGY } from '../utils/gameLogic';
import { translateAttr } from '../utils/i18n';

export default function HelpModal({ isOpen, onClose, universe = 'tg', lang = 'pt' }) {
  if (!isOpen) return null;
  const isChoujin = universe === 'cx';
  const isEn = lang === 'en';
  const arcsList = isChoujin ? CHOUJIN_ARCS_CHRONOLOGY : ARCS_CHRONOLOGY;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fade-sharp"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0d0c10] border-2 border-[#efe9dd] shadow-[8px_8px_0_#8f0a11] p-6 space-y-5 max-h-[90vh] overflow-y-auto bg-manga-halftone"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#efe9dd]/20 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 bg-[#b80f17] text-[#efe9dd] font-serif text-sm font-bold flex items-center justify-center">
              則
            </span>
            <div>
              <h2 className="font-display text-xl uppercase tracking-[0.08em] text-[#efe9dd] leading-none">
                {isChoujin
                  ? isEn
                    ? 'Investigation Manual — Yamato Mori'
                    : 'Manual de Investigação — Yamato Mori'
                  : isEn
                  ? 'Investigation Manual — CCG'
                  : 'Manual de Investigação — CCG'}
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#8d857b] mt-1">
                {isEn
                  ? 'Attribute convergence criteria & arc timeline'
                  : 'Critérios de convergência e linha temporal dos arcos'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 border border-[#efe9dd]/25 hover:border-[#d9141e] text-[#cfc6b6] hover:text-[#efe9dd] transition-colors"
            aria-label={isEn ? 'Close manual' : 'Fechar manual'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Color Rules */}
        <div className="space-y-2.5 text-xs sm:text-sm text-[#cfc6b6]">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#efe9dd]">
            {isEn ? 'HOW TO READ CELLS IN CLASSIC MODE' : 'LEITURA DAS CÉLULAS NO MODO CLÁSSICO'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 bg-[#0e2a19] border border-[#4ade80]/70">
              <strong className="font-display uppercase tracking-wider text-[#86efac] block">
                {isEn ? 'Green — Exact Match' : 'Verde — Convergência Exata'}
              </strong>
              {isEn
                ? 'The attribute matches the hidden target record completely.'
                : 'O atributo coincide integralmente com o registro do alvo oculto.'}
            </div>
            <div className="p-3 bg-[#3d2307] border border-[#f59e0b]/75">
              <strong className="font-display uppercase tracking-wider text-[#fbbf24] block">
                {isEn ? 'Amber — Partial Match' : 'Âmbar — Convergência Parcial'}
              </strong>
              {isEn
                ? 'Shares at least one affiliation, RC type / complex (e.g., Chimera), or One-Eyed Ghoul subtype.'
                : 'Compartilha parte das afiliações, células RC (ex.: Quimera) ou variação de Ghoul de Um Olho.'}
            </div>
            <div className="p-3 bg-[#2c070a] border border-[#dc2626]/70">
              <strong className="font-display uppercase tracking-wider text-[#fca5a5] block">
                {isEn ? 'Crimson — No Match' : 'Carmesim — Divergente'}
              </strong>
              {isEn
                ? 'No overlap with the target profile in that field.'
                : 'Nenhuma interseção com o perfil investigado naquele campo.'}
            </div>
            <div className="p-3 bg-[#080709] border border-[#efe9dd]/20">
              <strong className="font-display uppercase tracking-wider text-[#efe9dd] flex items-center gap-1">
                <ArrowUp className="w-3.5 h-3.5 text-[#d9141e]" /> {isEn ? 'Later / Higher' : 'Depois / Maior'} ·{' '}
                <ArrowDown className="w-3.5 h-3.5 text-[#d9141e]" /> {isEn ? 'Earlier / Lower' : 'Antes / Menor'}
              </strong>
              {isEn
                ? 'Indicates whether the target debuted in a later/earlier arc or holds a higher/lower rank than your guess.'
                : 'Indica se a primeira aparição ou patente do alvo é posterior/maior ou anterior/menor ao palpite.'}
            </div>
          </div>
        </div>

        {/* Chronology Reference */}
        <div className="space-y-2">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#efe9dd]">
            {isEn ? 'OFFICIAL DEBUT ARC CHRONOLOGY' : 'CRONOLOGIA OFICIAL DOS ARCOS DE ESTREIA'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {arcsList.map((arc) => (
              <div
                key={arc.order}
                className="flex items-center justify-between px-3 py-2 bg-[#080709] border border-[#efe9dd]/15 text-xs"
              >
                <span className="font-semibold text-[#efe9dd]">
                  <span className="font-mono text-[#d9141e] mr-2">
                    {String(arc.order).padStart(2, '0')}
                  </span>
                  {translateAttr(arc.name, lang)}
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 border border-[#efe9dd]/15 text-[#8d857b]">
                  {arc.part}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hints & Modes */}
        <div className="p-3.5 bg-[#16070a] border-l-2 border-l-[#d9141e] border border-[#efe9dd]/20 text-xs text-[#cfc6b6] space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d9141e]">
            {isEn ? 'HINTS & GAME MODES PROTOCOL' : 'PROTOCOLO DE PISTAS & EXPEDIENTES'}
          </p>
          <p>
            {isEn ? (
              <>
                In <strong>Classic Mode</strong>, confidential hints unlock after 5 and 8 wrong
                guesses. You can switch freely between the <strong>Daily Dossier</strong> (a new
                global target every midnight UTC in each mode) and <strong>Infinite Mode</strong>{' '}
                to practice without limits.
              </>
            ) : (
              <>
                No <strong>Modo Clássico</strong>, os anexos confidenciais são liberados após 5 e 8
                erros. Você pode alternar livremente entre o <strong>Expediente Diário</strong> (um
                alvo inédito a cada meia-noite em cada divisão) e a <strong>Caçada Infinita</strong>{' '}
                para treinar sem restrições.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
