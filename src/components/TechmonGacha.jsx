import React, { useState, useRef, useMemo } from "react";
import confetti from "canvas-confetti";
import useScrollReveal from "../hooks/useScrollReveal";
import { POKETECHS } from "../data/poketechs";
import BitkachuImg from "../assets/pokemon/bitkachu.jpg";
import GymBattleArena from "./GymBattleArena";
import FusionLab from "./FusionLab";
import AchievementBoard from "./AchievementBoard";
import {
  FiZap,
  FiGift,
  FiAward,
  FiCheckCircle,
  FiStar,
  FiRotateCcw,
  FiSearch,
  FiRepeat,
  FiCompass,
  FiScissors,
  FiX,
  FiArrowRight,
  FiShield,
  FiSparkles,
} from "react-icons/fi";

// Element to Energy Icon mapping
const getElementEnergy = (element) => {
  const el = element.toLowerCase();
  if (el.includes("electric")) return { icon: "⚡", bg: "#eab308", color: "#713f12", name: "Lightning" };
  if (el.includes("fire")) return { icon: "🔥", bg: "#f97316", color: "#7c2d12", name: "Fire" };
  if (el.includes("water")) return { icon: "💧", bg: "#0284c7", color: "#082f49", name: "Water" };
  if (el.includes("grass") || el.includes("bug")) return { icon: "🌿", bg: "#16a34a", color: "#14532d", name: "Grass" };
  if (el.includes("psychic") || el.includes("ghost")) return { icon: "🔮", bg: "#9333ea", color: "#3b0764", name: "Psychic" };
  if (el.includes("steel")) return { icon: "⚙️", bg: "#64748b", color: "#0f172a", name: "Metal" };
  if (el.includes("dragon")) return { icon: "🐉", bg: "#4f46e5", color: "#1e1b4b", name: "Dragon" };
  if (el.includes("dark") || el.includes("shadow")) return { icon: "🌑", bg: "#334155", color: "#020617", name: "Darkness" };
  if (el.includes("ice")) return { icon: "❄️", bg: "#06b6d4", color: "#164e63", name: "Water" };
  if (el.includes("ground") || el.includes("rock")) return { icon: "🪨", bg: "#b45309", color: "#451a03", name: "Fighting" };
  if (el.includes("fairy")) return { icon: "✨", bg: "#ec4899", color: "#831843", name: "Fairy" };
  return { icon: "⭐", bg: "#94a3b8", color: "#1e293b", name: "Colorless" };
};

// 🔊 Sound FX Synthesizer (Zero-latency Web Audio API)
const playArcadeSound = (type) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (type === "rip") {
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(3800, ctx.currentTime + 0.35);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } else if (type === "celebration") {
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
      });
    } else if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    }
  } catch {
    // Silently continue if audio context is restricted
  }
};
const getElementalBattleStats = (element, rarity) => {
  const el = element.toLowerCase();
  let weakness = { icon: "🔥", mult: "x2" };
  let resistance = { icon: "⚡", val: "-30" };
  let retreat = "⭐⭐";

  if (el.includes("fire")) {
    weakness = { icon: "💧", mult: "x2" };
    resistance = { icon: "🌿", val: "-30" };
    retreat = "⭐⭐";
  } else if (el.includes("water")) {
    weakness = { icon: "⚡", mult: "x2" };
    resistance = { icon: "🔥", val: "-30" };
    retreat = "⭐⭐";
  } else if (el.includes("ice")) {
    weakness = { icon: "🔥", mult: "x2" };
    resistance = { icon: "💧", val: "-30" };
    retreat = "⭐";
  } else if (el.includes("electric")) {
    weakness = { icon: "🪨", mult: "x2" };
    resistance = { icon: "⚙️", val: "-30" };
    retreat = "⭐";
  } else if (el.includes("grass") || el.includes("bug")) {
    weakness = { icon: "🔥", mult: "x2" };
    resistance = { icon: "💧", val: "-30" };
    retreat = "⭐";
  } else if (el.includes("psychic") || el.includes("ghost") || el.includes("fairy")) {
    weakness = { icon: "🌑", mult: "x2" };
    resistance = { icon: "🪨", val: "-30" };
    retreat = "⭐";
  } else if (el.includes("dragon")) {
    weakness = { icon: "✨", mult: "x2" };
    resistance = { icon: "🌿", val: "-30" };
    retreat = "⭐⭐⭐";
  } else if (el.includes("steel")) {
    weakness = { icon: "🔥", mult: "x2" };
    resistance = { icon: "🔮", val: "-30" };
    retreat = "⭐⭐⭐";
  } else if (el.includes("dark")) {
    weakness = { icon: "🪨", mult: "x2" };
    resistance = { icon: "🔮", val: "-30" };
    retreat = "⭐⭐";
  } else if (el.includes("ground") || el.includes("rock")) {
    weakness = { icon: "🌿", mult: "x2" };
    resistance = { icon: "⚡", val: "-30" };
    retreat = "⭐⭐⭐";
  }

  if (rarity === "UR") retreat = "⭐⭐⭐";
  if (rarity === "Common") retreat = "⭐";

  return { weakness, resistance, retreat };
};

// Authentic Parody Pokémon Card Back Component
const PokemonCardBack = () => {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-between p-3 select-none border-4 border-[#1e3a8a] bg-[#002661]">
      <div className="absolute inset-1 rounded-xl border-2 border-[#60a5fa]/60 pointer-events-none" />

      <div
        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.7) 0%, rgba(37,99,235,0.4) 40%, rgba(15,23,42,0.9) 100%)",
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        viewBox="0 0 300 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M150 210 C100 120, 20 180, 50 260 C80 340, 220 360, 250 270 C280 180, 200 80, 150 50 C100 20, 40 70, 30 140"
          stroke="#93c5fd"
          strokeWidth="38"
          strokeLinecap="round"
          filter="blur(18px)"
        />
        <path
          d="M150 210 C200 300, 280 240, 250 160 C220 80, 80 60, 50 150 C20 240, 100 340, 150 370"
          stroke="#38bdf8"
          strokeWidth="28"
          strokeLinecap="round"
          filter="blur(14px)"
        />
      </svg>

      {/* Top Parody Logo */}
      <div className="relative z-10 pt-2 text-center">
        <div className="relative inline-block">
          <span
            className="text-2xl sm:text-3xl font-black tracking-tight uppercase"
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              color: "#fbbf24",
              WebkitTextStroke: "2px #1e3a8a",
              textShadow:
                "0 0 10px rgba(251,191,36,0.8), 2px 2px 0 #1e3a8a, -2px -2px 0 #1e3a8a, 2px -2px 0 #1e3a8a, -2px 2px 0 #1e3a8a, 3px 4px 6px rgba(0,0,0,0.8)",
              letterSpacing: "0.08em",
            }}
          >
            POKÉTECH
          </span>
          <span className="text-[8px] font-black text-amber-300 absolute -top-1 -right-4">™</span>
        </div>
      </div>

      {/* Center Glowing Pokéball */}
      <div className="relative z-10 my-auto flex items-center justify-center">
        <div className="absolute h-36 w-36 rounded-full bg-cyan-400/30 blur-xl animate-pulse" />

        <div
          className="relative h-28 w-28 rounded-full border-4 border-slate-900 overflow-hidden shadow-2xl flex flex-col"
          style={{
            boxShadow:
              "inset -8px -8px 16px rgba(0,0,0,0.7), inset 8px 8px 16px rgba(255,255,255,0.4), 0 10px 25px rgba(0,0,0,0.8)",
          }}
        >
          <div
            className="relative h-1/2 w-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #ff6b6b 0%, #dc2626 70%, #991b1b 100%)",
            }}
          >
            <div className="absolute top-1 left-3 h-4 w-10 rounded-full bg-white/50 blur-[1px] rotate-[-20deg]" />
          </div>

          <div className="h-2 w-full bg-slate-900 shrink-0" />

          <div
            className="h-1/2 w-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #e2e8f0 70%, #94a3b8 100%)",
            }}
          />

          <div className="absolute inset-0 m-auto h-9 w-9 rounded-full border-4 border-slate-900 bg-white flex items-center justify-center shadow-lg">
            <div className="h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-ping" />
            <div className="absolute h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          </div>
        </div>
      </div>

      {/* Bottom Inverted Parody Logo */}
      <div className="relative z-10 pb-2 text-center rotate-180">
        <div className="relative inline-block">
          <span
            className="text-2xl sm:text-3xl font-black tracking-tight uppercase"
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              color: "#fbbf24",
              WebkitTextStroke: "2px #1e3a8a",
              textShadow:
                "0 0 10px rgba(251,191,36,0.8), 2px 2px 0 #1e3a8a, -2px -2px 0 #1e3a8a, 2px -2px 0 #1e3a8a, -2px 2px 0 #1e3a8a, 3px 4px 6px rgba(0,0,0,0.8)",
              letterSpacing: "0.08em",
            }}
          >
            POKÉTECH
          </span>
          <span className="text-[8px] font-black text-amber-300 absolute -top-1 -right-4">™</span>
        </div>
      </div>
    </div>
  );
};

