import React, { useState, useMemo, useEffect, useRef } from 'react';
import tgCharactersData from './data/characters.json';
import cxCharactersData from './data/choujinCharacters.json';
import SuiIshidaBar from './components/SuiIshidaBar';
import SuiIshidaLobby from './components/SuiIshidaLobby';
import HomeHub from './components/HomeHub';
import ChoujinHub from './components/ChoujinHub';
import ArenaHeader from './components/ArenaHeader';
import ClassicMode from './components/ClassicMode';
import QuoteMode from './components/QuoteMode';
import MaskMode from './components/MaskMode';
import VictoryModal from './components/VictoryModal';
import StatsModal from './components/StatsModal';
import HelpModal from './components/HelpModal';
import {
  getDailyTargets,
  getDailyEditionNumber,
  getTodayKey,
  pickRandomCharacter,
} from './utils/gameLogic';
import { syncDocumentSeo } from './utils/seo';
import {
  loadDailyState,
  saveDailyState,
  loadInfiniteState,
  saveInfiniteState,
  loadPlayerStats,
  recordGameVictory,
  loadSessionPrefs,
  saveSessionPrefs,
  deepFreeze,
} from './utils/storage';

deepFreeze(tgCharactersData);
deepFreeze(cxCharactersData);

const VALID_MODES = ['classic', 'quote', 'mask'];

function buildPath(view, universe, mode) {
  if (view === 'lobby') return '/';
  const slug = universe === 'cx' ? '/choujinxdle' : '/ghouldle';
  if (view === 'hub') return slug;
  if (view === 'game' && VALID_MODES.includes(mode)) {
    return `${slug}/${mode}`;
  }
  return slug;
}

function readInitialRoute() {
  if (typeof window === 'undefined') {
    return { universe: 'tg', view: 'lobby', mode: 'classic' };
  }

  const pathname = (window.location.pathname || '/')
    .toLowerCase()
    .replace(/\/+$/, '');
  const segments = pathname.split('/').filter(Boolean);

  // 1. Check clean URL path (/ghouldle, /ghouldle/classic, /choujinxdle, /choujinxdle/classic)
  if (segments.length > 0) {
    const first = segments[0];
    const second = segments[1];

    if (first === 'ghouldle' || first === 'tg') {
      if (second && VALID_MODES.includes(second)) {
        return { universe: 'tg', view: 'game', mode: second };
      }
      return { universe: 'tg', view: 'hub', mode: 'classic' };
    }

    if (first === 'choujinxdle' || first === 'choujindle' || first === 'choujinx' || first === 'cx') {
      if (second && VALID_MODES.includes(second)) {
        return { universe: 'cx', view: 'game', mode: second };
      }
      return { universe: 'cx', view: 'hub', mode: 'classic' };
    }
  }

  // 2. Fallback support for legacy hash URLs if bookmarked
  const hash = window.location.hash.replace('#', '').trim().toLowerCase();
  if (hash === 'tg' || hash === 'ghoul' || hash === 'ghouldle') {
    return { universe: 'tg', view: 'hub', mode: 'classic' };
  }
  if (hash === 'cx' || hash === 'choujin' || hash === 'choujindle' || hash === 'choujinxdle') {
    return { universe: 'cx', view: 'hub', mode: 'classic' };
  }
  if (hash.startsWith('cx-')) {
    const subMode = hash.replace('cx-', '');
    if (VALID_MODES.includes(subMode)) {
      return { universe: 'cx', view: 'game', mode: subMode };
    }
  }
  if (VALID_MODES.includes(hash)) {
    return { universe: 'tg', view: 'game', mode: hash };
  }

  return { universe: 'tg', view: 'lobby', mode: 'classic' };
}

