import React, { useEffect, useState } from 'react';
import { getTimeUntilMidnight } from '../utils/gameLogic';

const MODES = [
  {
    id: 'classic',
    number: '01',
    title: 'Clássico',
    desc: 'Compare tipo, afiliação, patente e arco de estreia.',
  },
  {
    id: 'quote',
    number: '02',
    title: 'Citação',
    desc: 'Quem disse essa frase?',
  },
  {
    id: 'mask',
    number: '03',
    title: 'Forma Choujin / Estado de Caos',
    desc: 'Reconheça o personagem por um recorte da arte.',
  },
];

// Painéis no estilo de página de mangá, usando as artes reais dos personagens.
const PANELS = [
  {
    name: 'Tokio Kurohara',
    img: '/characters/tokio-kurohara.png',
    bg: 'bg-[#FFE600]',
    pos: 'center 8%',
    cls: 'col-span-4 row-span-2',
  },
  {
    name: 'Ely Otta',
    img: '/characters/ely-otta.png',
    bg: 'bg-[#f4f1ea]',
    pos: 'center 14%',
    cls: 'col-span-2 row-span-1',
  },
  {
    name: 'Azuma Higashi',
    img: '/characters/azuma-higashi.png',
    bg: 'bg-[#1d1d22]',
    pos: 'center 10%',
    cls: 'col-span-2 row-span-1',
  },
  {
    name: 'Zora Siruha',
    img: '/characters/zora-siruha.png',
    bg: 'bg-[#f4f1ea]',
    pos: 'center 12%',
    cls: 'col-span-2 row-span-1',
  },
  {
    name: 'Batista Hoshi',
    img: '/characters/batista-hoshi.jpg',
    bg: 'bg-[#f4f1ea]',
    pos: 'center 20%',
    cls: 'col-span-2 row-span-1',
  },
  {
    name: 'Hoshi Sandek',
    img: '/characters/hoshi-sandek.png',
    bg: 'bg-[#FF0055]',
    pos: 'center 6%',
    cls: 'col-span-2 row-span-1',
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
    <div className="min-h-screen w-full bg-[#0a0a0c] text-[#f4f1ea] flex flex-col select-none">
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Página de mangá: painéis com as artes reais */}
        <aside className="lg:col-span-6 order-2 lg:order-1">
          <div className="grid grid-cols-6 grid-rows-[1fr_1fr_0.75fr] gap-1.5 h-[480px] sm:h-[600px] lg:h-[640px] p-1.5 bg-[#f4f1ea]">
            {PANELS.map((p) => (
              <figure
                key={p.name}
                className={`relative overflow-hidden m-0 ${p.bg} ${p.cls}`}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  style={{ objectPosition: p.pos }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <figcaption className="absolute left-0 bottom-0 px-2 py-0.5 bg-[#0a0a0c] text-[#f4f1ea] text-[10px] font-mono uppercase tracking-wider">
                  {p.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </aside>

        {/* Título e modos */}
        <section className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center gap-8">
          <header className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8d857b]">
              超人X · Sui Ishida
            </p>
            <h1 className="font-display text-5xl sm:text-7xl font-bold uppercase leading-[0.95] tracking-tight">
              Choujin<span className="text-[#FFE600]">X</span>dle
            </h1>
            <p className="max-w-md text-[15px] leading-relaxed text-[#cfc9bd]">
              Adivinhe o personagem de Choujin X. Um alvo novo por dia em cada
              modo.
            </p>
          </header>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center gap-5 font-display uppercase tracking-[0.12em]">
              <button
                type="button"
                onClick={() => onTogglePlayType(true)}
                className={`pb-1 border-b-2 transition-colors ${
                  isDaily
                    ? 'border-[#FFE600] text-[#f4f1ea]'
                    : 'border-transparent text-[#8d857b] hover:text-[#f4f1ea]'
                }`}
              >
                Diário #{editionNumber}
              </button>
              <button
                type="button"
                onClick={() => onTogglePlayType(false)}
                className={`pb-1 border-b-2 transition-colors ${
                  !isDaily
                    ? 'border-[#FFE600] text-[#f4f1ea]'
                    : 'border-transparent text-[#8d857b] hover:text-[#f4f1ea]'
                }`}
              >
                Infinito
              </button>
            </div>
            <span className="font-mono text-xs text-[#8d857b]">
              {isDaily ? `Próximo alvo em ${countdown}` : '30 personagens'}
            </span>
          </div>

          <nav aria-label="Modos de jogo ChoujinXdle" className="border-t border-[#f4f1ea]/20">
            {MODES.map((mode) => {
              const isSolved = Boolean(completedModes[mode.id]);
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onEnterMode(mode.id)}
                  className="group w-full flex items-center gap-5 py-5 border-b border-[#f4f1ea]/20 text-left transition-colors hover:bg-[#FFE600] hover:text-[#0a0a0c] px-2 -mx-2 focus:outline-none focus-visible:bg-[#FFE600] focus-visible:text-[#0a0a0c]"
                >
                  <span className="font-mono text-sm text-[#8d857b] group-hover:text-[#0a0a0c]/70 w-7 shrink-0">
                    {mode.number}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-display text-xl sm:text-2xl uppercase tracking-wide leading-tight">
                      {mode.title}
                    </span>
                    <span className="block text-sm text-[#a39d91] group-hover:text-[#0a0a0c]/75 mt-0.5">
                      {mode.desc}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-xs uppercase tracking-wider">
                    {isSolved ? (
                      <span className="text-[#A3FF00] group-hover:text-[#0a0a0c]">
                        Resolvido
                      </span>
                    ) : (
                      <span className="text-[#f4f1ea] group-hover:text-[#0a0a0c]">
                        Jogar →
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-[#8d857b]">
            <span>
              {solvedCount}/3 hoje · {stats.gamesWon} vitórias
            </span>
            <button
              type="button"
              onClick={onOpenStats}
              className="underline underline-offset-4 hover:text-[#f4f1ea]"
            >
              Estatísticas
            </button>
            <button
              type="button"
              onClick={onOpenHelp}
              className="underline underline-offset-4 hover:text-[#f4f1ea]"
            >
              Como jogar
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