// Dynamic Pokémon Card Front Face (Ultra Holographic Foil System)
const PokemonCardFront = ({ card, tilt = { x: 0, y: 0 }, isShiny = false }) => {
  const energy = getElementEnergy(card.element);
  const battleStats = getElementalBattleStats(card.element, card.rarity);

  const isMythic = card.rarity === "UR";
  const isSSR = card.rarity === "SSR";

  const effectiveHp = card.hp + (isShiny ? 40 : 0);
  const effectiveAtk = card.atk + (isShiny ? 20 : 0);

  const cardBorderGradient = isShiny
    ? "linear-gradient(135deg, #ffd700 0%, #ff007f 25%, #8b5cf6 50%, #00ffff 75%, #ffd700 100%)"
    : isMythic
    ? "linear-gradient(135deg, #ffd700 0%, #ec4899 25%, #8b5cf6 50%, #00ffff 75%, #ffd700 100%)"
    : isSSR
    ? "linear-gradient(135deg, #fef08a 0%, #f59e0b 35%, #fbbf24 70%, #d97706 100%)"
    : card.rarity === "SR"
    ? "linear-gradient(135deg, #e9d5ff 0%, #a855f7 40%, #7e22ce 100%)"
    : "linear-gradient(135deg, #f8fafc 0%, #94a3b8 50%, #64748b 100%)";

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden p-2.5 sm:p-3 text-slate-900 select-none flex flex-col justify-between transition-all"
      style={{
        background: cardBorderGradient,
        boxShadow: isShiny
          ? "0 0 60px rgba(251,191,36,0.9), 0 0 35px rgba(236,72,153,0.8), 0 25px 50px rgba(0,0,0,0.8)"
          : isMythic
          ? "0 0 50px rgba(236,72,153,0.7), 0 0 30px rgba(6,182,212,0.6), 0 0 15px rgba(251,191,36,0.8), 0 25px 50px rgba(0,0,0,0.7)"
          : isSSR
          ? "0 0 45px rgba(245,158,11,0.65), 0 0 20px rgba(251,191,36,0.6), 0 25px 50px rgba(0,0,0,0.6)"
          : `0 0 35px ${card.themeColor}88, 0 20px 40px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Dynamic Tilt Tracking Holographic Flare */}
      <div
        className="absolute inset-0 pointer-events-none z-30 mix-blend-color-dodge transition-transform duration-75 ease-out"
        style={{
          opacity: isShiny ? 0.85 : isMythic ? 0.7 : isSSR ? 0.55 : 0.4,
          background: `radial-gradient(circle at ${50 + (tilt.y || 0) * 3.5}% ${
            50 - (tilt.x || 0) * 3.5
          }%, rgba(255,255,255,0.95) 0%, rgba(255,215,0,0.6) 20%, rgba(236,72,153,0.45) 40%, rgba(6,182,212,0.35) 60%, transparent 80%)`,
        }}
      />

      {/* Holographic Prismatic Rainbow Sheen */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay z-25"
        style={{
          background:
            "linear-gradient(115deg, transparent 15%, rgba(255,255,255,0.9) 30%, rgba(236,72,153,0.7) 45%, rgba(6,182,212,0.7) 55%, rgba(251,191,36,0.8) 70%, transparent 85%)",
          transform: `translate(${(tilt.y || 0) * 6}px, ${(tilt.x || 0) * 6}px)`,
        }}
      />

      {/* Floating Twinkle Diamond Sparkles */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <span className="absolute top-4 left-6 text-amber-300 text-xs animate-ping font-black">✦</span>
        <span className="absolute top-14 right-6 text-pink-300 text-sm animate-pulse font-black">✨</span>
        <span className="absolute bottom-24 left-8 text-cyan-300 text-xs animate-pulse font-black">✦</span>
        <span className="absolute bottom-10 right-8 text-yellow-200 text-xs animate-ping font-black">✨</span>
      </div>

      {/* Main Inner Card Background */}
      <div className="relative z-10 w-full h-full rounded-xl bg-gradient-to-b from-slate-50 via-white to-slate-100 p-2 sm:p-2.5 flex flex-col justify-between border border-white/80 shadow-inner">
        {/* Top Header: Evolution Stage, Name, HP, Element Icon */}
        <div className="flex items-center justify-between border-b border-slate-300 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span
              className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider text-white shadow-md"
              style={{ background: isShiny ? "linear-gradient(90deg, #f59e0b, #ec4899)" : card.badgeBg }}
            >
              {isShiny ? "✨ SHINY EX" : isMythic ? "✨ UR EX" : isSSR ? "🌟 SSR EX" : "BASIC"}
            </span>
            <h3
              className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none truncate max-w-[130px] sm:max-w-[170px]"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              {card.name}
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-slate-500">HP</span>
            <span className="text-sm sm:text-base font-black text-rose-600 font-mono leading-none">
              {effectiveHp}
            </span>
            <span
              className="h-5 w-5 rounded-full flex items-center justify-center text-[10px] text-white shadow-sm shrink-0"
              style={{ background: energy.bg }}
            >
              {energy.icon}
            </span>
          </div>
        </div>

        {/* Artwork Display Box */}
        <div className="my-1.5 relative rounded-lg overflow-hidden border-2 border-amber-300/80 shadow-md bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 flex flex-col items-center justify-center h-40 sm:h-44">
          <div
            className="absolute inset-0 opacity-45 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${card.themeColor} 0%, transparent 70%)`,
            }}
          />

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/25 to-transparent z-15" />

          <img
            src={card.image}
            alt={card.name}
            className="relative z-10 h-32 sm:h-36 w-auto object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.4)] transition-transform hover:scale-105"
          />

          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 py-0.5 px-2 text-[8px] font-extrabold text-slate-700 flex items-center justify-between border-t border-amber-300/80 z-20">
            <span>NO. {String(card.id).padStart(3, "0")} {card.title}</span>
            <span>ATK: {card.atk}</span>
          </div>
        </div>

        {/* Attacks & Jurus Section */}
        <div className="space-y-1.5 bg-slate-50/90 rounded-lg p-2 border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span
                  className="h-3.5 w-3.5 rounded-full flex items-center justify-center text-[8px] text-white"
                  style={{ background: energy.bg }}
                >
                  {energy.icon}
                </span>
                <span
                  className="h-3.5 w-3.5 rounded-full flex items-center justify-center text-[8px] text-white"
                  style={{ background: energy.bg }}
                >
                  {energy.icon}
                </span>
                <span className="text-[11px] sm:text-xs font-black text-slate-900 ml-0.5">
                  {card.ability}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-black text-slate-900 font-mono">
                {card.atk * 2}+
              </span>
            </div>

            <p className="text-[10px] text-slate-600 leading-snug mt-0.5 line-clamp-2">
              {card.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[9px]">
            <span className="font-bold text-slate-400">Battle Cry:</span>
            <span className="font-extrabold text-indigo-600 italic">
              &ldquo;{card.soundEffect}&rdquo;
            </span>
          </div>
        </div>

        {/* Dynamic Weakness, Resistance & Retreat */}
        <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-slate-300 text-[8px] font-bold text-slate-600 text-center">
          <div>
            <span className="block text-[7px] text-slate-400 uppercase">Weakness</span>
            <span className="font-black text-rose-600">
              {battleStats.weakness.icon} {battleStats.weakness.mult}
            </span>
          </div>
          <div>
            <span className="block text-[7px] text-slate-400 uppercase">Resistance</span>
            <span className="font-black text-emerald-600">
              {battleStats.resistance.icon} {battleStats.resistance.val}
            </span>
          </div>
          <div>
            <span className="block text-[7px] text-slate-400 uppercase">Retreat</span>
            <span className="font-black text-slate-700">
              {battleStats.retreat}
            </span>
          </div>
        </div>

        {/* Clean Footer */}
        <div className="flex items-center justify-between text-[7px] font-semibold text-slate-400 pt-1 border-t border-slate-200">
          <span className="font-bold text-slate-500">1st Edition • PROMO</span>
          <span className="font-black text-slate-700">
            {String(card.id).padStart(3, "0")}/100 {card.stars}
          </span>
          <span className="font-bold text-slate-500">VER: 2026.1</span>
        </div>
      </div>
    </div>
  );
};

