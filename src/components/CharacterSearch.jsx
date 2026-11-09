import React, { useState, useRef, useEffect, useMemo } from 'react';
import CharacterAvatar from './visuals/CharacterAvatar';
import { normalizeSearch } from '../utils/gameLogic';
import { localizeCharacter, translateAttr } from '../utils/i18n';

export default function CharacterSearch({
  characters,
  guessedIds = [],
  disabled = false,
  hideAvatars = false,
  onSelectCharacter,
  placeholder,
  lang = 'pt',
  universe = 'tg',
}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIdx, setHighlightedIdx] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const isEn = lang === 'en';
  const defaultPlaceholder =
    universe === 'cx'
      ? isEn
        ? 'Type the name of a Choujin or Yamato Mori keeper...'
        : 'Digite o nome de um Choujin ou Guardião de Yamato Mori...'
      : isEn
      ? 'Type the name of a Ghoul or CCG Investigator...'
      : 'Digite o nome de um Ghoul ou Investigador da CCG...';
  const resolvedPlaceholder = placeholder || defaultPlaceholder;

  const guessedSet = useMemo(() => new Set(guessedIds), [guessedIds]);

  const availableCharacters = useMemo(
    () => characters.filter((c) => !guessedSet.has(c.id)),
    [characters, guessedSet]
  );

  const filtered = useMemo(() => {
    const q = normalizeSearch(query);
    if (!q) {
      return availableCharacters;
    }

    return availableCharacters
      .map((char) => {
        const normName = normalizeSearch(char.name);
        const locChar = localizeCharacter(char, 'en');
        const extraAliases = locChar?.epithet ? [locChar.epithet] : [];
        const allAliases = [...(char.aliases || []), ...extraAliases];
        const matchedAlias = allAliases.find((al) =>
          normalizeSearch(al).includes(q)
        );
        const startsWith =
          normName.startsWith(q) ||
          normName.split(' ').some((part) => part.startsWith(q));
        const includesName = normName.includes(q);

        if (!includesName && !matchedAlias) return null;

        return {
          char,
          matchedAlias: !includesName && matchedAlias ? matchedAlias : null,
          score: startsWith ? 2 : includesName ? 1 : 0.5,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || a.char.name.localeCompare(b.char.name));
  }, [availableCharacters, query]);

  useEffect(() => {
    setHighlightedIdx(0);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChoose = (char) => {
    if (!char || disabled) return;
    onSelectCharacter(char);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIdx((prev) =>
        filtered.length > 0 ? (prev + 1) % filtered.length : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIdx((prev) =>
        filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered.length > 0 && (isOpen || query.trim().length > 0)) {
        const picked = filtered[highlightedIdx]?.char || filtered[0]?.char || filtered[0];
        handleChoose(picked.char || picked);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const normalizedResults = filtered.map((item) =>
    item.char ? item : { char: item, matchedAlias: null }
  );

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto z-20">
      <div
        className={`flex items-stretch border transition-colors shadow-[4px_4px_0_#000] ${
          disabled
            ? 'bg-[#0e0d11] border-[#efe9dd]/10 opacity-55 cursor-not-allowed'
            : isOpen
            ? 'bg-[#0d0c10] border-[#efe9dd]'
            : 'bg-[#0d0c10] border-[#efe9dd]/35 hover:border-[#efe9dd]/70'
        }`}
      >
        {/* Left Crimson Index Tag */}
        <div className="w-11 shrink-0 bg-[#1a080b] border-r border-[#efe9dd]/20 flex items-center justify-center font-serif text-sm font-bold text-[#d9141e] select-none">
          索
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          disabled={disabled}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            disabled
              ? isEn
                ? 'Case closed. Open the report or switch modes.'
                : 'Caso encerrado. Abra o relatório ou alterne de modo.'
              : resolvedPlaceholder
          }
          className="w-full px-3.5 py-3 bg-transparent text-sm sm:text-base text-[#efe9dd] placeholder-[#8d857b] focus:outline-none"
          autoComplete="off"
        />

        {query.trim().length > 0 && normalizedResults.length > 0 && !disabled && (
          <button
            type="button"
            onClick={() =>
              handleChoose(
                normalizedResults[highlightedIdx]?.char || normalizedResults[0]?.char
              )
            }
            className="px-4 bg-[#b80f17] hover:bg-[#d9141e] text-[#efe9dd] font-display text-xs uppercase tracking-[0.14em] shrink-0 transition-colors border-l border-[#efe9dd]/25"
          >
            {isEn ? 'Submit ↵' : 'Confirmar ↵'}
          </button>
        )}
      </div>

      {/* CCG Personnel Dossier Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 mt-1.5 max-h-72 overflow-y-auto bg-[#0e0d11] border border-[#efe9dd]/65 shadow-[6px_6px_0_#000] divide-y divide-[#efe9dd]/10">
          {normalizedResults.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs font-mono uppercase tracking-wider text-[#8d857b]">
              {isEn ? 'No record found for ' : 'Nenhum registro localizado para '}
              <span className="text-[#d9141e]">&ldquo;{query}&rdquo;</span>
            </div>
          ) : (
            normalizedResults.map(({ char, matchedAlias }, idx) => {
              const isHighlighted = idx === highlightedIdx;
              return (
                <button
                  key={char.id}
                  type="button"
                  onMouseEnter={() => setHighlightedIdx(idx)}
                  onClick={() => handleChoose(char)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 text-left transition-colors ${
                    isHighlighted
                      ? 'bg-[#26090d] text-[#efe9dd] border-l-2 border-l-[#d9141e]'
                      : 'hover:bg-[#16141b] text-[#efe9dd]'
                  }`}
                >
                  {hideAvatars ? (
                    <span className="w-7 h-7 shrink-0 bg-[#141219] border border-[#efe9dd]/20 flex items-center justify-center font-mono text-[11px] text-[#d9141e] select-none">
                      {char.name[0]}
                    </span>
                  ) : (
                    <CharacterAvatar character={char} size="sm" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm sm:text-base truncate flex items-center gap-2">
                      <span>{char.name}</span>
                      {matchedAlias && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase bg-[#1a1820] border border-[#efe9dd]/20 text-[#cfc6b6] font-normal">
                          {matchedAlias}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-mono text-[#8d857b] truncate">
                      {char.affiliations
                        .slice(0, 2)
                        .map((a) => translateAttr(a, lang))
                        .join(' · ')}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8d857b] hidden sm:inline">
                    [↵]
                  </span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
