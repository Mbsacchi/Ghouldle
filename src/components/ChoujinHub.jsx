import React, { useEffect, useState } from 'react';
import {
  ChoujindleCrestLogo,
  ChoujinBeastPlumes,
  ChoujinModeEmblem,
  ChoujinPanelIllustration,
} from './visuals/ChoujinArtwork';
import { getTimeUntilMidnight } from '../utils/gameLogic';

const CHOUJIN_HUB_MODES = [
  {
    id: 'classic',
    kanji: '壱',
    code: 'YAMATO-01',
    title: 'Clássico',
    tagline: 'Compare natureza, afiliação, aptidão Choujin, classe e arco',
  },
  {
    id: 'quote',
    kanji: '弐',
    code: 'ORÁCULO-02',
    title: 'Citação',
    tagline: 'Descubra qual personagem de Choujin X proferiu a fala',
  },
  {
    id: 'mask',
    kanji: '参',
    code: 'CAOS-03',
    title: 'Forma & Olhar',
    tagline: 'Reconheça a forma bestial, máscara Noh ou olhar em Raise',
  },
];

const LEFT_YAMATO_PANELS = [
  {
    id: 'tokio',
    name: 'Tokio Kurohara',
    stamp: 'BESTA // ABUTRE HARPE',
    tilt: '-rotate-[2deg]',
    height: 'h-44 xl:h-48',
  },
  {
    id: 'azuma',
    name: 'Azuma Higashi',
    stamp: 'CHOUJIN // FERRO & GUERRA',
    tilt: 'rotate-[1.5deg] translate-x-4',
    height: 'h-36 xl:h-40',
  },
  {
    id: 'ely',
    name: 'Ely Otta',
    stamp: 'YAMATO // FUMAÇA',
    tilt: '-rotate-[1deg] translate-x-1',
    height: 'h-40 xl:h-44',
  },
];

const RIGHT_TOWER_PANELS = [
  {
    id: 'zora',
    name: 'Zora Siruha',
    stamp: 'TORRE // MÃE DAS BESTAS',
    tilt: 'rotate-[2deg]',
    height: 'h-44 xl:h-48',
  },
  {
    id: 'batista',
    name: 'Batista Hoshi',
    stamp: 'NUE // MÁSCARA NOH',
    tilt: '-rotate-[1.5deg] -translate-x-4',
    height: 'h-36 xl:h-40',
  },
  {
    id: 'sandek',
    name: 'Hoshi Sandek',
    stamp: 'YAMATO // GRAVIDADE',
    tilt: 'rotate-[1deg] -translate-x-1',
    height: 'h-40 xl:h-44',
  },
];

