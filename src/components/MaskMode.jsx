import React from 'react';
import { Check, X } from 'lucide-react';
import CharacterSearch from './CharacterSearch';
import CharacterAvatar from './visuals/CharacterAvatar';
import MaskEyeVisualizer from './visuals/MaskEyeVisualizer';

const MASK_ZOOM_STEPS = [3.15, 2.55, 2.05, 1.65, 1.32, 1.1, 1.0];

export default function MaskMode({
  characters,
  charactersById,
  target,
  guesses,
  won,
  onGuess,
  onOpenVictoryModal,
}) {
  const wrongCount = guesses.filter((id) => id !== target.id).length;
  const currentZoom = won
    ? 1.0
    : MASK_ZOOM_STEPS[Math.min(wrongCount, MASK_ZOOM_STEPS.length - 1)];

  const clueTypeUnlocked = wrongCount >= 2 || won;
  const clueEpithetUnlocked = wrongCount >= 4 || won;

  return (
    <section className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="tg-dossier-box p-5 sm:p-6 space-y-5 bg-manga-halftone">
        {/* Top Stamp Strip */}
        <div className="flex items-center justify-between border-b border-[#efe9dd]/15 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-[#b80f17] text-[#efe9dd] font-serif text-xs font-bold leading-none">
              参
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8d857b]">
              CATÁLOGO HYSY ARTMASK // IDENTIFICAÇÃO FACIAL
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#d9141e]">
            RECORTE {currentZoom.toFixed(2)}x
          </span>
        </div>

        <div className="text-center space-y-1">
          <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-[0.06em] text-[#efe9dd]">
            Reconheça a <span className="text-[#d9141e]">Máscara ou Olhar</span>
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#cfc6b6]/80">
            Examine o fragmento fotográfico do disfarce ou Kakugan. O quadro se expande a cada erro.
          </p>
        </div>

        {/* Cropped Close-up Manga Panel */}
        <div className="relative mx-auto w-full max-w-lg aspect-[16/9] border-2 border-[#efe9dd]/80 bg-[#080709] shadow-[5px_5px_0_#8f0a11] overflow-hidden">
          <MaskEyeVisualizer
            character={target}
            zoomScale={currentZoom}
            className="w-full h-full"
          />
          <span className="pointer-events-none absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#d9141e]" />
          <span className="pointer-events-none absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#efe9dd]" />

          <div className="absolute bottom-2.5 left-3 px-2 py-0.5 bg-[#080709]/90 border border-[#efe9dd]/25 text-[10px] font-mono uppercase tracking-widest text-[#efe9dd]">
            HYSY-LENS {currentZoom.toFixed(2)}x
          </div>
        </div>

        {/* Progressive Clues */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div
            className={`px-3.5 py-2.5 border text-xs ${
              clueTypeUnlocked
                ? 'bg-[#1a080c] border-[#d9141e]/65 text-[#efe9dd]'
                : 'bg-[#0b0a0e] border-[#efe9dd]/12 text-[#8d857b]'
            }`}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#d9141e] block">
              DETALHE I {clueTypeUnlocked ? '// LIBERADO' : `// BLOQUEADO (${wrongCount}/2)`}
            </span>
            <span className="font-semibold">
              {clueTypeUnlocked
                ? `Registro: ${target.maskOrEye.type}`
                : 'Requer 2 palpites incorretos'}
            </span>
          </div>

          <div
            className={`px-3.5 py-2.5 border text-xs ${
              clueEpithetUnlocked
                ? 'bg-[#1a080c] border-[#d9141e]/65 text-[#efe9dd]'
                : 'bg-[#0b0a0e] border-[#efe9dd]/12 text-[#8d857b]'
            }`}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#d9141e] block">
              DETALHE II {clueEpithetUnlocked ? '// LIBERADO' : `// BLOQUEADO (${wrongCount}/4)`}
            </span>
            <span className="font-semibold">
              {clueEpithetUnlocked
                ? `Alcunha: ${target.epithet}`
                : 'Requer 4 palpites incorretos'}
            </span>
          </div>
        </div>

        {/* Won Banner or Search */}
        {won ? (
          <div className="p-4 bg-[#0d2417] border border-[#4ade80]/70 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[4px_4px_0_#000]">
            <div className="flex items-center gap-3.5">
              <CharacterAvatar character={target} size="md" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#86efac]">
                  {target.maskOrEye.title}
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
            hideAvatars
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
                  <div>
                    <p className="font-bold text-sm">{char.name}</p>
                    <p className="font-mono text-[11px] text-[#cfc6b6]/75">{char.epithet}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 border text-[10px] font-mono uppercase tracking-widest flex items-center gap-1 ${
                    isHit
                      ? 'bg-[#166534] border-[#86efac] text-[#efe9dd]'
                      : 'bg-[#7d090f] border-[#ef4444] text-[#efe9dd]'
                  }`}
                >
                  {isHit ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>{isHit ? 'ALVO' : 'FALSO'}</span>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
