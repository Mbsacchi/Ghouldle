import React from 'react';

/**
 * Giant Dry-Brush / Spray-Paint Shattered "X" for Choujin X backgrounds
 */
export function ChoujinSplatterX({ className = '' }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Chaotic Spray-Paint Halos & Splatters */}
      <g fill="#FF0055" opacity="0.28">
        <circle cx="130" cy="115" r="14" />
        <circle cx="158" cy="92" r="6" />
        <circle cx="475" cy="135" r="18" />
        <circle cx="505" cy="108" r="7" />
        <circle cx="118" cy="485" r="16" />
        <circle cx="482" cy="468" r="22" />
        <circle cx="310" cy="295" r="85" />
      </g>

      <g fill="#A3FF00" opacity="0.35">
        <circle cx="220" cy="185" r="9" />
        <circle cx="395" cy="210" r="11" />
        <circle cx="195" cy="410" r="12" />
        <circle cx="415" cy="390" r="8" />
        <circle cx="290" cy="140" r="5" />
        <circle cx="330" cy="455" r="7" />
      </g>

      {/* Offset Magenta Shattered X Shadow */}
      <path
        d="M68 48 L138 34 L312 248 L478 38 L546 72 L362 302 L552 528 L484 566 L304 352 L126 562 L58 518 L248 298 Z"
        fill="#FF0055"
        transform="translate(12, 10)"
      />

      {/* Main Jagged Dry-Brush Acid Yellow X */}
      <path
        d="M68 48 L138 34 L312 248 L478 38 L546 72 L362 302 L552 528 L484 566 L304 352 L126 562 L58 518 L248 298 Z"
        fill="#FFE600"
        stroke="#0a0a0c"
        strokeWidth="8"
        strokeLinejoin="bevel"
      />

      {/* Inner Dry-Brush Scratch Marks & Splinter Shards */}
      <g stroke="#0a0a0c" strokeWidth="5" strokeLinecap="square">
        <line x1="95" y1="72" x2="275" y2="285" />
        <line x1="335" y1="340" x2="510" y2="535" />
        <line x1="505" y1="68" x2="325" y2="280" />
        <line x1="270" y1="340" x2="92" y2="528" />
      </g>

      {/* Flying Ink Shards */}
      <polygon points="30,140 75,125 55,165" fill="#00F0FF" stroke="#0a0a0c" strokeWidth="3" />
      <polygon points="565,210 525,195 545,240" fill="#A3FF00" stroke="#0a0a0c" strokeWidth="3" />
      <polygon points="180,35 215,15 205,58" fill="#FF0055" stroke="#0a0a0c" strokeWidth="3" />
      <polygon points="410,565 445,540 435,585" fill="#00F0FF" stroke="#0a0a0c" strokeWidth="3" />
    </svg>
  );
}

/**
 * Stylized Xember Syringe SVG with radioactive green serum & chaotic smoke
 */
export function XemberSyringeArt({ className = 'w-12 h-12' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {/* Chaotic Smoke Filaments */}
      <path
        d="M18 88 C8 68, 26 42, 16 22 M102 92 C112 72, 94 48, 104 26"
        fill="none"
        stroke="#00F0FF"
        strokeWidth="3"
        strokeDasharray="6 4"
      />
      {/* Syringe Plunger */}
      <line x1="20" y1="20" x2="38" y2="38" stroke="#f4f1ea" strokeWidth="6" />
      <line x1="12" y1="28" x2="28" y2="12" stroke="#FF0055" strokeWidth="6" />
      {/* Syringe Barrel */}
      <g transform="rotate(-45 60 60)">
        <rect
          x="44"
          y="26"
          width="32"
          height="64"
          fill="#0a0a0c"
          stroke="#f4f1ea"
          strokeWidth="4"
        />
        {/* Radioactive Xember Serum Fill */}
        <rect x="48" y="48" width="24" height="38" fill="#A3FF00" />
        {/* Measurement Ticks */}
        {[36, 46, 56, 66, 76].map((y) => (
          <line key={y} x1="46" y1={y} x2="58" y2={y} stroke="#f4f1ea" strokeWidth="2.5" />
        ))}
        {/* Needle Tip */}
        <polygon points="56,90 64,90 60,116" fill="#FFE600" />
      </g>
      {/* Glowing Serum Drop */}
      <circle cx="98" cy="98" r="5" fill="#A3FF00" stroke="#0a0a0c" strokeWidth="2" />
    </svg>
  );
}

