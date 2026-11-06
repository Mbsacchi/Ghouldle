import { getTodayKey, getYesterdayKey, pickRandomCharacter } from './gameLogic';

const DAILY_STORAGE_KEY = 'ghouldle_daily_progress_v1';
const INFINITE_STORAGE_KEY = 'ghouldle_infinite_progress_v1';
const STATS_STORAGE_KEY = 'ghouldle_player_stats_v1';

const DEFAULT_MODE_STATE = {
  guesses: [], // Stored newest-first for UI display
  won: false,
  revealedHints: [],
};

export function createEmptyModesMap() {
  return {
    classic: { ...DEFAULT_MODE_STATE, guesses: [], revealedHints: [] },
    quote: { ...DEFAULT_MODE_STATE, guesses: [], revealedHints: [] },
    mask: { ...DEFAULT_MODE_STATE, guesses: [], revealedHints: [] },
  };
}

export function loadDailyState() {
  const today = getTodayKey();
  try {
    const raw = localStorage.getItem(DAILY_STORAGE_KEY);
    if (!raw) {
      return { dateKey: today, modes: createEmptyModesMap() };
    }
    const parsed = JSON.parse(raw);
    if (parsed.dateKey !== today) {
      const fresh = { dateKey: today, modes: createEmptyModesMap() };
      localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }
    const base = createEmptyModesMap();
    return {
      dateKey: today,
      modes: {
        classic: parsed.modes?.classic || base.classic,
        quote: parsed.modes?.quote || base.quote,
        mask: parsed.modes?.mask || base.mask,
      },
    };
  } catch {
    return { dateKey: today, modes: createEmptyModesMap() };
  }
}

export function saveDailyState(state) {
  try {
    localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadInfiniteState(characters) {
  const fallback = {
    modes: {
      classic: { targetId: pickRandomCharacter(characters).id, guesses: [], won: false, revealedHints: [] },
      quote: { targetId: pickRandomCharacter(characters).id, guesses: [], won: false, revealedHints: [] },
      mask: { targetId: pickRandomCharacter(characters).id, guesses: [], won: false, revealedHints: [] },
    },
  };

  try {
    const raw = localStorage.getItem(INFINITE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.modes) {
        return {
          modes: {
            classic: parsed.modes.classic || fallback.modes.classic,
            quote: parsed.modes.quote || fallback.modes.quote,
            mask: parsed.modes.mask || fallback.modes.mask,
          },
        };
      }
    }
  } catch {
    // Fallback below
  }

  saveInfiniteState(fallback);
  return fallback;
}

export function saveInfiniteState(state) {
  try {
    localStorage.setItem(INFINITE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
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

export function loadPlayerStats() {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATS };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATS,
      ...parsed,
      byMode: {
        classic: parsed.byMode?.classic || DEFAULT_STATS.byMode.classic,
        quote: parsed.byMode?.quote || DEFAULT_STATS.byMode.quote,
        mask: parsed.byMode?.mask || DEFAULT_STATS.byMode.mask,
      },
      distribution: { ...DEFAULT_STATS.distribution, ...(parsed.distribution || {}) },
    };
  } catch {
    return { ...DEFAULT_STATS };
  }
}

export function recordGameVictory({ stats, mode, attempts, isDaily }) {
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
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage quota errors
  }

  return next;
}
