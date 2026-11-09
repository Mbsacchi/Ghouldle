import React from 'react';

/**
 * Custom illustrated CHOUJINXDLE emblem in Sui Ishida's Pop-Art / Punk Zine
 * aesthetic (Sulfur Yellow #eaff00, Hot Magenta #ff1e56, Cyan #00e5ff & Sumi Ink #0b0b0e).
 */
export function ChoujindleCrestLogo({ compact = false, lightBg = false, className = '' }) {
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2.5 select-none group ${className}`}>
        <div className="relative w-9 h-9 bg-[#eaff00] border-2 border-[#0b0b0e] flex items-center justify-center shadow-[3px_3px_0_#ff1e56] group-hover:bg-[#ff1e56] transition-colors">
          <svg viewBox="0 0 44 44" className="w-7 h-7">
            <path d="M7 7 L37 37 M37 7 L7 37" stroke="#0b0b0e" strokeWidth="5.5" strokeLinecap="square" />
            <circle cx="22" cy="22" r="6" fill="#00e5ff" stroke="#0b0b0e" strokeWidth="2.2" />
            <circle cx="22" cy="22" r="2.2" fill="#0b0b0e" />
          </svg>
        </div>
        <div className="leading-none text-left">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-display text-2xl font-bold tracking-[0.06em] uppercase ${
                lightBg ? 'text-[#0b0b0e]' : 'text-[#efe9dd]'
              }`}
            >
              CHOUJINX<span className="text-[#ff1e56]">DLE</span>
            </span>
            <span className="text-[10px] font-mono font-bold bg-[#eaff00] text-[#0b0b0e] border border-[#0b0b0e] px-1 py-0.5 leading-none">
              超人X
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      <div className="relative px-5 py-2 bg-[#eaff00] border-[3px] border-[#0b0b0e] shadow-[6px_6px_0_#ff1e56] -rotate-[1deg]">
        <div className="relative flex items-center gap-3">
          <span className="writing-vertical text-[11px] leading-none font-serif font-extrabold tracking-widest text-[#0b0b0e] border-r-2 border-[#0b0b0e] pr-2 py-0.5">
            超人X
          </span>

          <h1 className="relative font-display text-4xl sm:text-5xl font-bold tracking-[0.08em] leading-none uppercase text-[#0b0b0e]">
            CHOUJINX
            <span className="text-[#ff1e56] drop-shadow-[2px_2px_0_#0b0b0e]">DLE</span>
          </h1>

          <div className="w-7 h-7 border-2 border-[#0b0b0e] bg-[#00e5ff] flex items-center justify-center text-xs font-mono font-extrabold text-[#0b0b0e] leading-none rotate-6">
            X
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Tankobon Volume Cover Illustration inspired by Sui Ishida's Choujin X covers:
 * Stark Pop-Art Sulfur Yellow & Magenta blocks, halftone dots, raw black ink
 * brushwork of Tokio's Vulture Beast & Zora's All-Seeing X.
 */