/**
 * Shattered Glass SVG Overlay for Tokyo Ghoul side in SuiIshidaLobby
 */
export function ShatteredGlassOverlay({ className = '' }) {
  return (
    <svg
      viewBox="0 0 500 500"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <g fill="none" stroke="#efe9dd" strokeWidth="1.2" opacity="0.22">
        <polygon points="0,0 180,0 120,140 0,90" fill="rgba(220,38,38,0.05)" />
        <polygon points="180,0 390,0 280,165 120,140" />
        <polygon points="390,0 500,0 500,190 280,165" fill="rgba(239,233,221,0.03)" />
        <polygon points="0,90 120,140 85,310 0,260" />
        <polygon points="120,140 280,165 235,345 85,310" fill="rgba(220,38,38,0.07)" />
        <polygon points="280,165 500,190 500,380 360,395 235,345" />
        <polygon points="0,260 85,310 40,500 0,500" />
        <polygon points="85,310 235,345 190,500 40,500" />
        <polygon points="235,345 360,395 340,500 190,500" fill="rgba(239,233,221,0.03)" />
        <line x1="120" y1="140" x2="460" y2="45" stroke="#dc2626" strokeWidth="1.6" opacity="0.55" />
        <line x1="280" y1="165" x2="35" y2="420" stroke="#dc2626" strokeWidth="1.4" opacity="0.45" />
      </g>
    </svg>
  );
}

/**
 * Stamped / Torn Neo-Brutalist CHOUJINXDLE Crest Logo
 */
export function ChoujindleCrestLogo({ compact = false, lightBg = false, className = '' }) {
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2.5 select-none group ${className}`}>
        <div className="relative w-10 h-10 bg-[#FFE600] border-[2.5px] border-[#0a0a0c] flex items-center justify-center shadow-[3px_3px_0_#FF0055] -skew-x-3 group-hover:bg-[#A3FF00] transition-colors">
          <svg viewBox="0 0 44 44" className="w-7 h-7">
            <path
              d="M6 8 L13 5 L38 35 L31 39 Z M38 8 L31 5 L6 35 L13 39 Z"
              fill="#0a0a0c"
            />
            <circle cx="22" cy="22" r="6" fill="#FF0055" stroke="#0a0a0c" strokeWidth="2" />
            <circle cx="22" cy="22" r="2.2" fill="#FFE600" />
          </svg>
        </div>
        <div className="leading-none text-left">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-display text-2xl font-bold tracking-[0.06em] uppercase ${
                lightBg ? 'text-[#0a0a0c]' : 'text-[#f4f1ea]'
              }`}
            >
              CHOUJINX<span className="text-[#FFE600] bg-[#0a0a0c] px-1 ml-0.5 border border-[#FF0055]">DLE</span>
            </span>
            <span className="text-[10px] font-mono font-extrabold bg-[#FF0055] text-[#f4f1ea] border border-[#0a0a0c] px-1.5 py-0.5 leading-none -skew-x-6">
              超人X
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Stamped / Torn Wordmark Plate */}
      <div className="relative px-6 py-2.5 bg-[#FFE600] border-[3px] border-[#0a0a0c] shadow-[6px_6px_0_#FF0055] -skew-x-3 -rotate-1">
        <span className="absolute -top-3 -left-3 px-2 py-0.5 bg-[#A3FF00] text-[#0a0a0c] border-2 border-[#0a0a0c] font-mono text-[9px] font-black uppercase tracking-widest rotate-3">
          XEMBER // RAISE!
        </span>

        <div className="relative flex items-center gap-3">
          <span className="writing-vertical text-xs leading-none font-serif font-black tracking-widest text-[#0a0a0c] border-r-[2.5px] border-[#0a0a0c] pr-2 py-0.5">
            超人X
          </span>

          <h1 className="relative font-display text-4xl sm:text-5xl font-bold tracking-[0.06em] leading-none uppercase text-[#0a0a0c]">
            CHOUJINX
            <span className="text-[#FF0055] drop-shadow-[2px_2px_0_#0a0a0c]">DLE</span>
          </h1>

          <div className="w-8 h-8 border-[2.5px] border-[#0a0a0c] bg-[#00F0FF] flex items-center justify-center text-sm font-mono font-black text-[#0a0a0c] leading-none rotate-6 shadow-[2px_2px_0_#0a0a0c]">
            X
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Street-Art / Zine Tankobon Cover for Choujin X featuring official Sui Ishida character art
 */
