import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { POKETECHS } from "../data/poketechs";
import {
  FiShield,
  FiZap,
  FiHeart,
  FiAward,
  FiRotateCcw,
  FiCrosshair,
  FiStar,
  FiRefreshCw,
  FiUsers,
  FiCheck,
  FiChevronLeft,
  FiLock,
  FiCheckCircle,
} from "react-icons/fi";

const BOSS_LIST = [
  {
    stage: 1,
    id: "boss_buggar",
    name: "Buggar the Infinite Loop",
    title: "Runtime Crash Spectre",
    badgeName: "Syntax Badge 🟢",
    badgeIcon: "🟢",
    element: "Grass / Bug",
    level: 20,
    maxHp: 280,
    atk: 32,
    avatar: "🐛",
    image: POKETECHS[4]?.image,
    themeColor: "#16a34a",
    moves: [
      { name: "Memory Leak", power: 28, desc: "Steals stack memory!" },
      { name: "Uncaught Exception", power: 42, desc: "Syntax crash spike!" },
    ],
  },
  {
    stage: 2,
    id: "boss_psyduck",
    name: "404 Psyduck Panic",
    title: "Stack Memory Overflower",
    badgeName: "Hydra Badge 🔵",
    badgeIcon: "🔵",
    element: "Water / Memory",
    level: 38,
    maxHp: 420,
    atk: 48,
    avatar: "🦆",
    image: POKETECHS[10]?.image,
    themeColor: "#0284c7",
    moves: [
      { name: "Water Gun Hydro-Query", power: 40, desc: "Floods client socket!" },
      { name: "Severe Migraine 404", power: 62, desc: "Server unavailable burst!" },
    ],
  },
  {
    stage: 3,
    id: "boss_mewtwo",
    name: "NullPointer Mewtwo",
    title: "AI Neural Overlord",
    badgeName: "Neural Badge 🟣",
    badgeIcon: "🟣",
    element: "Psychic / AI",
    level: 55,
    maxHp: 560,
    atk: 65,
    avatar: "🔮",
    image: POKETECHS[7]?.image,
    themeColor: "#9333ea",
    moves: [
      { name: "Neural Mind Telepathy", power: 55, desc: "Distorts memory registers!" },
      { name: "Fatal Segmentation", power: 85, desc: "Total system purge blast!" },
    ],
  },
  {
    stage: 4,
    id: "boss_dragonite",
    name: "Merge Conflict Dragonite",
    title: "Git Rebellion Titan",
    badgeName: "Git Cataclysm Badge 🔴",
    badgeIcon: "🔴",
    element: "Dragon / Fire",
    level: 75,
    maxHp: 720,
    atk: 85,
    avatar: "🐉",
    image: POKETECHS[12]?.image,
    themeColor: "#ea580c",
    moves: [
      { name: "Rebase Cataclysm", power: 70, desc: "Overwrites commit branches!" },
      { name: "Force Push Annihilation", power: 110, desc: "Obliterates master branch!" },
    ],
  },
  {
    stage: 5,
    id: "boss_arceus",
    name: "Arceus.py Celestial Creator",
    title: "Master Tech Gym Champion 👑",
    badgeName: "Celestial Champion Badge 👑✨",
    badgeIcon: "👑",
    element: "Cosmic / Python",
    level: 99,
    maxHp: 950,
    atk: 105,
    avatar: "✨",
    image: POKETECHS[0]?.image,
    themeColor: "#e11d48",
    moves: [
      { name: "Genesis Global Interpreter Lock", power: 90, desc: "Freezes all execution threads!" },
      { name: "Judgement Supernova", power: 140, desc: "Ultimate divine computational purge!" },
    ],
  },
];

// Calculate Elemental Advantage Multiplier
const getTypeMultiplier = (playerElement, bossElement) => {
  const p = (playerElement || "").toLowerCase();
  const b = (bossElement || "").toLowerCase();

  if (p.includes("water") && (b.includes("fire") || b.includes("dragon"))) return 1.4;
  if (p.includes("fire") && (b.includes("grass") || b.includes("bug"))) return 1.4;
  if (p.includes("grass") && b.includes("water")) return 1.4;
  if (p.includes("electric") && b.includes("water")) return 1.4;
  if (p.includes("psychic") && (b.includes("bug") || b.includes("grass"))) return 1.35;
  if (p.includes("cosmic")) return 1.3;
  return 1.0;
};

