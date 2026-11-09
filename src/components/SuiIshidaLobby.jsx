import React, { useEffect, useState } from 'react';
import {
  GhouldleCrestLogo,
  HiganbanaCluster,
  ModeEmblem,
} from './visuals/TgArtwork';
import { ShatteredGlassOverlay } from './visuals/ChoujinArtwork';
import { getTimeUntilMidnight } from '../utils/gameLogic';

const TG_MODES = [
  { id: 'classic', kanji: '壱', label: 'Clássico', desc: 'Atributos da CCG' },
  { id: 'quote', kanji: '弐', label: 'Citação', desc: 'Falas da Obra' },
  { id: 'mask', kanji: '参', label: 'Máscara & Olho', desc: 'Kakugan & Hysy' },
];

const CX_MODES = [
  { id: 'classic', issue: '01', label: 'Clássico', desc: 'Atributos' },
  { id: 'quote', issue: '02', label: 'Citação', desc: 'Falas' },
  { id: 'mask', issue: '03', label: 'Forma / Caos', desc: 'Recorte da arte' },
];

export default function SuiIshidaLobby({
  onEnterUniverseHub,
  onEnterUniverseMode,
  isDaily,
  onTogglePlayType,
  editionNumber,
  tgCompletedModes = {},
  cxCompletedModes = {},
  tgStats,
  cxStats,
}) {
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const tgSolvedCount = Object.values(tgCompletedModes).filter(Boolean).length;
  const cxSolvedCount = Object.values(cxCompletedModes).filter(Boolean).length;

  return (
    <div className="relative flex-1 min-h-[calc(100vh-45px)] w-full flex flex-col select-none overflow-hidden">
      {/* =====================================================================
          SPLIT-CANVAS DUAL WORLD STAGE:
          LEFT HALF  -> Gothic Tragedy, Shattered Glass, Crimson #dc2626 & Higanbana
          RIGHT HALF -> Explosive Pop-Punk Neo-Brutalist Zine (#0a0a0c, #FFE600, #FF0055, #A3FF00)
         ===================================================================== */}
      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-45px)]">
        {/* CENTER FLOATING SUI ISHIDA EXHIBITION BADGE (Desktop) */}
        <div className="hidden lg:flex flex-col items-center justify-center pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 z-30">
          <div className="pointer-events-auto bg-[#0a0a0c] border-[3px] border-[#f4f1ea] shadow-[6px_6px_0_#dc2626,-6px_-6px_0_#FFE600] px-3.5 py-4 flex flex-col items-center gap-3">
            <span className="px-2 py-0.5 bg-[#f4f1ea] text-[#0a0a0c] font-serif text-xs font-black tracking-widest">
              石田スイ
            </span>
            <span className="writing-vertical font-display text-lg font-bold tracking-[0.28em] text-[#f4f1ea] uppercase">
              SUI ISHIDA DLE
            </span>
            <div className="w-full h-[1px] bg-[#f4f1ea]/25" />
            <div className="text-center font-mono text-[9px] text-[#cfc6b6] leading-tight">
              <span className="block text-[#FFE600] font-bold">#{editionNumber}</span>
              <span>{countdown}</span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            LEFT REALM: TOKYO GHOUL (/ghouldle) — GOTHIC, SHATTERED GLASS & ANTEIKU TRAGEDY
           =================================================================== */}
        <section
          aria-label="Universo Tokyo Ghoul — Ghouldle"
          className="relative overflow-hidden bg-[#080709] text-[#efe9dd] border-b-4 lg:border-b-0 lg:border-r-4 border-[#dc2626]/60 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between"
        >
          {/* Shattered Glass Overlay + Crimson Vignette */}
          <ShatteredGlassOverlay className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-85" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#dc2626]/12 blur-3xl z-0"
          />

          {/* Kaneki Checkered Floor & Higanbana Petals */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-15%] bottom-0 h-[40vh] kaneki-sanctum-floor z-0"
          />
          <HiganbanaCluster className="hidden sm:block absolute bottom-0 left-0 w-52 z-0 opacity-85" />
          <HiganbanaCluster
            flip
            className="hidden xl:block absolute bottom-0 right-4 w-40 z-0 opacity-50"
          />

          {/* Top Gothic Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#dc2626]/35 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#dc2626] shadow-[0_0_10px_#dc2626]" />
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#dc2626]">
                2011–2018 // 東京喰種 TOKYO GHOUL &amp; :RE
              </span>
            </div>
            <span className="px-2.5 py-0.5 bg-[#1b080b] border border-[#dc2626]/70 font-mono text-[10px] text-[#efe9dd]">
              {tgSolvedCount}/3 HOJE • {tgStats.gamesWon}V
            </span>
          </div>

          {/* Center Gothic Showcase */}
          <div className="relative z-10 my-auto py-6 max-w-lg mx-auto w-full space-y-5">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-[#140709]/90 border border-[#dc2626]/45 text-[10px] font-mono uppercase tracking-[0.25em] text-[#f87171]">
                <span>☕ CAFETERIA ANTEIKU</span>
                <span>•</span>
                <span>VIDRO ESTILHAÇADO &amp; HIGANBANA</span>
              </div>
              <GhouldleCrestLogo />
              <p className="font-serif text-xs sm:text-sm italic text-[#cfc6b6]/90 pt-1">
                「Eu não sou o protagonista de um romance... Sou um universitário que gosta de ler, como qualquer outro. Mas... se você fosse escrever uma história comigo como protagonista, certamente seria... uma tragédia.」
              </p>
            </div>

            {/* 3 Manga Portrait Panels */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { name: 'Ken Kaneki', tag: 'SS // TAPA-OLHO', img: '/characters/ken-kaneki.jpg', pos: '54% 22%' },
                { name: 'Kishou Arima', tag: 'CCG // CEIFADOR', img: '/characters/kishou-arima.jpg', pos: 'center 26%' },
                { name: 'Eto Yoshimura', tag: 'SSS // CORUJA', img: '/characters/eto-yoshimura.jpg', pos: 'center 18%' },
              ].map((p) => (
                <div
                  key={p.name}
                  className="group relative h-28 sm:h-32 border border-[#efe9dd]/65 bg-[#0c0b0f] overflow-hidden shadow-[4px_4px_0_#7d090f]"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{ objectPosition: p.pos }}
                    className="w-full h-full object-cover contrast-125 saturate-[0.75] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080709] via-transparent to-transparent" />
                  <div className="absolute bottom-1.5 left-2 right-2">
                    <span className="block font-mono text-[8px] text-[#dc2626] uppercase tracking-wider">
                      {p.tag}
                    </span>
                    <span className="font-serif text-xs font-bold text-[#efe9dd]">
                      {p.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Enter /ghouldle Hub Link */}
            <a
              href="/ghouldle"
              onClick={(e) => {
                e.preventDefault();
                onEnterUniverseHub('tg');
              }}
              className="w-full py-3.5 px-5 bg-[#dc2626] hover:bg-[#b91c1c] border-2 border-[#efe9dd] text-[#efe9dd] font-display text-base uppercase tracking-[0.16em] shadow-[5px_5px_0_#000] flex items-center justify-between transition-all hover:-translate-y-0.5"
            >
              <span>🩸 ENTRAR EM /GHOULDLE (56 PERSONAGENS)</span>
              <span className="font-mono text-xl">»</span>
            </a>

            {/* Quick Mode Selector for Ghouldle */}
            <div className="space-y-1.5">
              <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-[#8d857b]">
                ATALHO DIRETO PARA OS MODOS DE TOKYO GHOUL:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {TG_MODES.map((m) => {
                  const done = Boolean(tgCompletedModes[m.id]);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onEnterUniverseMode('tg', m.id)}
                      className={`p-2.5 border text-left transition-all ${
                        done
                          ? 'bg-[#0f291a] border-[#4ade80] text-[#efe9dd]'
                          : 'bg-[#111015]/90 hover:bg-[#1d090d] border-[#efe9dd]/35 hover:border-[#dc2626] text-[#efe9dd]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-xs font-bold text-[#dc2626]">
                          {m.kanji}
                        </span>
                        <ModeEmblem modeId={m.id} className="w-4 h-4" />
                      </div>
                      <p className="font-display text-xs uppercase tracking-wider truncate">
                        {m.label}
                      </p>
                      <p className="font-mono text-[9px] text-[#8d857b] truncate">
                        {done ? '済 OK' : m.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Gothic Caption */}
          <div className="relative z-10 pt-3 border-t border-[#dc2626]/25 flex items-center justify-between text-[10px] font-mono text-[#8d857b] uppercase tracking-widest">
            <span>ARQUIVO CCG &amp; ANTEIKU // 20ª ALA</span>
            <span className="text-[#dc2626]">ROTA: /GHOULDLE</span>
          </div>
        </section>

        {/* ===================================================================
            RIGHT REALM: CHOUJIN X (/choujinxdle)
           =================================================================== */}
        <section
          aria-label="Universo Choujin X — ChoujinXdle"
          className="relative overflow-hidden bg-[#0a0a0c] text-[#f4f1ea] p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between"
        >
          {/* Top line */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#f4f1ea]/25 pb-3">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#f4f1ea]/70">
              超人X · 2021 — presente
            </span>
            <span className="font-mono text-[11px] text-[#FFE600]">
              {cxSolvedCount}/3 hoje · {cxStats.gamesWon} vitórias
            </span>
          </div>

          <div className="relative z-10 my-auto py-6 max-w-lg mx-auto w-full space-y-6">
            <div className="space-y-3">
              <h2 className="font-display text-5xl sm:text-6xl font-bold uppercase leading-[0.95] tracking-tight">
                Choujin<span className="text-[#FFE600]">X</span>dle
              </h2>
              <p className="text-[15px] leading-relaxed text-[#cfc9bd] max-w-sm">
                Adivinhe o personagem de Choujin X. Um alvo novo por dia em cada modo.
              </p>
            </div>

            {/* Real artwork panels */}
            <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-[#f4f1ea]">
              {[
                { name: 'Tokio Kurohara', img: '/characters/tokio-kurohara.png', bg: 'bg-[#FFE600]', pos: 'center 8%' },
                { name: 'Azuma Higashi', img: '/characters/azuma-higashi.png', bg: 'bg-[#1d1d22]', pos: 'center 10%' },
                { name: 'Ely Otta', img: '/characters/ely-otta.png', bg: 'bg-[#FF0055]', pos: 'center 14%' },
              ].map((c) => (
                <figure key={c.name} className={`relative m-0 h-36 sm:h-44 overflow-hidden ${c.bg}`}>
                  <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    style={{ objectPosition: c.pos }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <figcaption className="absolute left-0 bottom-0 px-1.5 py-0.5 bg-[#0a0a0c] text-[#f4f1ea] text-[9px] font-mono uppercase tracking-wider">
                    {c.name}
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Daily vs Infinite */}
            <div className="flex items-center gap-5 font-display text-sm uppercase tracking-[0.12em]">
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

            {/* Enter /choujinxdle */}
            <a
              href="/choujinxdle"
              onClick={(e) => {
                e.preventDefault();
                onEnterUniverseHub('cx');
              }}
              className="w-full py-3.5 px-5 bg-[#FFE600] hover:bg-[#f4f1ea] text-[#0a0a0c] font-display font-bold text-base uppercase tracking-[0.14em] flex items-center justify-between transition-colors"
            >
              <span>Entrar em ChoujinXdle · 30 personagens</span>
              <span className="font-mono text-xl">→</span>
            </a>

            {/* Quick mode shortcuts */}
            <div className="space-y-1.5">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#8d857b]">
                Ir direto para um modo
              </span>
              <div className="grid grid-cols-3 gap-2">
                {CX_MODES.map((m) => {
                  const done = Boolean(cxCompletedModes[m.id]);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onEnterUniverseMode('cx', m.id)}
                      className={`p-2.5 border text-left transition-colors ${
                        done
                          ? 'border-[#A3FF00] text-[#A3FF00]'
                          : 'border-[#f4f1ea]/35 text-[#f4f1ea] hover:bg-[#FFE600] hover:text-[#0a0a0c] hover:border-[#FFE600]'
                      }`}
                    >
                      <span className="block font-mono text-[10px] opacity-70">{m.issue}</span>
                      <span className="block font-display text-xs uppercase tracking-wider truncate">
                        {m.label}
                      </span>
                      <span className="block font-mono text-[10px] opacity-70 truncate">
                        {done ? 'Resolvido' : m.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-3 border-t border-[#f4f1ea]/25 flex items-center justify-between text-[11px] font-mono text-[#8d857b] uppercase tracking-widest">
            <span>Yamato Mori vs. Torre do Luto</span>
            <span className="text-[#FFE600]">/choujinxdle</span>
          </div>
        </section>
      </div>

      {/* Semantic SEO & GEO Directory Footer (Crawlable Sitelinks for Google & AI Search) */}
      <footer
        aria-label="Diretório Oficial Sui Ichida Dle"
        className="w-full bg-[#050507] border-t border-[#efe9dd]/15 px-4 py-3 text-[11px] font-mono text-[#8d857b]"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <h1 className="text-[11px] font-mono font-semibold text-[#cfc6b6]">
            <strong>Sui Ichida Dle (Sui Ishida Dle)</strong> — Jogos Diários e Infinitos de{' '}
            <em>Tokyo Ghoul</em> &amp; <em>Choujin X</em>:
          </h1>
          <nav aria-label="Links Diretos dos Jogos" className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://suiichidadle.vercel.app/"
              onClick={(e) => e.preventDefault()}
              className="text-[#efe9dd] hover:text-white underline decoration-[#efe9dd]/30"
            >
              suiichidadle.vercel.app
            </a>
            <span>•</span>
            <a
              href="/ghouldle"
              onClick={(e) => {
                e.preventDefault();
                onEnterUniverseHub('tg');
              }}
              className="text-[#f87171] hover:text-[#dc2626] underline decoration-[#dc2626]/40"
            >
              Ghouldle (Ghoul Dle) — /ghouldle
            </a>
            <span>•</span>
            <a
              href="/choujinxdle"
              onClick={(e) => {
                e.preventDefault();
                onEnterUniverseHub('cx');
              }}
              className="text-[#FFE600] hover:text-[#A3FF00] underline decoration-[#FFE600]/40"
            >
              ChoujinXdle (Choujin X Dle) — /choujinxdle
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
