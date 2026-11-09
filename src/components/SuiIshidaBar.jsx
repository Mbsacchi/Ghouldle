import React from 'react';

export default function SuiIshidaBar({
  view,
  universe,
  onGoToLobby,
  onSelectUniverse,
  tgCompletedCount = 0,
  cxCompletedCount = 0,
}) {
  const isLobby = view === 'lobby';

  return (
    <div className="relative z-40 w-full bg-[#050507] border-b border-[#efe9dd]/20 px-3 sm:px-6 py-1.5 select-none">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Sui Ishida Dle Brand Seal -> Returns to Central Lobby */}
        <button
          type="button"
          onClick={onGoToLobby}
          className="group inline-flex items-center gap-2 text-left focus:outline-none"
          title="Voltar ao Lobby Central (Sui Ishida Dle)"
        >
          <span
            className={`px-1.5 py-0.5 font-serif text-[11px] font-extrabold tracking-widest leading-none transition-colors ${
              isLobby
                ? 'bg-[#efe9dd] text-[#050507]'
                : 'bg-[#1a1820] text-[#efe9dd] border border-[#efe9dd]/30 group-hover:bg-[#efe9dd] group-hover:text-[#050507]'
            }`}
          >
            石田スイ
          </span>
          <span className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.16em] text-[#efe9dd] group-hover:text-white">
            SUI ISHIDA <span className="text-[#d9141e]">D</span>
            <span className="text-[#a3e635]">L</span>
            <span className="text-[#efe9dd]">E</span>
          </span>
          <span
            className={`font-mono text-[9px] uppercase tracking-[0.18em] border px-1.5 py-0.5 transition-colors ${
              isLobby
                ? 'bg-[#efe9dd]/15 border-[#efe9dd]/50 text-[#efe9dd]'
                : 'border-[#efe9dd]/18 text-[#8d857b] group-hover:border-[#efe9dd]/45 group-hover:text-[#efe9dd]'
            }`}
          >
            [LOBBY]
          </span>
        </button>

        {/* Right: Dual Game Switcher Tabs (Ghouldle vs Choujindle) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => onSelectUniverse('tg')}
            className={`relative inline-flex items-center gap-2 px-3 py-1 border text-xs transition-all ${
              !isLobby && universe === 'tg'
                ? 'bg-[#1c070b] border-[#d9141e] text-[#efe9dd] shadow-[2px_2px_0_#b80f17]'
                : 'bg-[#0d0c10] border-[#efe9dd]/18 text-[#8d857b] hover:text-[#efe9dd] hover:border-[#d9141e]/60'
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
              !isLobby && universe === 'cx'
                ? 'bg-[#131a0b] border-[#a3e635] text-[#efe9dd] shadow-[2px_2px_0_#65a30d]'
                : 'bg-[#0d0c10] border-[#efe9dd]/18 text-[#8d857b] hover:text-[#efe9dd] hover:border-[#a3e635]/60'
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
  );
}
