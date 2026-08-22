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

// ─── 🏰 15 STAGES CAMPAIGN (CALIBRATED MEDIUM DIFFICULTY) ───
export const STAGE_LIST = [
  // ─── ZONE 1: SYNTAX FOREST 🌲 (Grass / Bug) ───
  {
    stage: 1,
    zone: 1,
    zoneName: "Zone 1: Syntax Forest 🌲",
    id: "stage_1",
    name: "Junior Linter Bug",
    title: "Syntax Checker Minion",
    isBoss: false,
    element: "Bug / Lint",
    level: 12,
    maxHp: 130,
    atk: 18,
    avatar: "🐛",
    image: POKETECHS[4]?.image,
    moves: [
      { name: "Trailing Whitespace", power: 15, desc: "Minor formatting alert!" },
      { name: "Tab vs Space", power: 22, desc: "Indentation warning spike!" },
    ],
  },
  {
    stage: 2,
    zone: 1,
    zoneName: "Zone 1: Syntax Forest 🌲",
    id: "stage_2",
    name: "Bulbadata Spore",
    title: "Data Pipeline Sentry",
    isBoss: false,
    element: "Grass / SQL",
    level: 18,
    maxHp: 180,
    atk: 24,
    avatar: "🌿",
    image: POKETECHS[5]?.image,
    moves: [
      { name: "ETL Vine Whip", power: 20, desc: "Extracts dirty data strings!" },
      { name: "Schema Confusion Spore", power: 28, desc: "Null column surprise!" },
    ],
  },
  {
    stage: 3,
    zone: 1,
    zoneName: "Zone 1: Syntax Forest 🌲",
    id: "boss_1_buggar",
    name: "Buggar the Infinite Loop",
    title: "GYM LEADER 1 👑",
    isBoss: true,
    badgeName: "Syntax Badge 🟢",
    badgeIcon: "🟢",
    element: "Grass / Bug",
    level: 25,
    maxHp: 320,
    atk: 34,
    avatar: "🐛👑",
    image: POKETECHS[4]?.image,
    moves: [
      { name: "Memory Leak Bite", power: 30, desc: "Steals stack memory!" },
      { name: "Infinite Loop Crash", power: 42, desc: "Freezes execution thread!" },
    ],
  },

  // ─── ZONE 2: MEMORY LAGOON 🌊 (Water / Memory) ───
  {
    stage: 4,
    zone: 2,
    zoneName: "Zone 2: Memory Lagoon 🌊",
    id: "stage_4",
    name: "SquirtQL Query",
    title: "Relational DB Minion",
    isBoss: false,
    element: "Water / SQL",
    level: 32,
    maxHp: 260,
    atk: 38,
    avatar: "🐢",
    image: POKETECHS[3]?.image,
    moves: [
      { name: "SELECT * Flood", power: 32, desc: "Full table scan wave!" },
      { name: "Unindexed Water Pulse", power: 45, desc: "Database bottleneck splash!" },
    ],
  },
  {
    stage: 5,
    zone: 2,
    zoneName: "Zone 2: Memory Lagoon 🌊",
    id: "stage_5",
    name: "Dangling Pointer Slowbro",
    title: "Redis Cache Stall",
    isBoss: false,
    element: "Water / Memory",
    level: 40,
    maxHp: 340,
    atk: 46,
    avatar: "🦛",
    image: POKETECHS[10]?.image,
    moves: [
      { name: "TTL Cache Eviction", power: 38, desc: "Stale session payload!" },
      { name: "Buffer Overflow Slumber", power: 52, desc: "Heavy cache rest!" },
    ],
  },
  {
    stage: 6,
    zone: 2,
    zoneName: "Zone 2: Memory Lagoon 🌊",
    id: "boss_2_psyduck",
    name: "404 Psyduck Panic Overlord",
    title: "GYM LEADER 2 👑",
    isBoss: true,
    badgeName: "Hydra Badge 🔵",
    badgeIcon: "🔵",
    element: "Water / Memory",
    level: 48,
    maxHp: 490,
    atk: 56,
    avatar: "🦆👑",
    image: POKETECHS[10]?.image,
    moves: [
      { name: "Hydro Socket Deluge", power: 48, desc: "Floods client socket!" },
      { name: "Fatal Migraine 404", power: 68, desc: "Server unavailable burst!" },
    ],
  },

  // ─── ZONE 3: NEURAL CITADEL ⚡ (Electric / Psychic / AI) ───
  {
    stage: 7,
    zone: 3,
    zoneName: "Zone 3: Neural Citadel ⚡",
    id: "stage_7",
    name: "Bitkachu Volt Apprentice",
    title: "Micro-Voltage Courier",
    isBoss: false,
    element: "Electric / Python",
    level: 55,
    maxHp: 420,
    atk: 58,
    avatar: "⚡",
    image: POKETECHS[1]?.image,
    moves: [
      { name: "Thunder Jitter", power: 52, desc: "High ping network spark!" },
      { name: "Volt Async/Await", power: 70, desc: "Concurrent thread surge!" },
    ],
  },
  {
    stage: 8,
    zone: 3,
    zoneName: "Zone 3: Neural Citadel ⚡",
    id: "stage_8",
    name: "Eeveeng Microservice",
    title: "Dynamic Polyglot",
    isBoss: false,
    element: "Psychic / Normal",
    level: 62,
    maxHp: 520,
    atk: 68,
    avatar: "🦊",
    image: POKETECHS[6]?.image,
    moves: [
      { name: "Docker Container Swarm", power: 60, desc: "Spawns 50 micro pods!" },
      { name: "Kubernetes Auto-Scale", power: 82, desc: "Overwhelms memory node!" },
    ],
  },
  {
    stage: 9,
    zone: 3,
    zoneName: "Zone 3: Neural Citadel ⚡",
    id: "boss_3_mewtwo",
    name: "NullPointer Mewtwo Matrix",
    title: "GYM LEADER 3 👑",
    isBoss: true,
    badgeName: "Neural Badge 🟣",
    badgeIcon: "🟣",
    element: "Psychic / AI",
    level: 72,
    maxHp: 740,
    atk: 82,
    avatar: "🔮👑",
    image: POKETECHS[7]?.image,
    moves: [
      { name: "Neural Mind Telepathy", power: 72, desc: "Predicts user behavior!" },
      { name: "Fatal Segmentation Purge", power: 102, desc: "Wipes memory registers!" },
    ],
  },

  // ─── ZONE 4: GIT CHAOS CALDERA 🔥 (Dragon / Fire) ───
  {
    stage: 10,
    zone: 4,
    zoneName: "Zone 4: Git Caldera 🔥",
    id: "stage_10",
    name: "Codezard Compiler Flame",
    title: "Rust Core Engine",
    isBoss: false,
    element: "Fire / Compiler",
    level: 80,
    maxHp: 650,
    atk: 86,
    avatar: "🔥",
    image: POKETECHS[1]?.image,
    moves: [
      { name: "Cargo Build Inferno", power: 78, desc: "Compiles at 100% CPU!" },
      { name: "Flame Graph Overheat", power: 108, desc: "Thermal throttling blast!" },
    ],
  },
  {
    stage: 11,
    zone: 4,
    zoneName: "Zone 4: Git Caldera 🔥",
    id: "stage_11",
    name: "Snoorlax Deadlock",
    title: "Postgres Row Locker",
    isBoss: false,
    element: "Normal / Heavy",
    level: 86,
    maxHp: 880,
    atk: 75,
    avatar: "💤",
    image: POKETECHS[2]?.image,
    moves: [
      { name: "Table Exclusive Lock", power: 70, desc: "Freezes transactions!" },
      { name: "Rest & Buffer Cache", power: 95, desc: "Heavy slumber recovery!" },
    ],
  },
  {
    stage: 12,
    zone: 4,
    zoneName: "Zone 4: Git Caldera 🔥",
    id: "boss_4_dragonite",
    name: "Merge Conflict Dragonite Titan",
    title: "GYM LEADER 4 👑",
    isBoss: true,
    badgeName: "Git Cataclysm Badge 🔴",
    badgeIcon: "🔴",
    element: "Dragon / Fire",
    level: 92,
    maxHp: 1100,
    atk: 108,
    avatar: "🐉👑",
    image: POKETECHS[12]?.image,
    moves: [
      { name: "Rebase Conflict Cataclysm", power: 95, desc: "Destroys commit history!" },
      { name: "Force Push Annihilation", power: 135, desc: "Obliterates master branch!" },
    ],
  },

  // ─── ZONE 5: CELESTIAL OLYMPUS 👑 (Cosmic / Python - GOD TIER) ───
  {
    stage: 13,
    zone: 5,
    zoneName: "Zone 5: Celestial Olympus 👑",
    id: "stage_13",
    name: "Rayquaz.ai Sky Sovereign",
    title: "Cloud Tensor Lord",
    isBoss: false,
    element: "Ozone / AI",
    level: 96,
    maxHp: 1150,
    atk: 115,
    avatar: "🌌",
    image: POKETECHS[8]?.image,
    moves: [
      { name: "Hyper-Beam Inference", power: 105, desc: "100T parameter beam!" },
      { name: "GPU Cluster Supernova", power: 145, desc: "Parallel compute shock!" },
    ],
  },
  {
    stage: 14,
    zone: 5,
    zoneName: "Zone 5: Celestial Olympus 👑",
    id: "stage_14",
    name: "Lugiacloud High Availability",
    title: "Kubernetes Arbiter",
    isBoss: false,
    element: "Aero / Cloud",
    level: 99,
    maxHp: 1350,
    atk: 128,
    avatar: "☁️",
    image: POKETECHS[3]?.image,
    moves: [
      { name: "Aeroblast 99.999% SLA", power: 118, desc: "Zero downtime gust!" },
      { name: "Multi-Region Failover", power: 162, desc: "Global cluster reset!" },
    ],
  },
  {
    stage: 15,
    zone: 5,
    zoneName: "Zone 5: Celestial Olympus 👑",
    id: "boss_5_arceus",
    name: "Arceus.py the Divine Creator",
    title: "FINAL TECH GOD BOSS 👑✨",
    isBoss: true,
    badgeName: "Grand Master Sovereign Badge 👑🌟",
    badgeIcon: "👑",
    element: "Cosmic / Python",
    level: 100,
    maxHp: 1750,
    atk: 155,
    avatar: "👑✨",
    image: POKETECHS[0]?.image,
    moves: [
      { name: "Genesis Global Interpreter Lock", power: 135, desc: "Locks reality itself!" },
      { name: "Judgement Divine Supernova", power: 195, desc: "Cosmic computational singularity!" },
    ],
  },
];

