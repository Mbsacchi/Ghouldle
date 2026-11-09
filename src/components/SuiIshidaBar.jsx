import React from 'react';

export default function SuiIshidaBar({
  view,
  universe,
  onGoToLobby,
  onSelectUniverse,
  tgCompletedCount = 0,
  cxCompletedCount = 0,
  lang = 'pt',
  onChangeLang,
}) {
  const isLobby = view === 'lobby';
  const isCx = !isLobby && universe === 'cx';
  const isTg = !isLobby && universe === 'tg';
  const isEn = lang === 'en';

  return (
    <div
      className={`relative z-40 w-full transition-colors duration-300 select-none ${
        isCx
          ? 'bg-[#0a0a0c] border-b-[3px] border-[#FFE600] shadow-[0_3px_0_#FF0055]'
          : isTg
          ? 'bg-[#050507] border-b border-[#dc2626]/45'
          : 'bg-[#050507] border-b border-[#efe9dd]/25'
      } px-3 sm:px-6 py-1.5`}
    >
      <nav
        aria-label="Navegação Principal Sui Ichida Dle"
        className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-2"
      >
        {/* Left: Sui Ishida Dle Brand Seal -> Returns to Central Lobby */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onGoToLobby();
          }}
          className="group inline-flex items-center gap-2 text-left focus:outline-none"
          title="Sui Ichida Dle (Sui Ishida Dle) — Lobby Principal"
        >
          <span
            className={`px-1.5 py-0.5 font-serif text-[11px] font-extrabold tracking-widest leading-none transition-all duration-300 ${
              isLobby
                ? 'bg-[#efe9dd] text-[#050507]'
                : isCx
                ? 'bg-[#FFE600] text-[#0a0a0c] border border-[#0a0a0c] -skew-x-6 shadow-[2px_2px_0_#FF0055]'
                : 'bg-[#1a1820] text-[#efe9dd] border border-[#efe9dd]/30 group-hover:bg-[#efe9dd] group-hover:text-[#050507]'
            }`}
          >
            石田スイ
          </span>
          <span className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.16em] text-[#efe9dd] group-hover:text-white">
            SUI ISHIDA <span className="text-[#dc2626]">D</span>
            <span className="text-[#FFE600]">L</span>
            <span className="text-[#A3FF00]">E</span>
          </span>
          <span
            className={`font-mono text-[9px] font-bold uppercase tracking-[0.18em] border px-1.5 py-0.5 transition-all duration-300 ${
              isLobby
                ? 'bg-[#efe9dd]/15 border-[#efe9dd]/50 text-[#efe9dd]'
                : isCx
                ? 'bg-[#16161a] border-[#FFE600] text-[#FFE600] -skew-x-3 group-hover:bg-[#FFE600] group-hover:text-[#0a0a0c]'
                : 'border-[#efe9dd]/18 text-[#8d857b] group-hover:border-[#efe9dd]/45 group-hover:text-[#efe9dd]'
            }`}
          >
            [LOBBY]
          </span>
        </a>

        {/* Right: Dual Game Switcher Tabs (Ghouldle vs ChoujinXdle) with crawlable hrefs */}
        <div className="flex items-center gap-2">
          <a
            href="/ghouldle"
            onClick={(e) => {
              e.preventDefault();
              onSelectUniverse('tg');
            }}
            title={
              isEn
                ? 'Ghouldle (Ghoul Dle) — Tokyo Ghoul Daily Game'
                : 'Ghouldle (Ghoul Dle) — Jogo Diário de Tokyo Ghoul'
            }
            className={`relative inline-flex items-center gap-2 px-3 py-1 border text-xs transition-all duration-300 ${
              isTg
                ? 'bg-[#1c070b] border-[#dc2626] text-[#efe9dd] shadow-[3px_3px_0_#991b1b] -translate-y-[1px]'
                : 'bg-[#0d0c10] border-[#efe9dd]/18 text-[#8d857b] hover:text-[#efe9dd] hover:border-[#dc2626]/70'
            }`}
          >
            <span
              className={`w-2 h-2 transition-transform duration-300 ${
                isTg ? 'bg-[#dc2626] scale-125 shadow-[0_0_8px_#dc2626]' : 'bg-[#dc2626]/70'
              }`}
            />
            <span className="font-serif text-[10px] opacity-80 hidden sm:inline">
              東京喰種
            </span>
            <span className="font-display uppercase tracking-[0.1em] font-bold">
              GHOULDLE
            </span>
            <span className="hidden lg:inline font-mono text-[9px] text-[#8d857b]">
              /ghouldle
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
          </a>

          <a
            href="/choujinxdle"
            onClick={(e) => {
              e.preventDefault();
              onSelectUniverse('cx');
            }}
            title={
              isEn
                ? 'ChoujinXdle (Choujin X Dle) — Choujin X Daily Game'
                : 'ChoujinXdle (Choujin X Dle) — Jogo Diário de Choujin X'
            }
            className={`relative inline-flex items-center gap-2 px-3 py-1 text-xs transition-all duration-300 ${
              isCx
                ? 'bg-[#FFE600] text-[#0a0a0c] border-2 border-[#0a0a0c] shadow-[3px_3px_0_#FF0055] -skew-x-3 -translate-y-[1px] font-black'
                : 'bg-[#0d0c10] border border-[#efe9dd]/18 text-[#8d857b] hover:text-[#FFE600] hover:border-[#FFE600]/80'
            }`}
          >
            <span
              className={`w-2 h-2 transition-transform duration-300 ${
                isCx ? 'bg-[#FF0055] rotate-45 scale-125' : 'bg-[#A3FF00]'
              }`}
            />
            <span className="font-serif text-[10px] opacity-90 hidden sm:inline font-bold">
              超人X
            </span>
            <span className="font-display uppercase tracking-[0.1em] font-bold">
              CHOUJINXDLE
            </span>
            <span
              className={`hidden lg:inline font-mono text-[9px] ${
                isCx ? 'text-[#0a0a0c]/80 font-bold' : 'text-[#8d857b]'
              }`}
            >
              /choujinxdle
            </span>
            <span
              className={`font-mono text-[9px] px-1 py-0.2 border font-bold ${
                cxCompletedCount === 3
                  ? 'bg-[#A3FF00] border-[#0a0a0c] text-[#0a0a0c]'
                  : isCx
                  ? 'bg-[#0a0a0c] border-[#0a0a0c] text-[#FFE600]'
                  : 'bg-black/40 border-[#efe9dd]/15 text-[#cfc6b6]'
              }`}
            >
              {cxCompletedCount}/3
            </span>
          </a>

          {/* Language Selector (PT / EN) */}
          {onChangeLang && (
            <div
              role="group"
              aria-label={isEn ? 'Select Language' : 'Selecionar Idioma'}
              className={`inline-flex items-center border p-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                isCx
                  ? 'bg-[#16161a] border-2 border-[#FFE600] -skew-x-3 shadow-[2px_2px_0_#FF0055]'
                  : 'bg-[#0d0c10] border-[#efe9dd]/25'
              }`}
            >
              <button
                type="button"
                onClick={() => onChangeLang('pt')}
                title="Português (PT-BR)"
                className={`px-2 py-0.5 transition-colors ${
                  lang === 'pt'
                    ? isCx
                      ? 'bg-[#FFE600] text-[#0a0a0c] font-black'
                      : 'bg-[#dc2626] text-[#efe9dd]'
                    : 'text-[#8d857b] hover:text-[#efe9dd]'
                }`}
              >
                PT
              </button>
              <button
                type="button"
                onClick={() => onChangeLang('en')}
                title="English (EN)"
                className={`px-2 py-0.5 transition-colors ${
                  lang === 'en'
                    ? isCx
                      ? 'bg-[#00F0FF] text-[#0a0a0c] font-black'
                      : 'bg-[#dc2626] text-[#efe9dd]'
                    : 'text-[#8d857b] hover:text-[#efe9dd]'
                }`}
              >
                EN
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
