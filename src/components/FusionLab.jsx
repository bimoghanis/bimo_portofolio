import React, { useState } from "react";
import confetti from "canvas-confetti";
import { FiStar, FiZap, FiCheckCircle, FiArrowUpRight, FiRefreshCw } from "react-icons/fi";
import { POKETECHS } from "../data/poketechs";

const FusionLab = ({
  unlockedIds,
  shinyIds,
  onUpgradeToShiny,
  stardust,
  playSound,
}) => {
  const [selectedCardId, setSelectedCardId] = useState(unlockedIds[0] || 11);
  const [isFusing, setIsFusing] = useState(false);

  const card = POKETECHS.find((c) => c.id === selectedCardId) || POKETECHS[10];
  const isAlreadyShiny = shinyIds.includes(card.id);
  const COST = 30; // 30 Stardust to make Shiny

  const handleFuse = () => {
    if (isFusing || isAlreadyShiny || stardust < COST) return;
    setIsFusing(true);
    if (playSound) playSound("rip");

    setTimeout(() => {
      setIsFusing(false);
      if (onUpgradeToShiny) onUpgradeToShiny(card.id, COST);
      if (playSound) playSound("celebration");

      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#ffd700", "#ff007f", "#00f0ff", "#ffffff", "#a855f7"],
      });
    }, 1200);
  };

  return (
    <div
      className="relative rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden border-4 border-[#4338ca]"
      style={{
        background: "linear-gradient(180deg, #1e1b4b 0%, #0f172a 60%, #020617 100%)",
        fontFamily: "'Fredoka', sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-indigo-900 gap-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl border-2 border-indigo-400 bg-indigo-950/80 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            ✨
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-indigo-300 uppercase tracking-wide">
              SHINY FUSION LAB
            </h3>
            <p className="text-xs text-indigo-200/70 font-semibold">
              Upgrade Kartu Koleksi menjadi ✨ Shiny Rainbow Holo (+40 HP / +20 ATK)
            </p>
          </div>
        </div>

        {/* Stardust Balance */}
        <div className="flex items-center gap-2 bg-[#0f172a] px-4 py-2 rounded-2xl border border-indigo-500/40 shadow-inner">
          <span className="text-amber-400 text-base">⭐</span>
          <span className="text-xs font-black text-slate-300">Stardust:</span>
          <span className="text-sm font-black text-amber-300 font-mono">{stardust}</span>
        </div>
      </div>

      {/* Fusion Stage Grid */}
      <div className="grid sm:grid-cols-[1.2fr_1fr] gap-6 my-6 items-center">
        {/* Left: Card Transformation Showcase */}
        <div className="relative flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-950/80 border-2 border-indigo-500/30 overflow-hidden">
          {/* Cosmic Aura Swirl */}
          <div
            className={`absolute inset-0 opacity-40 blur-2xl pointer-events-none transition-all duration-700 ${
              isFusing ? "bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 scale-125" : "bg-indigo-600/30"
            }`}
          />

          <div
            className={`relative rounded-2xl p-2 border-4 transition-all duration-500 ${
              isFusing
                ? "scale-110 rotate-3 border-yellow-300 shadow-[0_0_50px_#fde047] animate-pulse"
                : isAlreadyShiny
                ? "border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.6)] bg-gradient-to-b from-amber-500/20 to-pink-500/20"
                : "border-slate-800 bg-slate-900"
            }`}
          >
            <img
              src={card.image}
              alt={card.name}
              className="h-44 w-auto object-contain drop-shadow-xl"
            />

            {isAlreadyShiny && (
              <div className="absolute -top-3 -right-3 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-black text-[10px] shadow-lg flex items-center gap-1">
                <FiStar className="animate-spin" /> SHINY EDITION
              </div>
            )}
          </div>

          <div className="mt-4 text-center">
            <h4 className="text-lg font-black text-white">{card.name}</h4>
            <div className="flex items-center justify-center gap-3 mt-1 text-xs font-black">
              <span className={isAlreadyShiny ? "text-emerald-400 font-bold" : "text-slate-400"}>
                HP: {(() => {
                  let base = card.rarity === "UR" ? 580 : card.rarity === "SSR" ? 380 : card.rarity === "SR" ? 280 : card.rarity === "Rare" ? 210 : 150;
                  base += (card.id % 6) * 10;
                  return isAlreadyShiny ? base + 140 : base;
                })()} {isAlreadyShiny ? "(+140 ✨)" : ""}
              </span>
              <span className={isAlreadyShiny ? "text-amber-400 font-bold" : "text-slate-400"}>
                ATK: {(() => {
                  let base = card.rarity === "UR" ? 92 : card.rarity === "SSR" ? 65 : card.rarity === "SR" ? 50 : card.rarity === "Rare" ? 38 : 28;
                  base += (card.id % 4) * 3;
                  return isAlreadyShiny ? base + 28 : base;
                })()} {isAlreadyShiny ? "(+28 ✨)" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Fusion Chamber Controls */}
        <div className="space-y-4">
          <div className="rounded-2xl p-4 bg-indigo-950/40 border border-indigo-500/30 space-y-2 text-xs">
            <p className="text-slate-300 font-semibold">
              ✨ <strong>Keuntungan Upgrade Shiny:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 font-medium">
              <li>Mendapatkan efek kilau pelangi prisma di arena 3D.</li>
              <li>Meningkatkan HP sebesar +140 poin untuk duel Gym.</li>
              <li>Meningkatkan ATK sebesar +28 poin damage.</li>
              <li>Membuka badge Shiny Collector di album binder!</li>
            </ul>
          </div>

          {/* Upgrade Action Button */}
          {isAlreadyShiny ? (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-center font-black text-xs flex items-center justify-center gap-2">
              <FiCheckCircle className="text-base text-emerald-400" />
              Kartu ini sudah mencapai status Maksimal ✨ SHINY HOLO!
            </div>
          ) : (
            <button
              type="button"
              disabled={isFusing || stardust < COST}
              onClick={handleFuse}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-sm shadow-[0_5px_0_#b45309,0_10px_20px_rgba(251,191,36,0.4)] hover:brightness-110 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isFusing ? (
                <>
                  <FiRefreshCw className="animate-spin text-lg" />
                  Menggabungkan Stardust Galaksi...
                </>
              ) : stardust < COST ? (
                `Butuh ${COST} Stardust (Kurang ${COST - stardust} ⭐)`
              ) : (
                <>
                  <span className="text-lg animate-bounce">✨</span>
                  FUSE MENJADI SHINY HOLO ({COST} ⭐)
                </>
              )}
            </button>
          )}

          <p className="text-[11px] text-center text-slate-500 font-medium">
            💡 Dapatkan Stardust dari setiap kali membuka booster pack & memenangkan duel Gym Arena!
          </p>
        </div>
      </div>

      {/* Select Card to Upgrade Strip */}
      <div className="pt-4 border-t border-indigo-900/80">
        <p className="text-xs font-bold text-indigo-300 mb-2">Pilih kartu dari koleksimu untuk di-upgrade:</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {unlockedIds.map((id) => {
            const c = POKETECHS.find((m) => m.id === id);
            if (!c) return null;
            const isShiny = shinyIds.includes(c.id);
            const isSelected = c.id === selectedCardId;

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCardId(c.id)}
                className={`h-16 w-14 rounded-xl p-1 border-2 flex flex-col items-center justify-between shrink-0 transition-all ${
                  isSelected
                    ? "border-amber-400 ring-2 ring-amber-400/70 scale-105 bg-indigo-950 shadow-[0_0_12px_#fbbf24]"
                    : "border-slate-800 bg-slate-900/90 hover:border-slate-600 opacity-80 hover:opacity-100"
                }`}
                title={c.name}
              >
                <img src={c.image} alt={c.name} className="h-9 w-9 object-contain" />
                <span className="text-[8px] font-black truncate w-full text-center text-slate-300">
                  {isShiny ? "✨" : ""}{c.name.split(".")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FusionLab;
