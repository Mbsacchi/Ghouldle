import React, { useState, useMemo, useEffect, useRef } from 'react';
import charactersData from './data/characters.json';
import HomeHub from './components/HomeHub';
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
  if (typeof window === 'undefined') return { view: 'hub', mode: 'classic' };
  const hash = window.location.hash.replace('#', '').trim().toLowerCase();
  if (VALID_MODES.includes(hash)) {
    return { view: 'game', mode: hash };
  }
  return { view: 'hub', mode: 'classic' };
}

export default function App() {
  const initialRoute = readInitialRoute();
  const [view, setView] = useState(initialRoute.view);
  const [activeMode, setActiveMode] = useState(initialRoute.mode);
  const [isDaily, setIsDaily] = useState(true);

  const [dailyState, setDailyState] = useState(() => loadDailyState());
  const [infiniteState, setInfiniteState] = useState(() =>
    loadInfiniteState(charactersData)
  );
  const [stats, setStats] = useState(() => loadPlayerStats());

  const [lastAnimatedGuessId, setLastAnimatedGuessId] = useState(null);
  const [victoryModalOpen, setVictoryModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const victoryTimerRef = useRef(null);

  const charactersById = useMemo(() => {
    const map = {};
    charactersData.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, []);

  // Sync with browser Back / Forward buttons via hashchange
  useEffect(() => {
    const onHashChange = () => {
      const next = readInitialRoute();
      setView(next.view);
      setActiveMode(next.mode);
      setVictoryModalOpen(false);
      setLastAnimatedGuessId(null);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Re-check midnight rollover automatically
  useEffect(() => {
    const checkRollover = setInterval(() => {
      const currentKey = getTodayKey();
      if (dailyState.dateKey !== currentKey) {
        setDailyState(loadDailyState());
      }
    }, 15000);
    return () => clearInterval(checkRollover);
  }, [dailyState.dateKey]);

  const dailyTargets = useMemo(
    () => getDailyTargets(charactersData, dailyState.dateKey),
    [dailyState.dateKey]
  );

  const editionNumber = useMemo(() => getDailyEditionNumber(), [dailyState.dateKey]);

  const currentBoardState = isDaily
    ? dailyState.modes[activeMode]
    : infiniteState.modes[activeMode];

  const currentTarget = useMemo(() => {
    if (isDaily) {
      return dailyTargets[activeMode] || charactersData[0];
    }
    const targetId = infiniteState.modes[activeMode]?.targetId;
    return charactersById[targetId] || charactersData[0];
  }, [isDaily, activeMode, dailyTargets, infiniteState, charactersById]);

  const completedModes = useMemo(() => {
    const src = isDaily ? dailyState.modes : infiniteState.modes;
    return {
      classic: Boolean(src.classic?.won),
      quote: Boolean(src.quote?.won),
      mask: Boolean(src.mask?.won),
    };
  }, [isDaily, dailyState, infiniteState]);

  useEffect(() => {
    return () => {
      if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    };
  }, []);

  const handleEnterMode = (nextMode) => {
    if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    setVictoryModalOpen(false);
    setLastAnimatedGuessId(null);
    setActiveMode(nextMode);
    setView('game');
    if (typeof window !== 'undefined') {
      window.location.hash = nextMode;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToHub = () => {
    if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    setVictoryModalOpen(false);
    setLastAnimatedGuessId(null);
    setView('hub');
    if (typeof window !== 'undefined') {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
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
      setDailyState(updated);
      saveDailyState(updated);
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
      setInfiniteState(updated);
      saveInfiniteState(updated);
    }

    if (isHit) {
      const updatedStats = recordGameVictory({
        stats,
        mode: activeMode,
        attempts: nextGuesses.length,
        isDaily,
      });
      setStats(updatedStats);

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
      setDailyState(updated);
      saveDailyState(updated);
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
      setInfiniteState(updated);
      saveInfiniteState(updated);
    }
  };

  const handleNewInfiniteRound = () => {
    if (isDaily) return;
    if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current);
    setLastAnimatedGuessId(null);
    setVictoryModalOpen(false);

    const nextTarget = pickRandomCharacter(charactersData, currentTarget.id);
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
    setInfiniteState(updated);
    saveInfiniteState(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080709] text-[#efe9dd] relative">
      {/* Subtle Tactile Print Grain Overlay across entire application */}
      <div aria-hidden="true" className="fixed inset-0 z-40 tg-grain-overlay" />

      {view === 'hub' ? (
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
      ) : (
        <div className="min-h-screen flex flex-col bg-kaneki-subtle">
          <ArenaHeader
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
                characters={charactersData}
                charactersById={charactersById}
                target={currentTarget}
                guesses={currentBoardState.guesses}
                won={currentBoardState.won}
                revealedHints={currentBoardState.revealedHints}
                lastAnimatedGuessId={lastAnimatedGuessId}
                onGuess={handleGuess}
                onRevealHint={handleRevealHint}
                onOpenVictoryModal={() => setVictoryModalOpen(true)}
              />
            )}

            {activeMode === 'quote' && (
              <QuoteMode
                characters={charactersData}
                charactersById={charactersById}
                target={currentTarget}
                guesses={currentBoardState.guesses}
                won={currentBoardState.won}
                onGuess={handleGuess}
                onOpenVictoryModal={() => setVictoryModalOpen(true)}
              />
            )}

            {activeMode === 'mask' && (
              <MaskMode
                characters={charactersData}
                charactersById={charactersById}
                target={currentTarget}
                guesses={currentBoardState.guesses}
                won={currentBoardState.won}
                onGuess={handleGuess}
                onOpenVictoryModal={() => setVictoryModalOpen(true)}
              />
            )}
          </main>

          <footer className="border-t border-[#efe9dd]/12 py-4 px-4 text-center text-xs text-[#8d857b] bg-[#080709]">
            <p className="font-serif">
              <strong className="font-display tracking-[0.12em] text-[#efe9dd]">GHOULDLE</strong>{' '}
              — Arquivo não-oficial de <em className="text-[#cfc6b6]">Tokyo Ghoul &amp; :re</em> (Sui Ishida)
            </p>
          </footer>
        </div>
      )}

      {/* Global Stamped Modals */}
      <VictoryModal
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
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        stats={stats}
      />

      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />
    </div>
  );
}