const GymBattleArena = ({ unlockedIds = [11], onWinReward, playSound }) => {
  // ─── 🗺️ GYM STAGE PROGRESSION STATE ───
  const [highestUnlockedStage, setHighestUnlockedStage] = useState(() => {
    const saved = localStorage.getItem("bimo_poketech_gym_stage_unlocked");
    return saved ? parseInt(saved, 10) : 1;
  });

  const [defeatedBosses, setDefeatedBosses] = useState(() => {
    const saved = localStorage.getItem("bimo_poketech_gym_defeated");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedBossIndex, setSelectedBossIndex] = useState(0);
  const boss = BOSS_LIST[selectedBossIndex];

  // ─── 👥 3-CARD TEAM ROSTER ───
  const [teamIds, setTeamIds] = useState(() => {
    const saved = localStorage.getItem("bimo_poketech_team");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 3) return parsed;
      } catch {}
    }
    return [unlockedIds[0] || 11, unlockedIds[1] || 21, unlockedIds[2] || 31];
  });

  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [isTeamBuilderOpen, setIsTeamBuilderOpen] = useState(false);

  const teamCards = teamIds.map((id) => POKETECHS.find((p) => p.id === id) || POKETECHS[10]);
  const activePlayerCard = teamCards[activeTeamIndex] || teamCards[0];

  // ─── ⚔️ BATTLE HP & ENGINE STATE ───
  const [teamHp, setTeamHp] = useState([teamCards[0].hp, teamCards[1].hp, teamCards[2].hp]);
  const [bossHp, setBossHp] = useState(boss.maxHp);
  const [healsRemaining, setHealsRemaining] = useState(2); // 2x System Restore per battle
  const [dialogueText, setDialogueText] = useState(
    `Stage ${boss.stage} Gym: Lawan ${boss.name} (Lv.${boss.level}) muncul! Apa yang akan dilakukan ${activePlayerCard.name.toUpperCase()}?`
  );
  const [menuMode, setMenuMode] = useState("main"); // 'main' | 'fight' | 'switch' | 'run_confirm'
  const [isAttacking, setIsAttacking] = useState(false);
  const [bossAttacking, setBossAttacking] = useState(false);
  const [damageEffect, setDamageEffect] = useState(null); // { target: 'player'|'boss', text: string, isCrit?: boolean }
  const [battleState, setBattleState] = useState("in_progress"); // 'in_progress' | 'won' | 'lost' | 'escaped'

  // Reset when boss or team roster changes
  useEffect(() => {
    resetBattle();
  }, [teamIds, selectedBossIndex]);

  const saveTeam = (newTeam) => {
    setTeamIds(newTeam);
    localStorage.setItem("bimo_poketech_team", JSON.stringify(newTeam));
    setIsTeamBuilderOpen(false);
  };

  const resetBattle = () => {
    setTeamHp([teamCards[0].hp, teamCards[1].hp, teamCards[2].hp]);
    setActiveTeamIndex(0);
    setBossHp(boss.maxHp);
    setHealsRemaining(2);
    setDialogueText(`Duel Stage ${boss.stage} dimulai! Apa yang akan dilakukan ${teamCards[0].name.toUpperCase()}?`);
    setBattleState("in_progress");
    setMenuMode("main");
    setDamageEffect(null);
  };

  const currentActiveHp = teamHp[activeTeamIndex] || 0;

  // ─── 🕹️ TURN-BASED COMBAT ENGINE ───
  const executePlayerMove = (moveType) => {
    if (isAttacking || bossAttacking || battleState !== "in_progress" || currentActiveHp <= 0) return;
    setIsAttacking(true);
    if (playSound) playSound("click");

    const multiplier = getTypeMultiplier(activePlayerCard.element, boss.element);
    const isSuperEffective = multiplier > 1.0;

    let baseDmg = 0;
    let attackName = "";

    if (moveType === "move1") {
      baseDmg = Math.round(activePlayerCard.atk * (0.95 + Math.random() * 0.3) * multiplier);
      attackName = activePlayerCard.ability;
    } else {
      baseDmg = Math.round(activePlayerCard.atk * 1.6 * (0.95 + Math.random() * 0.3) * multiplier);
      attackName = `⚡ Ultimate ${activePlayerCard.name.split(".")[0]} Blast`;
    }

    const isCrit = Math.random() > 0.65;
    const finalDmg = isCrit ? Math.round(baseDmg * 1.3) : baseDmg;

    setDamageEffect({
      target: "boss",
      text: `${isCrit ? "CRIT! " : ""}-${finalDmg} HP!`,
      isCrit,
    });

    const nextBossHp = Math.max(0, bossHp - finalDmg);
    setBossHp(nextBossHp);

    let logMsg = `${activePlayerCard.name} menggunakan ${attackName}! (-${finalDmg} DMG)`;
    if (isSuperEffective) logMsg += ` 💥 SANGAT EFEKTIF!`;
    if (isCrit) logMsg += ` ⚡ CRITICAL HIT!`;
    setDialogueText(logMsg);

    if (nextBossHp <= 0) {
      // 🏆 VICTORY OVER THIS BOSS
      setTimeout(() => {
        setIsAttacking(false);
        setBattleState("won");
        setDialogueText(`🏆 VICTORY! ${boss.name} berhasil kamu taklukkan! Lencana ${boss.badgeName} berhasil diraih!`);

        // Unlock next stage
        const nextStage = Math.min(5, boss.stage + 1);
        if (nextStage > highestUnlockedStage) {
          setHighestUnlockedStage(nextStage);
          localStorage.setItem("bimo_poketech_gym_stage_unlocked", nextStage.toString());
        }

        if (!defeatedBosses.includes(boss.id)) {
          const updatedDefeated = [...defeatedBosses, boss.id];
          setDefeatedBosses(updatedDefeated);
          localStorage.setItem("bimo_poketech_gym_defeated", JSON.stringify(updatedDefeated));
        }

        if (playSound) playSound("celebration");
        confetti({
          particleCount: 160,
          spread: 85,
          origin: { y: 0.55 },
          colors: ["#fbbf24", "#38bdf8", "#ec4899", "#22c55e", "#a855f7"],
        });

        if (onWinReward) onWinReward(boss.id);
      }, 700);
      return;
    }

    // 👹 BOSS COUNTER ATTACK (Turn delay: 900ms)
    setTimeout(() => {
      setIsAttacking(false);
      setDamageEffect(null);
      setBossAttacking(true);

      const isSpecial = Math.random() > 0.5;
      const bossMove = isSpecial ? boss.moves[1] : boss.moves[0];
      const bossDmg = Math.round(boss.atk * (isSpecial ? 1.35 : 0.95) * (0.85 + Math.random() * 0.3));

      setTimeout(() => {
        setDamageEffect({ target: "player", text: `-${bossDmg} HP!` });
        const nextPlayerHp = Math.max(0, currentActiveHp - bossDmg);

        setTeamHp((prev) => {
          const copy = [...prev];
          copy[activeTeamIndex] = nextPlayerHp;
          return copy;
        });

        setDialogueText(`👹 ${boss.name} membalas dengan ${bossMove.name}! (${bossDmg} DMG)`);
        setBossAttacking(false);

        // Check if active player card fainted
        if (nextPlayerHp <= 0) {
          setTimeout(() => {
            const nextAliveIndex = teamHp.findIndex((hp, idx) => idx !== activeTeamIndex && hp > 0);
            if (nextAliveIndex !== -1) {
              setDialogueText(`💀 ${activePlayerCard.name} tumbang! Berganti ke ${teamCards[nextAliveIndex].name}!`);
              setActiveTeamIndex(nextAliveIndex);
              setMenuMode("main");
            } else {
              setBattleState("lost");
              setDialogueText(`💀 Seluruh tim PokéTech kamu kehabisan HP! Coba upgrade di Fusion Lab!`);
            }
          }, 800);
        } else {
          setTimeout(() => {
            setMenuMode("main");
            setDialogueText(`Apa yang akan dilakukan ${activePlayerCard.name.toUpperCase()} selanjutnya?`);
          }, 1200);
        }
      }, 500);
    }, 900);
  };

  // 🎒 BAG: Use System Restore (+45% HP)
  const handleHealItem = () => {
    if (isAttacking || bossAttacking || battleState !== "in_progress" || currentActiveHp <= 0 || healsRemaining <= 0) return;
    if (playSound) playSound("click");

    const healAmount = Math.round(activePlayerCard.hp * 0.45);
    const newHp = Math.min(activePlayerCard.hp, currentActiveHp + healAmount);
    setHealsRemaining((prev) => prev - 1);

    setTeamHp((prev) => {
      const copy = [...prev];
      copy[activeTeamIndex] = newHp;
      return copy;
    });

    setDialogueText(`💚 Menggunakan System Restore Patch! ${activePlayerCard.name} pulih +${healAmount} HP! (Sisa: ${healsRemaining - 1}x)`);

    // Boss Turn
    setTimeout(() => {
      setBossAttacking(true);
      const bossDmg = Math.round(boss.atk * 0.9 * (0.85 + Math.random() * 0.3));
      setTimeout(() => {
        setDamageEffect({ target: "player", text: `-${bossDmg} HP!` });
        setTeamHp((prev) => {
          const copy = [...prev];
          copy[activeTeamIndex] = Math.max(0, newHp - bossDmg);
          return copy;
        });
        setDialogueText(`👹 ${boss.name} menyergap saat kamu memulihkan HP! (${bossDmg} DMG)`);
        setBossAttacking(false);
      }, 500);
    }, 900);
  };

  // 🔄 SWITCH ACTIVE CARD
  const handleSwitchCard = (index) => {
    if (teamHp[index] <= 0 || index === activeTeamIndex) return;
    if (playSound) playSound("click");
    setActiveTeamIndex(index);
    setMenuMode("main");
    setDialogueText(`Maju, ${teamCards[index].name}! Tunjukkan kemampuanmu!`);
  };

  // 🏃 RUN: Escape Battle
  const handleConfirmRun = () => {
    if (playSound) playSound("click");
    setBattleState("escaped");
    setDialogueText(`💨 Kamu berhasil melarikan diri dari pertarungan melawan ${boss.name}!`);
  };

  const bossHpPercent = Math.max(0, Math.round((bossHp / boss.maxHp) * 100));
  const playerHpPercent = Math.max(0, Math.round((currentActiveHp / activePlayerCard.hp) * 100));

  return (
    <div
      className="relative rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden border-4 border-[#334155]"
      style={{
        background: "linear-gradient(180deg, #090d16 0%, #030712 100%)",
        fontFamily: "'Fredoka', sans-serif",
      }}
    >
      {/* ─── ARENA HEADER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-2xl border-2 border-rose-500 bg-rose-950/80 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(244,63,94,0.5)]">
            ⚔️
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-rose-400 uppercase tracking-wide flex items-center gap-2">
              POKÉTECH GYM LEAGUE • 5 BOSS ROADMAP
            </h3>
            <span className="text-[10px] text-slate-400 font-bold">
              Kalahkan 5 Gym Boss untuk meraih Lencana Master Champion! 🏆
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsTeamBuilderOpen(!isTeamBuilderOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950 border border-indigo-500/60 text-indigo-300 hover:text-white font-black text-xs shadow-sm hover:scale-105 transition-all self-start sm:self-auto"
        >
          <FiUsers /> Susun Tim (3 Kartu)
        </button>
      </div>

      {/* ─── 🗺️ STAGE TIMELINE ROADMAP (5 BOSS GYM ROAD) ─── */}
      <div className="mb-4 p-3 rounded-2xl bg-slate-950/90 border-2 border-slate-800 shadow-inner">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1">
            <FiAward /> STAGE ROADMAP PROGRESSION:
          </span>
          <span className="text-[9px] font-mono text-slate-400 font-bold">
            Badges: {defeatedBosses.length}/5 Diraih
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {BOSS_LIST.map((b, idx) => {
            const isUnlocked = b.stage <= highestUnlockedStage;
            const isDefeated = defeatedBosses.includes(b.id);
            const isSelected = selectedBossIndex === idx;

            return (
              <button
                key={b.id}
                type="button"
                disabled={!isUnlocked}
                onClick={() => {
                  if (isUnlocked) {
                    setSelectedBossIndex(idx);
                    if (playSound) playSound("click");
                  }
                }}
                className={`relative p-2 rounded-xl border-2 flex flex-col items-center justify-between transition-all ${
                  !isUnlocked
                    ? "border-slate-800 bg-slate-900/40 opacity-40 cursor-not-allowed"
                    : isSelected
                    ? "border-rose-500 bg-rose-950/80 shadow-[0_0_15px_rgba(244,63,94,0.5)] scale-105 z-10"
                    : isDefeated
                    ? "border-emerald-500/80 bg-emerald-950/50 hover:border-emerald-400"
                    : "border-amber-500/60 bg-amber-950/40 hover:border-amber-400"
                }`}
              >
                {/* Stage Pill */}
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[8px] font-black text-slate-300">
                    S{b.stage}
                  </span>
                  {isDefeated ? (
                    <FiCheckCircle className="text-[10px] text-emerald-400" />
                  ) : !isUnlocked ? (
                    <FiLock className="text-[9px] text-slate-500" />
                  ) : (
                    <span className="text-[9px] animate-pulse">⚔️</span>
                  )}
                </div>

                <span className="text-base sm:text-lg mb-0.5">{b.avatar}</span>
                <span className="text-[8px] font-black truncate w-full text-center text-white">
                  {b.name.split(" ")[0]}
                </span>
                <span className="text-[7px] font-mono text-slate-400">
                  Lv.{b.level}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 👥 TEAM BUILDER DRAWER ─── */}
      {isTeamBuilderOpen && (
        <div className="p-4 mb-4 rounded-2xl bg-indigo-950/95 border-2 border-indigo-500/60 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-black text-indigo-200 uppercase flex items-center gap-1.5">
              <FiUsers /> Pilih 3 Kartu untuk Tim Bertarungmu:
            </h4>
            <button
              type="button"
              onClick={() => setIsTeamBuilderOpen(false)}
              className="text-xs font-bold text-slate-400 hover:text-white"
            >
              Tutup ✕
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((slotIdx) => {
              const currentId = teamIds[slotIdx];
              const card = POKETECHS.find((p) => p.id === currentId) || POKETECHS[10];

              return (
                <div key={slotIdx} className="p-2 rounded-xl bg-slate-900/90 border border-indigo-500/40 text-center">
                  <span className="text-[9px] font-black uppercase text-indigo-400 block mb-1">
                    Slot {slotIdx + 1}
                  </span>
                  <img src={card.image} alt={card.name} className="h-12 w-12 object-contain mx-auto mb-1" />
                  <p className="text-[10px] font-black truncate text-white">{card.name.split(".")[0]}</p>
                </div>
              );
            })}
          </div>

          <p className="text-[10px] text-indigo-300/80 font-medium">
            Klik kartu dari koleksimu di bawah untuk mengganti Slot Tim:
          </p>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {unlockedIds.map((id) => {
              const c = POKETECHS.find((p) => p.id === id);
              if (!c) return null;
              const isSelected = teamIds.includes(c.id);

              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    const nextTeam = [...teamIds];
                    const existingIdx = nextTeam.indexOf(c.id);
                    if (existingIdx === -1) {
                      nextTeam[activeTeamIndex] = c.id;
                      saveTeam(nextTeam);
                    }
                  }}
                  className={`h-16 w-14 rounded-xl p-1 border-2 flex flex-col items-center justify-between shrink-0 transition-all ${
                    isSelected
                      ? "border-amber-400 bg-amber-950/60 shadow-[0_0_10px_#fbbf24]"
                      : "border-slate-800 bg-slate-900/80 hover:border-indigo-400"
                  }`}
                >
                  <img src={c.image} alt={c.name} className="h-8 w-8 object-contain" />
                  <span className="text-[8px] font-black truncate w-full text-slate-300">
                    {c.name.split(".")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── 🎮 RETRO HANDHELD POKÉMON BATTLE SCREEN ─── */}
      <div
        className="relative rounded-2xl border-4 border-slate-700 overflow-hidden shadow-2xl my-2"
        style={{
          height: "360px",
          background: "linear-gradient(180deg, #1e293b 0%, #0f172a 45%, #14532d 75%, #052e16 100%)",
        }}
      >
        {/* Opponent Podium (Top Right) */}
        <div
          className="absolute top-20 right-8 w-44 h-16 rounded-[100%] border-2 border-emerald-500/40 pointer-events-none animate-shadow-pulse"
          style={{
            background: "radial-gradient(ellipse at center, rgba(34,197,94,0.35) 0%, rgba(15,23,42,0.8) 75%)",
            boxShadow: "0 0 25px rgba(34,197,94,0.3)",
          }}
        />

        {/* Player Podium (Bottom Left) */}
        <div
          className="absolute bottom-6 left-8 w-52 h-20 rounded-[100%] border-2 border-cyan-500/40 pointer-events-none animate-shadow-pulse"
          style={{
            background: "radial-gradient(ellipse at center, rgba(6,182,212,0.4) 0%, rgba(15,23,42,0.8) 75%)",
            boxShadow: "0 0 30px rgba(6,182,212,0.3)",
          }}
        />

        {/* ─── TOP LEFT: OPPONENT BOSS STATUS BANNER ─── */}
        <div className="absolute top-4 left-4 z-20 w-52 sm:w-60 bg-slate-950/90 border-2 border-slate-400/80 rounded-2xl p-2.5 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-white truncate max-w-[130px]">
              {boss.name.split(" ")[0]}
            </span>
            <span className="text-[10px] font-black text-rose-400 font-mono">
              Lv.{boss.level}
            </span>
          </div>

          <div className="flex items-center gap-1 mt-1">
            <span className="text-[9px] font-black text-amber-400">HP</span>
            <div className="flex-1 h-2.5 bg-slate-900 rounded-full border border-slate-700 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  bossHpPercent > 50 ? "bg-emerald-500" : bossHpPercent > 20 ? "bg-amber-500" : "bg-rose-600 animate-pulse"
                }`}
                style={{ width: `${bossHpPercent}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400 mt-0.5">
            <span className="text-amber-300/90">{boss.element}</span>
            <span>{bossHp} / {boss.maxHp}</span>
          </div>
        </div>

        {/* ─── TOP RIGHT: LIVING OPPONENT BOSS SPRITE ─── */}
        <div
          className={`absolute top-10 right-14 z-10 flex flex-col items-center transition-transform duration-300 ${
            bossAttacking ? "animate-boss-lunge" : "animate-poke-idle"
          } ${damageEffect?.target === "boss" ? "animate-hit-shake" : ""}`}
        >
          <div className="relative">
            <img
              src={boss.image}
              alt={boss.name}
              className="h-32 w-32 object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)]"
            />
            {damageEffect?.target === "boss" && (
              <div className={`absolute top-0 right-0 px-3 py-1 text-slate-950 font-black text-xs rounded-xl shadow-lg animate-bounce ${
                damageEffect.isCrit ? "bg-amber-400 scale-110 shadow-[0_0_15px_#fbbf24]" : "bg-cyan-400"
              }`}>
                {damageEffect.text}
              </div>
            )}
          </div>
        </div>

        {/* ─── BOTTOM LEFT: LIVING PLAYER ACTIVE POKÉMON SPRITE ─── */}
        <div
          className={`absolute bottom-6 left-14 z-10 flex flex-col items-center transition-transform duration-300 ${
            isAttacking ? "animate-player-lunge" : "animate-poke-idle"
          } ${damageEffect?.target === "player" ? "animate-hit-shake" : ""}`}
        >
          <div className="relative">
            <img
              src={activePlayerCard.image}
              alt={activePlayerCard.name}
              className="h-32 w-32 object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.9)]"
            />
            {damageEffect?.target === "player" && (
              <div className="absolute top-0 right-0 px-3 py-1 bg-rose-600 text-white font-black text-xs rounded-xl shadow-lg animate-bounce">
                {damageEffect.text}
              </div>
            )}
          </div>
        </div>

        {/* ─── BOTTOM RIGHT: PLAYER STATUS BANNER ─── */}
        <div className="absolute bottom-4 right-4 z-20 w-56 sm:w-64 bg-slate-950/90 border-2 border-slate-400/80 rounded-2xl p-2.5 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-cyan-300 truncate max-w-[140px]">
              {activePlayerCard.name}
            </span>
            <div className="flex gap-1">
              {teamHp.map((hp, idx) => (
                <span key={idx} className="text-[10px]" title={`Slot ${idx + 1}: ${hp} HP`}>
                  {hp > 0 ? "🔴" : "⚫"}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 mt-1">
            <span className="text-[9px] font-black text-emerald-400">HP</span>
            <div className="flex-1 h-2.5 bg-slate-900 rounded-full border border-slate-700 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  playerHpPercent > 50 ? "bg-emerald-500" : playerHpPercent > 20 ? "bg-amber-500" : "bg-rose-600 animate-pulse"
                }`}
                style={{ width: `${playerHpPercent}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-300 mt-0.5">
            <span className="text-amber-300">{activePlayerCard.element}</span>
            <span>{currentActiveHp} / {activePlayerCard.hp}</span>
          </div>
        </div>
      </div>

      {/* ─── 🕹️ CLASSIC POKÉMON COMMAND & DIALOGUE CONSOLE ─── */}
      <div className="grid sm:grid-cols-[1.2fr_1fr] gap-3 mt-3 items-stretch">
        {/* Left: Classic Dialogue Text Window */}
        <div className="rounded-2xl border-4 border-slate-700 bg-slate-950 p-4 flex items-center shadow-inner min-h-[90px]">
          <p className="text-xs sm:text-sm font-bold text-slate-100 leading-relaxed font-mono">
            {dialogueText}
          </p>
        </div>

        {/* Right: 4 Classic Command Action Buttons or Move Select */}
        <div className="rounded-2xl border-4 border-slate-700 bg-slate-900 p-2 shadow-inner flex flex-col justify-center">
          {battleState !== "in_progress" ? (
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={resetBattle}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <FiRotateCcw /> Main Lagi (Tanding Ulang)
              </button>
              {battleState === "won" && selectedBossIndex < 4 && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBossIndex((prev) => Math.min(4, prev + 1));
                  }}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  Tantang Boss Stage {selectedBossIndex + 2} ➔
                </button>
              )}
            </div>
          ) : menuMode === "fight" ? (
            /* MOVE SELECTION SUB-MENU */
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  disabled={isAttacking || bossAttacking}
                  onClick={() => executePlayerMove("move1")}
                  className="py-2 px-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] text-left truncate shadow-sm transition-all flex flex-col justify-center"
                >
                  <span className="truncate">{activePlayerCard.ability}</span>
                  <span className="text-[8px] opacity-80">ATK {activePlayerCard.atk}</span>
                </button>

                <button
                  type="button"
                  disabled={isAttacking || bossAttacking}
                  onClick={() => executePlayerMove("move2")}
                  className="py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] text-left truncate shadow-sm transition-all flex flex-col justify-center"
                >
                  <span className="truncate">⚡ Ultimate Blast</span>
                  <span className="text-[8px] opacity-80">ATK {Math.round(activePlayerCard.atk * 1.6)}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setMenuMode("main")}
                className="w-full py-1 rounded-lg bg-slate-800 text-slate-300 font-bold text-[10px] hover:text-white flex items-center justify-center gap-1"
              >
                <FiChevronLeft /> Kembali ke Menu
              </button>
            </div>
          ) : menuMode === "switch" ? (
            /* POKÉMON ROSTER SWITCH SUB-MENU */
            <div className="space-y-1.5">
              <div className="grid grid-cols-3 gap-1">
                {teamCards.map((c, idx) => {
                  const hp = teamHp[idx];
                  const isDead = hp <= 0;
                  const isActive = idx === activeTeamIndex;

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isDead || isActive}
                      onClick={() => handleSwitchCard(idx)}
                      className={`p-1.5 rounded-xl border text-center transition-all ${
                        isActive
                          ? "border-cyan-400 bg-cyan-950/80 opacity-60"
                          : isDead
                          ? "border-slate-800 bg-slate-950 opacity-30 cursor-not-allowed"
                          : "border-emerald-500 bg-emerald-950/80 hover:scale-105"
                      }`}
                    >
                      <span className="text-[9px] font-black truncate block text-white">
                        {c.name.split(".")[0]}
                      </span>
                      <span className="text-[8px] font-mono text-emerald-400 font-bold">
                        {hp} HP
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setMenuMode("main")}
                className="w-full py-1 rounded-lg bg-slate-800 text-slate-300 font-bold text-[10px] hover:text-white flex items-center justify-center gap-1"
              >
                <FiChevronLeft /> Batal Ganti
              </button>
            </div>
          ) : menuMode === "run_confirm" ? (
            /* RUN CONFIRMATION SUB-MENU */
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-amber-300 text-center">
                Kabur dan kembali ke pemilihan stage?
              </p>
              <div className="grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={handleConfirmRun}
                  className="py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px]"
                >
                  Ya, Kabur!
                </button>
                <button
                  type="button"
                  onClick={() => setMenuMode("main")}
                  className="py-1.5 rounded-lg bg-slate-800 text-slate-300 font-bold text-[11px]"
                >
                  Batal
                </button>
              </div>
            </div>
          ) : (
            /* 4 CLASSIC COMMAND BUTTONS (2x2 Grid) */
            <div className="grid grid-cols-2 gap-1.5">
              {/* 1. FIGHT */}
              <button
                type="button"
                disabled={isAttacking || bossAttacking}
                onClick={() => setMenuMode("fight")}
                className="py-2.5 rounded-xl bg-gradient-to-b from-rose-500 to-red-600 text-white font-black text-xs shadow-[0_3px_0_#991b1b] active:translate-y-0.5 active:shadow-none hover:brightness-110 flex items-center justify-center gap-1"
              >
                <FiCrosshair /> FIGHT
              </button>

              {/* 2. BAG / HEAL */}
              <button
                type="button"
                disabled={isAttacking || bossAttacking || healsRemaining <= 0}
                onClick={handleHealItem}
                className={`py-2.5 rounded-xl text-white font-black text-xs flex items-center justify-center gap-1 transition-all ${
                  healsRemaining > 0
                    ? "bg-gradient-to-b from-emerald-500 to-green-600 shadow-[0_3px_0_#166534] active:translate-y-0.5 active:shadow-none hover:brightness-110"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                }`}
                title={`Pulihkan +45% HP (${healsRemaining}x sisa)`}
              >
                <FiShield /> BAG ({healsRemaining}x)
              </button>

              {/* 3. POKÉMON (SWITCH) */}
              <button
                type="button"
                disabled={isAttacking || bossAttacking}
                onClick={() => setMenuMode("switch")}
                className="py-2.5 rounded-xl bg-gradient-to-b from-blue-500 to-indigo-600 text-white font-black text-xs shadow-[0_3px_0_#1e40af] active:translate-y-0.5 active:shadow-none hover:brightness-110 flex items-center justify-center gap-1"
              >
                <FiRefreshCw /> POKÉMON
              </button>

              {/* 4. RUN */}
              <button
                type="button"
                onClick={() => setMenuMode("run_confirm")}
                className="py-2.5 rounded-xl bg-gradient-to-b from-amber-400 to-yellow-500 text-slate-950 font-black text-xs shadow-[0_3px_0_#b45309] active:translate-y-0.5 active:shadow-none hover:brightness-110 flex items-center justify-center gap-1"
              >
                🏃 RUN
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GymBattleArena;
