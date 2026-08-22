import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { FiShield, FiZap, FiHeart, FiAward, FiRotateCcw, FiCrosshair, FiStar } from "react-icons/fi";

const BOSS_LIST = [
  {
    id: "boss_buggar",
    name: "Buggar the Infinite Loop",
    title: "Runtime Crash Spectre",
    element: "Grass/Bug",
    maxHp: 240,
    atk: 35,
    avatar: "🐛",
    themeColor: "#16a34a",
    moves: [
      { name: "Memory Leak", power: 30, desc: "Steals 30 HP with stack overflow!" },
      { name: "Uncaught Exception", power: 50, desc: "Massive syntax blast!" },
    ],
  },
  {
    id: "boss_mewtwo",
    name: "NullPointer Mewtwo",
    title: "AI Neural Overlord",
    element: "Psychic",
    maxHp: 360,
    atk: 55,
    avatar: "🔮",
    themeColor: "#9333ea",
    moves: [
      { name: "Neural Overdrive", power: 45, desc: "Distorts memory registers!" },
      { name: "Fatal Segmentation", power: 75, desc: "Critical system wipeout!" },
    ],
  },
  {
    id: "boss_dragonite",
    name: "Merge Conflict Dragonite",
    title: "Git Rebellion Titan",
    element: "Dragon/Fire",
    maxHp: 500,
    atk: 70,
    avatar: "🐉",
    themeColor: "#f97316",
    moves: [
      { name: "Rebase Cataclysm", power: 65, desc: "Overwrites entire branches!" },
      { name: "Force Push Annihilation", power: 95, desc: "Obliterates master branch!" },
    ],
  },
];

