import { getTodayKey, getYesterdayKey, getDailyTargets, pickRandomCharacter } from './gameLogic';

const STORAGE_KEYS = Object.freeze({
  tg: Object.freeze({
    daily: 'ghouldle_daily_progress_v1',
    infinite: 'ghouldle_infinite_progress_v1',
    stats: 'ghouldle_player_stats_v1',
  }),
  cx: Object.freeze({
    daily: 'choujindle_daily_progress_v1',
    infinite: 'choujindle_infinite_progress_v1',
    stats: 'choujindle_player_stats_v1',
  }),
  session: 'suiichidadle_session_v1',
});

const VALID_MODES = ['classic', 'quote', 'mask'];
const VALID_HINT_KEYS = ['hint1', 'hint2'];

const DEFAULT_MODE_STATE = Object.freeze({
  guesses: [], // Stored newest-first for UI display
  won: false,
  revealedHints: [],
});

export function deepFreeze(obj) {
  if (!obj || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const val = obj[prop];
    if (val && typeof val === 'object') {
      deepFreeze(val);
    }
  });
  return obj;
}

export function createEmptyModesMap() {
  return {
    classic: { ...DEFAULT_MODE_STATE, guesses: [], revealedHints: [] },
    quote: { ...DEFAULT_MODE_STATE, guesses: [], revealedHints: [] },
    mask: { ...DEFAULT_MODE_STATE, guesses: [], revealedHints: [] },
  };
}

function sanitizeGuesses(rawGuesses, validIdsSet) {
  if (!Array.isArray(rawGuesses)) return [];
  const seen = new Set();
  const clean = [];
  for (const id of rawGuesses) {
    if (typeof id === 'string' && (!validIdsSet || validIdsSet.has(id)) && !seen.has(id)) {
      seen.add(id);
      clean.push(id);
    }
  }
  return clean;
}

function sanitizeHints(rawHints) {
  if (!Array.isArray(rawHints)) return [];
  return VALID_HINT_KEYS.filter((k) => rawHints.includes(k));
}

function sanitizeModeEntry(entry, validIdsSet, targetId) {
  if (!entry || typeof entry !== 'object') {
    return { guesses: [], won: false, revealedHints: [] };
  }
  const guesses = sanitizeGuesses(entry.guesses, validIdsSet);
  const revealedHints = sanitizeHints(entry.revealedHints);
  const won = targetId ? guesses.includes(targetId) : Boolean(entry.won && guesses.length > 0);
  return { guesses, won, revealedHints };
}

export function loadDailyState(universe = 'tg', characters = []) {
  const key = STORAGE_KEYS[universe]?.daily || STORAGE_KEYS.tg.daily;
  const today = getTodayKey();
  const validIdsSet =
    Array.isArray(characters) && characters.length > 0
      ? new Set(characters.map((c) => c.id))
      : null;
  const dailyTargets =
    Array.isArray(characters) && characters.length > 0
      ? getDailyTargets(characters, today, universe)
      : null;

  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      const initial = { dateKey: today, modes: createEmptyModesMap() };
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || parsed.dateKey !== today) {
      const fresh = { dateKey: today, modes: createEmptyModesMap() };
      localStorage.setItem(key, JSON.stringify(fresh));
      return fresh;
    }

    const sanitized = {
      dateKey: today,
      modes: {
        classic: sanitizeModeEntry(
          parsed.modes?.classic,
          validIdsSet,
          dailyTargets?.classic?.id
        ),
        quote: sanitizeModeEntry(
          parsed.modes?.quote,
          validIdsSet,
          dailyTargets?.quote?.id
        ),
        mask: sanitizeModeEntry(
          parsed.modes?.mask,
          validIdsSet,
          dailyTargets?.mask?.id
        ),
      },
    };
    localStorage.setItem(key, JSON.stringify(sanitized));
    return sanitized;
  } catch {
    return { dateKey: today, modes: createEmptyModesMap() };
  }
}

export function saveDailyState(state, universe = 'tg') {
  const key = STORAGE_KEYS[universe]?.daily || STORAGE_KEYS.tg.daily;
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadInfiniteState(characters, universe = 'tg') {
  const key = STORAGE_KEYS[universe]?.infinite || STORAGE_KEYS.tg.infinite;
  const validIdsSet = new Set((characters || []).map((c) => c.id));

  const createFallbackMode = () => ({
    targetId: pickRandomCharacter(characters).id,
    guesses: [],
    won: false,
    revealedHints: [],
  });

  const fallback = {
    modes: {
      classic: createFallbackMode(),
      quote: createFallbackMode(),
      mask: createFallbackMode(),
    },
  };

  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.modes) {
        const nextModes = {};
        for (const mode of VALID_MODES) {
          const entry = parsed.modes[mode];
          if (entry && typeof entry === 'object' && validIdsSet.has(entry.targetId)) {
            const sanitized = sanitizeModeEntry(entry, validIdsSet, entry.targetId);
            nextModes[mode] = {
              targetId: entry.targetId,
              guesses: sanitized.guesses,
              won: sanitized.won,
              revealedHints: sanitized.revealedHints,
            };
          } else {
            nextModes[mode] = fallback.modes[mode];
          }
        }
        const restored = { modes: nextModes };
        saveInfiniteState(restored, universe);
        return restored;
      }
    }
  } catch {
    // Fallback below
  }

  saveInfiniteState(fallback, universe);
  return fallback;
}

