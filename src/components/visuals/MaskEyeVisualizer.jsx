import React, { useState } from 'react';

/**
 * MaskEyeVisualizer renders either a custom image URL (if character.maskOrEye.imageUrl is provided)
 * or a detailed widescreen close-up illustration of the character's iconic Ghoul Mask, Kakugan, or Eyes.
 * Starts tightly cropped on focalPoint and zooms out progressively with each wrong guess.
 */
export default function MaskEyeVisualizer({
  character,
  zoomScale = 1,
  className = '',
}) {
  const [imgError, setImgError] = useState(false);

  const maskData = character?.maskOrEye || {};
  const st = character?.avatarStyle || {};
  const focal = maskData.focalPoint || { x: 50, y: 46 };
  const preset = maskData.preset || 'eyepatch-zipper';
  const uid = `msk-${character?.id || 'default'}`;

  const transformStyle = {
    transform: `scale(${zoomScale})`,
    transformOrigin: `${focal.x}% ${focal.y}%`,
    transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
  };

  if (maskData.imageUrl && !imgError) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-b from-zinc-700/40 via-[#221015] to-[#09090c] ${className}`}>
        <img
          src={maskData.imageUrl}
          alt="Máscara ou Olho"
          onError={() => setImgError(true)}
          style={{
            ...transformStyle,
            objectPosition: `${focal.x}% ${focal.y}%`,
          }}
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </div>
    );
  }

  const renderKakuganLarge = (cx, cy) => (
    <g>
      {/* Crimson RC veins around eye */}
      <path
        d={`M${cx - 38} ${cy + 10} Q${cx - 52} ${cy + 22} ${cx - 64} ${cy + 26} M${cx + 36} ${cy + 12} Q${cx + 48} ${cy + 25} ${cx + 58} ${cy + 30}`}
        stroke="#991b1b"
        strokeWidth="2"
        fill="none"
        opacity="0.75"
      />
      <path
        d={`M${cx - 42} ${cy} Q${cx} ${cy - 28} ${cx + 42} ${cy} Q${cx} ${cy + 26} ${cx - 42} ${cy} Z`}
        fill="#070709"
        stroke="#27272a"
        strokeWidth="2"
      />
      <circle cx={cx} cy={cy} r="16" fill="#dc2626" />
      <circle cx={cx} cy={cy} r="9" fill="#ef4444" />
      <circle cx={cx} cy={cy} r="4.5" fill="#450a0a" />
      <circle cx={cx - 5} cy={cy - 5} r="3.2" fill="#ffffff" opacity="0.92" />
    </g>
  );

  const renderNormalEyeLarge = (cx, cy, color = '#64748b') => (
    <g>
      <path
        d={`M${cx - 40} ${cy} Q${cx} ${cy - 26} ${cx + 40} ${cy} Q${cx} ${cy + 24} ${cx - 40} ${cy} Z`}
        fill="#f8fafc"
        stroke="#18181b"
        strokeWidth="2.2"
      />
      <circle cx={cx} cy={cy} r="15" fill={color} />
      <circle cx={cx} cy={cy} r="6.5" fill="#09090b" />
      <circle cx={cx - 5} cy={cy - 5} r="3.2" fill="#ffffff" opacity="0.92" />
    </g>
  );

  const renderScene = () => {
    switch (preset) {
      case 'eyepatch-zipper':
        return (
          <g>
            {/* Kaneki's leather mask + medical eyepatch on right + glowing left Kakugan + toothed grin */}
            <rect x="95" y="20" width="290" height="220" rx="48" fill="#18181b" stroke="#3f3f46" strokeWidth="3" />
            {/* Neck bolts */}
            <rect x="80" y="195" width="22" height="18" rx="3" fill="#71717a" />
            <rect x="378" y="195" width="22" height="18" rx="3" fill="#71717a" />
            {/* Right medical patch */}
            <rect x="132" y="76" width="84" height="58" rx="8" fill="#e4e4e7" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="95" y1="68" x2="385" y2="125" stroke="#27272a" strokeWidth="6" />
            {/* Left Kakugan */}
            {renderKakuganLarge(305, 105)}
            {/* Iconic Vertical/Horizontal Zipper Tooth Grin */}
            <rect x="158" y="158" width="164" height="52" rx="22" fill="#f4f4f5" stroke="#dc2626" strokeWidth="4" />
            <line x1="162" y1="184" x2="318" y2="184" stroke="#09090b" strokeWidth="4" />
            {[182, 204, 226, 248, 270, 292].map((x) => (
              <line key={x} x1={x} y1="160" x2={x} y2="208" stroke="#18181b" strokeWidth="3" />
            ))}
          </g>
        );

      case 'rabbit-mask':
      case 'black-rabbit-mask': {
        const isBlack = preset === 'black-rabbit-mask';
        return (
          <g>
            {/* Pink/Crimson wig strands */}
            <path d="M90 30 L60 240 L420 240 L390 30 Z" fill={isBlack ? '#1e1b4b' : '#ec4899'} opacity="0.55" />
            {/* Rabbit ears & porcelain face */}
            <path
              d="M170 5 L195 85 L145 85 Z M310 5 L335 85 L285 85 Z"
              fill={isBlack ? '#18181b' : '#f8fafc'}
              stroke={isBlack ? '#e11d48' : '#cbd5e1'}
              strokeWidth="3"
            />
            <ellipse
              cx="240"
              cy="145"
              rx="98"
              ry="88"
              fill={isBlack ? '#18181b' : '#f8fafc'}
              stroke={isBlack ? '#e11d48' : '#cbd5e1'}
              strokeWidth="3"
            />
            <ellipse cx="195" cy="128" rx="22" ry="12" fill="#09090b" />
            <circle cx="195" cy="128" r="5" fill="#ef4444" />
            <ellipse cx="285" cy="128" rx="22" ry="12" fill="#09090b" />
            <circle cx="285" cy="128" r="5" fill="#ef4444" />
            <path d="M230 165 L240 176 L250 165 M240 176 L240 192" stroke="#e11d48" strokeWidth="3" fill="none" />
          </g>
        );
      }

      case 'arima-glasses':
      case 'rize-glasses': {
        const isRize = preset === 'rize-glasses';
        return (
          <g>
            <rect x="85" y="25" width="310" height="210" rx="28" fill={st.skinTone || '#f5e9e2'} />
            {/* Hair bangs */}
            <path
              d="M80 20 L400 20 L400 95 L340 65 L290 102 L240 62 L185 98 L135 65 L80 95 Z"
              fill={isRize ? '#7e22ce' : '#f8fafc'}
            />
            {isRize ? (
              <>
                {renderKakuganLarge(175, 132)}
                {renderKakuganLarge(305, 132)}
              </>
            ) : (
              <>
                {renderNormalEyeLarge(175, 132, '#64748b')}
                {renderNormalEyeLarge(305, 132, '#64748b')}
              </>
            )}
            {/* Rimless / Red Glasses */}
            <rect
              x="122"
              y="102"
              width="106"
              height="56"
              rx="8"
              fill="rgba(255,255,255,0.08)"
              stroke={isRize ? '#dc2626' : '#94a3b8'}
              strokeWidth="3.5"
            />
            <rect
              x="252"
              y="102"
              width="106"
              height="56"
              rx="8"
              fill="rgba(255,255,255,0.08)"
              stroke={isRize ? '#dc2626' : '#94a3b8'}
              strokeWidth="3.5"
            />
            <line
              x1="228"
              y1="128"
              x2="252"
              y2="128"
              stroke={isRize ? '#dc2626' : '#94a3b8'}
              strokeWidth="3.5"
            />
          </g>
        );
      }

      case 'juuzou-stitches':
        return (
          <g>
            <rect x="85" y="25" width="310" height="210" rx="28" fill="#faf0eb" />
            <path d="M80 20 L400 20 L400 98 L325 65 L255 96 L185 62 L80 98 Z" fill="#fafafa" />
            {/* Red XIII Hairpins */}
            <g stroke="#ef4444" strokeWidth="5" strokeLinecap="round">
              <line x1="295" y1="36" x2="322" y2="72" />
              <line x1="322" y1="36" x2="295" y2="72" />
              <line x1="336" y1="38" x2="336" y2="72" />
              <line x1="350" y1="38" x2="350" y2="72" />
              <line x1="364" y1="38" x2="364" y2="72" />
            </g>
            {renderNormalEyeLarge(175, 132, '#dc2626')}
            {renderNormalEyeLarge(305, 132, '#dc2626')}
            {/* Red under-eye & mouth stitches */}
            <g stroke="#ef4444" strokeWidth="3.2" strokeLinecap="round">
              <line x1="286" y1="168" x2="302" y2="184" />
              <line x1="302" y1="168" x2="286" y2="184" />
              <line x1="312" y1="168" x2="328" y2="184" />
              <line x1="268" y1="205" x2="280" y2="218" />
              <line x1="284" y1="205" x2="296" y2="218" />
            </g>
          </g>
        );

      case 'crescent-moon-mask':
        return (
          <g>
            {/* Tsukiyama's Purple Crescent Moon Mask */}
            <circle cx="240" cy="130" r="95" fill="#2e1065" stroke="#db2777" strokeWidth="3" />
            <path
              d="M235 38 C165 50, 165 210, 235 222 C195 190, 195 70, 235 38 Z"
              fill="#f8fafc"
              stroke="#fbbf24"
              strokeWidth="2.5"
            />
            {renderKakuganLarge(282, 125)}
          </g>
        );

      case 'raven-beak':
        return (
          <g>
            {/* Yomo's Metallic Raven Beak Mask */}
            <polygon
              points="135,55 345,55 365,145 240,242 115,145"
              fill="#27272a"
              stroke="#71717a"
              strokeWidth="3"
            />
            <polygon points="240,95 292,165 240,242 188,165" fill="#18181b" stroke="#a1a1aa" strokeWidth="2" />
            {renderKakuganLarge(182, 108)}
            {renderKakuganLarge(298, 108)}
          </g>
        );

      case 'noro-smile-mask':
        return (
          <g>
            <ellipse cx="240" cy="130" rx="102" ry="108" fill="#f4f4f5" stroke="#a1a1aa" strokeWidth="4" />
            {/* Eyeless smooth forehead + giant painted creepy mouth */}
            <path
              d="M168 145 Q240 212 312 145"
              fill="none"
              stroke="#18181b"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {[195, 218, 240, 262, 285].map((x) => (
              <line key={x} x1={x} y1="152" x2={x} y2="182" stroke="#991b1b" strokeWidth="4" />
            ))}
          </g>
        );

      case 'tatara-respirator':
        return (
          <g>
            <rect x="105" y="25" width="270" height="210" rx="32" fill="#ebd8ca" />
            <path d="M100 20 L380 20 L380 86 L300 58 L240 84 L180 58 L100 86 Z" fill="#f4f4f5" />
            {renderKakuganLarge(180, 105)}
            {renderKakuganLarge(300, 105)}
            {/* Scarlet metallic lower mask */}
            <polygon
              points="125,138 240,122 355,138 330,235 240,248 150,235"
              fill="#b91c1c"
              stroke="#450a0a"
              strokeWidth="4"
            />
            {[190, 215, 240, 265, 290].map((x) => (
              <line key={x} x1={x} y1="148" x2={x} y2="225" stroke="#450a0a" strokeWidth="5" />
            ))}
          </g>
        );

      case 'hockey-mask':
        return (
          <g>
            {/* Yamori / Jason Hockey Mask */}
            <ellipse cx="240" cy="130" rx="98" ry="108" fill="#f4f4f5" stroke="#94a3b8" strokeWidth="4" />
            <path d="M225 52 L240 78 L255 52 Z" fill="#dc2626" />
            {renderKakuganLarge(192, 112)}
            {renderKakuganLarge(288, 112)}
            {[
              [222, 165],
              [258, 165],
              [212, 188],
              [240, 188],
              [268, 188],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="5.5" fill="#18181b" />
            ))}
          </g>
        );

      case 'eto-bandages':
        return (
          <g>
            <rect x="95" y="20" width="290" height="220" rx="34" fill="#d6d3d1" />
            {/* Overlapping mummy bandage strips */}
            {[45, 82, 122, 165, 202].map((y, idx) => (
              <line
                key={idx}
                x1="95"
                y1={y}
                x2="385"
                y2={y + (idx % 2 === 0 ? 18 : -16)}
                stroke="#a8a29e"
                strokeWidth="5"
              />
            ))}
            {/* Single exposed right Kakugan */}
            {renderKakuganLarge(185, 118)}
          </g>
        );

      case 'tokio-vulture':
        return (
          <g>
            {/* Tokio's Vulture Beast Mask: Dark feathers + Bone/Iron Beak + Blazing Acid-Gold Eyes */}
            <path d="M70 240 L110 25 L240 12 L370 25 L410 240 Z" fill="#141712" stroke="#3f3f46" strokeWidth="3" />
            {/* Jagged feather plumes */}
            <path
              d="M90 60 L140 30 L165 75 L240 20 L315 75 L340 30 L390 60"
              fill="none"
              stroke="#a3e635"
              strokeWidth="2.2"
              opacity="0.65"
            />
            {/* Central Vulture Skull & Curved Beak */}
            <polygon
              points="160,55 320,55 345,135 240,244 135,135"
              fill="#e4e4e7"
              stroke="#27272a"
              strokeWidth="3.5"
            />
            <polygon
              points="240,88 286,162 240,244 194,162"
              fill="#27272a"
              stroke="#a3e635"
              strokeWidth="2"
            />
            {renderNormalEyeLarge(182, 112, '#a3e635')}
            {renderNormalEyeLarge(298, 112, '#a3e635')}
          </g>
        );

      case 'azuma-iron':
        return (
          <g>
            {/* Azuma's White Cloth Hood + Heavy Iron Manacles & Glowing Blue/Gold Gaze */}
            <path d="M95 18 L385 18 L415 242 L65 242 Z" fill="#f4f4f5" stroke="#a1a1aa" strokeWidth="3.5" />
            {/* Cloth eye-slit shadow */}
            <rect x="125" y="86" width="230" height="64" rx="8" fill="#09090b" stroke="#52525b" strokeWidth="3" />
            {renderNormalEyeLarge(180, 118, '#38bdf8')}
            {renderNormalEyeLarge(300, 118, '#facc15')}
            {/* Iron Chains & Shackle Collar */}
            <rect x="135" y="176" width="210" height="46" rx="6" fill="#3f3f46" stroke="#18181b" strokeWidth="3.5" />
            {[165, 202, 240, 278, 315].map((x) => (
              <circle key={x} cx={x} cy="199" r="6" fill="#facc15" />
            ))}
          </g>
        );

      case 'batista-noh':
        return (
          <g>
            {/* Batista Hoshi's Porcelain Noh Mask + Stitched Eye Sockets */}
            <ellipse cx="240" cy="130" rx="102" ry="110" fill="#f8fafc" stroke="#a1a1aa" strokeWidth="4" />
            {/* Traditional Noh arched brows */}
            <path d="M168 62 Q192 48 216 62" stroke="#52525b" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M264 62 Q288 48 312 62" stroke="#52525b" strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* Narrow Noh eye slits with stitched Nue scars */}
            <ellipse cx="192" cy="112" rx="28" ry="8" fill="#09090b" />
            <circle cx="192" cy="112" r="5" fill="#a3e635" />
            <ellipse cx="288" cy="112" rx="28" ry="8" fill="#09090b" />
            <circle cx="288" cy="112" r="5" fill="#ef4444" />
            <g stroke="#18181b" strokeWidth="2.5">
              <line x1="175" y1="96" x2="175" y2="128" />
              <line x1="208" y1="96" x2="208" y2="128" />
              <line x1="272" y1="96" x2="272" y2="128" />
              <line x1="305" y1="96" x2="305" y2="128" />
            </g>
            {/* Noh Mask Painted Smile */}
            <path d="M202 182 Q240 202 278 182" stroke="#991b1b" strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'zora-hand-eyes':
        return (
          <g>
            {/* Zora Siruha: Veiled face flanked by sacred palms with open crimson/gold eyes */}
            <rect x="100" y="20" width="280" height="220" rx="36" fill="#1c1917" stroke="#dc2626" strokeWidth="3" />
            <path d="M100 90 L380 90" stroke="#a8a29e" strokeWidth="4" strokeDasharray="10 6" />
            {renderKakuganLarge(180, 128)}
            {renderKakuganLarge(300, 128)}
            {/* Forehead Choujin X Cross Mark */}
            <path d="M222 44 L258 80 M258 44 L222 80" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
          </g>
        );

      case 'ely-smoke':
      case 'chandra-smoke': {
        const isChandra = preset === 'chandra-smoke';
        return (
          <g>
            <rect x="90" y="25" width="300" height="210" rx="28" fill={isChandra ? '#d6d3d1' : '#f6e5d7'} />
            {/* Billowing smoke plumes */}
            <path
              d="M70 180 Q40 110 95 65 Q150 15 240 30 Q330 15 385 65 Q440 110 410 180"
              fill="none"
              stroke="#f97316"
              strokeWidth="8"
              opacity="0.75"
            />
            {renderNormalEyeLarge(175, 130, '#f97316')}
            {renderNormalEyeLarge(305, 130, '#f97316')}
          </g>
        );
      }

      case 'palma-hyena':
      case 'nari-snake': {
        const isSnake = preset === 'nari-snake';
        return (
          <g>
            <rect x="90" y="25" width="300" height="210" rx="30" fill={isSnake ? '#fafafa' : '#f5e6d8'} />
            <path
              d="M85 20 L395 20 L395 92 L320 60 L240 90 L160 60 L85 92 Z"
              fill={isSnake ? '#e4e4e7' : '#fef08a'}
            />
            {renderNormalEyeLarge(175, 122, isSnake ? '#ec4899' : '#dc2626')}
            {renderNormalEyeLarge(305, 122, isSnake ? '#ec4899' : '#dc2626')}
            {/* Fangs / Bifid Tongue */}
            <path d="M180 186 Q240 212 300 186" stroke="#18181b" strokeWidth="4" fill="none" />
            <polygon points="198,190 208,212 218,192" fill="#ffffff" stroke="#18181b" strokeWidth="2" />
            <polygon points="262,192 272,212 282,190" fill="#ffffff" stroke="#18181b" strokeWidth="2" />
          </g>
        );
      }

      case 'shiozaki-baseball':
        return (
          <g>
            <circle cx="240" cy="130" r="102" fill="#f8fafc" stroke="#94a3b8" strokeWidth="4" />
            {/* Curved red baseball seams across face */}
            <path d="M168 42 Q212 130 168 218" fill="none" stroke="#dc2626" strokeWidth="4" />
            <path d="M312 42 Q268 130 312 218" fill="none" stroke="#dc2626" strokeWidth="4" />
            {[65, 95, 125, 155, 185].map((y) => (
              <g key={y} stroke="#dc2626" strokeWidth="3">
                <line x1="176" y1={y} x2="196" y2={y + 6} />
                <line x1="284" y1={y + 6} x2="304" y2={y} />
              </g>
            ))}
            {renderNormalEyeLarge(200, 125, '#ef4444')}
            {renderNormalEyeLarge(280, 125, '#ef4444')}
          </g>
        );

      case 'sandek-gravity':
      case 'simon-blade':
      case 'sato-psyche':
      case 'ricardo-terror':
      case 'yubiko-mandala':
      case 'queem-war': {
        return (
          <g>
            <rect x="85" y="25" width="310" height="210" rx="28" fill={st.skinTone || '#ead2c0'} />
            <path
              d="M80 20 L400 20 L400 92 L332 60 L268 92 L212 58 L148 92 L80 76 Z"
              fill={st.hairColor || '#18181b'}
            />
            {renderNormalEyeLarge(175, 126, st.eyeColor || '#a3e635')}
            {renderNormalEyeLarge(305, 126, st.eyeColor || '#a3e635')}
            {preset === 'simon-blade' && (
              <path d="M120 175 L360 175 L350 238 L130 238 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
            )}
            {preset === 'sandek-gravity' && (
              <circle cx="240" cy="126" r="108" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="8 6" />
            )}
            {preset === 'ricardo-terror' && (
              <>
                {renderNormalEyeLarge(175, 78, '#fde047')}
                {renderNormalEyeLarge(305, 78, '#fde047')}
              </>
            )}
          </g>
        );
      }

      default: {
        const leftIsKakugan = st.kakugan === 'both' || st.kakugan === 'left';
        const rightIsKakugan = st.kakugan === 'both' || st.kakugan === 'right';
        return (
          <g>
            <rect x="85" y="25" width="310" height="210" rx="28" fill={st.skinTone || '#f3dfd3'} />
            <path
              d="M80 20 L400 20 L400 96 L332 62 L272 95 L220 58 L158 96 L80 78 Z"
              fill={st.hairColor || '#27272a'}
            />
            {rightIsKakugan
              ? renderKakuganLarge(175, 130)
              : renderNormalEyeLarge(175, 130, st.eyeColor || '#52525b')}
            {leftIsKakugan
              ? renderKakuganLarge(305, 130)
              : renderNormalEyeLarge(305, 130, st.eyeColor || '#52525b')}
            {st.accessory === 'mole' && <circle cx="332" cy="162" r="4.5" fill="#18181b" />}
            {st.accessory === 'headphones' && (
              <>
                <rect x="62" y="95" width="26" height="75" rx="10" fill="#f59e0b" />
                <rect x="392" y="95" width="26" height="75" rx="10" fill="#f59e0b" />
              </>
            )}
          </g>
        );
      }
    }
  };

  return (
    <div className={`relative overflow-hidden bg-[#09090c] select-none ${className}`}>
      <svg
        viewBox="0 0 480 260"
        style={transformStyle}
        className="w-full h-full pointer-events-none"
        aria-label="Recorte de Máscara ou Olho"
      >
        <defs>
          <radialGradient id={`${uid}-bg`} cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor={st.accentColor || '#b30000'} stopOpacity="0.28" />
            <stop offset="100%" stopColor="#09090c" stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect width="480" height="260" fill={`url(#${uid}-bg)`} />
        {renderScene()}
      </svg>
    </div>
  );
}
