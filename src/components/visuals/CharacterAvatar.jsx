import React, { useState } from 'react';

export default function CharacterAvatar({
  character,
  size = 'md',
  className = '',
  silhouette = false,
}) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    full: 'w-full h-full',
  };

  const dims = sizeClasses[size] || sizeClasses.md;

  if (character?.imageUrl && !imgError) {
    return (
      <div
        className={`relative overflow-hidden border border-[#efe9dd]/30 bg-[#0c0b0f] shrink-0 select-none ${dims} ${className}`}
      >
        <img
          src={character.imageUrl}
          alt={character.name}
          onError={() => setImgError(true)}
          style={{ objectPosition: character.imagePosition || 'center 22%' }}
          className={`w-full h-full object-cover ${
            silhouette ? 'brightness-0 invert-[0.08] contrast-200' : 'contrast-[1.06]'
          }`}
        />
      </div>
    );
  }

  const st = character?.avatarStyle || {
    hairColor: '#e4e4e7',
    hairSecondary: '#52525b',
    hairStyle: 'messy-bangs',
    skinTone: '#f3dfd3',
    eyeColor: '#71717a',
    kakugan: 'none',
    accessory: 'none',
    outfit: 'goat',
    accentColor: '#e60000',
  };

  const uid = `av-${character?.id || 'default'}`;

  const renderEye = (side, cx, cy) => {
    const isKakugan =
      st.kakugan === 'both' ||
      (st.kakugan === 'left' && side === 'left') ||
      (st.kakugan === 'right' && side === 'right');

    if (isKakugan) {
      return (
        <g key={side}>
          <path
            d={`M${cx - 6} ${cy + 5} L${cx - 9} ${cy + 9} M${cx + 5} ${cy + 5} L${cx + 8} ${cy + 8}`}
            stroke="#991b1b"
            strokeWidth="0.9"
            opacity="0.7"
          />
          <ellipse cx={cx} cy={cy} rx="7.2" ry="4.8" fill="#09090b" stroke="#27272a" strokeWidth="0.8" />
          <circle cx={cx} cy={cy} r="3.4" fill="#ef4444" />
          <circle cx={cx} cy={cy} r="1.5" fill="#7f1d1d" />
          <circle cx={cx - 1.3} cy={cy - 1.2} r="1" fill="#ffffff" opacity="0.9" />
        </g>
      );
    }

    return (
      <g key={side}>
        <ellipse cx={cx} cy={cy} rx="7" ry="4.6" fill="#fafafa" />
        <circle cx={cx} cy={cy} r="3.4" fill={st.eyeColor} />
        <circle cx={cx} cy={cy} r="1.6" fill="#09090b" />
        <circle cx={cx - 1.2} cy={cy - 1.2} r="1" fill="#ffffff" opacity="0.9" />
      </g>
    );
  };

  const renderOutfit = () => {
    switch (st.outfit) {
      case 'ccg':
        return (
          <g>
            <path d="M18 120 L28 90 L60 98 L92 90 L102 120 Z" fill="#e4e4e7" />
            <path d="M44 93 L60 116 L76 93 L68 88 L60 100 L52 88 Z" fill="#1e293b" />
            <path d="M28 90 L45 120 M92 90 L75 120" stroke="#94a3b8" strokeWidth="2" />
          </g>
        );
      case 'anteiku':
        return (
          <g>
            <path d="M18 120 L30 92 L60 98 L90 92 L102 120 Z" fill="#18181b" />
            <path d="M46 92 L60 114 L74 92 Z" fill="#f4f4f5" />
            <polygon points="53,97 60,101 53,105" fill="#b91c1c" />
            <polygon points="67,97 60,101 67,105" fill="#b91c1c" />
            <circle cx="60" cy="101" r="2" fill="#7f1d1d" />
          </g>
        );
      case 'aogiri':
        return (
          <g>
            <path d="M14 120 L26 86 L60 96 L94 86 L106 120 Z" fill="#7f1d1d" />
            <path d="M34 88 L60 118 L86 88" fill="#450a0a" />
          </g>
        );
      case 'suit':
        return (
          <g>
            <path d="M18 120 L28 92 L60 100 L92 92 L102 120 Z" fill="#2e1065" />
            <path d="M48 93 L60 116 L72 93 Z" fill="#be123c" />
            <path d="M58 98 L60 118 L62 98 Z" fill="#f4f4f5" />
          </g>
        );
      case 'clown':
        return (
          <g>
            <path d="M16 120 L28 90 L60 98 L92 90 L104 120 Z" fill="#18181b" />
            <path
              d="M34 94 Q42 86 50 95 Q60 86 70 95 Q78 86 86 94"
              fill="none"
              stroke="#e11d48"
              strokeWidth="3"
            />
          </g>
        );
      case 'casual':
        return (
          <g>
            <path d="M18 120 L28 90 L60 98 L92 90 L102 120 Z" fill="#d97706" />
            <path d="M42 90 Q60 106 78 90" fill="#27272a" />
          </g>
        );
      default:
        return (
          <g>
            <path d="M16 120 L28 88 L60 96 L92 88 L104 120 Z" fill="#18181b" />
            <path d="M38 86 L46 120 M82 86 L74 120" stroke="#dc2626" strokeWidth="1.5" opacity="0.7" />
          </g>
        );
    }
  };

  const renderHairBack = () => {
    if (['long-wild', 'long-flowing', 'long-parted'].includes(st.hairStyle)) {
      return (
        <path
          d="M22 48 Q16 86 22 115 L98 115 Q104 86 98 48 Z"
          fill={st.hairSecondary || st.hairColor}
        />
      );
    }
    if (st.hairStyle === 'cute-bob' || st.hairStyle === 'side-bang-bob') {
      return (
        <path
          d="M24 46 Q20 76 30 92 L90 92 Q100 76 96 46 Z"
          fill={st.hairSecondary || st.hairColor}
        />
      );
    }
    return null;
  };

  const renderHairFront = () => {
    switch (st.hairStyle) {
      case 'side-bang-bob':
        return (
          <path
            d="M25 52 Q26 20 60 18 Q94 20 95 54 Q84 36 68 38 L52 64 Q44 45 36 58 Z"
            fill={st.hairColor}
          />
        );
      case 'parted-neat':
        return (
          <path
            d="M26 50 Q28 18 60 17 Q92 18 94 50 Q82 34 62 32 L54 48 L48 34 Q36 38 26 50 Z"
            fill={st.hairColor}
          />
        );
      case 'sunny-spiky':
      case 'short-spiky':
        return (
          <path
            d="M24 52 L18 38 L30 34 L28 20 L44 25 L54 12 L66 24 L80 14 L82 28 L98 26 L90 42 L96 52 Q80 35 68 42 L60 34 L50 45 L38 36 Z"
            fill={st.hairColor}
          />
        );
      case 'slick-aristocrat':
      case 'slick-elder':
        return (
          <path
            d="M27 48 Q26 18 60 16 Q94 18 93 48 Q80 28 60 30 Q40 28 27 48 Z"
            fill={st.hairColor}
          />
        );
      case 'undercut-long':
        return (
          <path
            d="M26 48 Q30 18 62 18 Q94 20 94 54 L84 72 Q76 38 56 36 L38 62 Z"
            fill={st.hairColor}
          />
        );
      default:
        return (
          <path
            d="M24 54 Q24 18 60 16 Q96 18 96 54 L88 42 L80 56 L70 38 L60 58 L50 38 L40 55 L32 42 Z"
            fill={st.hairColor}
          />
        );
    }
  };

  const renderAccessory = () => {
    switch (st.accessory) {
      case 'eyepatch':
        if (st.kakugan === 'left') {
          return (
            <g>
              <line x1="27" y1="45" x2="93" y2="62" stroke="#18181b" strokeWidth="2.5" />
              <rect x="36" y="49" width="18" height="14" rx="3" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
            </g>
          );
        }
        return (
          <g>
            <line x1="27" y1="62" x2="93" y2="45" stroke="#f4f4f5" strokeWidth="2.2" />
            <rect x="66" y="49" width="18" height="14" rx="3" fill="#f4f4f5" stroke="#94a3b8" strokeWidth="1" />
          </g>
        );
      case 'glasses':
        return (
          <g stroke={st.accentColor === '#c026d3' ? '#dc2626' : '#cbd5e1'} strokeWidth="1.6" fill="none">
            <rect x="35" y="51" width="19" height="10" rx="2" fill="rgba(255,255,255,0.06)" />
            <rect x="66" y="51" width="19" height="10" rx="2" fill="rgba(255,255,255,0.06)" />
            <line x1="54" y1="56" x2="66" y2="56" />
          </g>
        );
      case 'stitches':
        return (
          <g stroke="#ef4444" strokeWidth="1.5">
            <line x1="72" y1="28" x2="80" y2="38" />
            <line x1="80" y1="28" x2="72" y2="38" />
            <line x1="83" y1="30" x2="83" y2="40" />
            <line x1="68" y1="64" x2="73" y2="68" />
            <line x1="73" y1="64" x2="68" y2="68" />
            <line x1="66" y1="76" x2="70" y2="80" />
          </g>
        );
      case 'bandages':
        return (
          <g>
            <path d="M31 46 L62 54 L58 65 L31 58 Z" fill="#e7e5e4" stroke="#a8a29e" strokeWidth="1" />
            <path d="M34 73 L86 76 L84 84 L36 82 Z" fill="#e7e5e4" stroke="#a8a29e" strokeWidth="1" />
          </g>
        );
      case 'mask_noro':
        return (
          <g>
            <ellipse cx="60" cy="58" rx="27" ry="30" fill="#f4f4f5" stroke="#a1a1aa" strokeWidth="1.5" />
            <path
              d="M42 66 Q60 80 78 66"
              fill="none"
              stroke="#18181b"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <line x1="50" y1="67" x2="50" y2="74" stroke="#991b1b" strokeWidth="1.5" />
            <line x1="60" y1="69" x2="60" y2="76" stroke="#991b1b" strokeWidth="1.5" />
            <line x1="70" y1="67" x2="70" y2="74" stroke="#991b1b" strokeWidth="1.5" />
          </g>
        );
      case 'mask_tatara':
        return (
          <g>
            <path
              d="M34 62 L60 58 L86 62 L80 86 L60 90 L40 86 Z"
              fill="#b91c1c"
              stroke="#7f1d1d"
              strokeWidth="1.5"
            />
            <line x1="48" y1="66" x2="48" y2="82" stroke="#450a0a" strokeWidth="2" />
            <line x1="60" y1="65" x2="60" y2="84" stroke="#450a0a" strokeWidth="2" />
            <line x1="72" y1="66" x2="72" y2="82" stroke="#450a0a" strokeWidth="2" />
          </g>
        );
      case 'headphones':
        return (
          <g>
            <ellipse cx="29" cy="60" rx="5" ry="9" fill="#f59e0b" stroke="#18181b" strokeWidth="1.5" />
            <ellipse cx="91" cy="60" rx="5" ry="9" fill="#f59e0b" stroke="#18181b" strokeWidth="1.5" />
          </g>
        );
      case 'mole':
        return <circle cx="75" cy="65" r="1.4" fill="#18181b" />;
      case 'mask_uta':
        return (
          <g>
            <circle cx="31" cy="60" r="1.6" fill="#d4d4d8" />
            <circle cx="89" cy="60" r="1.6" fill="#d4d4d8" />
            <path d="M52 90 L68 90" stroke="#18181b" strokeWidth="2.5" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative overflow-hidden border border-[#efe9dd]/25 bg-[#0c0b0f] select-none shrink-0 ${dims} ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        className={`w-full h-full ${
          silhouette ? 'brightness-0 invert-[0.12] contrast-200' : ''
        }`}
        aria-label={character?.name || 'Personagem'}
      >
        <defs>
          <radialGradient id={uid} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor={st.accentColor} stopOpacity="0.35" />
            <stop offset="100%" stopColor="#09090b" stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect width="120" height="120" fill={`url(#${uid})`} />
        <line x1="0" y1="105" x2="120" y2="25" stroke={st.accentColor} strokeWidth="1" opacity="0.2" />
        {renderHairBack()}
        <rect x="51" y="78" width="18" height="18" rx="4" fill={st.skinTone} />
        <path d="M51 82 Q60 89 69 82 L69 88 L51 88 Z" fill="rgba(0,0,0,0.18)" />
        {renderOutfit()}
        <path
          d="M33 46 Q33 26 60 26 Q87 26 87 46 Q87 72 60 86 Q33 72 33 46 Z"
          fill={st.skinTone}
        />
        <path d="M38 49 Q45 46 52 49" stroke="#27272a" strokeWidth="1.6" fill="none" />
        <path d="M68 49 Q75 46 82 49" stroke="#27272a" strokeWidth="1.6" fill="none" />
        {renderEye('right', 45, 56)}
        {renderEye('left', 75, 56)}
        <path d="M60 60 L58 67 L61 68" stroke="rgba(0,0,0,0.28)" strokeWidth="1.3" fill="none" />
        <path d="M53 75 Q60 77 67 75" stroke="#52525b" strokeWidth="1.4" fill="none" />
        {renderAccessory()}
        {renderHairFront()}
      </svg>
    </div>
  );
}