export function saveInfiniteState(state, universe = 'tg') {
  const key = STORAGE_KEYS[universe]?.infinite || STORAGE_KEYS.tg.infinite;
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

function clampNonNegInt(val, fallback = 0) {
  const n = Number(val);
  if (!Number.isFinite(n) || n < 0) return fallback;
  return Math.floor(n);
}

const DEFAULT_STATS = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  lastDailyWinDate: null,
  totalGuessesOnWins: 0,
  byMode: {
    classic: { won: 0, bestAttempts: null },
    quote: { won: 0, bestAttempts: null },
    mask: { won: 0, bestAttempts: null },
  },
  distribution: {
    '1': 0,
    '2-3': 0,
    '4-5': 0,
    '6-8': 0,
    '9+': 0,
  },
};

function sanitizeModeStats(entry) {
  if (!entry || typeof entry !== 'object') {
    return { won: 0, bestAttempts: null };
  }
  const won = clampNonNegInt(entry.won, 0);
  const best =
    entry.bestAttempts !== null &&
    entry.bestAttempts !== undefined &&
    Number.isFinite(Number(entry.bestAttempts)) &&
    Number(entry.bestAttempts) >= 1
      ? Math.floor(Number(entry.bestAttempts))
      : null;
  return { won, bestAttempts: best };
}

export function loadPlayerStats(universe = 'tg') {
  const key = STORAGE_KEYS[universe]?.stats || STORAGE_KEYS.tg.stats;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { ...DEFAULT_STATS };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { ...DEFAULT_STATS };

    return {
      gamesPlayed: clampNonNegInt(parsed.gamesPlayed, 0),
      gamesWon: clampNonNegInt(parsed.gamesWon, 0),
      currentStreak: clampNonNegInt(parsed.currentStreak, 0),
      maxStreak: clampNonNegInt(parsed.maxStreak, 0),
      lastDailyWinDate:
        typeof parsed.lastDailyWinDate === 'string' ? parsed.lastDailyWinDate : null,
      totalGuessesOnWins: clampNonNegInt(parsed.totalGuessesOnWins, 0),
      byMode: {
        classic: sanitizeModeStats(parsed.byMode?.classic),
        quote: sanitizeModeStats(parsed.byMode?.quote),
        mask: sanitizeModeStats(parsed.byMode?.mask),
      },
      distribution: {
        '1': clampNonNegInt(parsed.distribution?.['1'], 0),
        '2-3': clampNonNegInt(parsed.distribution?.['2-3'], 0),
        '4-5': clampNonNegInt(parsed.distribution?.['4-5'], 0),
        '6-8': clampNonNegInt(parsed.distribution?.['6-8'], 0),
        '9+': clampNonNegInt(parsed.distribution?.['9+'], 0),
      },
    };
  } catch {
    return { ...DEFAULT_STATS };
  }
}

export function recordGameVictory({ stats, mode, attempts, isDaily, universe = 'tg' }) {
  const key = STORAGE_KEYS[universe]?.stats || STORAGE_KEYS.tg.stats;
  const next = {
    ...stats,
    gamesPlayed: stats.gamesPlayed + 1,
    gamesWon: stats.gamesWon + 1,
    totalGuessesOnWins: (stats.totalGuessesOnWins || 0) + attempts,
    byMode: { ...stats.byMode },
    distribution: { ...stats.distribution },
  };

  const prevMode = next.byMode[mode] || { won: 0, bestAttempts: null };
  next.byMode[mode] = {
    won: prevMode.won + 1,
    bestAttempts:
      prevMode.bestAttempts === null ? attempts : Math.min(prevMode.bestAttempts, attempts),
  };

  if (attempts === 1) next.distribution['1'] += 1;
  else if (attempts <= 3) next.distribution['2-3'] += 1;
  else if (attempts <= 5) next.distribution['4-5'] += 1;
  else if (attempts <= 8) next.distribution['6-8'] += 1;
  else next.distribution['9+'] += 1;

  if (isDaily) {
    const today = getTodayKey();
    const yesterday = getYesterdayKey();
    if (stats.lastDailyWinDate !== today) {
      const nextStreak =
        stats.lastDailyWinDate === yesterday ? stats.currentStreak + 1 : 1;
      next.currentStreak = nextStreak;
      next.maxStreak = Math.max(stats.maxStreak, nextStreak);
      next.lastDailyWinDate = today;
    }
  } else {
    if (next.currentStreak === 0) {
      next.currentStreak = 1;
      next.maxStreak = Math.max(stats.maxStreak, 1);
    }
  }

  try {
    localStorage.setItem(key, JSON.stringify(next));
  } catch {
    // Ignore storage quota errors
  }

  return next;
}

export function loadSessionPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.session);
    if (!raw) return { isDaily: true };
    const parsed = JSON.parse(raw);
    return {
      isDaily: typeof parsed?.isDaily === 'boolean' ? parsed.isDaily : true,
    };
  } catch {
    return { isDaily: true };
  }
}

export function saveSessionPrefs(prefs) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.session,
      JSON.stringify({
        isDaily: typeof prefs?.isDaily === 'boolean' ? prefs.isDaily : true,
      })
    );
  } catch {
    // Ignore storage quota errors
  }
}