// Type Advantage System
const getTypeMultiplier = (playerElement, bossElement) => {
  const p = (playerElement || "").toLowerCase();
  const b = (bossElement || "").toLowerCase();

  if (p.includes("water") && (b.includes("fire") || b.includes("dragon"))) return 1.35;
  if (p.includes("fire") && (b.includes("grass") || b.includes("bug"))) return 1.35;
  if (p.includes("grass") && b.includes("water")) return 1.35;
  if (p.includes("electric") && (b.includes("water") || b.includes("lint"))) return 1.35;
  if (p.includes("psychic") && (b.includes("bug") || b.includes("grass"))) return 1.3;
  if (p.includes("cosmic")) return 1.3;
  return 1.0;
};

// 🎯 CALIBRATED MEDIUM DIFFICULTY CARD STATS FORMULA
const calculateCardStats = (card, isShiny) => {
  let baseHp = 160;
  let baseAtk = 32;

  if (card.rarity === "UR") {
    baseHp = 580;
    baseAtk = 92;
  } else if (card.rarity === "SSR") {
    baseHp = 380;
    baseAtk = 65;
  } else if (card.rarity === "SR") {
    baseHp = 280;
    baseAtk = 50;
  } else if (card.rarity === "Rare") {
    baseHp = 210;
    baseAtk = 38;
  } else {
    // Common
    baseHp = 150;
    baseAtk = 28;
  }

  // Card slight variance
  const hpVariance = (card.id % 6) * 10;
  const atkVariance = (card.id % 4) * 3;
  baseHp += hpVariance;
  baseAtk += atkVariance;

  // ✨ Shiny Transformation Buff (+140 HP / +28 ATK)
  if (isShiny) {
    baseHp += 140;
    baseAtk += 28;
  }

  return { hp: baseHp, atk: baseAtk };
};

