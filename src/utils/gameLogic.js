// Chronological list of arcs for reference in UI / Help Modal
export const ARCS_CHRONOLOGY = [
  { order: 1, name: 'Arco da Intro', part: 'Tokyo Ghoul' },
  { order: 2, name: 'Arco dos Pombos', part: 'Tokyo Ghoul' },
  { order: 3, name: 'Arco Gourmet', part: 'Tokyo Ghoul' },
  { order: 4, name: 'Arco Aogiri', part: 'Tokyo Ghoul' },
  { order: 5, name: 'Pós-Aogiri', part: 'Tokyo Ghoul' },
  { order: 6, name: 'Ataque à Anteiku', part: 'Tokyo Ghoul' },
  { order: 7, name: 'Leilão (:re)', part: 'Tokyo Ghoul:re' },
  { order: 8, name: 'Extermínio dos Tsukiyama (:re)', part: 'Tokyo Ghoul:re' },
  { order: 9, name: 'Ilha Rue (:re)', part: 'Tokyo Ghoul:re' },
  { order: 10, name: 'Dragon (:re)', part: 'Tokyo Ghoul:re' },
];

export const GAME_MODES = [
  {
    id: 'classic',
    label: 'Clássico',
    subtitle: 'Comparação de Atributos',
    description: 'Adivinhe o personagem analisando espécie, afiliação, RC, rank e arco.',
  },
  {
    id: 'quote',
    label: 'Citação',
    subtitle: 'Frases Marcantes',
    description: 'Descubra o autor de uma fala icônica de Tokyo Ghoul ou Tokyo Ghoul:re.',
  },
  {
    id: 'mask',
    label: 'Máscara & Olho',
    subtitle: 'Kakugan & Disfarce',
    description: 'Reconheça o personagem por um recorte aproximado de sua máscara ou olhar.',
  },
];

// Local YYYY-MM-DD key
export function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Edition number since launch anchor
export function getDailyEditionNumber() {
  const anchor = new Date(2026, 0, 1);
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.floor((todayMidnight - anchor) / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1);
}