export function ChoujinTankobonCover({ editionNumber = 1, className = '' }) {
  return (
    <div
      className={`relative overflow-hidden bg-[#f4f0e6] border-[3px] border-[#0b0b0e] shadow-[8px_8px_0_#0b0b0e] select-none ${className}`}
    >
      <svg viewBox="0 0 420 520" className="w-full h-full object-cover" aria-hidden="true">
        {/* Raw Gallery Paper Base */}
        <rect width="420" height="520" fill="#f4f0e6" />

        {/* Bold Pop-Art Diagonal Color Blocks (Sulfur Yellow & Hot Magenta & Cyan) */}
        <polygon points="0,0 420,0 420,310 0,190" fill="#eaff00" />
        <circle cx="295" cy="185" r="118" fill="#ff1e56" />
        <polygon points="0,360 420,250 420,520 0,520" fill="#0b0b0e" />
        <rect x="24" y="28" width="112" height="28" fill="#00e5ff" stroke="#0b0b0e" strokeWidth="2.5" />

        {/* Pop-Art Halftone Dots Pattern over Circle */}
        <g fill="#0b0b0e" opacity="0.18">
          {[120, 145, 170, 195, 220, 245].map((y) =>
            [210, 235, 260, 285, 310, 335, 360].map((x) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" />
            ))
          )}
        </g>

        {/* Giant Anarchy 'X' Brushstroke Behind Figure */}
        <g stroke="#0b0b0e" strokeWidth="26" strokeLinecap="square">
          <line x1="65" y1="68" x2="355" y2="365" />
          <line x1="355" y1="68" x2="65" y2="365" />
        </g>
        <g stroke="#f4f0e6" strokeWidth="4" opacity="0.9">
          <line x1="75" y1="78" x2="345" y2="355" />
        </g>

        {/* Central Painterly Ink Figure: Tokio Kurohara Vulture Beast Transformation */}
        <g>
          {/* Dark Feathered Shoulders & Cloak */}
          <path
            d="M45 520 L82 285 L210 245 L338 285 L375 520 Z"
            fill="#0b0b0e"
            stroke="#f4f0e6"
            strokeWidth="3"
          />
          {/* Jagged White Feather Strokes */}
          <path
            d="M88 335 L135 290 L152 340 L210 280 L268 340 L285 290 L332 335"
            fill="none"
            stroke="#eaff00"
            strokeWidth="3.5"
          />

          {/* Vulture Beast Skull & Long CurvedHarpe Beak */}
          <polygon
            points="132,125 288,125 312,225 210,368 108,225"
            fill="#f4f0e6"
            stroke="#0b0b0e"
            strokeWidth="5"
          />
          {/* Inner Beak Ridge */}
          <polygon
            points="210,168 258,255 210,368 162,255"
            fill="#0b0b0e"
            stroke="#0b0b0e"
            strokeWidth="2"
          />
          <line x1="210" y1="168" x2="210" y2="358" stroke="#eaff00" strokeWidth="3" />

          {/* Intense Asymmetric Choujin Eyes (Left Cyan, Right Hot Magenta/Yellow) */}
          <ellipse cx="158" cy="192" rx="26" ry="14" fill="#0b0b0e" />
          <circle cx="158" cy="192" r="9" fill="#eaff00" />
          <circle cx="158" cy="192" r="3.5" fill="#0b0b0e" />

          <ellipse cx="262" cy="192" rx="26" ry="14" fill="#0b0b0e" />
          <circle cx="262" cy="192" r="9" fill="#00e5ff" />
          <circle cx="262" cy="192" r="3.5" fill="#0b0b0e" />

          {/* Batista Noh Stitches & XEMBE Syringe Details */}
          <g stroke="#ff1e56" strokeWidth="3.5">
            <line x1="138" y1="168" x2="148" y2="215" />
            <line x1="282" y1="168" x2="272" y2="215" />
          </g>
        </g>

        {/* Top Left Issue Tag */}
        <text
          x="34"
          y="47"
          fill="#0b0b0e"
          fontFamily="IBM Plex Mono, monospace"
          fontWeight="700"
          fontSize="13"
          letterSpacing="2"
        >
          VOL. #{String(editionNumber).padStart(2, '0')}
        </text>

        {/* Top Right Vertical Japanese Tankobon Title */}
        <g transform="translate(366, 24)">
          <rect x="0" y="0" width="34" height="132" fill="#0b0b0e" />
          <text
            x="17"
            y="28"
            fill="#eaff00"
            fontFamily="Shippori Mincho, serif"
            fontWeight="800"
            fontSize="20"
            textAnchor="middle"
          >
            超
          </text>
          <text
            x="17"
            y="56"
            fill="#eaff00"
            fontFamily="Shippori Mincho, serif"
            fontWeight="800"
            fontSize="20"
            textAnchor="middle"
          >
            人
          </text>
          <text
            x="17"
            y="88"
            fill="#ff1e56"
            fontFamily="Oswald, sans-serif"
            fontWeight="800"
            fontSize="24"
            textAnchor="middle"
          >
            X
          </text>
          <text
            x="17"
            y="115"
            fill="#f4f0e6"
            fontFamily="IBM Plex Mono, monospace"
            fontWeight="700"
            fontSize="9"
            textAnchor="middle"
          >
            1998
          </text>
        </g>

        {/* Bottom Magazine Obi Strip */}
        <rect x="18" y="425" width="384" height="76" fill="#f4f0e6" stroke="#0b0b0e" strokeWidth="3.5" />
        <rect x="18" y="425" width="14" height="76" fill="#ff1e56" />
        <text
          x="44"
          y="456"
          fill="#0b0b0e"
          fontFamily="Oswald, sans-serif"
          fontWeight="700"
          fontSize="24"
          letterSpacing="2"
        >
          YAMATO PREFECTURE // 1998
        </text>
        <text
          x="44"
          y="482"
          fill="#0b0b0e"
          fontFamily="IBM Plex Mono, monospace"
          fontWeight="600"
          fontSize="11"
          letterSpacing="1.5"
        >
          RAISE · CHAOS · XEMBE · SUI ISHIDA STUDIO
        </text>

        {/* Fake Magazine Barcode on Bottom Right */}
        <g transform="translate(318, 438)" fill="#0b0b0e">
          {[0, 5, 8, 14, 18, 24, 27, 33, 38, 42, 48, 52, 58, 62].map((x, i) => (
            <rect key={x} x={x} y="0" width={i % 3 === 0 ? '3' : '1.5'} height="36" />
          ))}
          <text x="0" y="48" fontFamily="IBM Plex Mono, monospace" fontSize="8" fontWeight="700">
            978-4-08-892
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Bottom corner Choujin X linework
 */
export function ChoujinBeastPlumes({ flip = false, className = '' }) {
  return (
    <svg
      viewBox="0 0 280 220"
      className={`pointer-events-none select-none ${flip ? '-scale-x-100' : ''} ${className}`}
      aria-hidden="true"
    >
      <g fill="none" stroke="#0b0b0e" strokeWidth="2.8" strokeLinecap="round">
        <path d="M52 220 Q64 155 86 92" />
        <path d="M128 220 Q138 168 162 118" />
      </g>
      <g transform="translate(86, 92)">
        <circle cx="0" cy="0" r="16" fill="#ff1e56" stroke="#0b0b0e" strokeWidth="2.5" />
        <path d="M-8 -8 L8 8 M8 -8 L-8 8" stroke="#eaff00" strokeWidth="2.5" />
      </g>
      <g transform="translate(162, 118) scale(0.8)">
        <circle cx="0" cy="0" r="14" fill="#00e5ff" stroke="#0b0b0e" strokeWidth="2.5" />
        <path d="M-7 -7 L7 7 M7 -7 L-7 7" stroke="#0b0b0e" strokeWidth="2.5" />
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
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <rect x="5" y="5" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <line x1="9" y1="9" x2="31" y2="31" stroke="currentColor" strokeWidth="3" />
          <line x1="31" y1="9" x2="9" y2="31" stroke="currentColor" strokeWidth="3" />
          <circle cx="20" cy="20" r="4.5" fill="#ff1e56" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );

    case 'quote':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <path d="M6 8 H34 V26 H18 L10 34 V26 H6 Z" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <path d="M14 15 L18 20 M18 15 L14 20 M24 15 L28 20 M28 15 L24 20" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      );

    case 'mask':
    default:
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <polygon points="20,4 35,16 20,36 5,16" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <circle cx="14.5" cy="16" r="2.8" fill="currentColor" />
          <circle cx="25.5" cy="16" r="2.8" fill="currentColor" />
          <line x1="20" y1="16" x2="20" y2="35" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
  }
}

