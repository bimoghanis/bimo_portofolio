import React, { useState, useRef, useMemo } from "react";
import confetti from "canvas-confetti";
import useScrollReveal from "../hooks/useScrollReveal";
import { POKETECHS } from "../data/poketechs";
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

// Dynamic Weakness, Resistance & Retreat Calculator per Element
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
      {/* Outer Blue Border Rim */}
      <div className="absolute inset-1 rounded-xl border-2 border-[#60a5fa]/60 pointer-events-none" />

      {/* Swirling Background Texture */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.7) 0%, rgba(37,99,235,0.4) 40%, rgba(15,23,42,0.9) 100%)",
        }}
      />

      {/* Spiral Swirl Whirlpool SVG */}
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

      {/* Top Parody Logo: PokéTech */}
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

      {/* Center Glowing Pokéball / TechBall */}
      <div className="relative z-10 my-auto flex items-center justify-center">
        {/* Outer Glow Halo */}
        <div className="absolute h-36 w-36 rounded-full bg-cyan-400/30 blur-xl animate-pulse" />

        {/* 3D Ball Sphere */}
        <div
          className="relative h-28 w-28 rounded-full border-4 border-slate-900 overflow-hidden shadow-2xl flex flex-col"
          style={{
            boxShadow:
              "inset -8px -8px 16px rgba(0,0,0,0.7), inset 8px 8px 16px rgba(255,255,255,0.4), 0 10px 25px rgba(0,0,0,0.8)",
          }}
        >
          {/* Top Half (Red Shell with Gloss Highlight) */}
          <div
            className="relative h-1/2 w-full bg-gradient-to-b from-red-500 to-red-600"
            style={{
              background: "radial-gradient(circle at 35% 35%, #ff6b6b 0%, #dc2626 70%, #991b1b 100%)",
            }}
          >
            <div className="absolute top-1 left-3 h-4 w-10 rounded-full bg-white/50 blur-[1px] rotate-[-20deg]" />
          </div>

          {/* Middle Black Dividing Band */}
          <div className="h-2 w-full bg-slate-900 shrink-0" />

          {/* Bottom Half (White Shell with 3D Shadow) */}
          <div
            className="h-1/2 w-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #e2e8f0 70%, #94a3b8 100%)",
            }}
          />

          {/* Center Button */}
          <div className="absolute inset-0 m-auto h-9 w-9 rounded-full border-4 border-slate-900 bg-white flex items-center justify-center shadow-lg">
            <div className="h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-ping" />
            <div className="absolute h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          </div>
        </div>
      </div>

      {/* Bottom Inverted Parody Logo: PokéTech */}
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

