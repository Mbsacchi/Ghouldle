import React, { useState } from 'react';
import { X } from 'lucide-react';
import { GhouldleCrestLogo } from './visuals/TgArtwork';
import { ChoujindleCrestLogo } from './visuals/ChoujinArtwork';

export default function SuiIshidaBar({
  universe,
  onSelectUniverse,
  tgCompletedCount = 0,
  cxCompletedCount = 0,
  editionNumber = 1,
}) {
  const [portalOpen, setPortalOpen] = useState(false);

  return (
    <>
      <div className="relative z-40 w-full bg-[#050507] border-b border-[#efe9dd]/20 px-3 sm:px-6 py-1.5 select-none">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Sui Ishida Dle Brand Seal + Portal Trigger */}
          <button
            type="button"
            onClick={() => setPortalOpen(true)}
            className="group inline-flex items-center gap-2 text-left focus:outline-none"
            title="Abrir Portal Sui Ishida Dle (Tokyo Ghoul & Choujin X)"
          >
            <span className="px-1.5 py-0.5 bg-[#efe9dd] text-[#050507] font-serif text-[11px] font-extrabold tracking-widest leading-none">
              石田スイ
            </span>
            <span className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.16em] text-[#efe9dd] group-hover:text-white">
              SUI ISHIDA <span className="text-[#d9141e]">D</span>
              <span className="text-[#a3e635]">L</span>
              <span className="text-[#efe9dd]">E</span>
            </span>
            <span className="hidden md:inline-block font-mono text-[9px] uppercase tracking-[0.18em] text-[#8d857b] border border-[#efe9dd]/15 px-1.5 py-0.5 group-hover:border-[#efe9dd]/40 group-hover:text-[#cfc6b6] transition-colors">
              [PORTAL 2 JOGOS]
            </span>
          </button>

          {/* Right: Dual Game Switcher Tabs (Ghouldle vs Choujindle) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => onSelectUniverse('tg')}
              className={`relative inline-flex items-center gap-2 px-3 py-1 border text-xs transition-all ${
                universe === 'tg'
                  ? 'bg-[#1c070b] border-[#d9141e] text-[#efe9dd] shadow-[2px_2px_0_#b80f17]'
                  : 'bg-[#0d0c10] border-[#efe9dd]/18 text-[#8d857b] hover:text-[#efe9dd] hover:border-[#efe9dd]/40'
              }`}
            >
              <span className="w-2 h-2 bg-[#d9141e]" />
              <span className="font-serif text-[10px] opacity-80 hidden sm:inline">
                東京喰種
              </span>
              <span className="font-display uppercase tracking-[0.1em] font-bold">
                GHOULDLE
              </span>
              <span
                className={`font-mono text-[9px] px-1 py-0.2 border ${
                  tgCompletedCount === 3
                    ? 'bg-[#0f291a] border-[#4ade80] text-[#86efac]'
                    : 'bg-black/40 border-[#efe9dd]/15 text-[#cfc6b6]'
                }`}
              >
                {tgCompletedCount}/3
              </span>
            </button>

            <button
              type="button"
              onClick={() => onSelectUniverse('cx')}
              className={`relative inline-flex items-center gap-2 px-3 py-1 border text-xs transition-all ${
                universe === 'cx'
                  ? 'bg-[#131a0b] border-[#a3e635] text-[#efe9dd] shadow-[2px_2px_0_#65a30d]'
                  : 'bg-[#0d0c10] border-[#efe9dd]/18 text-[#8d857b] hover:text-[#efe9dd] hover:border-[#efe9dd]/40'
              }`}
            >
              <span className="w-2 h-2 bg-[#a3e635]" />
              <span className="font-serif text-[10px] opacity-80 hidden sm:inline">
                超人X
              </span>
              <span className="font-display uppercase tracking-[0.1em] font-bold">
                CHOUJINDLE
              </span>
              <span
                className={`font-mono text-[9px] px-1 py-0.2 border ${
                  cxCompletedCount === 3
                    ? 'bg-[#0f291a] border-[#4ade80] text-[#86efac]'
                    : 'bg-black/40 border-[#efe9dd]/15 text-[#cfc6b6]'
                }`}
              >
                {cxCompletedCount}/3
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Dual-Universe Sui Ishida Dle Portal Modal */}
      {portalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fade-sharp select-none"
          onClick={() => setPortalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#0a090d] border-2 border-[#efe9dd] shadow-[8px_8px_0_#000] p-6 space-y-6 max-h-[92vh] overflow-y-auto bg-manga-halftone"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#efe9dd]/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-1 bg-[#efe9dd] text-[#080709] font-serif text-xs font-extrabold">
                  石田スイ
                </span>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl uppercase tracking-[0.1em] text-[#efe9dd] leading-none">
                    SUI ISHIDA DLE — ARQUIVO DUPLO
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#8d857b] mt-1">
                    Edição Global #{editionNumber} • Escolha a Obra para Investigar
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPortalOpen(false)}
                className="p-1.5 border border-[#efe9dd]/25 hover:border-[#d9141e] text-[#cfc6b6] hover:text-[#efe9dd] transition-colors"
                aria-label="Fechar portal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Two Manga Universe Cards Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Card 1: GHOULDLE (Tokyo Ghoul) */}
              <button
                type="button"
                onClick={() => {
                  onSelectUniverse('tg');
                  setPortalOpen(false);
                }}
                className={`group relative text-left p-5 border-2 transition-all flex flex-col justify-between gap-4 bg-[#0d0b10] hover:bg-[#150c11] ${
                  universe === 'tg'
                    ? 'border-[#d9141e] shadow-[5px_5px_0_#b80f17]'
                    : 'border-[#efe9dd]/40 hover:border-[#d9141e]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d9141e]">
                    OBRA I // 東京喰種 &amp; :re
                  </span>
                  <span className="px-2 py-0.5 bg-[#1b080b] border border-[#d9141e]/60 font-mono text-[10px] text-[#efe9dd]">
                    {tgCompletedCount}/3 HOJE
                  </span>
                </div>

                <div className="py-2 flex justify-center">
                  <GhouldleCrestLogo compact />
                </div>

                <p className="font-serif text-xs text-[#cfc6b6] leading-relaxed">
                  Investigue os 56 Ghouls, Quinx e Investigadores da CCG nos modos Clássico,
                  Citação e Máscara &amp; Olho.
                </p>

                <div className="pt-2 border-t border-[#efe9dd]/15 flex items-center justify-between font-display text-xs uppercase tracking-[0.14em] text-[#efe9dd] group-hover:text-[#d9141e]">
                  <span>{universe === 'tg' ? 'JOGO ATUALMENTE ATIVO' : 'ENTRAR NO GHOULDLE'}</span>
                  <span>»</span>
                </div>
              </button>

              {/* Card 2: CHOUJINDLE (Choujin X) */}
              <button
                type="button"
                onClick={() => {
                  onSelectUniverse('cx');
                  setPortalOpen(false);
                }}
                className={`group relative text-left p-5 border-2 transition-all flex flex-col justify-between gap-4 bg-[#0b0e09] hover:bg-[#12180d] ${
                  universe === 'cx'
                    ? 'border-[#a3e635] shadow-[5px_5px_0_#65a30d]'
                    : 'border-[#efe9dd]/40 hover:border-[#a3e635]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a3e635]">
                    OBRA II // 超人X (CHOUJIN X)
                  </span>
                  <span className="px-2 py-0.5 bg-[#141d0b] border border-[#a3e635]/60 font-mono text-[10px] text-[#efe9dd]">
                    {cxCompletedCount}/3 HOJE
                  </span>
                </div>

                <div className="py-2 flex justify-center">
                  <ChoujindleCrestLogo compact />
                </div>

                <p className="font-serif text-xs text-[#cfc6b6] leading-relaxed">
                  Desvende os Choujins de Yamato Mori, Ilhas das Bestas e Torre do Luto nos
                  modos Clássico, Citação e Forma &amp; Olhar.
                </p>

                <div className="pt-2 border-t border-[#efe9dd]/15 flex items-center justify-between font-display text-xs uppercase tracking-[0.14em] text-[#efe9dd] group-hover:text-[#a3e635]">
                  <span>{universe === 'cx' ? 'JOGO ATUALMENTE ATIVO' : 'ENTRAR NO CHOUJINDLE'}</span>
                  <span>»</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
