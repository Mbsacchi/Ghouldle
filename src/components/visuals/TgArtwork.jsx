import React from 'react';

/**
 * Custom illustrated GHOULDLE emblem combining Kakugan, Centipede segments,
 * Higanbana filaments, Japanese Hanko seal (東京喰種) and katana-sliced wordmark.
 */
export function GhouldleCrestLogo({ compact = false, className = '' }) {
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2.5 select-none group ${className}`}>
        <div className="relative w-9 h-9 bg-[#0b0a0d] border border-[#efe9dd]/30 flex items-center justify-center shadow-[2px_2px_0_#b80f17] group-hover:border-[#d9141e] transition-colors">
          <svg viewBox="0 0 44 44" className="w-7 h-7">
            <path d="M4 22 Q22 7 40 22 Q22 37 4 22 Z" fill="#060507" stroke="#efe9dd" strokeWidth="1.4" />
            <path d="M12 14 L7 8 M32 14 L37 9 M31 30 L37 35" stroke="#b80f17" strokeWidth="1.2" />
            <circle cx="22" cy="22" r="6.8" fill="#d9141e" />
            <circle cx="22" cy="22" r="3" fill="#2b0305" />
            <circle cx="19.6" cy="19.8" r="1.6" fill="#efe9dd" />
            <line x1="3" y1="34" x2="41" y2="10" stroke="#b80f17" strokeWidth="1.1" opacity="0.7" />
          </svg>
        </div>
        <div className="leading-none text-left">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-bold tracking-[0.08em] text-[#efe9dd] uppercase">
              GHOUL<span className="text-[#d9141e]">DLE</span>
            </span>
            <span className="text-[10px] font-serif text-[#b80f17] border border-[#b80f17]/60 px-1 py-0.5 leading-none">
              東京喰種
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Top Symbolic Crest: Higanbana Stamens + Cracked Kakugan + Centipede Arc */}
      <div className="relative mb-1">
        <svg
          viewBox="0 0 260 76"
          className="w-56 sm:w-64 h-auto overflow-visible"
          aria-hidden="true"
        >
          {/* Sweeping Higanbana (Red Spider Lily) curved filaments */}
          <g fill="none" stroke="#b80f17" strokeWidth="1.35" strokeLinecap="round">
            <path d="M130 52 C102 48, 72 28, 46 8" />
            <path d="M130 52 C98 56, 62 46, 28 32" />
            <path d="M130 52 C108 36, 92 18, 84 4" />
            <path d="M130 52 C158 48, 188 28, 214 8" />
            <path d="M130 52 C162 56, 198 46, 232 32" />
            <path d="M130 52 C152 36, 168 18, 176 4" />
          </g>
          {/* Tiny anther tips on Higanbana filaments */}
          {[
            [46, 8],
            [28, 32],
            [84, 4],
            [214, 8],
            [232, 32],
            [176, 4],
          ].map(([cx, cy], idx) => (
            <ellipse
              key={idx}
              cx={cx}
              cy={cy}
              rx="2.6"
              ry="1.4"
              fill="#efe9dd"
              transform={`rotate(${idx < 3 ? -28 : 28} ${cx} ${cy})`}
            />
          ))}

          {/* Centipede chitinous spine flanking the eye */}
          <g stroke="#cfc6b6" strokeWidth="1.1" opacity="0.55">
            <path d="M68 54 L192 54" stroke="#8d857b" strokeDasharray="4 4" />
            {[78, 90, 102, 158, 170, 182].map((x, i) => (
              <path key={i} d={`M${x} 49 L${x - 4} 42 M${x} 59 L${x + 4} 66`} />
            ))}
          </g>

          {/* Center Kakugan Diamond Plate */}
          <polygon
            points="130,14 168,42 130,70 92,42"
            fill="#09080b"
            stroke="#efe9dd"
            strokeWidth="1.6"
          />
          <polygon
            points="130,19 162,42 130,65 98,42"
            fill="none"
            stroke="#b80f17"
            strokeWidth="1"
          />

          {/* Sclera & Blazing Crimson Iris */}
          <path
            d="M104 42 Q130 24 156 42 Q130 60 104 42 Z"
            fill="#050506"
            stroke="#efe9dd"
            strokeWidth="1.4"
          />
          {/* Kakugan RC Veins */}
          <path
            d="M106 44 L96 50 M154 44 L164 50 M114 33 L107 25 M146 33 L153 25"
            stroke="#d9141e"
            strokeWidth="1.3"
          />
          <circle cx="130" cy="42" r="9.5" fill="#d9141e" />
          <circle cx="130" cy="42" r="5.5" fill="#7d090f" />
          <circle cx="130" cy="42" r="2.6" fill="#09080b" />
          <circle cx="126.5" cy="38.5" r="2.1" fill="#efe9dd" />
        </svg>
      </div>

      {/* Sliced Wordmark Banner */}
      <div className="relative px-5 py-1.5 bg-[#0b0a0d] border-y-2 border-x border-[#efe9dd] shadow-[5px_5px_0_#b80f17]">
        {/* Corner Registration Ticks */}
        <span className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[#d9141e]" />
        <span className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-[#efe9dd]" />

        <div className="relative flex items-center gap-2.5">
          {/* Left Vertical Kanji Stamp */}
          <span className="writing-vertical text-[10px] leading-none font-serif tracking-widest text-[#cfc6b6] border-r border-[#efe9dd]/25 pr-1.5 py-0.5">
            東京喰種
          </span>

          <h1 className="relative font-display text-4xl sm:text-5xl md:text-[3.35rem] font-bold tracking-[0.1em] leading-none uppercase text-[#efe9dd]">
            GHOUL
            <span className="text-[#d9141e] drop-shadow-[2px_2px_0_#000]">DLE</span>
            {/* Diagonal Razor Slash Line across Wordmark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[-4%] right-[-4%] top-[52%] h-[2px] bg-[#d9141e] -rotate-[4deg] opacity-85"
            />
          </h1>

          {/* Right Red Hanko Seal */}
          <div
            className="w-6 h-6 border border-[#d9141e] bg-[#b80f17]/20 flex items-center justify-center text-[11px] font-serif font-bold text-[#d9141e] leading-none"
            title="Higeki — Tragédia"
          >
            喰
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Blooming Red Spider Lily (Higanbana / Lycoris radiata) botanical linework
 */
export function HiganbanaCluster({ flip = false, className = '' }) {
  return (
    <svg
      viewBox="0 0 280 220"
      className={`pointer-events-none select-none ${flip ? '-scale-x-100' : ''} ${className}`}
      aria-hidden="true"
    >
      {/* Tall thin stems */}
      <g fill="none" stroke="#3f1014" strokeWidth="2.4" strokeLinecap="round">
        <path d="M58 220 Q66 155 82 96" />
        <path d="M132 220 Q138 168 158 124" />
        <path d="M24 220 Q30 180 38 142" />
      </g>

      {/* Main Blossom 1 (x=82, y=96) */}
      <g transform="translate(82, 96)">
        {/* Long dramatic curved stamens */}
        {[
          'M0 0 C-22 -34, -56 -48, -74 -28',
          'M0 0 C-18 -46, -42 -68, -62 -64',
          'M0 0 C-4 -52, -12 -78, -24 -86',
          'M0 0 C14 -50, 32 -76, 52 -74',
          'M0 0 C26 -38, 62 -46, 82 -24',
          'M0 0 C28 -18, 64 -16, 78 6',
          'M0 0 C-28 -16, -62 -12, -76 12',
        ].map((d, idx) => (
          <path
            key={idx}
            d={d}
            fill="none"
            stroke="#d9141e"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        ))}
        {/* Recurved wavy spider petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <path
            key={deg}
            d="M0 0 Q12 -18 28 -12 Q16 -2 0 0 Z"
            fill="#b80f17"
            stroke="#ef4444"
            strokeWidth="0.5"
            transform={`rotate(${deg})`}
          />
        ))}
        {/* Anther dots */}
        {[
          [-74, -28],
          [-62, -64],
          [-24, -86],
          [52, -74],
          [82, -24],
          [78, 6],
          [-76, 12],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.8" fill="#efe9dd" />
        ))}
        <circle cx="0" cy="0" r="3.5" fill="#efe9dd" />
      </g>

      {/* Secondary Blossom 2 (x=158, y=124) */}
      <g transform="translate(158, 124) scale(0.78)">
        {[
          'M0 0 C-20 -36, -48 -52, -66 -38',
          'M0 0 C-6 -48, -14 -72, -26 -80',
          'M0 0 C16 -46, 38 -68, 58 -62',
          'M0 0 C28 -28, 60 -32, 76 -12',
          'M0 0 C-24 -12, -52 -8, -64 14',
        ].map((d, idx) => (
          <path key={idx} d={d} fill="none" stroke="#b80f17" strokeWidth="1.5" />
        ))}
        {[20, 80, 140, 200, 260, 320].map((deg) => (
          <path
            key={deg}
            d="M0 0 Q11 -16 25 -10 Q14 -1 0 0 Z"
            fill="#8f0a11"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="3" fill="#cfc6b6" />
      </g>

      {/* Third Lower Bud/Blossom (x=38, y=142) */}
      <g transform="translate(38, 142) scale(0.62)">
        {[
          'M0 0 C-22 -34, -48 -46, -64 -28',
          'M0 0 C6 -46, 22 -68, 42 -66',
          'M0 0 C24 -26, 54 -26, 68 -6',
        ].map((d, idx) => (
          <path key={idx} d={d} fill="none" stroke="#b80f17" strokeWidth="1.6" />
        ))}
        {[0, 72, 144, 216, 288].map((deg) => (
          <path
            key={deg}
            d="M0 0 Q10 -15 24 -9 Q13 -1 0 0 Z"
            fill="#9e0c14"
            transform={`rotate(${deg})`}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Custom Mode Emblems (No generic Lucide icons!)
 */
export function ModeEmblem({ modeId, className = 'w-8 h-8' }) {
  switch (modeId) {
    case 'classic':
      // CCG Dossier Crest: Winged Quinque Sword + 4 Attribute Quadrants
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <polygon
            points="20,3 35,11 35,29 20,37 5,29 5,11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <line x1="20" y1="6" x2="20" y2="34" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="20,9 24,20 20,31 16,20" fill="#d9141e" />
          <circle cx="20" cy="20" r="2.4" fill="#efe9dd" />
        </svg>
      );

    case 'quote':
      // Anteiku Coffee Cup + Tragic Manga Quote Brackets 「 」
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          {/* Japanese Quote Brackets */}
          <path d="M7 15 L7 7 L15 7" fill="none" stroke="#d9141e" strokeWidth="2.2" />
          <path d="M33 25 L33 33 L25 33" fill="none" stroke="#d9141e" strokeWidth="2.2" />
          {/* Anteiku Coffee Cup */}
          <path
            d="M12 19 H26 V24 C26 28 23 30 19 30 C15 30 12 28 12 24 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
          />
          <path d="M26 20.5 H28.5 C30 20.5 30 24.5 28.5 24.5 H26" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <line x1="10" y1="31.5" x2="28" y2="31.5" stroke="currentColor" strokeWidth="1.8" />
          {/* Rising aroma */}
          <path d="M16 15 Q17.5 12 16 9 M21 15 Q22.5 12 21 9" fill="none" stroke="#d9141e" strokeWidth="1.5" />
        </svg>
      );

    case 'mask':
    default:
      // Kaneki Zipper Grin + Blazing Kakugan
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          {/* Kakugan Upper Half */}
          <path
            d="M6 16 Q20 6 34 16 Q20 24 6 16 Z"
            fill="#080709"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="20" cy="15.5" r="4.8" fill="#d9141e" />
          <circle cx="20" cy="15.5" r="1.9" fill="#080709" />
          <circle cx="18.5" cy="14" r="1.1" fill="#efe9dd" />
          {/* Stitched Zipper Grin Lower Half */}
          <rect
            x="9"
            y="25"
            width="22"
            height="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <line x1="9" y1="29" x2="31" y2="29" stroke="#d9141e" strokeWidth="1.5" />
          {[13.5, 18, 22, 26.5].map((x) => (
            <line key={x} x1={x} y1="25" x2={x} y2="33" stroke="currentColor" strokeWidth="1.4" />
          ))}
        </svg>
      );
  }
}