const GymBattleArena = ({ unlockedIds = [11], shinyIds = [], onWinReward, playSound }) => {
  // ─── 🗺️ CAMPAIGN STATE (1-15 Stages) ───
  const [highestUnlockedStage, setHighestUnlockedStage] = useState(() => {
    const saved = localStorage.getItem("bimo_poketech_gym_stage_unlocked");
    return saved ? parseInt(saved, 10) : 1;
  });

  const [defeatedStages, setDefeatedStages] = useState(() => {
    const saved = localStorage.getItem("bimo_poketech_gym_defeated_stages");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeZone, setActiveZone] = useState(1);
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);
  const currentStage = STAGE_LIST[selectedStageIndex] || STAGE_LIST[0];

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

  const teamCards = teamIds.map((id) => {
    const raw = POKETECHS.find((p) => p.id === id) || POKETECHS[10];
    const isShiny = shinyIds.includes(raw.id);
    const stats = calculateCardStats(raw, isShiny);
    return { ...raw, ...stats, isShiny };
  });

  const activePlayerCard = teamCards[activeTeamIndex] || teamCards[0];

  // ─── ⚔️ BATTLE HP & ENGINE STATE ───
  const [teamHp, setTeamHp] = useState([teamCards[0].hp, teamCards[1].hp, teamCards[2].hp]);
  const [bossHp, setBossHp] = useState(currentStage.maxHp);
  const [healsRemaining, setHealsRemaining] = useState(2);
  const [dialogueText, setDialogueText] = useState(
    `Stage ${currentStage.stage} (${currentStage.name}) Lv.${currentStage.level} menghadang! Apa yang akan dilakukan ${activePlayerCard.name.toUpperCase()}?`
  );
  const [menuMode, setMenuMode] = useState("main");
  const [isAttacking, setIsAttacking] = useState(false);
  const [bossAttacking, setBossAttacking] = useState(false);
  const [damageEffect, setDamageEffect] = useState(null);
  const [activeVfx, setActiveVfx] = useState(null);
  const [battleState, setBattleState] = useState("in_progress");

  // Reset when stage or team changes
  useEffect(() => {
    resetBattle();
  }, [teamIds, selectedStageIndex, shinyIds]);

  const saveTeam = (newTeam) => {
    setTeamIds(newTeam);
    localStorage.setItem("bimo_poketech_team", JSON.stringify(newTeam));
    setIsTeamBuilderOpen(false);
  };

  const resetBattle = () => {
    setTeamHp([teamCards[0].hp, teamCards[1].hp, teamCards[2].hp]);
    setActiveTeamIndex(0);
    setBossHp(currentStage.maxHp);
    setHealsRemaining(2);
    setDialogueText(`Duel Stage ${currentStage.stage} dimulai! Apa yang akan dilakukan ${teamCards[0].name.toUpperCase()}?`);
    setBattleState("in_progress");
    setMenuMode("main");
    setDamageEffect(null);
    setActiveVfx(null);
  };

  const currentActiveHp = teamHp[activeTeamIndex] || 0;

  // ─── 🕹️ COMBAT ACTION ENGINE ───
  const executePlayerMove = (moveType) => {
    if (isAttacking || bossAttacking || battleState !== "in_progress" || currentActiveHp <= 0) return;
    setIsAttacking(true);

    const pEl = (activePlayerCard.element || "").toLowerCase();
    const vfxType = pEl.includes("electric") ? "thunder" : pEl.includes("fire") ? "fire" : pEl.includes("water") ? "water" : pEl.includes("grass") || pEl.includes("bug") ? "grass" : "cosmic";
    setActiveVfx({ type: vfxType, target: "boss" });
    setTimeout(() => setActiveVfx(null), 650);

    if (playSound) {
      if (pEl.includes("electric")) {
        playSound("zap");
      } else {
        playSound("attack");
      }
    }

    const multiplier = getTypeMultiplier(activePlayerCard.element, currentStage.element);
    const isSuperEffective = multiplier > 1.0;

    let baseDmg = 0;
    let attackName = "";

    if (moveType === "move1") {
      baseDmg = Math.round(activePlayerCard.atk * (0.85 + Math.random() * 0.2) * multiplier);
      attackName = activePlayerCard.ability;
    } else {
      baseDmg = Math.round(activePlayerCard.atk * (1.38 + Math.random() * 0.25) * multiplier);
      attackName = `⚡ Ultimate ${activePlayerCard.name.split(".")[0]} Blast`;
    }

    const isCrit = Math.random() > 0.75;
    const finalDmg = isCrit ? Math.round(baseDmg * 1.35) : baseDmg;

    setDamageEffect({
      target: "boss",
      text: `${isCrit ? "CRIT! " : ""}-${finalDmg} HP!`,
      isCrit,
    });

    const nextBossHp = Math.max(0, bossHp - finalDmg);
    setBossHp(nextBossHp);

    let logMsg = `${activePlayerCard.name} melepaskan ${attackName}! (-${finalDmg} DMG)`;
    if (isSuperEffective) logMsg += ` 💥 SANGAT EFEKTIF!`;
    if (isCrit) logMsg += ` ⚡ CRITICAL HIT!`;
    setDialogueText(logMsg);

    if (nextBossHp <= 0) {
      // 🏆 STAGE CLEARED
      setTimeout(() => {
        setIsAttacking(false);
        setBattleState("won");

        const isFinal = currentStage.stage === 15;
        const msg = isFinal
          ? `🏆 VICTORY AKBAR! Kamu telah menaklukkan FINAL GOD BOSS Arceus.py dan menjadi Grand Champion PokéTech!`
          : `🏆 STAGE ${currentStage.stage} CLEARED! ${currentStage.name} berhasil ditaklukkan!`;

        setDialogueText(msg);

        // Unlock next stage
        const nextStage = Math.min(15, currentStage.stage + 1);
        if (nextStage > highestUnlockedStage) {
          setHighestUnlockedStage(nextStage);
          localStorage.setItem("bimo_poketech_gym_stage_unlocked", nextStage.toString());
        }

        if (!defeatedStages.includes(currentStage.stage)) {
          const updated = [...defeatedStages, currentStage.stage];
          setDefeatedStages(updated);
          localStorage.setItem("bimo_poketech_gym_defeated_stages", JSON.stringify(updated));
        }

        if (playSound) playSound("celebration");
        confetti({
          particleCount: 180,
          spread: 90,
          origin: { y: 0.55 },
          colors: ["#fbbf24", "#38bdf8", "#ec4899", "#22c55e", "#a855f7"],
        });

        if (onWinReward) onWinReward(currentStage.id);
      }, 700);
      return;
    }

    // 👹 ENEMY COUNTER-ATTACK
    setTimeout(() => {
      setIsAttacking(false);
      setDamageEffect(null);
      setBossAttacking(true);

      const bEl = (currentStage.element || "").toLowerCase();
      const bVfxType = bEl.includes("electric") ? "thunder" : bEl.includes("fire") ? "fire" : bEl.includes("water") ? "water" : bEl.includes("grass") || bEl.includes("bug") ? "grass" : "cosmic";
      setActiveVfx({ type: bVfxType, target: "player" });
      setTimeout(() => setActiveVfx(null), 650);

      const isSpecial = Math.random() > 0.5;
      const bossMove = isSpecial ? currentStage.moves[1] : currentStage.moves[0];
      const bossDmg = Math.round(currentStage.atk * (isSpecial ? 1.25 : 0.85) * (0.85 + Math.random() * 0.25));

      setTimeout(() => {
        setDamageEffect({ target: "player", text: `-${bossDmg} HP!` });
        if (playSound) playSound("attack");
        const nextPlayerHp = Math.max(0, currentActiveHp - bossDmg);

        setTeamHp((prev) => {
          const copy = [...prev];
          copy[activeTeamIndex] = nextPlayerHp;
          return copy;
        });

        setDialogueText(`👹 ${currentStage.name} membalas dengan ${bossMove.name}! (${bossDmg} DMG)`);
        setBossAttacking(false);

        if (nextPlayerHp <= 0) {
          setTimeout(() => {
            const nextAliveIndex = teamHp.findIndex((hp, idx) => idx !== activeTeamIndex && hp > 0);
            if (nextAliveIndex !== -1) {
              setDialogueText(`💀 ${activePlayerCard.name} tumbang! Berganti ke ${teamCards[nextAliveIndex].name}!`);
              setActiveTeamIndex(nextAliveIndex);
              setMenuMode("main");
            } else {
              setBattleState("lost");
              setDialogueText(`💀 Seluruh tim tumbang! Gacha kartu langka (SSR/UR) dan Upgrade Shiny di Lab untuk menaikkan HP & ATK!`);
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

  // 🎒 HEAL ITEM (+40% HP)
  const handleHealItem = () => {
    if (isAttacking || bossAttacking || battleState !== "in_progress" || currentActiveHp <= 0 || healsRemaining <= 0) return;
    if (playSound) playSound("heal");

    const healAmount = Math.round(activePlayerCard.hp * 0.4);
    const newHp = Math.min(activePlayerCard.hp, currentActiveHp + healAmount);
    setHealsRemaining((prev) => prev - 1);

    setTeamHp((prev) => {
      const copy = [...prev];
      copy[activeTeamIndex] = newHp;
      return copy;
    });

    setDialogueText(`💚 System Restore Patch! ${activePlayerCard.name} pulih +${healAmount} HP! (Sisa: ${healsRemaining - 1}x)`);

    // Enemy turn
    setTimeout(() => {
      setBossAttacking(true);
      const bossDmg = Math.round(currentStage.atk * 0.85 * (0.85 + Math.random() * 0.25));
      setTimeout(() => {
        setDamageEffect({ target: "player", text: `-${bossDmg} HP!` });
        setTeamHp((prev) => {
          const copy = [...prev];
          copy[activeTeamIndex] = Math.max(0, newHp - bossDmg);
          return copy;
        });
        setDialogueText(`👹 ${currentStage.name} menyergap saat pemulihan! (${bossDmg} DMG)`);
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

  // 🏃 ESCAPE BATTLE
  const handleConfirmRun = () => {
    if (playSound) playSound("click");
    setBattleState("escaped");
    setDialogueText(`💨 Kamu berhasil mundur dengan aman dari Stage ${currentStage.stage}!`);
  };

  const bossHpPercent = Math.max(0, Math.round((bossHp / currentStage.maxHp) * 100));
  const playerHpPercent = Math.max(0, Math.round((currentActiveHp / activePlayerCard.hp) * 100));

  const zoneStages = STAGE_LIST.filter((s) => s.zone === activeZone);

  return (
    <div
      className="relative rounded-3xl p-3.5 sm:p-6 shadow-2xl overflow-hidden border-4 border-[#334155]"
      style={{
        background: "linear-gradient(180deg, #090d16 0%, #030712 100%)",
        fontFamily: "'Fredoka', sans-serif",
      }}
    >
      {/* ─── HEADER & TEAM ROSTER TRIGGER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-2xl border-2 border-rose-500 bg-rose-950/80 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(244,63,94,0.5)] shrink-0">
            ⚔️
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
              POKÉTECH GYM LEAGUE (15 STAGES)
            </h3>
            <span className="text-[10px] text-slate-400 font-bold">
              5 Zone • 5 Grand Bosses • Clear Stage 15 to Win! 🏆
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

      {/* ─── 🗺️ 5-ZONE TABS & 15-STAGE ROADMAP NAVIGATION ─── */}
      <div className="mb-3 p-2.5 sm:p-3.5 rounded-2xl bg-slate-950/90 border-2 border-slate-800 shadow-inner">
        {/* Zone Switcher Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-none">
          {[
            { zone: 1, label: "🌲 Z1 (Syntax)" },
            { zone: 2, label: "🌊 Z2 (Memory)" },
            { zone: 3, label: "⚡ Z3 (Neural)" },
            { zone: 4, label: "🔥 Z4 (Git Chaos)" },
            { zone: 5, label: "👑 Z5 (Celestial)" },
          ].map(({ zone, label }) => {
            const isZoneUnlocked = (zone - 1) * 3 + 1 <= highestUnlockedStage;
            const isActive = activeZone === zone;

            return (
              <button
                key={zone}
                type="button"
                disabled={!isZoneUnlocked}
                onClick={() => {
                  setActiveZone(zone);
                  const firstStageIdx = (zone - 1) * 3;
                  if (firstStageIdx + 1 <= highestUnlockedStage) {
                    setSelectedStageIndex(firstStageIdx);
                  }
                }}
                className={`px-2.5 py-1 rounded-xl text-[10px] sm:text-xs font-black shrink-0 transition-all border ${
                  !isZoneUnlocked
                    ? "opacity-35 border-slate-800 bg-slate-900/50 text-slate-500 cursor-not-allowed"
                    : isActive
                    ? "bg-rose-600 text-white border-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.5)] scale-105"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* 3 Stages in Current Zone */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-2">
          {zoneStages.map((s) => {
            const sIdx = STAGE_LIST.findIndex((item) => item.stage === s.stage);
            const isUnlocked = s.stage <= highestUnlockedStage;
            const isDefeated = defeatedStages.includes(s.stage);
            const isSelected = selectedStageIndex === sIdx;

            return (
              <button
                key={s.stage}
                type="button"
                disabled={!isUnlocked}
                onClick={() => {
                  setSelectedStageIndex(sIdx);
                  if (playSound) playSound("click");
                }}
                className={`relative p-2 rounded-xl border-2 flex flex-col items-center justify-between transition-all ${
                  !isUnlocked
                    ? "border-slate-800 bg-slate-900/30 opacity-40 cursor-not-allowed"
                    : isSelected
                    ? "border-rose-500 bg-rose-950/80 shadow-[0_0_15px_rgba(244,63,94,0.5)] scale-105 z-10"
                    : s.isBoss
                    ? "border-amber-500/70 bg-amber-950/40 hover:border-amber-400"
                    : isDefeated
                    ? "border-emerald-500/70 bg-emerald-950/40 hover:border-emerald-400"
                    : "border-slate-700 bg-slate-900/80 hover:border-slate-500"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-0.5">
                  <span className="text-[8px] font-black text-slate-300">
                    STAGE {s.stage}
                  </span>
                  {isDefeated ? (
                    <FiCheckCircle className="text-[10px] text-emerald-400" />
                  ) : !isUnlocked ? (
                    <FiLock className="text-[8px] text-slate-500" />
                  ) : s.isBoss ? (
                    <span className="text-[9px] text-amber-400 animate-pulse">👑</span>
                  ) : (
                    <span className="text-[8px] text-rose-400">⚔️</span>
                  )}
                </div>

                <span className="text-sm sm:text-base my-0.5">{s.avatar}</span>
                <span className="text-[8px] sm:text-[9px] font-black truncate w-full text-center text-white">
                  {s.name.split(" ")[0]}
                </span>
                <span className="text-[7px] font-mono font-bold text-amber-300">
                  Lv.{s.level} {s.isBoss ? "• BOSS" : ""}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 👥 TEAM BUILDER DRAWER ─── */}
      {isTeamBuilderOpen && (
        <div className="p-3.5 mb-3 rounded-2xl bg-indigo-950/95 border-2 border-indigo-500/60 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-black text-indigo-200 uppercase flex items-center gap-1.5">
              <FiUsers /> Pilih 3 Kartu untuk Tim Tempur:
            </h4>
            <button
              type="button"
              onClick={() => setIsTeamBuilderOpen(false)}
              className="text-xs font-bold text-slate-400 hover:text-white"
            >
              Tutup ✕
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {[0, 1, 2].map((slotIdx) => {
              const card = teamCards[slotIdx];

              return (
                <div key={slotIdx} className="p-1.5 rounded-xl bg-slate-900/90 border border-indigo-500/40 text-center">
                  <span className="text-[8px] font-black uppercase text-indigo-400 block mb-0.5">
                    Slot {slotIdx + 1} {card.isShiny ? "✨" : ""}
                  </span>
                  <img src={card.image} alt={card.name} className="h-10 w-10 object-contain mx-auto mb-0.5" />
                  <p className="text-[9px] font-black truncate text-white">{card.name.split(".")[0]}</p>
                  <p className="text-[7px] font-mono text-emerald-400 font-bold">HP {card.hp} • ATK {card.atk}</p>
                </div>
              );
            })}
          </div>

          <p className="text-[9px] text-indigo-300/80 font-medium">
            Klik kartu dari koleksimu di bawah untuk mengganti Slot Tim:
          </p>

          <div className="flex gap-1.5 overflow-x-auto pb-1.5">
            {unlockedIds.map((id) => {
              const c = POKETECHS.find((p) => p.id === id);
              if (!c) return null;
              const isSelected = teamIds.includes(c.id);
              const isShiny = shinyIds.includes(c.id);

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
                  className={`h-14 w-12 rounded-xl p-0.5 border-2 flex flex-col items-center justify-between shrink-0 transition-all ${
                    isSelected
                      ? "border-amber-400 bg-amber-950/60 shadow-[0_0_10px_#fbbf24]"
                      : "border-slate-800 bg-slate-900/80 hover:border-indigo-400"
                  }`}
                >
                  <img src={c.image} alt={c.name} className="h-7 w-7 object-contain" />
                  <span className="text-[7px] font-black truncate w-full text-slate-300">
                    {isShiny ? "✨" : ""}{c.name.split(".")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── 🎮 RETRO BATTLE SCREEN ─── */}
      <div
        className="relative rounded-2xl border-4 border-slate-700 overflow-hidden shadow-2xl my-2"
        style={{
          height: "320px",
          background: "linear-gradient(180deg, #1e293b 0%, #0f172a 45%, #14532d 75%, #052e16 100%)",
        }}
      >
        {/* Opponent Podium (Top Right) */}
        <div
          className="absolute top-16 right-6 w-36 sm:w-44 h-14 rounded-[100%] border-2 border-emerald-500/40 pointer-events-none animate-shadow-pulse"
          style={{
            background: "radial-gradient(ellipse at center, rgba(34,197,94,0.35) 0%, rgba(15,23,42,0.8) 75%)",
            boxShadow: "0 0 25px rgba(34,197,94,0.3)",
          }}
        />

        {/* Player Podium (Bottom Left) */}
        <div
          className="absolute bottom-5 left-6 w-44 sm:w-52 h-16 rounded-[100%] border-2 border-cyan-500/40 pointer-events-none animate-shadow-pulse"
          style={{
            background: "radial-gradient(ellipse at center, rgba(6,182,212,0.4) 0%, rgba(15,23,42,0.8) 75%)",
            boxShadow: "0 0 30px rgba(6,182,212,0.3)",
          }}
        />

        {/* 💥 DYNAMIC ELEMENTAL ATTACK VFX OVERLAY */}
        {activeVfx && (
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden">
            {/* Screen Flash */}
            <div className="absolute inset-0 bg-white/40 animate-screen-flash" />

            {activeVfx.type === "thunder" && (
              <div
                className={`absolute ${
                  activeVfx.target === "boss" ? "top-8 right-14" : "bottom-8 left-14"
                } animate-thunderbolt flex items-center justify-center`}
              >
                <span className="text-6xl sm:text-7xl filter drop-shadow-[0_0_30px_#fde047]">⚡</span>
              </div>
            )}

            {activeVfx.type === "fire" && (
              <div
                className={`absolute ${
                  activeVfx.target === "boss" ? "top-8 right-14" : "bottom-8 left-14"
                } animate-fireblast flex items-center justify-center`}
              >
                <span className="text-6xl sm:text-7xl filter drop-shadow-[0_0_30px_#f97316]">🔥</span>
              </div>
            )}

            {activeVfx.type === "water" && (
              <div
                className={`absolute ${
                  activeVfx.target === "boss" ? "top-8 right-14" : "bottom-8 left-14"
                } animate-hydrowave flex items-center justify-center`}
              >
                <span className="text-6xl sm:text-7xl filter drop-shadow-[0_0_30px_#06b6d4]">🌊</span>
              </div>
            )}

            {activeVfx.type === "grass" && (
              <div
                className={`absolute ${
                  activeVfx.target === "boss" ? "top-8 right-14" : "bottom-8 left-14"
                } animate-razorleaf flex items-center justify-center`}
              >
                <span className="text-6xl sm:text-7xl filter drop-shadow-[0_0_30px_#22c55e]">🍃</span>
              </div>
            )}

            {activeVfx.type === "cosmic" && (
              <div
                className={`absolute ${
                  activeVfx.target === "boss" ? "top-6 right-12" : "bottom-6 left-12"
                } animate-cosmicbeam flex items-center justify-center`}
              >
                <span className="text-6xl sm:text-7xl filter drop-shadow-[0_0_40px_#ec4899]">🔮✨</span>
              </div>
            )}
          </div>
        )}

        {/* ─── TOP LEFT: OPPONENT STATUS BANNER ─── */}
        <div className="absolute top-3 left-3 z-20 w-44 sm:w-56 bg-slate-950/90 border-2 border-slate-400/80 rounded-2xl p-2 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-black text-white truncate max-w-[110px]">
              {currentStage.name.split(" ")[0]}
            </span>
            <span className="text-[9px] font-black text-rose-400 font-mono">
              Lv.{currentStage.level}
            </span>
          </div>

          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[8px] font-black text-amber-400">HP</span>
            <div className="flex-1 h-2 bg-slate-900 rounded-full border border-slate-700 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  bossHpPercent > 50 ? "bg-emerald-500" : bossHpPercent > 20 ? "bg-amber-500" : "bg-rose-600 animate-pulse"
                }`}
                style={{ width: `${bossHpPercent}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center text-[8px] font-mono font-bold text-slate-400 mt-0.5">
            <span className="text-amber-300/90 truncate">{currentStage.element}</span>
            <span>{bossHp} / {currentStage.maxHp}</span>
          </div>
        </div>

        {/* ─── TOP RIGHT: LIVING OPPONENT SPRITE ─── */}
        <div
          className={`absolute top-8 right-10 sm:right-14 z-10 flex flex-col items-center transition-transform duration-300 ${
            bossAttacking ? "animate-boss-lunge" : "animate-poke-idle"
          } ${damageEffect?.target === "boss" ? "animate-hit-shake" : ""}`}
        >
          <div className="relative">
            <img
              src={currentStage.image}
              alt={currentStage.name}
              className="h-28 w-28 sm:h-32 sm:w-32 object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)]"
            />
            {damageEffect?.target === "boss" && (
              <div className={`absolute top-0 right-0 px-2.5 py-0.5 text-slate-950 font-black text-[11px] rounded-xl shadow-lg animate-bounce ${
                damageEffect.isCrit ? "bg-amber-400 scale-110 shadow-[0_0_15px_#fbbf24]" : "bg-cyan-400"
              }`}>
                {damageEffect.text}
              </div>
            )}
          </div>
        </div>

        {/* ─── BOTTOM LEFT: LIVING PLAYER ACTIVE POKÉMON SPRITE ─── */}
        <div
          className={`absolute bottom-5 left-10 sm:left-14 z-10 flex flex-col items-center transition-transform duration-300 ${
            isAttacking ? "animate-player-lunge" : "animate-poke-idle"
          } ${damageEffect?.target === "player" ? "animate-hit-shake" : ""}`}
        >
          <div className="relative">
            <img
              src={activePlayerCard.image}
              alt={activePlayerCard.name}
              className={`h-28 w-28 sm:h-32 sm:w-32 object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.9)] ${
                activePlayerCard.isShiny ? "filter drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" : ""
              }`}
            />
            {activePlayerCard.isShiny && (
              <span className="absolute -top-2 -right-2 text-xs animate-bounce">✨</span>
            )}
            {damageEffect?.target === "player" && (
              <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-rose-600 text-white font-black text-[11px] rounded-xl shadow-lg animate-bounce">
                {damageEffect.text}
              </div>
            )}
          </div>
        </div>

        {/* ─── BOTTOM RIGHT: PLAYER STATUS BANNER ─── */}
        <div className="absolute bottom-3 right-3 z-20 w-48 sm:w-60 bg-slate-950/90 border-2 border-slate-400/80 rounded-2xl p-2 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-black text-cyan-300 truncate max-w-[120px] flex items-center gap-1">
              {activePlayerCard.isShiny ? "✨" : ""}{activePlayerCard.name}
            </span>
            <div className="flex gap-0.5">
              {teamHp.map((hp, idx) => (
                <span key={idx} className="text-[8px]">
                  {hp > 0 ? "🔴" : "⚫"}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[8px] font-black text-emerald-400">HP</span>
            <div className="flex-1 h-2 bg-slate-900 rounded-full border border-slate-700 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  playerHpPercent > 50 ? "bg-emerald-500" : playerHpPercent > 20 ? "bg-amber-500" : "bg-rose-600 animate-pulse"
                }`}
                style={{ width: `${playerHpPercent}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-[8px] font-mono font-bold text-slate-300 mt-0.5">
            <span className="text-amber-300">{activePlayerCard.element}</span>
            <span>{currentActiveHp} / {activePlayerCard.hp}</span>
          </div>
        </div>
      </div>

      {/* ─── 🕹️ RETRO DIALOGUE & 4 COMMAND BUTTONS ─── */}
      <div className="grid sm:grid-cols-[1.2fr_1fr] gap-2.5 mt-2.5 items-stretch">
        {/* Dialogue Screen */}
        <div className="rounded-2xl border-4 border-slate-700 bg-slate-950 p-3 flex items-center shadow-inner min-h-[80px]">
          <p className="text-xs font-bold text-slate-100 leading-relaxed font-mono">
            {dialogueText}
          </p>
        </div>

        {/* Command Box */}
        <div className="rounded-2xl border-4 border-slate-700 bg-slate-900 p-2 shadow-inner flex flex-col justify-center">
          {battleState !== "in_progress" ? (
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={resetBattle}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <FiRotateCcw /> Tanding Ulang Stage Ini
              </button>
              {battleState === "won" && selectedStageIndex < 14 && (
                <button
                  type="button"
                  onClick={() => {
                    const nextIdx = selectedStageIndex + 1;
                    setSelectedStageIndex(nextIdx);
                    setActiveZone(STAGE_LIST[nextIdx].zone);
                  }}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  Lanjut ke Stage {selectedStageIndex + 2} ➔
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
                  className="py-2 px-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] text-left truncate shadow-sm transition-all flex flex-col justify-center"
                >
                  <span className="truncate">{activePlayerCard.ability}</span>
                  <span className="text-[8px] opacity-80">ATK {Math.round(activePlayerCard.atk * 0.85)}</span>
                </button>

                <button
                  type="button"
                  disabled={isAttacking || bossAttacking}
                  onClick={() => executePlayerMove("move2")}
                  className="py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[10px] text-left truncate shadow-sm transition-all flex flex-col justify-center"
                >
                  <span className="truncate">⚡ Ultimate Blast</span>
                  <span className="text-[8px] opacity-80">ATK {Math.round(activePlayerCard.atk * 1.38)}</span>
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
                      <span className="text-[8px] font-black truncate block text-white">
                        {c.isShiny ? "✨" : ""}{c.name.split(".")[0]}
                      </span>
                      <span className="text-[7px] font-mono text-emerald-400 font-bold">
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
                Mundur dan kembali ke pemilihan stage?
              </p>
              <div className="grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={handleConfirmRun}
                  className="py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[10px]"
                >
                  Ya, Mundur!
                </button>
                <button
                  type="button"
                  onClick={() => setMenuMode("main")}
                  className="py-1.5 rounded-lg bg-slate-800 text-slate-300 font-bold text-[10px]"
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
                title={`Pulihkan +40% HP (${healsRemaining}x sisa)`}
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