// Countdown until next local midnight
export function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const diffMs = Math.max(0, midnight - now);
  const hours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, '0');
  const minutes = String(Math.floor((diffMs / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((diffMs / 1000) % 60)).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Deterministic hash & PRNG so each mode gets a distinct daily character
function hashString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getDailyTargets(characters, dateKey = getTodayKey()) {
  const modeIds = ['classic', 'quote', 'mask'];
  const usedIndices = new Set();
  const result = {};

  modeIds.forEach((modeId, idx) => {
    const seed = hashString(`ghouldle-daily-${dateKey}-${modeId}-salt-${idx * 37}`);
    const rand = mulberry32(seed);
    let candidateIdx = Math.floor(rand() * characters.length);
    let guard = 0;
    while (usedIndices.has(candidateIdx) && guard < characters.length) {
      candidateIdx = (candidateIdx + 1) % characters.length;
      guard++;
    }
    usedIndices.add(candidateIdx);
    result[modeId] = characters[candidateIdx];
  });

  return result;
}

export function pickRandomCharacter(characters, excludeId = null) {
  const pool = excludeId ? characters.filter((c) => c.id !== excludeId) : characters;
  const source = pool.length > 0 ? pool : characters;
  const idx = Math.floor(Math.random() * source.length);
  return source[idx];
}

// Helper to compare sets (exact = green, partial overlap = yellow, none = red)
function compareSets(guessArr, targetArr, subcategoryMatcher = null) {
  const gSet = new Set(guessArr);
  const tSet = new Set(targetArr);

  if (gSet.size === tSet.size && [...gSet].every((item) => tSet.has(item))) {
    return 'correct';
  }

  const hasDirectOverlap = [...gSet].some((item) => tSet.has(item));
  if (hasDirectOverlap) {
    return 'partial';
  }

  if (subcategoryMatcher && subcategoryMatcher(guessArr, targetArr)) {
    return 'partial';
  }

  return 'wrong';
}

// Format RC Types cleanly (e.g., Chimera)
export function formatRcTypes(rcTypes) {
  if (rcTypes.includes('Chimera')) {
    const others = rcTypes.filter((t) => t !== 'Chimera');
    return others.length > 0 ? `Chimera (${others.join(' / ')})` : 'Chimera';
  }
  return rcTypes.join(' / ');
}

// Full 7-column comparison for Classic Mode
export function compareCharacters(guess, target) {
  const speciesStatus = compareSets(guess.species, target.species, (gList, tList) => {
    const gOneEyed = gList.some((s) => s.startsWith('Ghoul de Um Olho'));
    const tOneEyed = tList.some((s) => s.startsWith('Ghoul de Um Olho'));
    return gOneEyed && tOneEyed;
  });

  const affiliationStatus = compareSets(guess.affiliations, target.affiliations);
  const rcStatus = compareSets(guess.rcTypes, target.rcTypes);

  let arcDirection = 'equal';
  if (target.debutArcOrder > guess.debutArcOrder) {
    arcDirection = 'up'; // Secret character debuted later
  } else if (target.debutArcOrder < guess.debutArcOrder) {
    arcDirection = 'down'; // Secret character debuted earlier
  }

  return {
    guessId: guess.id,
    isCorrectCharacter: guess.id === target.id,
    cells: [
      {
        key: 'character',
        label: guess.name,
        status: guess.id === target.id ? 'correct' : 'wrong',
        character: guess,
      },
      {
        key: 'gender',
        label: guess.gender,
        status: guess.gender === target.gender ? 'correct' : 'wrong',
      },
      {
        key: 'species',
        label: guess.species.join(' • '),
        status: speciesStatus,
      },
      {
        key: 'affiliations',
        label: guess.affiliations.join(', '),
        status: affiliationStatus,
      },
      {
        key: 'rcTypes',
        label: formatRcTypes(guess.rcTypes),
        status: rcStatus,
      },
      {
        key: 'rank',
        label: guess.rank,
        status: guess.rank === target.rank ? 'correct' : 'wrong',
      },
      {
        key: 'debutArc',
        label: guess.debutArc,
        status: guess.debutArcOrder === target.debutArcOrder ? 'correct' : 'wrong',
        direction: arcDirection,
      },
    ],
  };
}

// Normalize strings for accent-insensitive PT-BR search
export function normalizeSearch(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Generate Wordle / Narutodle emoji grid for clipboard sharing
export function generateShareSummary({ mode, isDaily, editionNumber, guesses, target, charactersById }) {
  const modeNames = {
    classic: 'Clássico',
    quote: 'Citação',
    mask: 'Máscara & Olho',
  };

  const header = isDaily
    ? `🩸 GHOULDLE #${editionNumber} — Modo ${modeNames[mode]}`
    : `🩸 GHOULDLE (Infinito) — Modo ${modeNames[mode]}`;

  const attemptsLine = `🎯 Acertou em ${guesses.length} ${guesses.length === 1 ? 'tentativa' : 'tentativas'}!`;

  if (mode === 'classic') {
    // Most recent guess at top or chronological? Chronological from 1st guess to winning guess reads great!
    const chronological = [...guesses].reverse();
    const gridLines = chronological.slice(-8).map((gId) => {
      const gChar = charactersById[gId];
      if (!gChar) return '';
      const comp = compareCharacters(gChar, target);
      // Skip column 0 (portrait) or include columns 1..6 (6 attributes) -> let's include all 6 attributes!
      return comp.cells
        .slice(1)
        .map((cell) => {
          if (cell.key === 'debutArc' && cell.status !== 'correct') {
            return cell.direction === 'up' ? '⬆️' : '⬇️';
          }
          if (cell.status === 'correct') return '🟩';
          if (cell.status === 'partial') return '🟨';
          return '🟥';
        })
        .join('');
    });

    const prefix = chronological.length > 8 ? `(... +${chronological.length - 8} palpites)\n` : '';
    return `${header}\n${attemptsLine}\n\n${prefix}${gridLines.join('\n')}\n\n☕ Jogue em: Ghouldle`;
  }

  // Visual / Quote modes: show attempt trail
  const chronological = [...guesses].reverse();
  const trail = chronological
    .map((gId) => (gId === target.id ? '🟩' : '🟥'))
    .join('');

  return `${header}\n${attemptsLine}\n\n${trail}\n\n☕ Jogue em: Ghouldle`;
}