// Authentic Pokémon TCG Card Front Component (EX / Full-Art / Ultra Holographic Foil style)
const PokemonCardFront = ({ card, tilt }) => {
  const energy = getElementEnergy(card.element);
  const battleStats = getElementalBattleStats(card.element, card.rarity);

  const isMythic = card.rarity === "UR";
  const isSSR = card.rarity === "SSR";

  const cardBorderGradient = isMythic
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
        boxShadow: isMythic
          ? "0 0 50px rgba(236,72,153,0.7), 0 0 30px rgba(6,182,212,0.6), 0 0 15px rgba(251,191,36,0.8), 0 25px 50px rgba(0,0,0,0.7)"
          : isSSR
          ? "0 0 45px rgba(245,158,11,0.65), 0 0 20px rgba(251,191,36,0.6), 0 25px 50px rgba(0,0,0,0.6)"
          : `0 0 35px ${card.themeColor}88, 0 20px 40px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Dynamic Tilt Tracking Holographic Starlight Flare */}
      <div
        className="absolute inset-0 pointer-events-none z-30 mix-blend-color-dodge transition-transform duration-75 ease-out"
        style={{
          opacity: isMythic ? 0.7 : isSSR ? 0.55 : 0.4,
          background: `radial-gradient(circle at ${50 + tilt.y * 3.5}% ${
            50 - tilt.x * 3.5
          }%, rgba(255,255,255,0.95) 0%, rgba(255,215,0,0.6) 20%, rgba(236,72,153,0.45) 40%, rgba(6,182,212,0.35) 60%, transparent 80%)`,
        }}
      />

      {/* Holographic Prismatic Diagonal Rainbow Sheen */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay z-25"
        style={{
          background:
            "linear-gradient(115deg, transparent 15%, rgba(255,255,255,0.9) 30%, rgba(236,72,153,0.7) 45%, rgba(6,182,212,0.7) 55%, rgba(251,191,36,0.8) 70%, transparent 85%)",
          transform: `translate(${tilt.y * 6}px, ${tilt.x * 6}px)`,
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
              style={{ background: card.badgeBg }}
            >
              {isMythic ? "✨ UR EX" : isSSR ? "🌟 SSR EX" : "BASIC"}
            </span>
            <h3
              className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none truncate max-w-[130px] sm:max-w-[170px]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {card.name}
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-slate-500">HP</span>
            <span className="text-sm sm:text-base font-black text-rose-600 font-mono leading-none">
              {card.hp}
            </span>
            <span
              className="h-5 w-5 rounded-full flex items-center justify-center text-[10px] text-white shadow-sm shrink-0"
              style={{ background: energy.bg }}
              title={energy.name}
            >
              {energy.icon}
            </span>
          </div>
        </div>

        {/* Artwork Display Box with 3D Shadow, Foil Glare & Inner Bevel */}
        <div className="my-1.5 relative rounded-lg overflow-hidden border-2 border-amber-300/80 shadow-md bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 flex flex-col items-center justify-center h-40 sm:h-44">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 opacity-45 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${card.themeColor} 0%, transparent 70%)`,
            }}
          />

          {/* Glass Glare Sheen Reflection */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/25 to-transparent z-15" />

          <img
            src={card.image}
            alt={card.name}
            className="relative z-10 h-32 sm:h-36 w-auto object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.4)] transition-transform hover:scale-105"
          />

          {/* Bottom Caption Strip */}
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

        {/* Dynamic Weakness, Resistance & Retreat Cost */}
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

        {/* Clean Footer (No Copyright Name / No Illustrator Name) */}
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

const TechmonGacha = () => {
  const [unlockedIds, setUnlockedIds] = useState(() => {
    const saved = localStorage.getItem("bimo_poketech_unlocked");
    return saved ? JSON.parse(saved) : [11]; // Default Bitkachu (id: 11)
  });

  const [activeCard, setActiveCard] = useState(POKETECHS[10]); // Bitkachu
  const [isFlipped, setIsFlipped] = useState(false); // 3D Card Flip Front/Back
  const [pulledQueue, setPulledQueue] = useState([]);
  const [isOpening, setIsOpening] = useState(false);
  const [totalPulls, setTotalPulls] = useState(() => {
    return parseInt(localStorage.getItem("bimo_poketech_pulls") || "0", 10);
  });
  const [filterRarity, setFilterRarity] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // 3D Card Interactive Tilt Physics
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const revealRef = useScrollReveal();

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 14,
      y: (x / (rect.width / 2)) * 14,
    });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Touch Screen Handler for Mobile
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    }
  };

  const handleTouchMove = (e) => {
    if (!cardRef.current || !e.touches || !e.touches[0]) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left - rect.width / 2;
    const y = e.touches[0].clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 12,
      y: (x / (rect.width / 2)) * 12,
    });
  };

  const handleTouchEnd = (e) => {
    const elapsed = Date.now() - touchStartRef.current.time;
    if (elapsed < 300) {
      // Tap detected -> Toggle 3D Flip immediately
      setIsFlipped((prev) => !prev);
    }
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

  const handleGacha = (count = 1) => {
    if (isOpening) return;
    setIsOpening(true);

    const newPulls = [];
    for (let i = 0; i < count; i++) {
      newPulls.push(pullRandomCard());
    }

    const tierPriority = { UR: 5, SSR: 4, SR: 3, Rare: 2, Common: 1 };
    newPulls.sort((a, b) => tierPriority[b.rarity] - tierPriority[a.rarity]);
    const topCard = newPulls[0];

    setTimeout(() => {
      setActiveCard(topCard);
      setIsFlipped(false);
      setPulledQueue(newPulls);

      setUnlockedIds((prev) => {
        const set = new Set([...prev, ...newPulls.map((c) => c.id)]);
        const updated = Array.from(set);
        localStorage.setItem("bimo_poketech_unlocked", JSON.stringify(updated));
        return updated;
      });

      setTotalPulls((prev) => {
        const updated = prev + count;
        localStorage.setItem("bimo_poketech_pulls", updated.toString());
        return updated;
      });

      triggerTierCelebration(topCard.rarity);
      setIsOpening(false);
    }, 650);
  };

  // Reset Collection System
  const handleResetCollection = () => {
    localStorage.removeItem("bimo_poketech_unlocked");
    localStorage.removeItem("bimo_poketech_pulls");
    setUnlockedIds([11]);
    setActiveCard(POKETECHS[10]);
    setIsFlipped(false);
    setPulledQueue([]);
    setTotalPulls(0);
    setShowResetConfirm(false);
  };

  const progressPercent = Math.round((unlockedIds.length / POKETECHS.length) * 100);

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
      }}
    >
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
        {/* Arena Header */}
        <div className="reveal mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/70 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-md mb-3">
            <FiCompass className="animate-spin text-cyan-400" />
            POKÉTECH BATTLE ARENA • 100 CARDS 🎴✨
          </div>

          <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl drop-shadow-md">
            PokéTech <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">TCG Stadium</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-300 font-medium">
            Gacha kartu resmi <strong>PokéTech EX & UR</strong>! Ketuk kartu untuk membalik sisi depan & belakang (<strong>3D Card Flip</strong>), dan kumpulkan seluruh 100 kartu di PokéDex Binder!
          </p>
        </div>

        {/* Main Gacha Battle Stage */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] items-start max-w-6xl mx-auto">
          {/* Left: Active Summon Card with Glowing Hologram Pedestal */}
          <div className="reveal flex flex-col items-center" data-delay="100">
            {/* Hologram Pedestal Stage Ring */}
            <div className="relative w-full max-w-[340px] flex flex-col items-center">
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
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={`relative w-full h-full cursor-pointer transition-transform duration-500 ease-out select-none ${
                    isOpening ? "animate-pulse scale-95 blur-[2px]" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`,
                  }}
                  title="Ketuk atau klik untuk membalik kartu (3D Flip)"
                >
                  {/* CARD FRONT */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <PokemonCardFront card={activeCard} tilt={tilt} />
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
                className="w-64 h-16 -mt-6 rounded-[100%] pointer-events-none blur-[2px] transition-all duration-700"
                style={{
                  background: `radial-gradient(ellipse at center, ${activeCard.themeColor} 0%, rgba(6,182,212,0.4) 40%, transparent 75%)`,
                  boxShadow: `0 0 35px ${activeCard.themeColor}`,
                }}
              />
            </div>

            {/* Flip Card Action Button */}
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsFlipped(!isFlipped)}
                className="rounded-full border border-cyan-500/30 bg-slate-900/90 px-5 py-2.5 text-xs font-extrabold text-cyan-300 hover:text-white hover:bg-slate-800 hover:border-cyan-400 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all backdrop-blur-md"
              >
                <FiRepeat className={isFlipped ? "rotate-180 transition-transform text-cyan-400" : "transition-transform text-cyan-400"} />
                {isFlipped ? "Lihat Sisi Depan Kartu" : "🔄 Balik Kartu (Lihat Sisi Belakang)"}
              </button>
            </div>

            {/* Pulled Queue Pills */}
            {pulledQueue.length > 1 && (
              <div className="flex flex-wrap gap-2 mt-4 text-xs items-center justify-center max-w-sm">
                <span className="text-slate-400 font-semibold">Hasil Pull ({pulledQueue.length}):</span>
                {pulledQueue.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setActiveCard(c);
                      setIsFlipped(false);
                    }}
                    className="rounded-xl border border-slate-700 bg-slate-900/90 px-2.5 py-1 font-bold text-[10px] text-slate-200 hover:border-cyan-400 hover:scale-105 flex items-center gap-1 shadow-sm"
                  >
                    <span>{c.name.split(".")[0]}</span>
                    <span
                      className="text-[9px] font-black"
                      style={{ color: c.themeColor }}
                    >
                      ({c.rarity})
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Gacha Booster Pack Controls + 100 PokéDex Album */}
          <div className="reveal space-y-6" data-delay="200">
            {/* Gacha Trigger Arena Box */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-black text-white flex items-center gap-2">
                    <FiStar className="text-cyan-400" /> Buka Booster Pack TCG
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Gratis unli-pull • Buka pack & temukan kartu ✨ <strong className="text-cyan-300">UR EX Foil</strong>!
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-slate-700 bg-slate-800 px-3.5 py-1 text-xs font-mono font-bold text-slate-300">
                    Pulls: {totalPulls}
                  </span>

                  {/* Reset Progress Button */}
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(true)}
                    className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-xs text-slate-400 hover:text-rose-400 hover:border-rose-500 transition-all"
                    title="Reset Koleksi Gacha"
                  >
                    <FiRotateCcw className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Reset Confirmation Prompt */}
              {showResetConfirm && (
                <div className="rounded-2xl border border-rose-500/60 bg-rose-950/50 p-3.5 mb-4 text-xs flex items-center justify-between gap-2">
                  <span className="font-semibold text-rose-300">
                    Reset semua kartu koleksi dan mulai dari awal?
                  </span>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleResetCollection}
                      className="rounded-lg bg-rose-600 text-white px-3 py-1 font-bold hover:bg-rose-500"
                    >
                      Ya, Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(false)}
                      className="rounded-lg bg-slate-800 text-slate-300 px-3 py-1 font-bold hover:bg-slate-700"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}

              {/* High-Tech Studio Trainer Buttons (Clean & Professional Gaming Theme) */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
                {/* 1x Pack */}
                <button
                  type="button"
                  onClick={() => handleGacha(1)}
                  disabled={isOpening}
                  className="flex items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-black rounded-2xl border border-blue-500/40 bg-slate-800/90 text-blue-300 hover:bg-blue-600 hover:text-white hover:border-blue-500 shadow-sm hover:scale-102 active:scale-98 transition-all"
                >
                  <FiZap className="text-blue-400" />
                  {isOpening ? "..." : "1x Pack"}
                </button>

                {/* 5x Packs */}
                <button
                  type="button"
                  onClick={() => handleGacha(5)}
                  disabled={isOpening}
                  className="flex items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-black rounded-2xl border border-cyan-500/40 bg-slate-800/90 text-cyan-300 hover:bg-cyan-600 hover:text-white hover:border-cyan-500 shadow-sm hover:scale-102 active:scale-98 transition-all"
                >
                  <FiGift className="text-cyan-400" />
                  {isOpening ? "..." : "5x Packs"}
                </button>

                {/* 10x Mega */}
                <button
                  type="button"
                  onClick={() => handleGacha(10)}
                  disabled={isOpening}
                  className="flex items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-black rounded-2xl border border-indigo-500/40 bg-slate-800/90 text-indigo-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 shadow-sm hover:scale-102 active:scale-98 transition-all"
                >
                  <FiStar className="text-indigo-400" />
                  {isOpening ? "..." : "10x Mega 🚀"}
                </button>
              </div>

              {/* Rarity Drop Rates */}
              <div className="mt-4 flex flex-wrap items-center justify-between text-[11px] font-bold text-slate-400 pt-3 border-t border-slate-800">
                <span>Peluang Gacha:</span>
                <span className="text-pink-400 font-black">✨ UR EX: 6%</span>
                <span className="text-amber-400 font-extrabold">SSR: 16%</span>
                <span className="text-purple-400 font-extrabold">SR: 30%</span>
                <span className="text-blue-400 font-extrabold">Rare: 33%</span>
                <span className="text-slate-400 font-bold">Common: 15%</span>
              </div>
            </div>

            {/* 100 PokéDex Collection Tracker Binder */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-base font-black text-white flex items-center gap-2">
                    <FiAward className="text-cyan-400" /> PokéDex Binder ({POKETECHS.length} Cards)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Terkumpul: <span className="font-bold text-cyan-300">{unlockedIds.length}</span> / {POKETECHS.length} Kartu
                  </p>
                </div>

                <span className="rounded-full border border-cyan-400/30 bg-cyan-950/70 px-3 py-1 text-xs font-bold text-cyan-300 self-start sm:self-auto">
                  {progressPercent}% Complete
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2.5 w-full bg-slate-950/80 overflow-hidden rounded-full mb-4 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Search Bar + Filter Tabs */}
              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <div className="relative flex-1 flex items-center bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5">
                  <FiSearch className="text-slate-400 text-xs mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, element, attack..."
                    className="w-full bg-transparent text-xs font-semibold text-white outline-none placeholder:text-slate-500"
                  />
                </div>

                <div className="flex flex-wrap gap-1 text-xs">
                  {["ALL", "UR", "SSR", "SR", "Rare", "Common"].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setFilterRarity(tier)}
                      className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition-all ${
                        filterRarity === tier
                          ? "bg-cyan-500 text-slate-950 font-black shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                          : "bg-slate-800/80 text-slate-400 hover:text-white"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* 100 Monster Thumbnail Grid (Scrollable) */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-[340px] overflow-y-auto pr-1">
                {filteredPokemons.map((mon) => {
                  const isUnlocked = unlockedIds.includes(mon.id);
                  const isSelected = activeCard.id === mon.id;

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
                      className={`p-1.5 rounded-2xl flex flex-col items-center justify-center transition-all border ${
                        isUnlocked
                          ? isSelected
                            ? "bg-cyan-950/70 border-cyan-400 scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                            : "bg-slate-800/60 border-slate-700/80 hover:border-slate-500 hover:scale-105 cursor-pointer"
                          : "opacity-30 cursor-not-allowed bg-slate-950 border-slate-800"
                      }`}
                      title={isUnlocked ? `#${mon.id} ${mon.name} (${mon.rarity})` : `#${mon.id} Locked - Gacha to unlock!`}
                    >
                      <div className="relative h-10 w-10 rounded-xl overflow-hidden mb-1 flex items-center justify-center bg-slate-900/80">
                        {isUnlocked ? (
                          <img
                            src={mon.image}
                            alt={mon.name}
                            className="h-full w-full object-contain p-0.5"
                          />
                        ) : (
                          <span className="text-xs opacity-40">🔒</span>
                        )}
                      </div>

                      <span className="text-[8px] font-extrabold truncate w-full text-center text-slate-200">
                        {isUnlocked ? mon.name.split(".")[0] : `???`}
                      </span>
                      <span
                        className="text-[7px] font-black uppercase px-1 rounded mt-0.5"
                        style={{
                          color: isUnlocked ? mon.themeColor : "#64748b",
                        }}
                      >
                        {isUnlocked ? mon.rarity : `#${mon.id}`}
                      </span>
                    </button>
                  );
                })}
              </div>

              {progressPercent === 100 && (
                <div className="rounded-2xl border border-cyan-400/50 bg-cyan-950/60 p-3 mt-4 text-center text-xs font-black text-cyan-300 flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <FiCheckCircle className="text-base text-emerald-400" /> Selamat! Kamu adalah POKÉTECH MASTER! Berhasil mengoleksi seluruh 100 Kartu! 🏆🎉
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechmonGacha;