// 🌟 BOOSTER PACK RIPPING CEREMONY MODAL ("Animasi Brewek / Sobek Pack")
const BoosterPackModal = ({
  isOpen,
  stage, // 'sealed' | 'ripping' | 'revealed'
  pulls,
  onRip,
  onClose,
  onSelectCard,
}) => {
  const [modalCard, setModalCard] = useState(null);
  const [isModalFlipped, setIsModalFlipped] = useState(false);
  const [modalTilt, setModalTilt] = useState({ x: 0, y: 0 });
  const [isModalInteracting, setIsModalInteracting] = useState(false);
  const modalSceneRef = useRef(null);

  // Sync active card with first pull whenever new pulls arrive
  React.useEffect(() => {
    if (pulls && pulls.length > 0) {
      setModalCard(pulls[0]);
      setIsModalFlipped(false);
      setModalTilt({ x: 0, y: 0 });
    }
  }, [pulls]);

  if (!isOpen) return null;

  const currentCard = modalCard || pulls[0] || POKETECHS[10];

  // 3D Card Interactive Tilt in Modal
  const handleModalMouseMove = (e) => {
    if (!modalSceneRef.current) return;
    const rect = modalSceneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setModalTilt({
      x: -(y / (rect.height / 2)) * 22,
      y: (x / (rect.width / 2)) * 22,
    });
  };

  const handleModalMouseLeave = () => setModalTilt({ x: 0, y: 0 });

  const handleModalTouchStart = () => setIsModalInteracting(true);

  const handleModalTouchMove = (e) => {
    if (!modalSceneRef.current || !e.touches || !e.touches[0]) return;
    const rect = modalSceneRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left - rect.width / 2;
    const y = e.touches[0].clientY - rect.top - rect.height / 2;
    const clampedX = Math.max(-rect.height / 2, Math.min(rect.height / 2, y));
    const clampedY = Math.max(-rect.width / 2, Math.min(rect.width / 2, x));
    setModalTilt({
      x: -(clampedX / (rect.height / 2)) * 22,
      y: (clampedY / (rect.width / 2)) * 22,
    });
  };

  const handleModalTouchEnd = () => {
    setIsModalInteracting(false);
    setModalTilt({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in select-none">
      {/* Stadium Cosmic Background Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-cyan-500/25 blur-[140px]" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-amber-500/25 blur-[140px]" />
      </div>

      {/* Close / Skip Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 z-50 h-11 w-11 rounded-full border border-slate-700 bg-slate-900/90 text-slate-300 hover:text-white hover:border-slate-500 flex items-center justify-center transition-all shadow-xl hover:scale-105"
        title="Tutup / Simpan ke Binder"
      >
        <FiX className="text-xl" />
      </button>

      {/* Main Ceremony Container */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full">
        {stage !== "revealed" ? (
          /* ─── STAGE 1: FOIL BOOSTER PACK WITH THRILLING RIP ANIMATION ─── */
          <div className="flex flex-col items-center">
            {/* Header Call to Action */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-xs font-black text-cyan-300 mb-5 shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-bounce">
              <FiScissors className="text-amber-400 text-sm" />
              <span>{stage === "sealed" ? "SENTUH / KLIK UNTUK BREWEK PACK! ✂️" : "⚡ MEMBUKA FOIL BOOSTER..."}</span>
            </div>

            {/* 3D Foil Booster Pack */}
            <div
              onClick={stage === "sealed" ? onRip : undefined}
              className={`relative w-72 h-[420px] rounded-2xl cursor-pointer transition-all duration-300 group ${
                stage === "sealed"
                  ? "hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(6,182,212,0.5)]"
                  : "animate-pulse"
              }`}
            >
              {/* TOP FOIL STRIP (Brewek / Rips off diagonally) */}
              <div
                className={`relative w-full h-16 rounded-t-2xl z-30 overflow-hidden border-t-2 border-x-2 border-amber-300/80 transition-all duration-700 ${
                  stage === "ripping"
                    ? "-translate-y-28 -rotate-15 opacity-0 pointer-events-none"
                    : "shadow-md"
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, #1e293b 0%, #334155 30%, #f59e0b 50%, #1e293b 80%, #0f172a 100%)",
                }}
              >
                {/* Metallic Crimped Seal Edges */}
                <div
                  className="w-full h-4 border-b border-amber-400/60 flex items-center justify-around opacity-75"
                  style={{
                    backgroundImage: "repeating-linear-gradient(90deg, #f59e0b, #f59e0b 2px, #0f172a 2px, #0f172a 4px)",
                  }}
                />

                {/* Tear Here Laser Cutline Indicator */}
                <div className="flex items-center justify-between px-4 pt-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-300">
                    <FiScissors className="animate-bounce" />
                    <span>SOBEK DI SINI</span>
                  </div>
                  <span className="text-[9px] font-mono text-cyan-300">POKÉTECH</span>
                </div>
              </div>

              {/* Laser Cut Glow Line with Sparkles */}
              <div
                className={`w-full h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-opacity duration-300 ${
                  stage === "ripping" ? "opacity-100 shadow-[0_0_25px_#22d3ee]" : "opacity-50"
                }`}
              />

              {/* BOTTOM FOIL BODY */}
              <div
                className="relative w-full h-[354px] -mt-1 rounded-b-2xl overflow-hidden border-b-4 border-x-2 border-amber-400/80 p-4 flex flex-col items-center justify-between shadow-2xl z-20"
                style={{
                  background:
                    "radial-gradient(circle at 50% 30%, #1e3a8a 0%, #0f172a 60%, #020617 100%)",
                }}
              >
                {/* Prismatic Sheen on Foil */}
                <div
                  className="absolute inset-0 opacity-35 mix-blend-color-dodge pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.85) 40%, rgba(236,72,153,0.6) 50%, rgba(6,182,212,0.6) 60%, transparent 80%)",
                  }}
                />

                {/* Pack Header Emblem */}
                <div className="text-center pt-2 relative z-10">
                  <span className="text-[9px] font-black tracking-widest text-amber-400 uppercase">
                    100 CARDS EXPANSION
                  </span>
                  <h3
                    className="text-2xl font-black text-white tracking-tight uppercase"
                    style={{
                      fontFamily: "'Impact', 'Arial Black', sans-serif",
                      WebkitTextStroke: "1px #1e3a8a",
                      textShadow: "0 0 15px rgba(251,191,36,0.7)",
                    }}
                  >
                    POKÉTECH TCG
                  </h3>
                </div>

                {/* Foil Cover Monster Artwork */}
                <div className="relative my-auto flex items-center justify-center">
                  <div className="h-28 w-28 rounded-full bg-cyan-400/20 blur-xl absolute" />
                  <img
                    src={BitkachuImg}
                    alt="Booster Cover"
                    className="h-32 w-32 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-transform group-hover:scale-110 duration-300"
                  />
                </div>

                {/* Pack Bottom Footer */}
                <div className="w-full text-center border-t border-slate-700/80 pt-2 relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-black text-amber-300">
                    <FiStar /> Berisi {pulls.length} Kartu Tersegel
                  </div>
                </div>

                {/* Bottom Crimped Seal */}
                <div
                  className="absolute bottom-0 inset-x-0 h-3 border-t border-amber-400/60"
                  style={{
                    backgroundImage: "repeating-linear-gradient(90deg, #f59e0b, #f59e0b 2px, #0f172a 2px, #0f172a 4px)",
                  }}
                />
              </div>

              {/* Radiant Light Beam Burst when Ripping */}
              {stage === "ripping" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
                  <div className="w-48 h-[600px] bg-gradient-to-t from-transparent via-cyan-300 to-transparent blur-md animate-ping opacity-90" />
                  <div className="absolute top-1/4 px-4 py-2 rounded-2xl bg-amber-400 text-slate-950 font-black text-lg shadow-[0_0_30px_#fbbf24] animate-bounce">
                    ⚡ BREWEEKKK!! ✂️✨
                  </div>
                </div>
              )}
            </div>

            {/* Click to Rip Prompt Button */}
            {stage === "sealed" && (
              <button
                type="button"
                onClick={onRip}
                className="mt-6 flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-sm shadow-[0_0_30px_rgba(251,191,36,0.7)] hover:scale-105 active:scale-95 transition-all"
              >
                <FiScissors className="text-lg" /> SOBEK PACK SEKARANG! ✂️
              </button>
            )}
          </div>
        ) : (
          /* ─── STAGE 2: 3D INTERACTIVE CARD REVEAL IN ALL GLORY ─── */
          <div className="flex flex-col items-center animate-scale-up w-full">
            {/* Rarity Ribbon */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-400/50 text-xs font-black text-cyan-300 mb-3 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              🎉 PULL BERHASIL: {currentCard.name} ({currentCard.rarity})
            </div>

            {/* 3D Perspective Card Stage (Touch / Tilt interactive like main section) */}
            <div
              style={{ perspective: "1200px" }}
              className="w-[290px] sm:w-[320px] aspect-[2.5/3.5] relative z-20 touch-manipulation mb-3"
              onMouseMove={handleModalMouseMove}
              onMouseLeave={handleModalMouseLeave}
              onTouchStart={handleModalTouchStart}
              onTouchMove={handleModalTouchMove}
              onTouchEnd={handleModalTouchEnd}
            >
              <div
                ref={modalSceneRef}
                className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${modalTilt.x}deg) rotateY(${modalTilt.y + (isModalFlipped ? 180 : 0)}deg)`,
                  transition: isModalInteracting
                    ? "none"
                    : "transform 0.45s cubic-bezier(0.34, 1.25, 0.64, 1)",
                }}
                title="Geser atau sentuh kartu untuk memiringkan 3D!"
              >
                {/* CARD FRONT */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <PokemonCardFront card={currentCard} tilt={modalTilt} />
                </div>

                {/* CARD BACK */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <PokemonCardBack />
                </div>
              </div>
            </div>

            {/* 3D Flip & Status Action Controls */}
            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => {
                  setIsModalFlipped(!isModalFlipped);
                  setModalTilt({ x: 0, y: 0 });
                }}
                className="rounded-full border border-cyan-500/50 bg-slate-900/90 px-4 py-1.5 text-xs font-black text-cyan-300 hover:text-white hover:bg-slate-800 flex items-center gap-1.5 shadow-md transition-all"
              >
                <FiRepeat className={isModalFlipped ? "rotate-180 text-amber-400" : "text-cyan-400"} />
                <span>{isModalFlipped ? "Lihat Depan" : "🔄 Balik 3D"}</span>
              </button>

              <span className="text-[10px] font-semibold text-slate-400">
                Geser jari untuk tilt 3D
              </span>
            </div>

            {/* Working Multi-Pull Selection Carousel (Clickable to switch preview card!) */}
            {pulls.length > 1 && (
              <div className="w-full mb-4">
                <p className="text-[11px] text-center text-amber-300 font-bold mb-2">
                  Pilih kartu untuk di-preview ({pulls.length} Kartu):
                </p>
                <div className="flex gap-2 overflow-x-auto pb-2 px-1 justify-center max-w-md mx-auto">
                  {pulls.map((c, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setModalCard(c);
                        setIsModalFlipped(false);
                        if (onSelectCard) onSelectCard(c);
                      }}
                      className={`h-14 w-11 rounded-xl p-1 border-2 flex flex-col items-center justify-between bg-slate-900 shrink-0 transition-all cursor-pointer ${
                        c.id === currentCard.id
                          ? "border-cyan-400 ring-2 ring-cyan-400/80 scale-110 shadow-[0_0_15px_#22d3ee] bg-cyan-950/60"
                          : "border-slate-700 opacity-70 hover:opacity-100 hover:scale-105 hover:border-slate-500"
                      }`}
                      title={`Klik untuk lihat ${c.name} (${c.rarity})`}
                    >
                      <img src={c.image} alt={c.name} className="h-8 w-8 object-contain" />
                      <span
                        className="text-[7px] font-black uppercase"
                        style={{ color: c.themeColor }}
                      >
                        {c.rarity}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Done & Insert to Binder Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all"
            >
              Simpan ke Album Binder <FiArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const TechmonGacha = () => {
  const [unlockedIds, setUnlockedIds] = useState(() => {
    const saved = localStorage.getItem("bimo_poketech_unlocked");
    return saved ? JSON.parse(saved) : [11]; // Default Bitkachu (id: 11)
  });

  const [activeCard, setActiveCard] = useState(POKETECHS[10]); // Bitkachu
  const [isFlipped, setIsFlipped] = useState(false); // 3D Card Flip Front/Back
  const [pulledQueue, setPulledQueue] = useState([]);
  const [totalPulls, setTotalPulls] = useState(() => {
    return parseInt(localStorage.getItem("bimo_poketech_pulls") || "0", 10);
  });
  const [filterRarity, setFilterRarity] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // 🎮 Game Features & Sub-Modes State
  const [activeGameTab, setActiveGameTab] = useState("vault"); // 'vault' | 'battle' | 'fusion' | 'achievements'
  const [stardust, setStardust] = useState(() => {
    return parseInt(localStorage.getItem("bimo_poketech_stardust") || "35", 10);
  });
  const [shinyIds, setShinyIds] = useState(() => {
    const saved = localStorage.getItem("bimo_poketech_shiny");
    return saved ? JSON.parse(saved) : [];
  });
  const [bossesDefeated, setBossesDefeated] = useState(() => {
    const saved = localStorage.getItem("bimo_poketech_bosses");
    return saved ? JSON.parse(saved) : [];
  });

  // 🌟 Booster Pack Ceremony States
  const [packModalOpen, setPackModalOpen] = useState(false);
  const [packStage, setPackStage] = useState("sealed"); // 'sealed' | 'ripping' | 'revealed'
  const [currentPackPulls, setCurrentPackPulls] = useState([]);

  // 3D Card Interactive Tilt Physics (Pokémon TCG Pocket Style Inspector)
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const cardRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const revealRef = useScrollReveal();

  // Desktop Mouse Move (Smooth Tilt Inspection)
  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 22,
      y: (x / (rect.width / 2)) * 22,
    });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Mobile Touch Drag Inspection (Smooth 1:1 TCG Pocket Feel)
  const handleTouchStart = (e) => {
    setIsInteracting(true);
    if (e.touches && e.touches[0] && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      touchStartRef.current = {
        x: e.touches[0].clientX - rect.left - rect.width / 2,
        y: e.touches[0].clientY - rect.top - rect.height / 2,
      };
    }
  };

  const handleTouchMove = (e) => {
    if (!cardRef.current || !e.touches || !e.touches[0]) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left - rect.width / 2;
    const y = e.touches[0].clientY - rect.top - rect.height / 2;
    const clampedX = Math.max(-rect.height / 2, Math.min(rect.height / 2, y));
    const clampedY = Math.max(-rect.width / 2, Math.min(rect.width / 2, x));
    setTilt({
      x: -(clampedX / (rect.height / 2)) * 22,
      y: (clampedY / (rect.width / 2)) * 22,
    });
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
    setTilt({ x: 0, y: 0 });
  };

  // Weighted RNG across 100 Pokemon: UR (6%), SSR (16%), SR (30%), Rare (33%), Common (15%)
  const pullRandomCard = () => {
    const rand = Math.random() * 100;
    let pool;
    if (rand < 6) {
      pool = POKETECHS.filter((m) => m.rarity === "UR");
    } else if (rand < 22) {
      pool = POKETECHS.filter((m) => m.rarity === "SSR");
    } else if (rand < 52) {
      pool = POKETECHS.filter((m) => m.rarity === "SR");
    } else if (rand < 85) {
      pool = POKETECHS.filter((m) => m.rarity === "Rare");
    } else {
      pool = POKETECHS.filter((m) => m.rarity === "Common");
    }

    return pool[Math.floor(Math.random() * pool.length)];
  };

  // Distinct Confetti per Rarity Tier
  const triggerTierCelebration = (rarity) => {
    if (rarity === "UR") {
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#ff007f", "#ffea00", "#00f0ff", "#7928ca", "#00ff66", "#ffffff"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 90,
          angle: 60,
          spread: 80,
          origin: { x: 0 },
          colors: ["#ffea00", "#ff007f", "#00f0ff"],
        });
        confetti({
          particleCount: 90,
          angle: 120,
          spread: 80,
          origin: { x: 1 },
          colors: ["#ffea00", "#ff007f", "#00f0ff"],
        });
      }, 250);
    } else if (rarity === "SSR") {
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#fbbf24", "#eab308", "#ffffff", "#f97316"],
      });
    } else if (rarity === "SR") {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#9333ea", "#a855f7", "#c084fc", "#3b82f6"],
      });
    } else if (rarity === "Rare") {
      confetti({
        particleCount: 40,
        spread: 45,
        origin: { y: 0.7 },
        colors: ["#0284c7", "#38bdf8", "#06b6d4"],
      });
    } else {
      confetti({
        particleCount: 20,
        spread: 30,
        origin: { y: 0.75 },
        colors: ["#10b981", "#34d399"],
      });
    }
  };

  // Launch Booster Pack Ceremony
  const startPackCeremony = (count = 1) => {
    const newPulls = [];
    for (let i = 0; i < count; i++) {
      newPulls.push(pullRandomCard());
    }

    const tierPriority = { UR: 5, SSR: 4, SR: 3, Rare: 2, Common: 1 };
    newPulls.sort((a, b) => tierPriority[b.rarity] - tierPriority[a.rarity]);

    setCurrentPackPulls(newPulls);
    setPackStage("sealed");
    setPackModalOpen(true);
  };

  // Execute the "Brewek / Rip Open" Animation
  const handleRipPack = () => {
    playArcadeSound("rip");
    setPackStage("ripping");

    const topCard = currentPackPulls[0] || POKETECHS[10];

    setTimeout(() => {
      playArcadeSound("celebration");
      setPackStage("revealed");
      setActiveCard(topCard);
      setIsFlipped(false);
      setPulledQueue(currentPackPulls);

      setUnlockedIds((prev) => {
        const set = new Set([...prev, ...currentPackPulls.map((c) => c.id)]);
        const updated = Array.from(set);
        localStorage.setItem("bimo_poketech_unlocked", JSON.stringify(updated));
        return updated;
      });

      setTotalPulls((prev) => {
        const updated = prev + currentPackPulls.length;
        localStorage.setItem("bimo_poketech_pulls", updated.toString());
        return updated;
      });

      // Award +5 Stardust per card pull!
      setStardust((prev) => {
        const updated = prev + currentPackPulls.length * 5;
        localStorage.setItem("bimo_poketech_stardust", updated.toString());
        return updated;
      });

      triggerTierCelebration(topCard.rarity);
    }, 700);
  };

  // ⚔️ Gym Win Handler
  const handleGymWin = (bossId) => {
    setBossesDefeated((prev) => {
      const updated = Array.from(new Set([...prev, bossId]));
      localStorage.setItem("bimo_poketech_bosses", JSON.stringify(updated));
      return updated;
    });
    setStardust((prev) => {
      const updated = prev + 30;
      localStorage.setItem("bimo_poketech_stardust", updated.toString());
      return updated;
    });

    // Award 1x Free Gold Booster Pack!
    setTimeout(() => {
      startPackCeremony(1);
    }, 1200);
  };

  // ✨ Shiny Fusion Handler
  const handleShinyUpgrade = (cardId, cost) => {
    setShinyIds((prev) => {
      const updated = Array.from(new Set([...prev, cardId]));
      localStorage.setItem("bimo_poketech_shiny", JSON.stringify(updated));
      return updated;
    });
    setStardust((prev) => {
      const updated = Math.max(0, prev - cost);
      localStorage.setItem("bimo_poketech_stardust", updated.toString());
      return updated;
    });
  };

  // Reset Collection System
  const handleResetCollection = () => {
    localStorage.removeItem("bimo_poketech_unlocked");
    localStorage.removeItem("bimo_poketech_pulls");
    localStorage.removeItem("bimo_poketech_stardust");
    localStorage.removeItem("bimo_poketech_shiny");
    localStorage.removeItem("bimo_poketech_bosses");
    setUnlockedIds([11]);
    setActiveCard(POKETECHS[10]);
    setIsFlipped(false);
    setPulledQueue([]);
    setTotalPulls(0);
    setStardust(35);
    setShinyIds([]);
    setBossesDefeated([]);
    setShowResetConfirm(false);
  };

  const progressPercent = Math.round((unlockedIds.length / POKETECHS.length) * 100);

  // Stats for Trainer Achievements
  const achievementStats = useMemo(() => {
    const hasUR = unlockedIds.some((id) => {
      const c = POKETECHS.find((m) => m.id === id);
      return c && c.rarity === "UR";
    });

    return {
      totalPulls,
      unlockedCount: unlockedIds.length,
      hasUR,
      bossesDefeated,
      shinyCount: shinyIds.length,
    };
  }, [totalPulls, unlockedIds, bossesDefeated, shinyIds]);

  // Filter and Search Logic
  const filteredPokemons = useMemo(() => {
    return POKETECHS.filter((p) => {
      const matchesRarity = filterRarity === "ALL" || p.rarity === filterRarity;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.element.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRarity && matchesSearch;
    });
  }, [filterRarity, searchQuery]);

  return (
    <section
      id="dev-gacha"
      className="relative overflow-hidden py-24 text-white transition-colors duration-300"
      style={{
        background: "linear-gradient(180deg, #070d1e 0%, #0d1b3e 40%, #0b1531 80%, #060b18 100%)",
        fontFamily: "'Fredoka', 'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* 🌟 RIPPING PACK CEREMONY MODAL OVERLAY */}
      <BoosterPackModal
        isOpen={packModalOpen}
        stage={packStage}
        pulls={currentPackPulls}
        onRip={handleRipPack}
        onClose={() => setPackModalOpen(false)}
        onSelectCard={(c) => setActiveCard(c)}
      />

      {/* TCG Championship Arena Cyber Playmat Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Dynamic Element Radial Aura Glow */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none blur-[140px] opacity-25 transition-all duration-700"
        style={{
          background: activeCard.themeColor || "#2563eb",
        }}
      />

      {/* Arena Cyber Circuit Rings */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-cyan-500/15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full border border-blue-500/10 pointer-events-none" />

      <div ref={revealRef} className="container relative z-10 mx-auto px-6 pt-6 md:px-12 lg:px-24">
        {/* Arena Header (Super Playful & Cheerful Arcade Marquee) */}
        <div className="reveal mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-cyan-400 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.5)] backdrop-blur-md mb-3 animate-pulse">
            <span className="text-base">⚡</span>
            <span>POKÉTECH BATTLE STADIUM • 100 CARDS</span>
            <span className="text-base">🎴✨</span>
          </div>

          <h2 className="text-3xl font-black leading-tight text-white md:text-5xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] tracking-tight">
            PokéTech <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]">TCG Stadium</span> 🎮
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-300 font-medium">
            Buka booster pack dan sobek bungkusnya untuk mendapatkan kartu <strong>PokéTech EX & UR</strong>! Geser kartu untuk rotasi 3D comfy ala Pokémon TCG Pocket!
          </p>
        </div>

        {/* 🎮 Arcade Game Mode Navigation Pill Bar */}
        <div className="reveal flex flex-wrap items-center justify-center gap-2.5 mb-8" data-delay="50">
          <button
            type="button"
            onClick={() => {
              playArcadeSound("click");
              setActiveGameTab("vault");
            }}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 border-2 transition-all shadow-md ${
              activeGameTab === "vault"
                ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.6)] scale-105"
                : "bg-slate-900/90 text-slate-300 border-slate-800 hover:border-amber-400/50 hover:text-white"
            }`}
          >
            <span>🧰</span>
            <span>POKÉ-VAULT & GACHA</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playArcadeSound("click");
              setActiveGameTab("battle");
            }}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 border-2 transition-all shadow-md ${
              activeGameTab === "battle"
                ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white border-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.6)] scale-105 animate-pulse"
                : "bg-slate-900/90 text-slate-300 border-slate-800 hover:border-rose-400/50 hover:text-white"
            }`}
          >
            <span>⚔️</span>
            <span>GYM BATTLE ARENA</span>
            <span className="text-[9px] bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded-full border border-rose-500/50 font-bold">
              VS BOSS
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playArcadeSound("click");
              setActiveGameTab("fusion");
            }}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 border-2 transition-all shadow-md ${
              activeGameTab === "fusion"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.6)] scale-105"
                : "bg-slate-900/90 text-slate-300 border-slate-800 hover:border-indigo-400/50 hover:text-white"
            }`}
          >
            <span>✨</span>
            <span>SHINY FUSION LAB</span>
            <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full font-black">
              ⭐ {stardust}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playArcadeSound("click");
              setActiveGameTab("achievements");
            }}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 border-2 transition-all shadow-md ${
              activeGameTab === "achievements"
                ? "bg-gradient-to-r from-sky-400 to-cyan-500 text-slate-950 border-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.6)] scale-105"
                : "bg-slate-900/90 text-slate-300 border-slate-800 hover:border-sky-400/50 hover:text-white"
            }`}
          >
            <span>🏆</span>
            <span>ACHIEVEMENTS</span>
          </button>
        </div>

        {/* Main Gacha Battle Stage & Dynamic Arcade View */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] items-start max-w-6xl mx-auto">
          {/* Left Column: Active 3D Card Stage + Ergonomic Gacha Launchpad */}
          <div className="reveal flex flex-col items-center w-full max-w-[360px] sm:max-w-[400px] mx-auto" data-delay="100">
            {/* Hologram Pedestal Stage Ring */}
            <div className="relative w-full flex flex-col items-center">
              {/* 3D Perspective Card Box with Touch Support */}
              <div
                style={{ perspective: "1200px" }}
                className="w-full max-w-[320px] sm:max-w-[340px] aspect-[2.5/3.5] relative z-20 touch-manipulation"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* 3D Flipping Container */}
                <div
                  ref={cardRef}
                  className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`,
                    transition: isInteracting
                      ? "none"
                      : "transform 0.45s cubic-bezier(0.34, 1.25, 0.64, 1)",
                  }}
                  title="Geser atau arahkan kursor untuk memiringkan kartu 3D!"
                >
                  {/* CARD FRONT */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <PokemonCardFront
                      card={activeCard}
                      tilt={tilt}
                      isShiny={shinyIds.includes(activeCard.id)}
                    />
                  </div>

                  {/* CARD BACK */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <PokemonCardBack />
                  </div>
                </div>
              </div>

              {/* Glowing Holographic Base Projection Plate */}
              <div
                className="w-64 h-14 -mt-6 rounded-[100%] pointer-events-none blur-[2px] transition-all duration-700"
                style={{
                  background: `radial-gradient(ellipse at center, ${activeCard.themeColor} 0%, rgba(6,182,212,0.4) 40%, transparent 75%)`,
                  boxShadow: `0 0 35px ${activeCard.themeColor}`,
                }}
              />
            </div>

            {/* Quick Action Bar (Flip & Reset) */}
            <div className="mt-3 flex w-full items-center justify-between px-2 gap-2">
              {/* Flip Button */}
              <button
                type="button"
                onClick={() => {
                  playArcadeSound("click");
                  setIsFlipped(!isFlipped);
                  setTilt({ x: 0, y: 0 });
                }}
                className="rounded-full border-2 border-cyan-400 bg-slate-900/90 px-4 py-2 text-xs font-black text-cyan-300 hover:text-white hover:bg-cyan-600 hover:border-cyan-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all backdrop-blur-md"
              >
                <FiRepeat className={isFlipped ? "rotate-180 transition-transform text-amber-400" : "transition-transform text-cyan-300"} />
                <span>{isFlipped ? "Lihat Depan" : "Balik 3D"}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <span className="rounded-full border border-slate-700 bg-slate-900/90 px-3.5 py-1 text-[11px] font-mono font-black text-amber-300 shadow-inner">
                  Pulls: {totalPulls}
                </span>

                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="rounded-full border border-slate-700 bg-slate-900/90 p-2 text-xs text-slate-400 hover:text-rose-400 hover:border-rose-500 transition-all"
                  title="Reset Koleksi Gacha"
                >
                  <FiRotateCcw className="text-xs" />
                </button>
              </div>
            </div>

            {/* Reset Confirmation Prompt */}
            {showResetConfirm && (
              <div className="w-full rounded-2xl border border-rose-500/60 bg-rose-950/70 p-3 mt-3 text-xs flex items-center justify-between gap-2 shadow-lg">
                <span className="font-semibold text-rose-300">
                  Reset semua kartu koleksi?
                </span>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={handleResetCollection}
                    className="rounded-lg bg-rose-600 text-white px-2.5 py-1 font-bold hover:bg-rose-500 text-[11px]"
                  >
                    Ya, Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="rounded-lg bg-slate-800 text-slate-300 px-2.5 py-1 font-bold hover:bg-slate-700 text-[11px]"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}

            {/* ─── PRIMARY GACHA BOOSTER LAUNCHPAD (Super Chunky Playful Arcade Style) ─── */}
            <div className="w-full rounded-3xl border-2 border-slate-800 bg-slate-900/95 p-4 sm:p-5 mt-4 shadow-[0_15px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl">
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-black text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <FiStar className="text-amber-400 animate-spin" /> BUKA BOOSTER PACK
                </span>
                <span className="text-[10px] font-black text-cyan-300 bg-cyan-950/80 border border-cyan-400/40 px-2 py-0.5 rounded-full animate-pulse shadow-sm">
                  ✂️ Sobek Foil & Dapatkan UR!
                </span>
              </div>

              {/* 3 Chunky 3D Arcade Buttons */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {/* 1x Pack (Pikachu Electric Yellow) */}
                <button
                  type="button"
                  onClick={() => {
                    playArcadeSound("click");
                    startPackCeremony(1);
                  }}
                  className="flex flex-col items-center justify-center py-3 px-1 rounded-2xl bg-gradient-to-b from-yellow-300 via-yellow-400 to-amber-500 text-slate-950 font-black shadow-[0_5px_0_#b45309,0_8px_16px_rgba(245,158,11,0.4)] hover:brightness-110 active:translate-y-1 active:shadow-[0_1px_0_#b45309] transition-all group"
                >
                  <FiZap className="text-xl group-hover:scale-125 transition-transform mb-0.5" />
                  <span className="text-xs uppercase tracking-tight font-black">1x Pack</span>
                </button>

                {/* 5x Packs (Squirtle Ocean Cyan) */}
                <button
                  type="button"
                  onClick={() => {
                    playArcadeSound("click");
                    startPackCeremony(5);
                  }}
                  className="flex flex-col items-center justify-center py-3 px-1 rounded-2xl bg-gradient-to-b from-cyan-300 via-cyan-400 to-blue-500 text-slate-950 font-black shadow-[0_5px_0_#0369a1,0_8px_16px_rgba(6,182,212,0.4)] hover:brightness-110 active:translate-y-1 active:shadow-[0_1px_0_#0369a1] transition-all group"
                >
                  <FiGift className="text-xl group-hover:scale-125 transition-transform mb-0.5" />
                  <span className="text-xs uppercase tracking-tight font-black">5x Packs</span>
                </button>

                {/* 10x Mega (Charizard Blazing Fire) */}
                <button
                  type="button"
                  onClick={() => {
                    playArcadeSound("click");
                    startPackCeremony(10);
                  }}
                  className="flex flex-col items-center justify-center py-3 px-1 rounded-2xl bg-gradient-to-b from-rose-500 via-orange-500 to-amber-400 text-white font-black shadow-[0_5px_0_#9f1239,0_8px_16px_rgba(244,63,94,0.4)] hover:brightness-110 active:translate-y-1 active:shadow-[0_1px_0_#9f1239] transition-all group"
                >
                  <FiStar className="text-xl group-hover:scale-125 group-hover:rotate-45 transition-transform mb-0.5" />
                  <span className="text-xs uppercase tracking-tight font-black">10x Mega 🚀</span>
                </button>
              </div>

              {/* Rarity Drop Rates */}
              <div className="mt-3.5 flex flex-wrap items-center justify-between text-[10px] font-black text-slate-300 pt-2.5 border-t border-slate-800">
                <span className="text-pink-400">✨ UR: 6%</span>
                <span className="text-amber-400">SSR: 16%</span>
                <span className="text-purple-400">SR: 30%</span>
                <span className="text-blue-400">Rare: 33%</span>
                <span className="text-slate-400">Com: 15%</span>
              </div>
            </div>

            {/* Pulled Queue Pills */}
            {pulledQueue.length > 1 && (
              <div className="flex flex-wrap gap-1.5 mt-3 text-xs items-center justify-center w-full">
                <span className="text-slate-400 text-[11px] font-semibold">Hasil Pull:</span>
                {pulledQueue.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setActiveCard(c);
                      setIsFlipped(false);
                    }}
                    className="rounded-xl border border-slate-700 bg-slate-900/90 px-2 py-0.5 font-bold text-[9px] text-slate-200 hover:border-cyan-400 hover:scale-105 flex items-center gap-1 shadow-sm"
                  >
                    <span>{c.name.split(".")[0]}</span>
                    <span
                      className="text-[8px] font-black"
                      style={{ color: c.themeColor }}
                    >
                      ({c.rarity})
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Arcade Screen (Vault / Battle / Fusion / Achievements) */}
          <div className="reveal w-full" data-delay="200">
            {activeGameTab === "battle" && (
              <GymBattleArena
                playerCard={activeCard}
                onWinReward={handleGymWin}
                playSound={playArcadeSound}
              />
            )}

            {activeGameTab === "fusion" && (
              <FusionLab
                unlockedIds={unlockedIds}
                shinyIds={shinyIds}
                onUpgradeToShiny={handleShinyUpgrade}
                stardust={stardust}
                playSound={playArcadeSound}
              />
            )}

            {activeGameTab === "achievements" && (
              <AchievementBoard stats={achievementStats} />
            )}

            {activeGameTab === "vault" && (
              /* Playful Wooden Loot Chest Container */
              <div
                className="relative rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden border-4 border-[#5d4037]"
                style={{
                  background: "linear-gradient(180deg, #3e2723 0%, #2b1b17 60%, #1a110d 100%)",
                  boxShadow: "inset 0 0 40px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.6)",
                }}
              >
                {/* Wooden Plank Texture Lines */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, #8d6e63, #8d6e63 2px, transparent 2px, transparent 32px)",
                  }}
                />

                {/* Gold & Iron Riveted Corner Brackets */}
                <div className="absolute top-2 left-2 h-4 w-4 rounded-sm border-2 border-amber-400 bg-amber-600/80 shadow-inner" />
                <div className="absolute top-2 right-2 h-4 w-4 rounded-sm border-2 border-amber-400 bg-amber-600/80 shadow-inner" />
                <div className="absolute bottom-2 left-2 h-4 w-4 rounded-sm border-2 border-amber-400 bg-amber-600/80 shadow-inner" />
                <div className="absolute bottom-2 right-2 h-4 w-4 rounded-sm border-2 border-amber-400 bg-amber-600/80 shadow-inner" />

                {/* Header: Chest Name + Golden Clasp */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 border-b-2 border-[#5d4037] pb-4">
                  <div className="flex items-center gap-3">
                    {/* Glowing 3D Golden Chest Icon */}
                    <div className="h-12 w-12 rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-amber-500 to-yellow-600 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(251,191,36,0.5)] shrink-0">
                      🧰
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3
                          className="text-lg sm:text-xl font-black text-amber-300 tracking-wide uppercase"
                          style={{ fontFamily: "'Fredoka', sans-serif" }}
                        >
                          POKÉ-VAULT CHEST
                        </h3>
                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-700/90 text-emerald-200 border border-emerald-400 shadow-sm">
                          INV: {unlockedIds.length}/100
                        </span>
                      </div>
                      <p className="text-xs text-amber-200/80 font-semibold mt-0.5">
                        Peti Album Koleksi Kartu PokéTech 🎴✨
                      </p>
                    </div>
                  </div>

                  {/* Level / XP Progress Badge */}
                  <div className="flex items-center gap-2 self-start sm:self-auto bg-[#1a110d] px-3.5 py-1.5 rounded-xl border border-amber-500/40 shadow-inner">
                    <span className="text-xs font-black text-emerald-400 font-mono">
                      LVL {unlockedIds.length}
                    </span>
                    <span className="text-[11px] font-bold text-amber-300">
                      {progressPercent}% Complete
                    </span>
                  </div>
                </div>

                {/* Green Pixel XP Progress Bar */}
                <div className="relative z-10 mb-5">
                  <div className="h-3.5 w-full bg-[#1a110d] rounded-md overflow-hidden border-2 border-[#5d4037] p-0.5 shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-lime-400 transition-all duration-500 rounded-sm shadow-[0_0_10px_#4ade80]"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Search Bar + RPG Gem Rarity Filter Pills */}
                <div className="relative z-10 flex flex-col sm:flex-row gap-2.5 mb-4">
                  {/* Search Box */}
                  <div className="relative flex-1 flex items-center bg-[#1a110d]/90 border-2 border-[#5d4037] rounded-xl px-3 py-2 shadow-inner">
                    <FiSearch className="text-amber-400 text-xs mr-2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari kartu dalam peti..."
                      className="w-full bg-transparent text-xs font-bold text-amber-100 outline-none placeholder:text-amber-300/40"
                    />
                  </div>

                  {/* RPG Gem Rarity Filter Pills */}
                  <div className="flex flex-wrap gap-1 text-xs">
                    {[
                      { tier: "ALL", label: "💎 Semua" },
                      { tier: "UR", label: "✨ UR" },
                      { tier: "SSR", label: "🟡 SSR" },
                      { tier: "SR", label: "🟣 SR" },
                      { tier: "Rare", label: "🔵 Rare" },
                      { tier: "Common", label: "⚪ Com" },
                    ].map(({ tier, label }) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setFilterRarity(tier)}
                        className={`rounded-xl px-2.5 py-1 text-[11px] font-black border transition-all ${
                          filterRarity === tier
                            ? "bg-amber-400 text-[#1a110d] border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.6)] scale-105"
                            : "bg-[#1a110d]/80 text-amber-200/70 border-[#5d4037] hover:border-amber-400/60 hover:text-white"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 100-Slot Item Inventory Grid */}
                <div className="relative z-10 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-[380px] overflow-y-auto pr-1">
                  {filteredPokemons.map((mon) => {
                    const isUnlocked = unlockedIds.includes(mon.id);
                    const isSelected = activeCard.id === mon.id;
                    const isShiny = shinyIds.includes(mon.id);

                    return (
                      <button
                        key={mon.id}
                        type="button"
                        onClick={() => {
                          if (isUnlocked) {
                            setActiveCard(mon);
                            setIsFlipped(false);
                          }
                        }}
                        disabled={!isUnlocked}
                        className={`p-1 rounded-xl flex flex-col items-center justify-center transition-all border-2 relative ${
                          isUnlocked
                            ? isSelected
                              ? "bg-amber-400/20 border-amber-300 scale-105 shadow-[0_0_15px_rgba(251,191,36,0.5)] z-20"
                              : "bg-[#1a110d]/90 border-[#5d4037] hover:border-amber-400 hover:scale-105 cursor-pointer shadow-md"
                            : "opacity-35 cursor-not-allowed bg-[#140c09] border-[#3e2723]"
                        }`}
                        title={
                          isUnlocked
                            ? `#${mon.id} ${mon.name} (${mon.rarity})${isShiny ? " ✨ SHINY" : ""}`
                            : `#${mon.id} Terkunci di dalam peti!`
                        }
                      >
                        {/* Inventory Slot Inset Box */}
                        <div
                          className="relative h-11 w-11 rounded-lg overflow-hidden mb-1 flex items-center justify-center bg-[#0d0806] border border-[#3e2723] shadow-inner"
                        >
                          {isUnlocked ? (
                            <img
                              src={mon.image}
                              alt={mon.name}
                              className="h-full w-full object-contain p-0.5 transition-transform hover:scale-110"
                            />
                          ) : (
                            <span className="text-xs opacity-50">🔒</span>
                          )}

                          {isShiny && (
                            <span className="absolute top-0 right-0 text-[9px] animate-pulse">✨</span>
                          )}
                        </div>

                        <span className="text-[8px] font-black truncate w-full text-center text-amber-100">
                          {isUnlocked ? (isShiny ? "✨" : "") + mon.name.split(".")[0] : `???`}
                        </span>

                        <span
                          className="text-[7px] font-black uppercase px-1 rounded mt-0.5"
                          style={{
                            color: isUnlocked ? mon.themeColor : "#795548",
                          }}
                        >
                          {isUnlocked ? (isShiny ? "SHINY" : mon.rarity) : `#${mon.id}`}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Master Chest Unlocked Banner */}
                {progressPercent === 100 && (
                  <div className="relative z-10 rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-600/80 to-yellow-600/80 p-3 mt-4 text-center text-xs font-black text-amber-100 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(251,191,36,0.5)]">
                    <FiCheckCircle className="text-base text-emerald-300" />
                    🏆 PETI TERBUKA SEMPURNA! Selamat, kamu telah mengoleksi seluruh 100 Kartu PokéTech!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechmonGacha;
