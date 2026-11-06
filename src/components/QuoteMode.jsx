import React from 'react';
import { Check, X } from 'lucide-react';
import CharacterSearch from './CharacterSearch';
import CharacterAvatar from './visuals/CharacterAvatar';

export default function QuoteMode({
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
  const wrongCount = guesses.filter((id) => id !== target.id).length;

  const clueArcUnlocked = wrongCount >= 1 || won;
  const clueContextUnlocked = wrongCount >= 3 || won;
  const clueFactionUnlocked = wrongCount >= 5 || won;

  return (
    <section className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="tg-dossier-box p-5 sm:p-6 space-y-5 bg-manga-halftone">
        {/* Top Stamp Strip */}
        <div className="flex items-center justify-between border-b border-[#efe9dd]/15 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-[#b80f17] text-[#efe9dd] font-serif text-xs font-bold leading-none">
              弐
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8d857b]">
              TRANSCRIÇÃO LITERÁRIA // VOZES DA OBRA
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#cfc6b6]">
            {isDaily ? `EXPEDIENTE GLOBAL #${editionNumber}` : 'TREINO LIVRE'} · {guesses.length} {guesses.length === 1 ? 'PALPITE' : 'PALPITES'}
          </span>
        </div>

        <div className="text-center space-y-1">
          <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-[0.06em] text-[#efe9dd]">
            Quem Proferiu Esta <span className="text-[#d9141e]">Fala</span>?
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#cfc6b6]/80">
            Novos fragmentos do contexto e do arco narrativo são abertos conforme as tentativas avançam.
          </p>
        </div>

        {/* Manga Speech / Literary Excerpt Frame */}
        <blockquote className="relative p-7 sm:p-9 bg-[#0a090d] border border-[#efe9dd]/35 shadow-[5px_5px_0_#7d090f]">
          {/* Large Japanese Corner Brackets 「 ... 」 */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-3 left-3.5 font-serif text-3xl font-bold text-[#d9141e] leading-none select-none"
          >
            「
          </span>
          <p className="relative z-10 font-serif text-lg sm:text-xl md:text-2xl italic leading-relaxed text-[#efe9dd] text-center px-4">
            {target.quote.text}
          </p>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 right-3.5 font-serif text-3xl font-bold text-[#d9141e] leading-none select-none"
          >
            」
          </span>
        </blockquote>

        {/* Progressive Clues */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div
            className={`p-3 border text-xs space-y-1 ${
              clueArcUnlocked
                ? 'bg-[#1a080c] border-[#d9141e]/65 text-[#efe9dd]'
                : 'bg-[#0b0a0e] border-[#efe9dd]/12 text-[#8d857b]'
            }`}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#d9141e]">
              ARCO {clueArcUnlocked ? '' : `(${wrongCount}/1)`}
            </div>
            <p className="font-semibold">
              {clueArcUnlocked ? target.quote.arc : 'Bloqueado — 1 erro'}
            </p>
          </div>

          <div
            className={`p-3 border text-xs space-y-1 ${
              clueContextUnlocked
                ? 'bg-[#1a080c] border-[#d9141e]/65 text-[#efe9dd]'
                : 'bg-[#0b0a0e] border-[#efe9dd]/12 text-[#8d857b]'
            }`}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#d9141e]">
              CONTEXTO {clueContextUnlocked ? '' : `(${wrongCount}/3)`}
            </div>
            <p className="font-semibold">
              {clueContextUnlocked ? target.quote.recipient : 'Bloqueado — 3 erros'}
            </p>
          </div>

          <div
            className={`p-3 border text-xs space-y-1 ${
              clueFactionUnlocked
                ? 'bg-[#1a080c] border-[#d9141e]/65 text-[#efe9dd]'
                : 'bg-[#0b0a0e] border-[#efe9dd]/12 text-[#8d857b]'
            }`}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#d9141e]">
              AFILIAÇÃO {clueFactionUnlocked ? '' : `(${wrongCount}/5)`}
            </div>
            <p className="font-semibold">
              {clueFactionUnlocked
                ? target.affiliations.join(' · ')
                : 'Bloqueado — 5 erros'}
            </p>
          </div>
        </div>

        {/* Won Banner or Search */}
        {won ? (
          <div className="p-4 bg-[#0d2417] border border-[#4ade80]/70 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[4px_4px_0_#000]">
            <div className="flex items-center gap-3.5">
              <CharacterAvatar character={target} size="md" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#86efac]">
                  [AUTORIA CONFIRMADA]
                </p>
                <p className="font-display text-xl uppercase tracking-wide text-[#efe9dd]">
                  {target.name}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenVictoryModal}
              className="px-4 py-2.5 bg-[#efe9dd] hover:bg-white text-[#080709] font-display text-xs uppercase tracking-[0.14em] transition-colors"
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
                className={`flex items-center justify-between p-3 border animate-fade-sharp shadow-[3px_3px_0_#000] ${
                  isHit
                    ? 'bg-[#0e2a19] border-[#4ade80]/75 text-[#efe9dd]'
                    : 'bg-[#1c070a] border-[#dc2626]/55 text-[#efe9dd]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CharacterAvatar character={char} size="sm" />
                  <span className="font-bold text-sm">{char.name}</span>
                </div>
                <span
                  className={`px-2 py-1 border text-[10px] font-mono uppercase tracking-widest flex items-center gap-1 ${
                    isHit
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