/**
 * High-contrast Pop-Art Manga Cutouts for Choujin X characters
 */
export function ChoujinPanelIllustration({ panelId }) {
  switch (panelId) {
    case 'tokio':
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover">
          <rect width="320" height="220" fill="#eaff00" />
          <circle cx="160" cy="110" r="88" fill="#ff1e56" stroke="#0b0b0e" strokeWidth="3" />
          <path d="M35 220 L82 48 L160 18 L238 48 L285 220 Z" fill="#0b0b0e" />
          <polygon points="110,48 210,48 228,118 160,205 92,118" fill="#f4f0e6" stroke="#0b0b0e" strokeWidth="3.5" />
          <polygon points="160,78 192,138 160,205 128,138" fill="#0b0b0e" />
          <circle cx="128" cy="96" r="7" fill="#eaff00" />
          <circle cx="192" cy="96" r="7" fill="#00e5ff" />
        </svg>
      );

    case 'azuma':
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover">
          <rect width="320" height="220" fill="#00e5ff" />
          <polygon points="0,0 320,60 320,220 0,220" fill="#f4f0e6" />
          <path d="M55 220 L95 22 L225 22 L265 220 Z" fill="#ffffff" stroke="#0b0b0e" strokeWidth="3.5" />
          <rect x="98" y="72" width="124" height="44" fill="#0b0b0e" />
          <circle cx="132" cy="94" r="8" fill="#00e5ff" />
          <circle cx="188" cy="94" r="8" fill="#eaff00" />
          <rect x="96" y="136" width="128" height="36" fill="#0b0b0e" />
          {[116, 138, 160, 182, 204].map((x) => (
            <line key={x} x1={x} y1="136" x2={x} y2="172" stroke="#eaff00" strokeWidth="3" />
          ))}
        </svg>
      );

    case 'batista':
    default:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover">
          <rect width="320" height="220" fill="#ff1e56" />
          <ellipse cx="160" cy="112" rx="68" ry="82" fill="#f4f0e6" stroke="#0b0b0e" strokeWidth="3.5" />
          <ellipse cx="132" cy="98" rx="18" ry="6" fill="#0b0b0e" />
          <circle cx="132" cy="98" r="3.5" fill="#eaff00" />
          <ellipse cx="188" cy="98" rx="18" ry="6" fill="#0b0b0e" />
          <circle cx="188" cy="98" r="3.5" fill="#00e5ff" />
          <g stroke="#0b0b0e" strokeWidth="2.5">
            <line x1="122" y1="86" x2="122" y2="110" />
            <line x1="142" y1="86" x2="142" y2="110" />
            <line x1="178" y1="86" x2="178" y2="110" />
            <line x1="198" y1="86" x2="198" y2="110" />
          </g>
          <path d="M134 152 Q160 168 186 152" stroke="#0b0b0e" strokeWidth="4.5" fill="none" />
        </svg>
      );
  }
}
