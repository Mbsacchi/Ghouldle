import React, { useState, useMemo, useEffect, useRef } from 'react';
import tgCharactersData from './data/characters.json';
import cxCharactersData from './data/choujinCharacters.json';
import SuiIshidaBar from './components/SuiIshidaBar';
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
import {
  loadDailyState,
  saveDailyState,
  loadInfiniteState,
  saveInfiniteState,
  loadPlayerStats,
  recordGameVictory,
} from './utils/storage';

const VALID_MODES = ['classic', 'quote', 'mask'];

function readInitialRoute() {
  if (typeof window === 'undefined') {
    return { universe: 'tg', view: 'hub', mode: 'classic' };
  }
  const hash = window.location.hash.replace('#', '').trim().toLowerCase();
  if (hash === 'cx' || hash === 'choujin' || hash === 'choujindle') {
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
  return { universe: 'tg', view: 'hub', mode: 'classic' };
}

export default function App() {
  const initialRoute = readInitialRoute();
  const [universe, setUniverse] = useState(initialRoute.universe);
  const [view, setView] = useState(initialRoute.view);
  const [activeMode, setActiveMode] = useState(initialRoute.mode);
  const [isDaily, setIsDaily] = useState(true);

  const [dailyStates, setDailyStates] = useState(() => ({
    tg: loadDailyState('tg'),
    cx: loadDailyState('cx'),
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

  // Sync with browser Back / Forward buttons via hashchange
  useEffect(() => {
    const onHashChange = () => {
      const next = readInitialRoute();
      setUniverse(next.universe);
      setView(next.view);
      setActiveMode(next.mode);
      setVictoryModalOpen(false);
      setLastAnimatedGuessId(null);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Re-check midnight UTC rollover automatically for both games
  useEffect(() => {
    const checkRollover = setInterval(() => {
      const currentKey = getTodayKey();
      if (dailyStates.tg.dateKey !== currentKey || dailyStates.cx.dateKey !== currentKey) {
        setDailyStates({
          tg: loadDailyState('tg'),
          cx: loadDailyState('cx'),
        });
      }
    }, 15000);
    return () => clearInterval(checkRollover);
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

  const completedModes = useMemo(() => {
    const src = isDaily ? dailyState.modes : infiniteState.modes;
    return {
      classic: Boolean(src.classic?.won),
      quote: Boolean(src.quote?.won),
      mask: Boolean(src.mask?.won),
    };
  }, [isDaily, dailyState, infiniteState]);

  const tgCompletedCount = useMemo(() => {
    const src = isDaily ? dailyStates.tg.modes : infiniteStates.tg.modes;
    return ['classic', 'quote', 'mask'].filter((m) => Boolean(src[m]?.won)).length;
  }, [isDaily, dailyStates.tg, infiniteStates.tg]);

  const cxCompletedCount = useMemo(() => {
    const src = isDaily ? dailyStates.cx.modes : infiniteStates.cx.modes;
    return ['classic', 'quote', 'mask'].filter((m) => Boolean(src[m]?.won)).length;
  }, [isDaily, dailyStates.cx, infiniteStates.cx]);

  useEffect(() => {
    return () => {
      if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    };
  }, []);

  const handleSelectUniverse = (nextUniverse) => {
    if (nextUniverse !== 'tg' && nextUniverse !== 'cx') return;
    if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    setVictoryModalOpen(false);
    setLastAnimatedGuessId(null);
    setUniverse(nextUniverse);
    setView('hub');
    if (typeof window !== 'undefined') {
      if (nextUniverse === 'cx') {
        window.location.hash = 'cx';
      } else {
        window.history.pushState('', document.title, window.location.pathname + window.location.search);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEnterMode = (nextMode) => {
    if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    setVictoryModalOpen(false);
    setLastAnimatedGuessId(null);
    setActiveMode(nextMode);
    setView('game');
    if (typeof window !== 'undefined') {
      window.location.hash = universe === 'cx' ? `cx-${nextMode}` : nextMode;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToHub = () => {
    if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    setVictoryModalOpen(false);
    setLastAnimatedGuessId(null);
    setView('hub');
    if (typeof window !== 'undefined') {
      if (universe === 'cx') {
        window.location.hash = 'cx';
      } else {
        window.history.pushState('', document.title, window.location.pathname + window.location.search);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTogglePlayType = (nextIsDaily) => {
    if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    setVictoryModalOpen(false);
    setLastAnimatedGuessId(null);
    setIsDaily(nextIsDaily);
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

      {/* Top Sui Ishida Dle Dual-Universe Switcher Bar */}
      <SuiIshidaBar
        universe={universe}
        onSelectUniverse={handleSelectUniverse}
        tgCompletedCount={tgCompletedCount}
        cxCompletedCount={cxCompletedCount}
        editionNumber={editionNumber}
      />

      {view === 'hub' ? (
        universe === 'cx' ? (
          <ChoujinHub
            onEnterMode={handleEnterMode}
            isDaily={isDaily}
            onTogglePlayType={handleTogglePlayType}
            editionNumber={editionNumber}
            completedModes={completedModes}
            stats={stats}
            onOpenStats={() => setStatsModalOpen(true)}
            onOpenHelp={() => setHelpModalOpen(true)}
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
          />
        )
      ) : (
        <div className="min-h-screen flex flex-col bg-kaneki-subtle">
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
              />
            )}

            {activeMode === 'quote' && (
              <QuoteMode
                characters={activeCharacters}
                charactersById={charactersById}
                target={currentTarget}
                guesses={currentBoardState.guesses}
                won={currentBoardState.won}
                isDaily={isDaily}
                editionNumber={editionNumber}
                onGuess={handleGuess}
                onOpenVictoryModal={() => setVictoryModalOpen(true)}
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
              />
            )}
          </main>

          <footer className="border-t border-[#efe9dd]/12 py-4 px-4 text-center text-xs text-[#8d857b] bg-[#080709]">
            {universe === 'cx' ? (
              <p className="font-serif">
                <strong className="font-display tracking-[0.12em] text-[#efe9dd]">CHOUJINDLE</strong>{' '}
                — Arquivo não-oficial de <em className="text-[#a3e635]">Choujin X</em> (Sui Ishida Dle)
              </p>
            ) : (
              <p className="font-serif">
                <strong className="font-display tracking-[0.12em] text-[#efe9dd]">GHOULDLE</strong>{' '}
                — Arquivo não-oficial de <em className="text-[#cfc6b6]">Tokyo Ghoul &amp; :re</em> (Sui Ishida Dle)
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
      />

      <StatsModal
        universe={universe}
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        stats={stats}
      />

      <HelpModal
        universe={universe}
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />
    </div>
  );
}