const GymBattleArena = ({ playerCard, onWinReward, playSound }) => {
  const [selectedBossIndex, setSelectedBossIndex] = useState(0);
  const boss = BOSS_LIST[selectedBossIndex];

  // Battle State
  const [playerHp, setPlayerHp] = useState(playerCard.hp);
  const [bossHp, setBossHp] = useState(boss.maxHp);
  const [battleLog, setBattleLog] = useState(["🔥 Arena Gym Siap! Pilih aksimu untuk memulai duel!"]);
  const [isAttacking, setIsAttacking] = useState(false);
  const [bossAttacking, setBossAttacking] = useState(false);
  const [damageEffect, setDamageEffect] = useState(null); // { target: 'player' | 'boss', text: string }
  const [battleState, setBattleState] = useState("idle"); // 'idle' | 'in_progress' | 'won' | 'lost'

  // Reset HP when boss or player card changes
  useEffect(() => {
    resetBattle();
  }, [playerCard, selectedBossIndex]);

  const resetBattle = () => {
    setPlayerHp(playerCard.hp);
    setBossHp(boss.maxHp);
    setBattleLog([`⚔️ Pertarungan dimulai: ${playerCard.name} VS ${boss.name}! `]);
    setBattleState("in_progress");
    setDamageEffect(null);
  };

  const addLog = (msg) => {
    setBattleLog((prev) => [msg, ...prev.slice(0, 5)]);
  };

  // Turn-Based Combat Logic
  const handlePlayerAction = (actionType) => {
    if (isAttacking || bossAttacking || battleState !== "in_progress") return;
    setIsAttacking(true);
    if (playSound) playSound("click");

    let playerDamage = 0;
    let actionLog = "";

    if (actionType === "attack") {
      playerDamage = Math.round(playerCard.atk * (0.9 + Math.random() * 0.4));
      actionLog = `💥 ${playerCard.name} menyerang dengan ${playerCard.ability} menghasilkan ${playerDamage} DMG!`;
    } else if (actionType === "special") {
      playerDamage = Math.round(playerCard.atk * 1.6 * (0.9 + Math.random() * 0.3));
      actionLog = `⚡ CRITICAL! ${playerCard.name} melepaskan Jurus Ultimate: ${playerDamage} DMG!`;
    } else if (actionType === "heal") {
      const healAmount = Math.round(playerCard.hp * 0.35);
      const newHp = Math.min(playerCard.hp, playerHp + healAmount);
      setPlayerHp(newHp);
      actionLog = `💚 ${playerCard.name} menggunakan System Restore & memulihkan +${healAmount} HP!`;
    }

    if (playerDamage > 0) {
      setDamageEffect({ target: "boss", text: `-${playerDamage} HP!` });
      const nextBossHp = Math.max(0, bossHp - playerDamage);
      setBossHp(nextBossHp);
      addLog(actionLog);

      if (nextBossHp <= 0) {
        // PLAYER WINS!
        setTimeout(() => {
          setIsAttacking(false);
          setBattleState("won");
          addLog(`🏆 VICTORY! Kamu berhasil mengalahkan ${boss.name}!`);
          if (playSound) playSound("celebration");
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#fbbf24", "#38bdf8", "#ec4899", "#22c55e"],
          });
          if (onWinReward) onWinReward(boss.id);
        }, 500);
        return;
      }
    } else {
      addLog(actionLog);
    }

    // Boss Turn Counter-Attack after 700ms
    setTimeout(() => {
      setIsAttacking(false);
      setDamageEffect(null);
      setBossAttacking(true);

      const isSpecial = Math.random() > 0.5;
      const move = isSpecial ? boss.moves[1] : boss.moves[0];
      const bossDamage = Math.round(boss.atk * (isSpecial ? 1.4 : 0.9) * (0.85 + Math.random() * 0.3));

      setTimeout(() => {
        setDamageEffect({ target: "player", text: `-${bossDamage} HP!` });
        const nextPlayerHp = Math.max(0, playerHp - bossDamage);
        setPlayerHp(nextPlayerHp);
        addLog(`👹 ${boss.name} membalas dengan ${move.name}! (${bossDamage} DMG)`);

        setBossAttacking(false);

        if (nextPlayerHp <= 0) {
          setBattleState("lost");
          addLog(`💀 ${playerCard.name} kehabisan HP! Coba upgrade kartu atau duel lagi!`);
        }
      }, 500);
    }, 750);
  };

  const playerHpPercent = Math.max(0, Math.round((playerHp / playerCard.hp) * 100));
  const bossHpPercent = Math.max(0, Math.round((bossHp / boss.maxHp) * 100));

  return (
    <div
      className="relative rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden border-4 border-[#334155]"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #090d16 60%, #020617 100%)",
        fontFamily: "'Fredoka', sans-serif",
      }}
    >
      {/* Stadium Duel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl border-2 border-rose-500 bg-rose-950/80 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(244,63,94,0.4)]">
            ⚔️
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-rose-400 uppercase tracking-wide">
              POKÉTECH GYM ARENA
            </h3>
            <p className="text-xs text-slate-400 font-semibold">
              Turn-Based AI Boss Duel • Hadiah Free Gold Booster Pack! 🎁
            </p>
          </div>
        </div>

        {/* Boss Selection Selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800">
          {BOSS_LIST.map((b, idx) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBossIndex(idx)}
              className={`px-3 py-1 text-xs font-black rounded-xl transition-all ${
                selectedBossIndex === idx
                  ? "bg-rose-600 text-white shadow-md scale-105"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {b.avatar} Boss {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Fighter Combat Ring Display */}
      <div className="grid sm:grid-cols-2 gap-4 my-6 items-center">
        {/* PLAYER FIGHTER */}
        <div
          className={`rounded-2xl p-4 border-2 transition-all relative ${
            isAttacking ? "scale-105 border-cyan-400 shadow-[0_0_20px_#22d3ee]" : "border-slate-800 bg-slate-900/80"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <img
              src={playerCard.image}
              alt={playerCard.name}
              className="h-14 w-14 object-contain rounded-xl bg-slate-950 p-1 border border-cyan-500/40"
            />
            <div>
              <span className="text-[10px] font-black uppercase text-cyan-400">FIGHTER (YOU)</span>
              <h4 className="text-base font-black text-white leading-tight">{playerCard.name}</h4>
              <span className="text-xs text-slate-400 font-bold">ATK: {playerCard.atk}</span>
            </div>
          </div>

          {/* Player HP Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-black">
              <span className="text-emerald-400 flex items-center gap-1"><FiHeart /> HP</span>
              <span className="text-white font-mono">{playerHp} / {playerCard.hp}</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full transition-all duration-300 ${
                  playerHpPercent > 50 ? "bg-emerald-500" : playerHpPercent > 25 ? "bg-amber-500" : "bg-rose-600 animate-pulse"
                }`}
                style={{ width: `${playerHpPercent}%` }}
              />
            </div>
          </div>

          {damageEffect?.target === "player" && (
            <div className="absolute top-2 right-2 px-3 py-1 rounded-xl bg-rose-600 text-white font-black text-xs shadow-lg animate-bounce">
              {damageEffect.text}
            </div>
          )}
        </div>

        {/* BOSS FIGHTER */}
        <div
          className={`rounded-2xl p-4 border-2 transition-all relative ${
            bossAttacking ? "scale-105 border-rose-500 shadow-[0_0_20px_#f43f5e]" : "border-slate-800 bg-slate-900/80"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-14 w-14 rounded-xl bg-slate-950 flex items-center justify-center text-3xl border border-rose-500/40">
              {boss.avatar}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-rose-400">GYM BOSS</span>
              <h4 className="text-base font-black text-white leading-tight">{boss.name}</h4>
              <span className="text-xs text-slate-400 font-bold">{boss.title}</span>
            </div>
          </div>

          {/* Boss HP Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-black">
              <span className="text-rose-400 flex items-center gap-1"><FiHeart /> HP</span>
              <span className="text-white font-mono">{bossHp} / {boss.maxHp}</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-rose-600 to-amber-500 transition-all duration-300"
                style={{ width: `${bossHpPercent}%` }}
              />
            </div>
          </div>

          {damageEffect?.target === "boss" && (
            <div className="absolute top-2 right-2 px-3 py-1 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs shadow-lg animate-bounce">
              {damageEffect.text}
            </div>
          )}
        </div>
      </div>

      {/* Combat Actions & Battle Controls */}
      <div className="space-y-3">
        {battleState === "in_progress" && (
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              disabled={isAttacking || bossAttacking}
              onClick={() => handlePlayerAction("attack")}
              className="flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 text-white font-black text-xs sm:text-sm shadow-[0_4px_0_#1e3a8a] active:translate-y-1 active:shadow-none hover:brightness-110 disabled:opacity-50"
            >
              <FiCrosshair /> Serang ({playerCard.ability})
            </button>

            <button
              type="button"
              disabled={isAttacking || bossAttacking}
              onClick={() => handlePlayerAction("special")}
              className="flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-gradient-to-b from-amber-400 to-yellow-500 text-slate-950 font-black text-xs sm:text-sm shadow-[0_4px_0_#b45309] active:translate-y-1 active:shadow-none hover:brightness-110 disabled:opacity-50"
            >
              <FiZap /> Jurus Ultimate ⚡
            </button>

            <button
              type="button"
              disabled={isAttacking || bossAttacking}
              onClick={() => handlePlayerAction("heal")}
              className="flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-gradient-to-b from-emerald-400 to-green-600 text-white font-black text-xs sm:text-sm shadow-[0_4px_0_#14532d] active:translate-y-1 active:shadow-none hover:brightness-110 disabled:opacity-50"
            >
              <FiShield /> Restore HP (+35%)
            </button>
          </div>
        )}

        {/* Win / Loss Replay Card */}
        {battleState !== "in_progress" && (
          <div
            className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 ${
              battleState === "won"
                ? "bg-emerald-950/70 border-emerald-500 text-emerald-300"
                : "bg-rose-950/70 border-rose-500 text-rose-300"
            }`}
          >
            <span className="text-2xl">{battleState === "won" ? "🏆" : "💀"}</span>
            <p className="font-black text-sm">
              {battleState === "won"
                ? `Selamat! Kamu berhasil menaklukkan ${boss.name} & meraih Hadiah Gym!`
                : `${playerCard.name} tumbang dalam pertempuran!`}
            </p>
            <button
              type="button"
              onClick={resetBattle}
              className="mt-1 flex items-center gap-1.5 px-6 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md"
            >
              <FiRotateCcw /> Main Lagi (Tanding Ulang)
            </button>
          </div>
        )}

        {/* Live Battle Log Stream */}
        <div className="bg-slate-950/90 rounded-2xl p-3 border border-slate-800 text-xs space-y-1 font-medium">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Battle Log:</p>
          {battleLog.map((log, i) => (
            <p key={i} className={i === 0 ? "text-cyan-300 font-bold" : "text-slate-400"}>
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GymBattleArena;