export default function ChoujinHub({
  onEnterMode,
  isDaily,
  onTogglePlayType,
  editionNumber,
  completedModes = {},
  stats,
  onOpenStats,
  onOpenHelp,
}) {
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const solvedCount = Object.values(completedModes).filter(Boolean).length;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#080907] text-[#efe9dd] flex flex-col justify-between select-none">
      {/* Top Yamato Mori & XEMBE Ink Rule */}
      <div className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-2 border-b border-[#efe9dd]/12 bg-[#080907]/95 text-[10px] font-mono tracking-[0.22em] text-[#8d857b] uppercase">
        <span>超人X // ARQUIVOS DE YAMATO MORI</span>
        <span className="hidden sm:inline text-[#cfc6b6]">
          RAISE · CHAOS · XEMBE · PREFEITURA DE YAMATO
        </span>
        <span className="text-[#a3e635]">
          {isDaily ? `EDIÇÃO #${editionNumber}` : 'TREINO LIVRE'}
        </span>
      </div>

      {/* Perspective Grid Floor at Horizon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-20%] bottom-0 h-[44vh] kaneki-sanctum-floor z-0 opacity-75"
      />

      {/* Vignette Ink Shadow over edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#080907_88%)]"
      />

      {/* Bottom Corner Beast Plumes & Opium Poppies */}
      <ChoujinBeastPlumes className="hidden sm:block absolute bottom-0 left-0 w-56 lg:w-72 z-10 opacity-90" />
      <ChoujinBeastPlumes
        flip
        className="hidden sm:block absolute bottom-0 right-0 w-56 lg:w-72 z-10 opacity-90"
      />

      {/* Far-Left Vertical Margin */}
      <div
        aria-hidden="true"
        className="hidden xl:flex flex-col items-center gap-4 absolute left-3 top-1/2 -translate-y-1/2 z-10 text-[11px] font-serif text-[#8d857b]/45 writing-vertical tracking-[0.35em]"
      >
        <span>大和守</span>
        <span>•</span>
        <span>超人覚醒</span>
      </div>

      {/* Far-Right Vertical Margin */}
      <div
        aria-hidden="true"
        className="hidden xl:flex flex-col items-center gap-4 absolute right-3 top-1/2 -translate-y-1/2 z-10 text-[11px] font-serif text-[#8d857b]/45 writing-vertical tracking-[0.35em]"
      >
        <span>弔いの塔</span>
        <span>•</span>
        <span>獣の刻印</span>
      </div>

      {/* Main 3-Column Stage */}
      <main className="relative z-20 flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
        {/* LEFT WING: YAMATO MORI */}
        <aside
          aria-label="Lado de Yamato Mori"
          className="hidden lg:flex lg:col-span-3 xl:col-span-3 flex-col gap-3.5 pr-2"
        >
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 bg-[#a3e635]" />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#a3e635]">
              大和守 // GUARDIÕES DE YAMATO
            </span>
          </div>

          {LEFT_YAMATO_PANELS.map((panel) => (
            <div
              key={panel.name}
              className={`group relative w-full ${panel.height} ${panel.tilt} transition-transform duration-300 hover:translate-x-1.5`}
            >
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[#4d7c0f] clip-manga-left" />

              <div className="relative w-full h-full bg-[#0b0d09] border-2 border-[#efe9dd]/85 clip-manga-left overflow-hidden">
                <ChoujinPanelIllustration panelId={panel.id} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080907] via-transparent to-[#080907]/30" />
                <div className="absolute inset-0 bg-manga-halftone opacity-55" />

                <div className="absolute bottom-2 left-2.5 right-4 flex items-end justify-between gap-2">
                  <div>
                    <span className="block font-mono text-[9px] tracking-[0.18em] text-[#a3e635] uppercase">
                      {panel.stamp}
                    </span>
                    <span className="font-serif text-sm font-bold text-[#efe9dd] drop-shadow">
                      {panel.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* CENTER HUB */}
        <section className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center w-full max-w-[470px] mx-auto">
          <div className="w-full flex items-center justify-center gap-3 sm:gap-5 mb-4">
            <button
              type="button"
              onClick={onOpenStats}
              title="Registro de Yamato Mori (Estatísticas)"
              className="group relative w-11 h-11 bg-[#10130e] border border-[#efe9dd]/35 hover:border-[#a3e635] shadow-[3px_3px_0_#000] flex flex-col items-center justify-center transition-all hover:-translate-y-0.5"
            >
              <span className="font-serif text-sm font-bold text-[#efe9dd] group-hover:text-[#a3e635] leading-none">
                録
              </span>
              <span className="font-mono text-[8px] uppercase tracking-wider text-[#8d857b] mt-0.5">
                {stats.currentStreak > 0 ? `${stats.currentStreak}d` : 'YM'}
              </span>
            </button>

            <ChoujindleCrestLogo />

            <button
              type="button"
              onClick={onOpenHelp}
              title="Manual de Yamato Mori (Como Jogar)"
              className="group relative w-11 h-11 bg-[#10130e] border border-[#efe9dd]/35 hover:border-[#a3e635] shadow-[3px_3px_0_#000] flex flex-col items-center justify-center transition-all hover:-translate-y-0.5"
            >
              <span className="font-serif text-sm font-bold text-[#efe9dd] group-hover:text-[#a3e635] leading-none">
                則
              </span>
              <span className="font-mono text-[8px] uppercase tracking-wider text-[#8d857b] mt-0.5">
                GUIA
              </span>
            </button>
          </div>

          {/* Subtitle */}
          <div className="w-full text-center mb-5 space-y-1">
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#84cc16]" />
              <p className="font-display text-sm sm:text-base tracking-[0.18em] uppercase text-[#efe9dd]">
                Adivinhe os personagens de{' '}
                <span className="text-[#a3e635] underline decoration-[#65a30d] underline-offset-4">
                  Choujin X
                </span>
              </p>
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#84cc16]" />
            </div>
            <p className="font-serif text-xs italic text-[#cfc6b6]/80">
              「Entre os Guardiões de Yamato Mori e a profecia da Torre do Luto」
            </p>
          </div>

          {/* Daily vs Infinite Switch Strip */}
          <div className="w-full flex items-center justify-center mb-4">
            <div className="inline-grid grid-cols-2 bg-[#0d100b] border border-[#efe9dd]/25 p-0.5 shadow-[3px_3px_0_#000]">
              <button
                type="button"
                onClick={() => onTogglePlayType(true)}
                className={`px-4 py-1.5 font-display text-xs tracking-[0.16em] uppercase transition-colors ${
                  isDaily
                    ? 'bg-[#65a30d] text-[#080907] font-bold'
                    : 'text-[#8d857b] hover:text-[#efe9dd]'
                }`}
              >
                Expediente Diário #{editionNumber}
              </button>
              <button
                type="button"
                onClick={() => onTogglePlayType(false)}
                className={`px-4 py-1.5 font-display text-xs tracking-[0.16em] uppercase transition-colors ${
                  !isDaily
                    ? 'bg-[#efe9dd] text-[#080907] font-bold'
                    : 'text-[#8d857b] hover:text-[#efe9dd]'
                }`}
              >
                Caçada Infinita
              </button>
            </div>
          </div>

          {/* 3 Stacked Mode Banners */}
          <nav aria-label="Escolha o Modo de Jogo" className="w-full space-y-3.5">
            {CHOUJIN_HUB_MODES.map((mode) => {
              const isSolved = Boolean(completedModes[mode.id]);

              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onEnterMode(mode.id)}
                  className="group relative w-full text-left block focus:outline-none"
                >
                  <div
                    className={`absolute inset-0 translate-x-1.5 translate-y-1.5 clip-mode-banner transition-transform duration-200 group-hover:translate-x-2.5 group-hover:translate-y-2 ${
                      isSolved ? 'bg-[#166534]' : 'bg-[#4d7c0f]'
                    }`}
                  />

                  <div className="relative flex items-stretch bg-[#10130e] group-hover:bg-[#161b12] border border-[#efe9dd]/75 group-hover:border-[#a3e635] clip-mode-banner overflow-hidden transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-[#a3e635]/20 to-transparent -translate-x-[180%] skew-x-[-25deg] group-hover:translate-x-[560%] transition-transform duration-700 ease-out"
                    />

                    <div
                      className={`relative w-20 sm:w-22 shrink-0 flex flex-col items-center justify-center py-3 px-2 border-r border-[#efe9dd]/25 transition-colors ${
                        isSolved
                          ? 'bg-[#0f291a] text-[#86efac]'
                          : 'bg-[#141b0c] group-hover:bg-[#65a30d] text-[#efe9dd] group-hover:text-[#080907]'
                      }`}
                    >
                      <span className="absolute top-1 left-1.5 font-serif text-[10px] opacity-65 leading-none">
                        {mode.kanji}
                      </span>
                      <ChoujinModeEmblem modeId={mode.id} className="w-8 h-8" />
                    </div>

                    <div className="flex-1 py-3 px-4 bg-manga-halftone flex flex-col justify-center min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xl sm:text-2xl font-bold uppercase tracking-[0.06em] text-[#efe9dd] group-hover:text-white leading-none">
                          {mode.title}
                        </span>
                        <span className="hidden sm:inline font-mono text-[9px] tracking-[0.16em] text-[#8d857b] uppercase">
                          [{mode.code}]
                        </span>
                      </div>
                      <p className="text-xs text-[#cfc6b6]/85 mt-1 truncate">
                        {mode.tagline}
                      </p>
                    </div>

                    <div className="pr-4 pl-2 flex items-center justify-center shrink-0">
                      {isSolved ? (
                        <span className="px-2 py-0.5 border border-[#4ade80] bg-[#0f291a] font-mono text-[10px] font-bold tracking-widest text-[#86efac] uppercase -rotate-6">
                          済 OK
                        </span>
                      ) : (
                        <span className="font-mono text-lg text-[#a3e635] group-hover:text-[#efe9dd] group-hover:translate-x-1 transition-all">
                          »
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Daily Dossier Box */}
          <div className="w-full mt-5 p-3.5 bg-[#0d100b]/95 border border-[#efe9dd]/25 shadow-[4px_4px_0_#000] relative">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8d857b]">
                  {isDaily ? `RELATÓRIO YAMATO MORI #${editionNumber}` : 'SIMULAÇÃO DE CAMPO INFINITA'}
                </p>
                <p className="text-xs text-[#efe9dd] font-medium mt-0.5">
                  {isDaily ? (
                    <>
                      Mesmo alvo global • Reinicia em{' '}
                      <strong className="font-mono text-[#a3e635]">{countdown}</strong>{' '}
                      <span className="text-[10px] font-mono text-[#8d857b]">(00:00 UTC)</span>
                    </>
                  ) : (
                    <span>Treino livre com os 30 Choujins registrados nos 3 modos</span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-1.5" title={`${solvedCount}/3 modos concluídos`}>
                {CHOUJIN_HUB_MODES.map((m) => {
                  const done = Boolean(completedModes[m.id]);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onEnterMode(m.id)}
                      title={`${m.title}: ${done ? 'Concluído' : 'Pendente'}`}
                      className={`w-8 h-8 border flex items-center justify-center font-serif text-xs font-bold transition-colors ${
                        done
                          ? 'bg-[#65a30d] border-[#efe9dd] text-[#080907]'
                          : 'bg-[#141810] border-[#efe9dd]/20 text-[#8d857b] hover:border-[#a3e635]/60'
                      }`}
                    >
                      {done ? '済' : m.kanji}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT WING: TORRE DO LUTO & GUARDIÕES */}
        <aside
          aria-label="Lado da Torre do Luto"
          className="hidden lg:flex lg:col-span-3 xl:col-span-3 flex-col gap-3.5 pl-2"
        >
          <div className="flex items-center justify-end gap-2 mb-0.5">
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#facc15]">
              弔いの塔 // TORRE &amp; PROFECIA
            </span>
            <span className="w-2 h-2 bg-[#facc15]" />
          </div>

          {RIGHT_TOWER_PANELS.map((panel) => (
            <div
              key={panel.name}
              className={`group relative w-full ${panel.height} ${panel.tilt} transition-transform duration-300 hover:-translate-x-1.5`}
            >
              <div className="absolute inset-0 -translate-x-1.5 translate-y-1.5 bg-[#363020] clip-manga-right" />

              <div className="relative w-full h-full bg-[#0b0d09] border-2 border-[#cfc6b6]/80 clip-manga-right overflow-hidden">
                <ChoujinPanelIllustration panelId={panel.id} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080907] via-transparent to-[#080907]/30" />
                <div className="absolute inset-0 bg-manga-halftone opacity-55" />

                <div className="absolute bottom-2 left-4 right-2.5 text-right">
                  <span className="block font-mono text-[9px] tracking-[0.18em] text-[#facc15] uppercase">
                    {panel.stamp}
                  </span>
                  <span className="font-serif text-sm font-bold text-[#efe9dd] drop-shadow">
                    {panel.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </aside>
      </main>

      {/* Minimal Diegetic Footer */}
      <footer className="relative z-20 py-3 px-4 border-t border-[#efe9dd]/10 bg-[#080907]/90 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[11px] text-[#8d857b]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenHelp}
            className="hover:text-[#efe9dd] font-mono uppercase tracking-wider transition-colors"
          >
            [Manual &amp; Arcos]
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={onOpenStats}
            className="hover:text-[#efe9dd] font-mono uppercase tracking-wider transition-colors"
          >
            [Registro ({stats.gamesWon}V)]
          </button>
        </div>
        <span className="hidden sm:inline text-[#efe9dd]/20">|</span>
        <p className="font-serif text-xs text-[#8d857b]">
          CHOUJINDLE — Tributo não-oficial à obra <em className="text-[#a3e635]">Choujin X</em> de Sui Ishida
        </p>
      </footer>
    </div>
  );
}