export default function App() {
  const initialRoute = readInitialRoute();
  const [universe, setUniverse] = useState(initialRoute.universe);
  const [view, setView] = useState(initialRoute.view);
  const [activeMode, setActiveMode] = useState(initialRoute.mode);
  const [isDaily, setIsDaily] = useState(() => loadSessionPrefs().isDaily);
  const [lang, setLang] = useState(() => loadSessionPrefs().lang || 'pt');

  const [dailyStates, setDailyStates] = useState(() => ({
    tg: loadDailyState('tg', tgCharactersData),
    cx: loadDailyState('cx', cxCharactersData),
  }));
  const [infiniteStates, setInfiniteStates] = useState(() => ({
    tg: loadInfiniteState(tgCharactersData, 'tg'),
    cx: loadInfiniteState(cxCharactersData, 'cx'),
  }));
  const [statsByUniverse, setStatsByUniverse] = useState(() => ({
    tg: loadPlayerStats('tg'),
    cx: loadPlayerStats('cx'),
  }));

  const [lastAnimatedGuessId, setLastAnimatedGuessId] = useState(null);
  const [victoryModalOpen, setVictoryModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const victoryTimerRef = useRef(null);

  const activeCharacters = universe === 'cx' ? cxCharactersData : tgCharactersData;
  const dailyState = dailyStates[universe];
  const infiniteState = infiniteStates[universe];
  const stats = statsByUniverse[universe];

  const charactersById = useMemo(() => {
    const map = {};
    activeCharacters.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, [activeCharacters]);

  // Sync with browser Back / Forward buttons via popstate and hashchange
  useEffect(() => {
    const syncFromUrl = () => {
      const next = readInitialRoute();
      setUniverse(next.universe);
      setView(next.view);
      setActiveMode(next.mode);
      setVictoryModalOpen(false);
      setLastAnimatedGuessId(null);
    };
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, []);

  // Dynamically update document title, canonical URL, and OpenGraph meta tags based on active route
  useEffect(() => {
    syncDocumentSeo({ view, universe, mode: activeMode });
  }, [view, universe, activeMode]);

  // Re-check midnight UTC rollover & cross-tab storage synchronization
  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        document.designMode = 'off';
      }
    } catch {
      // Ignore
    }

    const checkRollover = setInterval(() => {
      const currentKey = getTodayKey();
      if (dailyStates.tg.dateKey !== currentKey || dailyStates.cx.dateKey !== currentKey) {
        setDailyStates({
          tg: loadDailyState('tg', tgCharactersData),
          cx: loadDailyState('cx', cxCharactersData),
        });
      }
    }, 15000);

    const handleStorageSync = () => {
      setDailyStates({
        tg: loadDailyState('tg', tgCharactersData),
        cx: loadDailyState('cx', cxCharactersData),
      });
      setInfiniteStates({
        tg: loadInfiniteState(tgCharactersData, 'tg'),
        cx: loadInfiniteState(cxCharactersData, 'cx'),
      });
      setStatsByUniverse({
        tg: loadPlayerStats('tg'),
        cx: loadPlayerStats('cx'),
      });
      const prefs = loadSessionPrefs();
      setIsDaily(prefs.isDaily);
      if (prefs.lang) setLang(prefs.lang);
    };

    window.addEventListener('storage', handleStorageSync);
    return () => {
      clearInterval(checkRollover);
      window.removeEventListener('storage', handleStorageSync);
    };
  }, [dailyStates.tg.dateKey, dailyStates.cx.dateKey]);

  const dailyTargets = useMemo(
    () => getDailyTargets(activeCharacters, dailyState.dateKey, universe),
    [activeCharacters, dailyState.dateKey, universe]
  );

  const editionNumber = useMemo(
    () => getDailyEditionNumber(),
    [dailyState.dateKey]
  );

  const currentBoardState = isDaily
    ? dailyState.modes[activeMode]
    : infiniteState.modes[activeMode];

  const currentTarget = useMemo(() => {
    if (isDaily) {
      return dailyTargets[activeMode] || activeCharacters[0];
    }
    const targetId = infiniteState.modes[activeMode]?.targetId;
    return charactersById[targetId] || activeCharacters[0];
  }, [isDaily, activeMode, dailyTargets, infiniteState, charactersById, activeCharacters]);

  const tgCompletedModes = useMemo(() => {
    const src = isDaily ? dailyStates.tg.modes : infiniteStates.tg.modes;
    return {
      classic: Boolean(src.classic?.won),
      quote: Boolean(src.quote?.won),
      mask: Boolean(src.mask?.won),
    };
  }, [isDaily, dailyStates.tg, infiniteStates.tg]);

  const cxCompletedModes = useMemo(() => {
    const src = isDaily ? dailyStates.cx.modes : infiniteStates.cx.modes;
    return {
      classic: Boolean(src.classic?.won),
      quote: Boolean(src.quote?.won),
      mask: Boolean(src.mask?.won),
    };
  }, [isDaily, dailyStates.cx, infiniteStates.cx]);

  const completedModes = universe === 'cx' ? cxCompletedModes : tgCompletedModes;

  const tgCompletedCount = useMemo(
    () => Object.values(tgCompletedModes).filter(Boolean).length,
    [tgCompletedModes]
  );

  const cxCompletedCount = useMemo(
    () => Object.values(cxCompletedModes).filter(Boolean).length,
    [cxCompletedModes]
  );

  useEffect(() => {
    return () => {
      if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    };
  }, []);

  const navigateUrl = (nextView, nextUniverse, nextMode) => {
    if (typeof window === 'undefined') return;
    const nextPath = buildPath(nextView, nextUniverse, nextMode);
    if (window.location.pathname !== nextPath || window.location.hash) {
      window.history.pushState({ view: nextView, universe: nextUniverse, mode: nextMode }, '', nextPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToLobby = () => {
    if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    setVictoryModalOpen(false);
    setLastAnimatedGuessId(null);
    setView('lobby');
    navigateUrl('lobby', universe, activeMode);
  };

  const handleSelectUniverse = (nextUniverse) => {
    if (nextUniverse !== 'tg' && nextUniverse !== 'cx') return;
    if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    setVictoryModalOpen(false);
    setLastAnimatedGuessId(null);
    setUniverse(nextUniverse);
    setView('hub');
    navigateUrl('hub', nextUniverse, activeMode);
  };

  const handleEnterUniverseMode = (targetUniverse, nextMode) => {
    if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    setVictoryModalOpen(false);
    setLastAnimatedGuessId(null);
    setUniverse(targetUniverse);
    setActiveMode(nextMode);
    setView('game');
    navigateUrl('game', targetUniverse, nextMode);
  };

  const handleEnterMode = (nextMode) => {
    handleEnterUniverseMode(universe, nextMode);
  };

  const handleBackToHub = () => {
    if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    setVictoryModalOpen(false);
    setLastAnimatedGuessId(null);
    setView('hub');
    navigateUrl('hub', universe, activeMode);
  };

  const handleTogglePlayType = (nextIsDaily) => {
    if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    setVictoryModalOpen(false);
    setLastAnimatedGuessId(null);
    setIsDaily(nextIsDaily);
    saveSessionPrefs({ isDaily: nextIsDaily, lang });
  };

  const handleChangeLang = (nextLang) => {
    if (nextLang !== 'pt' && nextLang !== 'en') return;
    setLang(nextLang);
    saveSessionPrefs({ isDaily, lang: nextLang });
  };

  const handleGuess = (chosenCharacter) => {
    if (!chosenCharacter || currentBoardState.won) return;
    if (currentBoardState.guesses.includes(chosenCharacter.id)) return;

    const nextGuesses = [chosenCharacter.id, ...currentBoardState.guesses];
    const isHit = chosenCharacter.id === currentTarget.id;

    if (activeMode === 'classic') {
      setLastAnimatedGuessId(chosenCharacter.id);
    }

    if (isDaily) {
      const updated = {
        ...dailyState,
        modes: {
          ...dailyState.modes,
          [activeMode]: {
            ...currentBoardState,
            guesses: nextGuesses,
            won: isHit,
          },
        },
      };
      setDailyStates((prev) => ({ ...prev, [universe]: updated }));
      saveDailyState(updated, universe);
    } else {
      const updated = {
        ...infiniteState,
        modes: {
          ...infiniteState.modes,
          [activeMode]: {
            ...currentBoardState,
            guesses: nextGuesses,
            won: isHit,
          },
        },
      };
      setInfiniteStates((prev) => ({ ...prev, [universe]: updated }));
      saveInfiniteState(updated, universe);
    }

    if (isHit) {
      const updatedStats = recordGameVictory({
        stats,
        mode: activeMode,
        attempts: nextGuesses.length,
        isDaily,
        universe,
      });
      setStatsByUniverse((prev) => ({ ...prev, [universe]: updatedStats }));

      const modalDelay = activeMode === 'classic' ? 1500 : 480;
      if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
      victoryTimerRef.current = setTimeout(() => {
        setVictoryModalOpen(true);
      }, modalDelay);
    }
  };

  const handleRevealHint = (hintKey) => {
    if (currentBoardState.revealedHints?.includes(hintKey)) return;
    const nextHints = [...(currentBoardState.revealedHints || []), hintKey];

    if (isDaily) {
      const updated = {
        ...dailyState,
        modes: {
          ...dailyState.modes,
          [activeMode]: {
            ...currentBoardState,
            revealedHints: nextHints,
          },
        },
      };
      setDailyStates((prev) => ({ ...prev, [universe]: updated }));
      saveDailyState(updated, universe);
    } else {
      const updated = {
        ...infiniteState,
        modes: {
          ...infiniteState.modes,
          [activeMode]: {
            ...currentBoardState,
            revealedHints: nextHints,
          },
        },
      };
      setInfiniteStates((prev) => ({ ...prev, [universe]: updated }));
      saveInfiniteState(updated, universe);
    }
  };

  const handleNewInfiniteRound = () => {
    if (isDaily) return;
    if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    setLastAnimatedGuessId(null);
    setVictoryModalOpen(false);

    const nextTarget = pickRandomCharacter(activeCharacters, currentTarget.id);
    const updated = {
      ...infiniteState,
      modes: {
        ...infiniteState.modes,
        [activeMode]: {
          targetId: nextTarget.id,
          guesses: [],
          won: false,
          revealedHints: [],
        },
      },
    };
    setInfiniteStates((prev) => ({ ...prev, [universe]: updated }));
    saveInfiniteState(updated, universe);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080709] text-[#efe9dd] relative">
      {/* Subtle Tactile Print Grain Overlay across entire application */}
      <div aria-hidden="true" className="fixed inset-0 z-40 tg-grain-overlay" />

      {/* Top Sui Ishida Dle Dual-Universe & Lobby Bar */}
      <SuiIshidaBar
        view={view}
        universe={universe}
        onGoToLobby={handleGoToLobby}
        onSelectUniverse={handleSelectUniverse}
        tgCompletedCount={tgCompletedCount}
        cxCompletedCount={cxCompletedCount}
        lang={lang}
        onChangeLang={handleChangeLang}
      />

      {view === 'lobby' ? (
        <div key="lobby-stage" className="flex-1 flex flex-col animate-universe-switch">
          <SuiIshidaLobby
            onEnterUniverseHub={handleSelectUniverse}
            onEnterUniverseMode={handleEnterUniverseMode}
            isDaily={isDaily}
            onTogglePlayType={handleTogglePlayType}
            editionNumber={editionNumber}
            tgCompletedModes={tgCompletedModes}
            cxCompletedModes={cxCompletedModes}
            tgStats={statsByUniverse.tg}
            cxStats={statsByUniverse.cx}
            lang={lang}
          />
        </div>
      ) : view === 'hub' ? (
        <div key={`hub-${universe}`} className="flex-1 flex flex-col animate-universe-switch">
          {universe === 'cx' ? (
            <ChoujinHub
              onEnterMode={handleEnterMode}
              isDaily={isDaily}
              onTogglePlayType={handleTogglePlayType}
              editionNumber={editionNumber}
              completedModes={completedModes}
              stats={stats}
              onOpenStats={() => setStatsModalOpen(true)}
              onOpenHelp={() => setHelpModalOpen(true)}
              lang={lang}
            />
          ) : (
            <HomeHub
              onEnterMode={handleEnterMode}
              isDaily={isDaily}
              onTogglePlayType={handleTogglePlayType}
              editionNumber={editionNumber}
              completedModes={completedModes}
              stats={stats}
              onOpenStats={() => setStatsModalOpen(true)}
              onOpenHelp={() => setHelpModalOpen(true)}
              lang={lang}
            />
          )}
        </div>
      ) : (
        <div
          key={`game-${universe}`}
          className={`min-h-screen flex flex-col animate-universe-switch ${
            universe === 'cx' ? 'bg-[#0a0a0c] bg-halftone text-[#f4f1ea]' : 'bg-kaneki-subtle'
          }`}
        >
          <ArenaHeader
            universe={universe}
            activeMode={activeMode}
            onSelectMode={handleEnterMode}
            onBackToHub={handleBackToHub}
            completedModes={completedModes}
            isDaily={isDaily}
            onTogglePlayType={handleTogglePlayType}
            onNewInfiniteRound={handleNewInfiniteRound}
            editionNumber={editionNumber}
            streak={stats.currentStreak}
            onOpenStats={() => setStatsModalOpen(true)}
            onOpenHelp={() => setHelpModalOpen(true)}
            lang={lang}
          />

          <main className="flex-1 pb-14">
            {activeMode === 'classic' && (
              <ClassicMode
                universe={universe}
                characters={activeCharacters}
                charactersById={charactersById}
                target={currentTarget}
                guesses={currentBoardState.guesses}
                won={currentBoardState.won}
                isDaily={isDaily}
                editionNumber={editionNumber}
                revealedHints={currentBoardState.revealedHints}
                lastAnimatedGuessId={lastAnimatedGuessId}
                onGuess={handleGuess}
                onRevealHint={handleRevealHint}
                onOpenVictoryModal={() => setVictoryModalOpen(true)}
                lang={lang}
              />
            )}

            {activeMode === 'quote' && (
              <QuoteMode
                universe={universe}
                characters={activeCharacters}
                charactersById={charactersById}
                target={currentTarget}
                guesses={currentBoardState.guesses}
                won={currentBoardState.won}
                isDaily={isDaily}
                editionNumber={editionNumber}
                onGuess={handleGuess}
                onOpenVictoryModal={() => setVictoryModalOpen(true)}
                lang={lang}
              />
            )}

            {activeMode === 'mask' && (
              <MaskMode
                universe={universe}
                characters={activeCharacters}
                charactersById={charactersById}
                target={currentTarget}
                guesses={currentBoardState.guesses}
                won={currentBoardState.won}
                isDaily={isDaily}
                editionNumber={editionNumber}
                onGuess={handleGuess}
                onOpenVictoryModal={() => setVictoryModalOpen(true)}
                lang={lang}
              />
            )}
          </main>

          <footer
            className={
              universe === 'cx'
                ? 'border-t-[3px] border-[#FFE600] py-4 px-4 text-center text-xs text-[#f4f1ea] bg-[#0a0a0c]'
                : 'border-t border-[#efe9dd]/12 py-4 px-4 text-center text-xs text-[#8d857b] bg-[#080709]'
            }
          >
            {universe === 'cx' ? (
              <p className="font-mono font-bold uppercase tracking-wider">
                <strong className="px-2 py-0.5 bg-[#FFE600] text-[#0a0a0c] font-display tracking-[0.14em] mr-1">
                  CHOUJINXDLE
                </strong>{' '}
                — {lang === 'en' ? 'Pop-Punk Zine of' : 'Zine Pop-Punk de'}{' '}
                <em className="text-[#A3FF00] not-italic">Choujin X</em> (Sui Ishida Dle)
              </p>
            ) : (
              <p className="font-serif">
                <strong className="font-display tracking-[0.12em] text-[#efe9dd]">GHOULDLE</strong>{' '}
                — {lang === 'en' ? 'Unofficial Archive of' : 'Arquivo não-oficial de'}{' '}
                <em className="text-[#cfc6b6]">Tokyo Ghoul &amp; :re</em> (Sui Ishida Dle)
              </p>
            )}
          </footer>
        </div>
      )}

      {/* Global Stamped Modals */}
      <VictoryModal
        universe={universe}
        isOpen={victoryModalOpen}
        onClose={() => setVictoryModalOpen(false)}
        mode={activeMode}
        isDaily={isDaily}
        editionNumber={editionNumber}
        target={currentTarget}
        guesses={currentBoardState.guesses}
        stats={stats}
        charactersById={charactersById}
        completedModes={completedModes}
        onSelectMode={handleEnterMode}
        onNewInfiniteRound={handleNewInfiniteRound}
        lang={lang}
      />

      <StatsModal
        universe={universe}
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        stats={stats}
        lang={lang}
      />

      <HelpModal
        universe={universe}
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
