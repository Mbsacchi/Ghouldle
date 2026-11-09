import React from 'react';

/**
 * Custom illustrated CHOUJINDLE emblem combining XEMBE Syringe Cross,
 * Vulture Beast feathers, Zora's All-Seeing Palm Eye, Japanese Hanko (超人X)
 * and electric acid-lime / gold sliced wordmark.
 */
export function ChoujindleCrestLogo({ compact = false, className = '' }) {
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2.5 select-none group ${className}`}>
        <div className="relative w-9 h-9 bg-[#0a0c08] border border-[#efe9dd]/30 flex items-center justify-center shadow-[2px_2px_0_#65a30d] group-hover:border-[#a3e635] transition-colors">
          <svg viewBox="0 0 44 44" className="w-7 h-7">
            <line x1="8" y1="8" x2="36" y2="36" stroke="#a3e635" strokeWidth="2.8" />
            <line x1="36" y1="8" x2="8" y2="36" stroke="#a3e635" strokeWidth="2.8" />
            <polygon points="22,6 35,22 22,38 9,22" fill="#090b08" stroke="#efe9dd" strokeWidth="1.4" />
            <circle cx="22" cy="22" r="5.5" fill="#a3e635" />
            <circle cx="22" cy="22" r="2.2" fill="#090b08" />
          </svg>
        </div>
        <div className="leading-none text-left">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-bold tracking-[0.08em] text-[#efe9dd] uppercase">
              CHOUJIN<span className="text-[#a3e635]">DLE</span>
            </span>
            <span className="text-[10px] font-serif text-[#a3e635] border border-[#a3e635]/60 px-1 py-0.5 leading-none">
              超人X
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Top Symbolic Crest: Vulture Wings + Crossed XEMBE Syringes + Zora's Eye of the Beast */}
      <div className="relative mb-1">
        <svg
          viewBox="0 0 260 76"
          className="w-56 sm:w-64 h-auto overflow-visible"
          aria-hidden="true"
        >
          {/* Vulture Beast Feather Plumes Sweeping Outward */}
          <g fill="none" stroke="#84cc16" strokeWidth="1.5" strokeLinecap="round">
            <path d="M130 50 C98 44, 64 24, 34 8" />
            <path d="M130 50 C92 54, 56 44, 20 30" />
            <path d="M130 50 C104 34, 86 18, 74 4" />
            <path d="M130 50 C162 44, 196 24, 226 8" />
            <path d="M130 50 C168 54, 204 44, 240 30" />
            <path d="M130 50 C156 34, 174 18, 186 4" />
          </g>

          {/* Crossed XEMBE Syringe Axis Behind Diamond */}
          <g stroke="#facc15" strokeWidth="1.6" opacity="0.8">
            <line x1="78" y1="14" x2="182" y2="68" />
            <line x1="182" y1="14" x2="78" y2="68" />
            <rect x="70" y="9" width="10" height="6" transform="rotate(28 75 12)" fill="#facc15" />
            <rect x="180" y="9" width="10" height="6" transform="rotate(-28 185 12)" fill="#facc15" />
          </g>

          {/* Center Beast Diamond Plate */}
          <polygon
            points="130,12 168,42 130,70 92,42"
            fill="#090b08"
            stroke="#efe9dd"
            strokeWidth="1.6"
          />
          <polygon
            points="130,18 161,42 130,64 99,42"
            fill="none"
            stroke="#a3e635"
            strokeWidth="1.1"
          />

          {/* Zora / Beast Eye */}
          <path
            d="M104 42 Q130 24 156 42 Q130 60 104 42 Z"
            fill="#050604"
            stroke="#efe9dd"
            strokeWidth="1.4"
          />
          <circle cx="130" cy="42" r="9.5" fill="#a3e635" />
          <circle cx="130" cy="42" r="5.5" fill="#3f6212" />
          <ellipse cx="130" cy="42" rx="1.8" ry="6.5" fill="#090b08" />
          <circle cx="126.5" cy="38.5" r="2" fill="#efe9dd" />
        </svg>
      </div>

      {/* Sliced Wordmark Banner */}
      <div className="relative px-5 py-1.5 bg-[#0a0c08] border-y-2 border-x border-[#efe9dd] shadow-[5px_5px_0_#65a30d]">
        {/* Corner Registration Ticks */}
        <span className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[#a3e635]" />
        <span className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-[#facc15]" />

        <div className="relative flex items-center gap-2.5">
          {/* Left Vertical Kanji Stamp */}
          <span className="writing-vertical text-[10px] leading-none font-serif tracking-widest text-[#cfc6b6] border-r border-[#efe9dd]/25 pr-1.5 py-0.5">
            超人X
          </span>

          <h1 className="relative font-display text-4xl sm:text-5xl md:text-[3.2rem] font-bold tracking-[0.09em] leading-none uppercase text-[#efe9dd]">
            CHOUJIN
            <span className="text-[#a3e635] drop-shadow-[2px_2px_0_#000]">DLE</span>
            {/* Diagonal Harpe Slash Line across Wordmark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[-3%] right-[-3%] top-[53%] h-[2px] bg-[#a3e635] -rotate-[3.5deg] opacity-85"
            />
          </h1>

          {/* Right X Seal */}
          <div
            className="w-6 h-6 border border-[#a3e635] bg-[#65a30d]/20 flex items-center justify-center text-[11px] font-serif font-bold text-[#a3e635] leading-none"
            title="Choujin X — Despertar"
          >
            超
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Bottom corner Choujin X linework: Opium Poppies, Vulture Feathers & Smoke
 */
export function ChoujinBeastPlumes({ flip = false, className = '' }) {
  return (
    <svg
      viewBox="0 0 280 220"
      className={`pointer-events-none select-none ${flip ? '-scale-x-100' : ''} ${className}`}
      aria-hidden="true"
    >
      {/* Tall stems & feather quills */}
      <g fill="none" stroke="#2d3b1e" strokeWidth="2.4" strokeLinecap="round">
        <path d="M52 220 Q64 155 86 92" />
        <path d="M128 220 Q138 168 162 118" />
        <path d="M24 220 Q34 176 46 136" />
      </g>

      {/* Vulture Feather & Opium Pod 1 */}
      <g transform="translate(86, 92)">
        {[
          'M0 0 C-24 -32, -58 -44, -76 -22',
          'M0 0 C-14 -48, -36 -70, -56 -64',
          'M0 0 C12 -52, 34 -76, 56 -70',
          'M0 0 C28 -36, 64 -42, 82 -18',
        ].map((d, idx) => (
          <path key={idx} d={d} fill="none" stroke="#84cc16" strokeWidth="1.4" />
        ))}
        <circle cx="0" cy="0" r="14" fill="#141a0e" stroke="#a3e635" strokeWidth="1.5" />
        <path d="M-7 -7 L7 7 M7 -7 L-7 7" stroke="#facc15" strokeWidth="1.8" />
      </g>

      {/* Secondary Pod 2 */}
      <g transform="translate(162, 118) scale(0.76)">
        {[
          'M0 0 C-20 -36, -48 -50, -64 -34',
          'M0 0 C16 -46, 38 -66, 58 -60',
          'M0 0 C28 -26, 58 -28, 74 -10',
        ].map((d, idx) => (
          <path key={idx} d={d} fill="none" stroke="#65a30d" strokeWidth="1.5" />
        ))}
        <circle cx="0" cy="0" r="12" fill="#141a0e" stroke="#facc15" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

/**
 * Custom Mode Emblems for Choujin X
 */
export function ChoujinModeEmblem({ modeId, className = 'w-8 h-8' }) {
  switch (modeId) {
    case 'classic':
      // Yamato Mori Octagon + XEMBE Cross
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <polygon
            points="20,3 35,11 35,29 20,37 5,29 5,11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <line x1="11" y1="11" x2="29" y2="29" stroke="#a3e635" strokeWidth="2.2" />
          <line x1="29" y1="11" x2="11" y2="29" stroke="#a3e635" strokeWidth="2.2" />
          <circle cx="20" cy="20" r="3" fill="#efe9dd" />
        </svg>
      );

    case 'quote':
      // Manga Speech Brackets + Rising Smoke Flame
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <path d="M7 15 L7 7 L15 7" fill="none" stroke="#a3e635" strokeWidth="2.2" />
          <path d="M33 25 L33 33 L25 33" fill="none" stroke="#a3e635" strokeWidth="2.2" />
          <path
            d="M20 30 C13 30 12 22 17 17 C16 21 20 22 20 12 C25 17 28 23 23 29 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );

    case 'mask':
    default:
      // Vulture Beak & Noh Eye Slit
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <polygon
            points="20,5 33,16 20,35 7,16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="15" cy="16" r="2.5" fill="#a3e635" />
          <circle cx="25" cy="16" r="2.5" fill="#a3e635" />
          <line x1="20" y1="16" x2="20" y2="34" stroke="#a3e635" strokeWidth="1.6" />
        </svg>
      );
  }
}

/**
 * High-contrast Manga Panel SVG Art for the 6 Flanking Panels in ChoujinHub
 */
export function ChoujinPanelIllustration({ panelId }) {
  switch (panelId) {
    case 'tokio':
      // Tokio Kurohara — Vulture Beast Skull & Feathers
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover">
          <rect width="320" height="220" fill="#0b0e09" />
          {/* Speedlines */}
          <g stroke="#a3e635" strokeWidth="1" opacity="0.22">
            {[20, 55, 90, 125, 160, 195, 230, 265, 300].map((x) => (
              <line key={x} x1={x} y1="0" x2="160" y2="220" />
            ))}
          </g>
          {/* Dark Feather Cloak */}
          <path d="M30 220 L80 45 L160 20 L240 45 L290 220 Z" fill="#141812" stroke="#3f3f46" strokeWidth="2" />
          {/* Vulture Beak & Skull */}
          <polygon points="110,48 210,48 228,118 160,205 92,118" fill="#e4e4e7" stroke="#18181b" strokeWidth="3" />
          <polygon points="160,78 192,138 160,205 128,138" fill="#27272a" stroke="#a3e635" strokeWidth="2" />
          {/* Blazing Vulture Eyes */}
          <ellipse cx="128" cy="96" rx="18" ry="10" fill="#09090b" />
          <circle cx="128" cy="96" r="6" fill="#a3e635" />
          <ellipse cx="192" cy="96" rx="18" ry="10" fill="#09090b" />
          <circle cx="192" cy="96" r="6" fill="#a3e635" />
        </svg>
      );

    case 'azuma':
      // Azuma Higashi — White Cloak & Iron Chains
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover">
          <rect width="320" height="220" fill="#0d0e12" />
          <path d="M55 220 L95 22 L225 22 L265 220 Z" fill="#e4e4e7" stroke="#94a3b8" strokeWidth="2.5" />
          <rect x="98" y="72" width="124" height="44" rx="6" fill="#09090b" />
          <circle cx="132" cy="94" r="8" fill="#38bdf8" />
          <circle cx="188" cy="94" r="8" fill="#facc15" />
          <rect x="96" y="136" width="128" height="36" fill="#3f3f46" stroke="#18181b" strokeWidth="3" />
          {[116, 138, 160, 182, 204].map((x) => (
            <line key={x} x1={x} y1="136" x2={x} y2="172" stroke="#facc15" strokeWidth="2.5" />
          ))}
        </svg>
      );

    case 'ely':
      // Ely Otta — Billowing Smoke & Determined Eyes
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover">
          <rect width="320" height="220" fill="#120d09" />
          <circle cx="160" cy="110" r="88" fill="none" stroke="#f97316" strokeWidth="8" strokeDasharray="18 10" opacity="0.45" />
          <ellipse cx="160" cy="115" rx="64" ry="70" fill="#f6e5d7" stroke="#27272a" strokeWidth="2.5" />
          <path d="M90 105 Q95 36 160 34 Q225 36 230 105 Q195 68 160 72 Q125 68 90 105 Z" fill="#3f2e21" />
          <circle cx="135" cy="112" r="9" fill="#f97316" />
          <circle cx="185" cy="112" r="9" fill="#f97316" />
          <circle cx="135" cy="112" r="4" fill="#09090b" />
          <circle cx="185" cy="112" r="4" fill="#09090b" />
        </svg>
      );

    case 'zora':
      // Zora Siruha — Sacred Palms with Eyes & X Mark
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover">
          <rect width="320" height="220" fill="#11090b" />
          <circle cx="160" cy="110" r="85" fill="#1c1917" stroke="#dc2626" strokeWidth="2.5" />
          <path d="M138 42 L182 86 M182 42 L138 86" stroke="#facc15" strokeWidth="5" />
          <ellipse cx="122" cy="126" rx="24" ry="13" fill="#09090b" stroke="#efe9dd" strokeWidth="1.5" />
          <circle cx="122" cy="126" r="7" fill="#dc2626" />
          <ellipse cx="198" cy="126" rx="24" ry="13" fill="#09090b" stroke="#efe9dd" strokeWidth="1.5" />
          <circle cx="198" cy="126" r="7" fill="#dc2626" />
        </svg>
      );

    case 'batista':
      // Batista Hoshi — Noh Mask & Nue Stitches
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover">
          <rect width="320" height="220" fill="#0a0c0e" />
          <ellipse cx="160" cy="112" rx="68" ry="82" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
          <ellipse cx="132" cy="98" rx="18" ry="6" fill="#09090b" />
          <circle cx="132" cy="98" r="3.5" fill="#a3e635" />
          <ellipse cx="188" cy="98" rx="18" ry="6" fill="#09090b" />
          <circle cx="188" cy="98" r="3.5" fill="#ef4444" />
          <g stroke="#18181b" strokeWidth="2">
            <line x1="122" y1="86" x2="122" y2="110" />
            <line x1="142" y1="86" x2="142" y2="110" />
            <line x1="178" y1="86" x2="178" y2="110" />
            <line x1="198" y1="86" x2="198" y2="110" />
          </g>
          <path d="M134 152 Q160 168 186 152" stroke="#991b1b" strokeWidth="4" fill="none" />
        </svg>
      );

    case 'sandek':
    default:
      // Hoshi Sandek — Gravity Distortion Rings
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover">
          <rect width="320" height="220" fill="#0d0914" />
          <circle cx="160" cy="110" r="86" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="10 6" />
          <circle cx="160" cy="110" r="64" fill="none" stroke="#c084fc" strokeWidth="1.5" />
          <rect x="112" y="42" width="96" height="136" rx="18" fill="#ead2c0" stroke="#18181b" strokeWidth="2.5" />
          <path d="M110 38 L210 38 L210 74 L160 62 L110 74 Z" fill="#18181b" />
          <circle cx="138" cy="102" r="7" fill="#a855f7" />
          <circle cx="182" cy="102" r="7" fill="#a855f7" />
        </svg>
      );
  }
}
