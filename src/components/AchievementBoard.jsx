import React from "react";
import { FiAward, FiCheck, FiLock, FiStar, FiZap } from "react-icons/fi";

const ACHIEVEMENTS_DATA = [
  {
    id: "first_pull",
    title: "First Brewek 📦",
    desc: "Buka booster pack pertamamu dan sobek foilnya!",
    icon: "✂️",
    check: (stats) => stats.totalPulls >= 1,
    progress: (stats) => Math.min(100, (stats.totalPulls / 1) * 100),
    reward: "+10 Stardust ⭐",
  },
  {
    id: "pack_addict",
    title: "Pack Addict 🚀",
    desc: "Buka minimal 10 booster pack di PokéTech Stadium.",
    icon: "📦",
    check: (stats) => stats.totalPulls >= 10,
    progress: (stats) => Math.min(100, (stats.totalPulls / 10) * 100),
    reward: "+25 Stardust ⭐",
  },
  {
    id: "ur_hunter",
    title: "UR Legend Hunter 💎",
    desc: "Dapatkan minimal 1 kartu Ultra Rare (UR) legendaris!",
    icon: "✨",
    check: (stats) => stats.hasUR,
    progress: (stats) => (stats.hasUR ? 100 : 0),
    reward: "+30 Stardust ⭐",
  },
  {
    id: "boss_slayer",
    title: "Gym Bug Buster ⚔️",
    desc: "Kalahkan Boss Buggar the Infinite Loop di Gym Arena.",
    icon: "🐛",
    check: (stats) => stats.bossesDefeated.includes("boss_buggar"),
    progress: (stats) => (stats.bossesDefeated.includes("boss_buggar") ? 100 : 0),
    reward: "+20 Stardust ⭐",
  },
  {
    id: "gym_champion",
    title: "Grand Gym Champion 👑",
    desc: "Kalahkan semua 3 Boss AI di Gym Battle Arena!",
    icon: "🏆",
    check: (stats) => stats.bossesDefeated.length >= 3,
    progress: (stats) => Math.min(100, (stats.bossesDefeated.length / 3) * 100),
    reward: "+50 Stardust ⭐",
  },
  {
    id: "shiny_crafter",
    title: "Shiny Alchemist 🔮",
    desc: "Upgrade minimal 1 kartu menjadi Shiny Rainbow Holo.",
    icon: "🌟",
    check: (stats) => stats.shinyCount >= 1,
    progress: (stats) => Math.min(100, (stats.shinyCount / 1) * 100),
    reward: "+20 Stardust ⭐",
  },
  {
    id: "collector_25",
    title: "Poké-Collector 25 🎴",
    desc: "Kumpulkan 25 kartu berbeda di Poké-Vault Chest.",
    icon: "🧰",
    check: (stats) => stats.unlockedCount >= 25,
    progress: (stats) => Math.min(100, (stats.unlockedCount / 25) * 100),
    reward: "+30 Stardust ⭐",
  },
  {
    id: "collector_50",
    title: "Poké-Master 50 🌟",
    desc: "Kumpulkan 50 kartu unik di album koleksi.",
    icon: "🎖️",
    check: (stats) => stats.unlockedCount >= 50,
    progress: (stats) => Math.min(100, (stats.unlockedCount / 50) * 100),
    reward: "+50 Stardust ⭐",
  },
];

const AchievementBoard = ({ stats }) => {
  const completedCount = ACHIEVEMENTS_DATA.filter((ach) => ach.check(stats)).length;
  const totalCount = ACHIEVEMENTS_DATA.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  return (
    <div
      className="relative rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden border-4 border-[#0284c7]"
      style={{
        background: "linear-gradient(180deg, #0c4a6e 0%, #082f49 60%, #031828 100%)",
        fontFamily: "'Fredoka', sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-sky-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl border-2 border-sky-400 bg-sky-950/80 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(56,189,248,0.5)]">
            🏆
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-sky-300 uppercase tracking-wide">
              TRAINER ACHIEVEMENTS
            </h3>
            <p className="text-xs text-sky-200/80 font-semibold">
              Piala Penghargaan & Misi Khusus Trainer PokéTech
            </p>
          </div>
        </div>

        {/* Global Progress */}
        <div className="flex items-center gap-3 bg-[#031828] px-4 py-2 rounded-2xl border border-sky-500/40">
          <span className="text-xs font-black text-sky-400 font-mono">
            {completedCount} / {totalCount} TERBUKA
          </span>
          <div className="h-3 w-20 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-emerald-400"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid sm:grid-cols-2 gap-3.5 my-6">
        {ACHIEVEMENTS_DATA.map((ach) => {
          const isDone = ach.check(stats);
          const prog = ach.progress(stats);

          return (
            <div
              key={ach.id}
              className={`rounded-2xl p-3.5 border-2 flex items-start gap-3 transition-all ${
                isDone
                  ? "border-amber-400/80 bg-gradient-to-r from-amber-950/40 to-slate-900/90 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                  : "border-slate-800 bg-slate-950/70 opacity-75"
              }`}
            >
              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center text-xl shrink-0 border ${
                  isDone
                    ? "border-amber-400 bg-amber-500/20 text-amber-300 shadow-sm"
                    : "border-slate-800 bg-slate-900 text-slate-500"
                }`}
              >
                {isDone ? ach.icon : <FiLock />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xs sm:text-sm font-black truncate ${isDone ? "text-amber-300" : "text-slate-300"}`}>
                    {ach.title}
                  </h4>
                  {isDone && (
                    <span className="text-[10px] font-black uppercase text-emerald-400 flex items-center gap-0.5">
                      <FiCheck /> Selesai
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                  {ach.desc}
                </p>

                {/* Progress bar */}
                {!isDone && (
                  <div className="mt-2 h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-sky-500 transition-all duration-300"
                      style={{ width: `${prog}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementBoard;
