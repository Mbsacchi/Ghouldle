import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import CharacterSearch from './CharacterSearch';
import CharacterAvatar from './visuals/CharacterAvatar';
import { compareCharacters } from '../utils/gameLogic';

const COLUMNS = [
  { key: 'character', title: 'Alvo' },
  { key: 'gender', title: 'Gênero' },
  { key: 'species', title: 'Espécie' },
  { key: 'affiliations', title: 'Afiliação' },
  { key: 'rcTypes', title: 'Células RC' },
  { key: 'rank', title: 'Classificação' },
  { key: 'debutArc', title: 'Arco de Estreia' },
];

function getCellStampStyle(status) {
  switch (status) {
    case 'correct':
      return 'bg-[#0e2a19] border-[#4ade80]/80 text-[#efe9dd]';
    case 'partial':
      return 'bg-[#3d2307] border-[#f59e0b]/85 text-[#efe9dd]';
    default:
      return 'bg-[#2c070a] border-[#dc2626]/70 text-[#efe9dd]';
  }
}

export default function ClassicMode({
  characters,
  charactersById,
  target,
  guesses,
  won,
  isDaily = true,
  editionNumber = 1,
  revealedHints = [],
  lastAnimatedGuessId,
  onGuess,
  onRevealHint,
  onOpenVictoryModal,
}) {
  const wrongGuessesCount = guesses.filter((id) => id !== target.id).length;
  const hint1Unlocked = wrongGuessesCount >= 5 || won;
  const hint2Unlocked = wrongGuessesCount >= 8 || won;
  const hint1Open = revealedHints.includes('hint1');
  const hint2Open = revealedHints.includes('hint2');

  return (
    <section className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* CCG Investigation Dossier Header */}
      <div className="tg-dossier-box p-5 sm:p-6 max-w-3xl mx-auto space-y-5 relative bg-manga-halftone">
        {/* Top Stamp Strip */}
        <div className="flex items-center justify-between border-b border-[#efe9dd]/15 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-[#b80f17] text-[#efe9dd] font-serif text-xs font-bold leading-none">
              壱
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8d857b]">
              DOSSIÊ DE COMPARAÇÃO // ATRIBUTOS DA CCG
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#cfc6b6]">
            {isDaily ? `EXPEDIENTE GLOBAL #${editionNumber}` : 'TREINO LIVRE'} · {guesses.length} {guesses.length === 1 ? 'PALPITE' : 'PALPITES'}
          </span>
        </div>

        <div className="text-center space-y-1">
          <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-[0.06em] text-[#efe9dd]">
            Identifique o <span className="text-[#d9141e]">Indivíduo Registrado</span>
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#cfc6b6]/80">
            Submeta um nome do arquivo. Cada coluna revelará o grau de convergência com o alvo oculto.
          </p>
        </div>

        {/* Classified Hints Strip (5 and 8 wrong guesses) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            disabled={!hint1Unlocked}
            onClick={() => onRevealHint('hint1')}
            className={`flex items-center justify-between px-3.5 py-2.5 border text-left transition-colors ${
              hint1Open
                ? 'bg-[#21080b] border-[#efe9dd] text-[#efe9dd]'
                : hint1Unlocked
                ? 'bg-[#19080b] hover:bg-[#b80f17] border-[#d9141e] text-[#efe9dd]'
                : 'bg-[#0b0a0e] border-[#efe9dd]/12 text-[#8d857b] cursor-not-allowed'
            }`}
          >
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[#d9141e]">
                ANEXO CONFIDENCIAL I
              </span>
              <span className="font-display text-xs uppercase tracking-[0.08em]">
                Epíteto &amp; Registro de Voz
              </span>
            </div>
            <span className="font-mono text-[11px] px-2 py-0.5 border border-current/30">
              {hint1Unlocked
                ? hint1Open
                  ? 'ABERTO'
                  : 'ABRIR'
                : `${wrongGuessesCount}/5`}
            </span>
          </button>

          <button
            type="button"
            disabled={!hint2Unlocked}
            onClick={() => onRevealHint('hint2')}
            className={`flex items-center justify-between px-3.5 py-2.5 border text-left transition-colors ${
              hint2Open
                ? 'bg-[#21080b] border-[#efe9dd] text-[#efe9dd]'
                : hint2Unlocked
                ? 'bg-[#19080b] hover:bg-[#b80f17] border-[#d9141e] text-[#efe9dd]'
                : 'bg-[#0b0a0e] border-[#efe9dd]/12 text-[#8d857b] cursor-not-allowed'
            }`}
          >
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[#d9141e]">
                ANEXO CONFIDENCIAL II
              </span>
              <span className="font-display text-xs uppercase tracking-[0.08em]">
                Arma / Quinque &amp; Inicial
              </span>
            </div>
            <span className="font-mono text-[11px] px-2 py-0.5 border border-current/30">
              {hint2Unlocked
                ? hint2Open
                  ? 'ABERTO'
                  : 'ABRIR'
                : `${wrongGuessesCount}/8`}
            </span>
          </button>
        </div>

        {/* Opened Classified Hints */}
        {(hint1Open || hint2Open) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hint1Open && (
              <div className="p-3.5 bg-[#0a090c] border-l-2 border-l-[#d9141e] border border-[#efe9dd]/20 space-y-1 animate-fade-sharp">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d9141e]">
                  CODINOME // VOZ
                </p>
                <p className="font-display text-sm uppercase tracking-wide text-[#efe9dd]">
                  {target.epithet}
                </p>
                <p className="font-serif text-xs italic text-[#cfc6b6] line-clamp-2">
                  「{target.quote.text}」
                </p>
              </div>
            )}

            {hint2Open && (
              <div className="p-3.5 bg-[#0a090c] border-l-2 border-l-[#d9141e] border border-[#efe9dd]/20 space-y-1 animate-fade-sharp">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d9141e]">
                  ARSENAL // INICIAL
                </p>
                <p className="font-display text-sm uppercase tracking-wide text-[#efe9dd]">
                  {target.kaguneOrQuinque.name} ({target.kaguneOrQuinque.category})
                </p>
                <p className="font-mono text-[11px] text-[#cfc6b6]">
                  Inicial do Registro: <strong className="text-[#d9141e]">{target.name[0]}.</strong>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Search Input OR Case Closed Banner */}
        {won ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#0d2417] border border-[#4ade80]/70 shadow-[4px_4px_0_#000]">
            <div className="flex items-center gap-3.5">
              <CharacterAvatar character={target} size="md" />
              <div>
                <span className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-[#86efac]">
                  [CASO ENCERRADO EM {guesses.length} {guesses.length === 1 ? 'TENTATIVA' : 'TENTATIVAS'}]
                </span>
                <p className="font-display text-xl uppercase tracking-wide text-[#efe9dd]">
                  {target.name}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenVictoryModal}
              className="px-4 py-2.5 bg-[#efe9dd] hover:bg-white text-[#080709] font-display text-xs uppercase tracking-[0.14em] transition-colors shadow-[3px_3px_0_#000]"
            >
              Relatório &amp; Cópia »
            </button>
          </div>
        ) : (
          <CharacterSearch
            characters={characters}
            guessedIds={guesses}
            disabled={won}
            onSelectCharacter={onGuess}
          />
        )}
      </div>

      {/* 7-Column CCG Attribute Comparison Board */}
      {guesses.length > 0 && (
        <div className="overflow-x-auto pb-3">
          <div className="min-w-[840px] space-y-2">
            {/* Sharp Column Headers */}
            <div className="grid grid-cols-7 gap-2">
              {COLUMNS.map((col) => (
                <div
                  key={col.key}
                  className="py-2 px-2 text-center font-display text-xs uppercase tracking-[0.12em] text-[#efe9dd] bg-[#0e0d12] border-y border-x border-[#efe9dd]/25 border-b-2 border-b-[#b80f17]"
                >
                  {col.title}
                </div>
              ))}
            </div>

            {/* Guess Rows (Newest at Top) */}
            {guesses.map((guessId) => {
              const guessChar = charactersById[guessId];
              if (!guessChar) return null;

              const comparison = compareCharacters(guessChar, target);
              const shouldAnimate = lastAnimatedGuessId === guessId;

              return (
                <div key={guessId} className="grid grid-cols-7 gap-2">
                  {comparison.cells.map((cell, colIdx) => {
                    const delayMs = colIdx * 190;

                    return (
                      <div key={cell.key} className="flip-perspective h-24 sm:h-28">
                        <div
                          className={`flip-card-inner ${
                            shouldAnimate ? 'flip-card-animate' : 'flip-card-flipped'
                          }`}
                          style={
                            shouldAnimate ? { animationDelay: `${delayMs}ms` } : undefined
                          }
                        >
                          {/* Front Face: Unflipped Stamped CCG Cardstock */}
                          <div className="flip-card-front bg-[#100f14] bg-manga-halftone border border-[#efe9dd]/25 flex flex-col items-center justify-center p-2">
                            <span className="font-serif text-base font-bold text-[#b80f17]">
                              秘
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#8d857b] mt-0.5">
                              CCG-FILE
                            </span>
                          </div>

                          {/* Back Face: Stamped Ink Result */}
                          <div
                            className={`flip-card-back border p-2 flex flex-col items-center justify-center text-center relative overflow-hidden bg-ink-hatch shadow-[3px_3px_0_#000] ${
                              cell.key === 'character'
                                ? 'bg-[#121116] border-[#efe9dd]/45'
                                : getCellStampStyle(cell.status)
                            }`}
                          >
                            {/* Subtle Corner Tick */}
                            <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-current opacity-40" />

                            {cell.key === 'character' ? (
                              <div className="flex flex-col items-center justify-center gap-1.5 w-full">
                                <CharacterAvatar character={guessChar} size="sm" />
                                <span className="text-[11px] font-bold text-[#efe9dd] leading-tight line-clamp-2 px-0.5">
                                  {guessChar.name}
                                </span>
                              </div>
                            ) : cell.key === 'debutArc' ? (
                              <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                                {cell.status !== 'correct' && (
                                  <div className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-black/45 border border-current/25 text-[10px] font-mono uppercase tracking-wider">
                                    {cell.direction === 'up' ? (
                                      <>
                                        <ArrowUp className="w-3 h-3 stroke-[2.6]" />
                                        <span>Depois</span>
                                      </>
                                    ) : (
                                      <>
                                        <ArrowDown className="w-3 h-3 stroke-[2.6]" />
                                        <span>Antes</span>
                                      </>
                                    )}
                                  </div>
                                )}
                                <span className="text-xs font-semibold leading-snug line-clamp-3">
                                  {cell.label}
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs font-semibold leading-snug line-clamp-4 px-0.5">
                                {cell.label}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend Strip */}
      <div className="max-w-3xl mx-auto px-4 py-3 bg-[#0e0d11] border border-[#efe9dd]/18 flex flex-wrap items-center justify-center gap-5 text-xs font-mono uppercase tracking-wider text-[#cfc6b6]">
        <span className="inline-flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-[#0e2a19] border border-[#4ade80] inline-block" />
          <span>Exato</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-[#3d2307] border border-[#f59e0b] inline-block" />
          <span>Parcial</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-[#2c070a] border border-[#dc2626] inline-block" />
          <span>Divergente</span>
        </span>
        <span className="inline-flex items-center gap-1 text-[#8d857b]">
          <ArrowUp className="w-3.5 h-3.5 text-[#d9141e]" />
          <span>Estreou depois</span>
        </span>
        <span className="inline-flex items-center gap-1 text-[#8d857b]">
          <ArrowDown className="w-3.5 h-3.5 text-[#d9141e]" />
          <span>Estreou antes</span>
        </span>
      </div>
    </section>
  );
}
