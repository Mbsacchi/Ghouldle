import React from 'react';
import { Check, X } from 'lucide-react';
import CharacterSearch from './CharacterSearch';
import CharacterAvatar from './visuals/CharacterAvatar';
import MaskEyeVisualizer from './visuals/MaskEyeVisualizer';
import { localizeCharacter } from '../utils/i18n';

const MASK_ZOOM_STEPS = [3.15, 2.55, 2.05, 1.65, 1.32, 1.1, 1.0];

export default function MaskMode({
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
  lang = 'pt',
}) {
  const isChoujin = universe === 'cx';
  const isEn = lang === 'en';
  const localizedTarget = localizeCharacter(target, lang);
  const wrongCount = guesses.filter((id) => id !== target.id).length;
  const currentZoom = won
    ? 1.0
    : MASK_ZOOM_STEPS[Math.min(wrongCount, MASK_ZOOM_STEPS.length - 1)];

  const clueTypeUnlocked = wrongCount >= 2 || won;
  const clueEpithetUnlocked = wrongCount >= 4 || won;

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
                  ? 'px-2 py-0.5 bg-[#00F0FF] text-[#0a0a0c] border border-[#0a0a0c] font-mono text-xs font-black leading-none -skew-x-6'
                  : 'px-1.5 py-0.5 bg-[#b80f17] text-[#efe9dd] font-serif text-xs font-bold leading-none'
              }
            >
              参
            </span>
            <span
              className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
                isChoujin ? 'text-[#00F0FF] font-bold' : 'text-[#8d857b]'
              }`}
            >
              {isChoujin
                ? isEn
                  ? 'VISUAL ARCHIVE // CHOUJIN FORM & CHAOS STATE'
                  : 'ARQUIVO VISUAL // FORMA CHOUJIN & ESTADO DE CAOS'
                : isEn
                ? 'HYSY ARTMASK CATALOG // FACIAL IDENTIFICATION'
                : 'CATÁLOGO HYSY ARTMASK // IDENTIFICAÇÃO FACIAL'}
            </span>
          </div>
          <span
            className={`font-mono text-[10px] tracking-widest uppercase ${
              isChoujin ? 'text-[#FFE600] font-bold' : 'text-[#cfc6b6]'
            }`}
          >
            {isDaily
              ? isEn
                ? `GLOBAL DOSSIER #${editionNumber}`
                : `EXPEDIENTE GLOBAL #${editionNumber}`
              : isEn
              ? 'FREE PRACTICE'
              : 'TREINO LIVRE'}{' '}
            · {isEn ? 'LENS' : 'LENTE'} {currentZoom.toFixed(2)}x
          </span>
        </div>

        <div className="text-center space-y-1">
          <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-[0.06em] text-[#efe9dd]">
            {isEn ? 'Recognize the ' : 'Reconheça a '}
            <span
              className={
                isChoujin ? 'text-[#00F0FF] underline decoration-[#FFE600]' : 'text-[#d9141e]'
              }
            >
              {isChoujin
                ? isEn
                  ? 'Choujin Form / Chaos State'
                  : 'Forma Choujin / Estado de Caos'
                : isEn
                ? 'Mask or Gaze'
                : 'Máscara ou Olhar'}
            </span>
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#cfc6b6]/80">
            {isChoujin
              ? isEn
                ? 'Inspect the close-up of the Choujin Form, Chaos State, or Noh Mask. The frame zooms out with each guess.'
                : 'Examine o recorte da Forma Choujin, Estado de Caos ou Máscara Noh. O enquadramento abre a cada tentativa.'
              : isEn
              ? 'Inspect the cropped fragment of the mask or Kakugan. The frame zooms out after each wrong guess.'
              : 'Examine o fragmento fotográfico do disfarce ou Kakugan. O quadro se expande a cada erro.'}
          </p>
        </div>

        {/* Cropped Close-up Manga Panel */}
        <div
          className={
            isChoujin
              ? 'relative mx-auto w-full max-w-lg aspect-[16/9] border-[3px] border-[#FFE600] bg-[#0a0a0c] shadow-[6px_6px_0_#FF0055] overflow-hidden'
              : 'relative mx-auto w-full max-w-lg aspect-[16/9] border-2 border-[#efe9dd]/80 bg-[#080709] shadow-[5px_5px_0_#8f0a11] overflow-hidden'
          }
        >
          <MaskEyeVisualizer
            character={localizedTarget}
            zoomScale={currentZoom}
            className="w-full h-full"
          />
          <span
            className={`pointer-events-none absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 ${
              isChoujin ? 'border-[#A3FF00]' : 'border-[#d9141e]'
            }`}
          />
          <span
            className={`pointer-events-none absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 ${
              isChoujin ? 'border-[#00F0FF]' : 'border-[#efe9dd]'
            }`}
          />

          <div
            className={
              isChoujin
                ? 'absolute bottom-2.5 left-3 px-2.5 py-0.5 bg-[#0a0a0c] border-2 border-[#FFE600] text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#FFE600] -skew-x-6'
                : 'absolute bottom-2.5 left-3 px-2 py-0.5 bg-[#080709]/90 border border-[#efe9dd]/25 text-[10px] font-mono uppercase tracking-widest text-[#efe9dd]'
            }
          >
            {isChoujin ? `CHAOS-LENS ${currentZoom.toFixed(2)}x` : `HYSY-LENS ${currentZoom.toFixed(2)}x`}
          </div>
        </div>

        {/* Progressive Clues (Styled with ⚡ ATIVAR RAISE! in Choujin X) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            className={
              isChoujin
                ? `px-4 py-2.5 border-2 text-xs -skew-x-2 ${
                    clueTypeUnlocked
                      ? 'bg-[#A3FF00] border-[#0a0a0c] text-[#0a0a0c] shadow-[4px_4px_0_#FFE600]'
                      : 'bg-[#0a0a0c] border-[#f4f1ea]/20 text-[#8d857b]'
                  }`
                : `px-3.5 py-2.5 border text-xs ${
                    clueTypeUnlocked
                      ? 'bg-[#1a080c] border-[#d9141e]/65 text-[#efe9dd]'
                      : 'bg-[#0b0a0e] border-[#efe9dd]/12 text-[#8d857b]'
                  }`
            }
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.16em] font-extrabold block ${
                isChoujin
                  ? clueTypeUnlocked
                    ? 'text-[#0a0a0c]'
                    : 'text-[#A3FF00]'
                  : 'text-[#d9141e]'
              }`}
            >
              {isChoujin
                ? isEn
                  ? `⚡ ACTIVATE RAISE! I ${clueTypeUnlocked ? '// ACTIVE' : `(${wrongCount}/2)`}`
                  : `⚡ ATIVAR RAISE! I ${clueTypeUnlocked ? '// ATIVO' : `(${wrongCount}/2)`}`
                : isEn
                ? `DETAIL I ${clueTypeUnlocked ? '// UNLOCKED' : `// LOCKED (${wrongCount}/2)`}`
                : `DETALHE I ${clueTypeUnlocked ? '// LIBERADO' : `// BLOQUEADO (${wrongCount}/2)`}`}
            </span>
            <span className="font-bold">
              {clueTypeUnlocked
                ? isEn
                  ? `Form / Gaze: ${localizedTarget.maskOrEye.type}`
                  : `Forma / Olhar: ${localizedTarget.maskOrEye.type}`
                : isEn
                ? 'Requires 2 wrong guesses'
                : 'Requer 2 palpites incorretos'}
            </span>
          </div>

          <div
            className={
              isChoujin
                ? `px-4 py-2.5 border-2 text-xs -skew-x-2 ${
                    clueEpithetUnlocked
                      ? 'bg-[#FFE600] border-[#0a0a0c] text-[#0a0a0c] shadow-[4px_4px_0_#FF0055]'
                      : 'bg-[#0a0a0c] border-[#f4f1ea]/20 text-[#8d857b]'
                  }`
                : `px-3.5 py-2.5 border text-xs ${
                    clueEpithetUnlocked
                      ? 'bg-[#1a080c] border-[#d9141e]/65 text-[#efe9dd]'
                      : 'bg-[#0b0a0e] border-[#efe9dd]/12 text-[#8d857b]'
                  }`
            }
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.16em] font-extrabold block ${
                isChoujin
                  ? clueEpithetUnlocked
                    ? 'text-[#0a0a0c]'
                    : 'text-[#FFE600]'
                  : 'text-[#d9141e]'
              }`}
            >
              {isChoujin
                ? isEn
                  ? `⚡ ACTIVATE RAISE! II ${clueEpithetUnlocked ? '// ACTIVE' : `(${wrongCount}/4)`}`
                  : `⚡ ATIVAR RAISE! II ${clueEpithetUnlocked ? '// ATIVO' : `(${wrongCount}/4)`}`
                : isEn
                ? `DETAIL II ${clueEpithetUnlocked ? '// UNLOCKED' : `// LOCKED (${wrongCount}/4)`}`
                : `DETALHE II ${clueEpithetUnlocked ? '// LIBERADO' : `// BLOQUEADO (${wrongCount}/4)`}`}
            </span>
            <span className="font-bold">
              {clueEpithetUnlocked
                ? isEn
                  ? `Alias: ${localizedTarget.epithet}`
                  : `Alcunha: ${localizedTarget.epithet}`
                : isEn
                ? 'Requires 4 wrong guesses'
                : 'Requer 4 palpites incorretos'}
            </span>
          </div>
        </div>

        {/* Won Banner or Search */}
        {won ? (
          <div
            className={
              isChoujin
                ? 'p-4 bg-[#A3FF00] text-[#0a0a0c] border-[3px] border-[#0a0a0c] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[6px_6px_0_#FF0055]'
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
                  {localizedTarget.maskOrEye.title}
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
                  ? 'px-4 py-2.5 bg-[#0a0a0c] hover:bg-[#FF0055] text-[#FFE600] hover:text-[#f4f1ea] font-display font-bold text-xs uppercase tracking-[0.14em] transition-colors -skew-x-3'
                  : 'px-4 py-2.5 bg-[#efe9dd] hover:bg-white text-[#080709] font-display text-xs uppercase tracking-[0.14em] transition-colors'
              }
            >
              {isEn ? 'Report & Share »' : 'Relatório & Cópia »'}
            </button>
          </div>
        ) : (
          <CharacterSearch
            characters={characters}
            guessedIds={guesses}
            disabled={won}
            hideAvatars
            onSelectCharacter={onGuess}
            lang={lang}
            universe={universe}
          />
        )}
      </div>

      {/* Guess History */}
      {guesses.length > 0 && (
        <div className="space-y-2 max-w-xl mx-auto">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8d857b] px-1">
            {isEn ? `VERIFICATION LOG (${guesses.length})` : `HISTÓRICO DE VERIFICAÇÃO (${guesses.length})`}
          </h3>
          {guesses.map((gId) => {
            const char = charactersById[gId];
            if (!char) return null;
            const locChar = localizeCharacter(char, lang);
            const isHit = gId === target.id;
            return (
              <div
                key={gId}
                className={`flex items-center justify-between p-3 animate-fade-sharp ${
                  isChoujin
                    ? isHit
                      ? 'bg-[#A3FF00] text-[#0a0a0c] border-[3px] border-[#0a0a0c] shadow-[5px_5px_0_#000000] font-bold'
                      : 'bg-[#FF0055] text-[#f4f1ea] border-[3px] border-[#0a0a0c] shadow-[5px_5px_0_#000000] font-bold'
                    : isHit
                    ? 'bg-[#0e2a19] border border-[#4ade80]/75 text-[#efe9dd] shadow-[3px_3px_0_#000]'
                    : 'bg-[#1c070a] border border-[#dc2626]/55 text-[#efe9dd] shadow-[3px_3px_0_#000]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CharacterAvatar character={char} size="sm" />
                  <div>
                    <p className="font-bold text-sm">{char.name}</p>
                    <p
                      className={`font-mono text-[11px] ${
                        isChoujin ? 'opacity-90' : 'text-[#cfc6b6]/75'
                      }`}
                    >
                      {locChar.epithet}
                    </p>
                  </div>
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
                  <span>
                    {isHit
                      ? isEn
                        ? 'TARGET'
                        : 'ALVO'
                      : isEn
                      ? 'WRONG'
                      : 'FALSO'}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
