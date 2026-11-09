import React from 'react';
import { Check, X } from 'lucide-react';
import CharacterSearch from './CharacterSearch';
import CharacterAvatar from './visuals/CharacterAvatar';

export default function QuoteMode({
  universe = 'tg',
  characters,
  charactersById,
  target,
  guesses,
  won,
  isDaily = true,
  editionNumber = 1,
  onGuess,
  onOpenVictoryModal,
}) {
  const isChoujin = universe === 'cx';
  const wrongCount = guesses.filter((id) => id !== target.id).length;

  const clueArcUnlocked = wrongCount >= 1 || won;
  const clueContextUnlocked = wrongCount >= 3 || won;
  const clueFactionUnlocked = wrongCount >= 5 || won;

  return (
    <section className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div
        className={
          isChoujin
            ? 'cx-brutal-box bg-halftone p-5 sm:p-6 space-y-5'
            : 'tg-dossier-box p-5 sm:p-6 space-y-5 bg-manga-halftone'
        }
      >
        {/* Top Stamp Strip */}
        <div
          className={`flex items-center justify-between pb-3 ${
            isChoujin ? 'border-b-2 border-[#FFE600]/40' : 'border-b border-[#efe9dd]/15'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={
                isChoujin
                  ? 'px-2 py-0.5 bg-[#FF0055] text-[#f4f1ea] border border-[#0a0a0c] font-mono text-xs font-black leading-none '
                  : 'px-1.5 py-0.5 bg-[#b80f17] text-[#efe9dd] font-serif text-xs font-bold leading-none'
              }
            >
              弐
            </span>
            <span
              className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
                isChoujin ? 'text-[#FFE600] font-bold' : 'text-[#8d857b]'
              }`}
            >
              {isChoujin
                ? 'ZINE DE VOZES // CITAÇÕES DE CHOUJIN X'
                : 'TRANSCRIÇÃO LITERÁRIA // VOZES DA OBRA'}
            </span>
          </div>
          <span
            className={`font-mono text-[10px] tracking-widest uppercase ${
              isChoujin ? 'text-[#00F0FF] font-bold' : 'text-[#cfc6b6]'
            }`}
          >
            {isDaily ? `EXPEDIENTE GLOBAL #${editionNumber}` : 'TREINO LIVRE'} · {guesses.length}{' '}
            {guesses.length === 1 ? 'PALPITE' : 'PALPITES'}
          </span>
        </div>

        <div className="text-center space-y-1">
          <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-[0.06em] text-[#efe9dd]">
            Quem Proferiu Esta{' '}
            <span className={isChoujin ? 'text-[#FFE600] underline decoration-[#FF0055]' : 'text-[#d9141e]'}>
              Fala
            </span>
            ?
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#cfc6b6]/80">
            {isChoujin
              ? 'A cada tentativa incorreta, o sistema RAISE! desperta novos fragmentos do arco e da afiliação.'
              : 'Novos fragmentos do contexto e do arco narrativo são abertos conforme as tentativas avançam.'}
          </p>
        </div>

        {/* Manga Speech / Literary Excerpt Frame */}
        <blockquote
          className={
            isChoujin
              ? 'relative p-7 sm:p-9 bg-[#f4f1ea] text-[#0a0a0c] border-[3px] border-[#0a0a0c] '
              : 'relative p-7 sm:p-9 bg-[#0a090d] border border-[#efe9dd]/35 shadow-[5px_5px_0_#7d090f]'
          }
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-3 left-3.5 font-serif text-3xl font-bold leading-none select-none ${
              isChoujin ? 'text-[#FF0055]' : 'text-[#d9141e]'
            }`}
          >
            「
          </span>
          <p
            className={`relative z-10 font-serif text-lg sm:text-xl md:text-2xl italic leading-relaxed text-center px-4 ${
              isChoujin ? 'text-[#0a0a0c] font-bold' : 'text-[#efe9dd]'
            }`}
          >
            {target.quote.text}
          </p>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-3 right-3.5 font-serif text-3xl font-bold leading-none select-none ${
              isChoujin ? 'text-[#FF0055]' : 'text-[#d9141e]'
            }`}
          >
            」
          </span>
        </blockquote>

        {/* Progressive Clues (Styled as RAISE! in Choujin X) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            className={
              isChoujin
                ? `p-3 border-2 text-xs space-y-1  ${
                    clueArcUnlocked
                      ? 'bg-[#A3FF00] border-[#0a0a0c] text-[#0a0a0c] '
                      : 'bg-[#0a0a0c] border-[#f4f1ea]/20 text-[#8d857b]'
                  }`
                : `p-3 border text-xs space-y-1 ${
                    clueArcUnlocked
                      ? 'bg-[#1a080c] border-[#d9141e]/65 text-[#efe9dd]'
                      : 'bg-[#0b0a0e] border-[#efe9dd]/12 text-[#8d857b]'
                  }`
            }
          >
            <div
              className={`font-mono text-[10px] uppercase tracking-[0.14em] font-extrabold ${
                isChoujin
                  ? clueArcUnlocked
                    ? 'text-[#0a0a0c]'
                    : 'text-[#A3FF00]'
                  : 'text-[#d9141e]'
              }`}
            >
              {isChoujin ? 'RAISE I: ARCO' : 'ARCO'} {clueArcUnlocked ? '' : `(${wrongCount}/1)`}
            </div>
            <p className="font-bold">
              {clueArcUnlocked ? target.quote.arc : 'Bloqueado — 1 erro'}
            </p>
          </div>

          <div
            className={
              isChoujin
                ? `p-3 border-2 text-xs space-y-1  ${
                    clueContextUnlocked
                      ? 'bg-[#FFE600] border-[#0a0a0c] text-[#0a0a0c] '
                      : 'bg-[#0a0a0c] border-[#f4f1ea]/20 text-[#8d857b]'
                  }`
                : `p-3 border text-xs space-y-1 ${
                    clueContextUnlocked
                      ? 'bg-[#1a080c] border-[#d9141e]/65 text-[#efe9dd]'
                      : 'bg-[#0b0a0e] border-[#efe9dd]/12 text-[#8d857b]'
                  }`
            }
          >
            <div
              className={`font-mono text-[10px] uppercase tracking-[0.14em] font-extrabold ${
                isChoujin
                  ? clueContextUnlocked
                    ? 'text-[#0a0a0c]'
                    : 'text-[#FFE600]'
                  : 'text-[#d9141e]'
              }`}
            >
              {isChoujin ? 'RAISE II: CONTEXTO' : 'CONTEXTO'}{' '}
              {clueContextUnlocked ? '' : `(${wrongCount}/3)`}
            </div>
            <p className="font-bold">
              {clueContextUnlocked ? target.quote.recipient : 'Bloqueado — 3 erros'}
            </p>
          </div>

          <div
            className={
              isChoujin
                ? `p-3 border-2 text-xs space-y-1  ${
                    clueFactionUnlocked
                      ? 'bg-[#00F0FF] border-[#0a0a0c] text-[#0a0a0c] '
                      : 'bg-[#0a0a0c] border-[#f4f1ea]/20 text-[#8d857b]'
                  }`
                : `p-3 border text-xs space-y-1 ${
                    clueFactionUnlocked
                      ? 'bg-[#1a080c] border-[#d9141e]/65 text-[#efe9dd]'
                      : 'bg-[#0b0a0e] border-[#efe9dd]/12 text-[#8d857b]'
                  }`
            }
          >
            <div
              className={`font-mono text-[10px] uppercase tracking-[0.14em] font-extrabold ${
                isChoujin
                  ? clueFactionUnlocked
                    ? 'text-[#0a0a0c]'
                    : 'text-[#00F0FF]'
                  : 'text-[#d9141e]'
              }`}
            >
              {isChoujin ? 'RAISE III: AFILIAÇÃO' : 'AFILIAÇÃO'}{' '}
              {clueFactionUnlocked ? '' : `(${wrongCount}/5)`}
            </div>
            <p className="font-bold">
              {clueFactionUnlocked
                ? target.affiliations.join(' · ')
                : 'Bloqueado — 5 erros'}
            </p>
          </div>
        </div>

        {/* Won Banner or Search */}
        {won ? (
          <div
            className={
              isChoujin
                ? 'p-4 bg-[#A3FF00] text-[#0a0a0c] border-[3px] border-[#0a0a0c] flex flex-col sm:flex-row items-center justify-between gap-3 '
                : 'p-4 bg-[#0d2417] border border-[#4ade80]/70 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[4px_4px_0_#000]'
            }
          >
            <div className="flex items-center gap-3.5">
              <CharacterAvatar character={target} size="md" />
              <div>
                <p
                  className={`font-mono text-[10px] font-black uppercase tracking-[0.18em] ${
                    isChoujin ? 'text-[#0a0a0c]' : 'text-[#86efac]'
                  }`}
                >
                  [AUTORIA CONFIRMADA]
                </p>
                <p
                  className={`font-display text-xl uppercase tracking-wide font-bold ${
                    isChoujin ? 'text-[#0a0a0c]' : 'text-[#efe9dd]'
                  }`}
                >
                  {target.name}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenVictoryModal}
              className={
                isChoujin
                  ? 'px-4 py-2.5 bg-[#0a0a0c] hover:bg-[#FF0055] text-[#FFE600] hover:text-[#f4f1ea] font-display font-bold text-xs uppercase tracking-[0.14em] transition-colors '
                  : 'px-4 py-2.5 bg-[#efe9dd] hover:bg-white text-[#080709] font-display text-xs uppercase tracking-[0.14em] transition-colors'
              }
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

      {/* Guess History */}
      {guesses.length > 0 && (
        <div className="space-y-2 max-w-xl mx-auto">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8d857b] px-1">
            HISTÓRICO DE VERIFICAÇÃO ({guesses.length})
          </h3>
          {guesses.map((gId) => {
            const char = charactersById[gId];
            if (!char) return null;
            const isHit = gId === target.id;
            return (
              <div
                key={gId}
                className={`flex items-center justify-between p-3 animate-fade-sharp ${
                  isChoujin
                    ? isHit
                      ? 'bg-[#A3FF00] text-[#0a0a0c] border-[3px] border-[#0a0a0c] font-bold'
                      : 'bg-[#FF0055] text-[#f4f1ea] border-[3px] border-[#0a0a0c] font-bold'
                    : isHit
                    ? 'bg-[#0e2a19] border border-[#4ade80]/75 text-[#efe9dd] shadow-[3px_3px_0_#000]'
                    : 'bg-[#1c070a] border border-[#dc2626]/55 text-[#efe9dd] shadow-[3px_3px_0_#000]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CharacterAvatar character={char} size="sm" />
                  <span className="font-bold text-sm">{char.name}</span>
                </div>
                <span
                  className={`px-2 py-1 border text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1 ${
                    isChoujin
                      ? 'bg-[#0a0a0c] border-[#0a0a0c] text-[#FFE600]'
                      : isHit
                      ? 'bg-[#166534] border-[#86efac] text-[#efe9dd]'
                      : 'bg-[#7d090f] border-[#ef4444] text-[#efe9dd]'
                  }`}
                >
                  {isHit ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>{isHit ? 'AUTOR' : 'FALSO'}</span>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