export function ChoujinTankobonCover({ editionNumber = 1, className = '' }) {
  return (
    <div
      className={`relative overflow-hidden bg-[#0a0a0c] border-[3px] border-[#f4f1ea] shadow-[7px_7px_0_#FFE600] select-none ${className}`}
    >
      <svg viewBox="0 0 440 540" className="w-full h-full object-cover" aria-hidden="true">
        {/* Pitch Black Base + Manga Off-White Torn Collage Block */}
        <rect width="440" height="540" fill="#0a0a0c" />
        <polygon points="0,0 440,0 440,295 0,215" fill="#f4f1ea" />
        <polygon points="0,215 440,145 440,365 0,415" fill="#FFE600" />
        <polygon points="240,0 440,0 440,185 295,215" fill="#FF0055" />

        {/* Halftone Dots Grid on Top Left */}
        <g fill="#0a0a0c" opacity="0.2">
          {[24, 44, 64, 84, 104, 124, 144, 164].map((y) =>
            [24, 44, 64, 84, 104, 124, 144, 164, 184].map((x) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2.8" />
            ))
          )}
        </g>

        {/* Giant Shattered Dry-Brush "X" in Background */}
        <g transform="translate(30, 35) scale(0.64)" opacity="0.28">
          <path
            d="M68 48 L138 34 L312 248 L478 38 L546 72 L362 302 L552 528 L484 566 L304 352 L126 562 L58 518 L248 298 Z"
            fill="#0a0a0c"
            stroke="#FF0055"
            strokeWidth="10"
          />
        </g>

        {/* Real Choujin X Character Art (Hoshi Sandek by Sui Ishida) */}
        <image
          href="/characters/hoshi-sandek-cover.png"
          x="45"
          y="14"
          width="350"
          height="428"
          preserveAspectRatio="xMidYMax meet"
        />

        {/* Top Left Stamped Badge */}
        <g transform="rotate(-3 75 40)">
          <rect x="18" y="18" width="142" height="34" fill="#0a0a0c" stroke="#FFE600" strokeWidth="2.5" />
          <text
            x="89"
            y="40"
            fill="#FFE600"
            fontFamily="IBM Plex Mono, monospace"
            fontWeight="800"
            fontSize="13"
            textAnchor="middle"
            letterSpacing="2"
          >
            XEMBER // #{String(editionNumber).padStart(2, '0')}
          </text>
        </g>

        {/* Bottom Torn Zine Banner */}
        <g transform="translate(0, 432)">
          <rect x="16" y="0" width="408" height="92" fill="#f4f1ea" stroke="#0a0a0c" strokeWidth="4" />
          <rect x="16" y="0" width="18" height="92" fill="#A3FF00" stroke="#0a0a0c" strokeWidth="2" />
          <text
            x="48"
            y="38"
            fill="#0a0a0c"
            fontFamily="Oswald, sans-serif"
            fontWeight="800"
            fontSize="28"
            letterSpacing="2"
          >
            CHOUJIN X // CAOS &amp; RAISE!
          </text>
          <text
            x="48"
            y="64"
            fill="#FF0055"
            fontFamily="IBM Plex Mono, monospace"
            fontWeight="800"
            fontSize="11"
            letterSpacing="1.5"
          >
            YAMATO MORI · TORRE DO LUTO · NOH MASK · 1998
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Bottom corner Choujin X street-art feathers, Xember syringes & smoke
 */
export function ChoujinBeastPlumes({ flip = false, className = '' }) {
  return (
    <svg
      viewBox="0 0 280 220"
      className={`pointer-events-none select-none ${flip ? '-scale-x-100' : ''} ${className}`}
      aria-hidden="true"
    >
      {/* Jagged Vulture Feather Quills */}
      <path
        d="M15 220 L95 95 L72 135 L135 72 L105 155 L65 220 Z"
        fill="#16161a"
        stroke="#FFE600"
        strokeWidth="2.5"
      />
      <path
        d="M95 220 L175 118 L152 152 L205 102 L172 178 L135 220 Z"
        fill="#0a0a0c"
        stroke="#FF0055"
        strokeWidth="2.5"
      />
      {/* Splatter Dots */}
      <circle cx="95" cy="78" r="8" fill="#A3FF00" />
      <circle cx="145" cy="58" r="5" fill="#00F0FF" />
      <circle cx="195" cy="88" r="10" fill="#FF0055" />
    </svg>
  );
}

/**
 * Custom Mode Emblems for Choujin X (Syringe, Chaotic Smoke, Beast Eye)
 */
export function ChoujinModeEmblem({ modeId, className = 'w-8 h-8' }) {
  switch (modeId) {
    case 'classic':
      // Xember Syringe + Shattered X
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <path d="M6 6 L34 34 M34 6 L6 34" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
          <rect x="13" y="13" width="14" height="14" fill="#A3FF00" stroke="#0a0a0c" strokeWidth="2.2" />
          <circle cx="20" cy="20" r="3" fill="#0a0a0c" />
        </svg>
      );

    case 'quote':
      // Jagged Punk Scream Bubble + Smoke
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <polygon
            points="4,8 36,5 33,26 20,26 11,36 12,25 4,24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
          />
          <line x1="13" y1="15" x2="27" y2="15" stroke="currentColor" strokeWidth="2.6" />
          <line x1="13" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="2.6" />
        </svg>
      );

    case 'mask':
    default:
      // Asymmetric Beast Eye + Vulture Beak
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <polygon points="20,3 36,16 20,37 4,16" fill="none" stroke="currentColor" strokeWidth="2.6" />
          <circle cx="14" cy="16" r="3.5" fill="#A3FF00" stroke="#0a0a0c" strokeWidth="1.2" />
          <circle cx="26" cy="16" r="2.2" fill="#FF0055" />
          <line x1="20" y1="14" x2="20" y2="35" stroke="currentColor" strokeWidth="2.4" />
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
          <rect width="320" height="220" fill="#FFE600" />
          <circle cx="160" cy="110" r="88" fill="#FF0055" stroke="#0a0a0c" strokeWidth="3.5" />
          <path d="M35 220 L82 48 L160 18 L238 48 L285 220 Z" fill="#0a0a0c" />
          <polygon points="110,48 210,48 228,118 160,205 92,118" fill="#f4f1ea" stroke="#0a0a0c" strokeWidth="4" />
          <polygon points="160,78 192,138 160,205 128,138" fill="#0a0a0c" />
          <circle cx="128" cy="96" r="8" fill="#A3FF00" />
          <circle cx="192" cy="96" r="6" fill="#00F0FF" />
        </svg>
      );

    case 'azuma':
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover">
          <rect width="320" height="220" fill="#00F0FF" />
          <polygon points="0,0 320,60 320,220 0,220" fill="#16161a" />
          <path d="M55 220 L95 22 L225 22 L265 220 Z" fill="#f4f1ea" stroke="#0a0a0c" strokeWidth="4" />
          <rect x="98" y="72" width="124" height="44" fill="#0a0a0c" />
          <circle cx="132" cy="94" r="8" fill="#00F0FF" />
          <circle cx="188" cy="94" r="8" fill="#FFE600" />
          <rect x="96" y="136" width="128" height="36" fill="#0a0a0c" />
          {[116, 138, 160, 182, 204].map((x) => (
            <line key={x} x1={x} y1="136" x2={x} y2="172" stroke="#FFE600" strokeWidth="3.5" />
          ))}
        </svg>
      );

    case 'batista':
    default:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover">
          <rect width="320" height="220" fill="#FF0055" />
          <ellipse cx="160" cy="112" rx="68" ry="82" fill="#f4f1ea" stroke="#0a0a0c" strokeWidth="4" />
          <ellipse cx="132" cy="98" rx="18" ry="6" fill="#0a0a0c" />
          <circle cx="132" cy="98" r="4" fill="#A3FF00" />
          <ellipse cx="188" cy="98" rx="18" ry="6" fill="#0a0a0c" />
          <circle cx="188" cy="98" r="4" fill="#00F0FF" />
          <g stroke="#0a0a0c" strokeWidth="3">
            <line x1="122" y1="86" x2="122" y2="110" />
            <line x1="142" y1="86" x2="142" y2="110" />
            <line x1="178" y1="86" x2="178" y2="110" />
            <line x1="198" y1="86" x2="198" y2="110" />
          </g>
          <path d="M134 152 Q160 168 186 152" stroke="#0a0a0c" strokeWidth="5" fill="none" />
        </svg>
      );
  }
}
