import React, { useState, useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import useScrollReveal from "../hooks/useScrollReveal";
import { FiPlay, FiRefreshCw, FiZap, FiAward, FiClock } from "react-icons/fi";

const BUGS = [
  { id: "null", name: "NullPointerException", icon: "🐛", points: 10, soundText: "Fixed!" },
  { id: "syntax", name: "Syntax Error", icon: "🪲", points: 15, soundText: "Patched!" },
  { id: "leak", name: "Memory Leak", icon: "🐞", points: 20, soundText: "Cleaned!" },
  { id: "coffee", name: "Coffee Boost", icon: "☕", points: 50, soundText: "+50 Energy!" },
  { id: "ai", name: "AI Autopilot", icon: "🤖", points: 30, soundText: "Optimized!" },
];

const GAME_DURATION = 20; // seconds

const BugHunterGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [activeHoles, setActiveHoles] = useState({});
  const [splashes, setSplashes] = useState([]);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("bimo_bug_high_score") || "0", 10);
  });
  const [gameOver, setGameOver] = useState(false);

  const revealRef = useScrollReveal();
  const timerRef = useRef(null);
  const spawnIntervalRef = useRef(null);

  // End Game
  const endGame = useCallback(() => {
    setIsPlaying(false);
    setGameOver(true);
    setActiveHoles({});
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);

    setHighScore((prev) => {
      if (score > prev) {
        localStorage.setItem("bimo_bug_high_score", score.toString());
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#2563eb", "#06b6d4", "#10b981", "#fae882"],
        });
        return score;
      }
      return prev;
    });
  }, [score]);

  // Game Timer Countdown
  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, endGame]);

  // Spawn Bugs Loop
  useEffect(() => {
    if (!isPlaying) return;

    spawnIntervalRef.current = setInterval(() => {
      const holeIndex = Math.floor(Math.random() * 9);
      const bugType = BUGS[Math.floor(Math.random() * BUGS.length)];

      setActiveHoles((prev) => ({
        ...prev,
        [holeIndex]: bugType,
      }));

      // Auto hide bug after 850ms if not clicked
      setTimeout(() => {
        setActiveHoles((prev) => {
          const copy = { ...prev };
          delete copy[holeIndex];
          return copy;
        });
      }, 900);
    }, 600);

    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    };
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameOver(false);
    setSplashes([]);
    setActiveHoles({});
    setIsPlaying(true);
  };

  const squashBug = (holeIndex, bug, e) => {
    if (!isPlaying || !bug) return;

    // Add score
    setScore((prev) => prev + bug.points);

    // Remove squashed bug from hole
    setActiveHoles((prev) => {
      const copy = { ...prev };
      delete copy[holeIndex];
      return copy;
    });

    // Add visual splash message
    const splashId = Date.now() + Math.random();
    setSplashes((prev) => [
      ...prev.slice(-4),
      { id: splashId, text: `+${bug.points} ${bug.soundText}`, x: e.clientX, y: e.clientY },
    ]);

    setTimeout(() => {
      setSplashes((prev) => prev.filter((s) => s.id !== splashId));
    }, 600);
  };

  const getRankTitle = (pts) => {
    if (pts >= 220) return "🚀 Legendary Principal Engineer";
    if (pts >= 150) return "⭐ Senior Production Debugger";
    if (pts >= 80) return "🛠️ Agile Code Cleaner";
    return "🌱 Junior Bug Squasher";
  };

  return (
    <section
      id="mini-game"
      className="wave-divider relative overflow-hidden bg-[var(--bg-main)] py-20 text-[var(--text-main)] transition-colors duration-200"
    >
      <div ref={revealRef} className="container relative z-10 mx-auto px-6 pt-10 md:px-12 lg:px-24">
        {/* Header */}
        <div className="reveal mb-10 text-center max-w-2xl mx-auto">
          <p className="clay-pill mb-3 inline-block bg-[var(--accent-soft)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-main)]">
            Casual Arcade 👾
          </p>

          <h2 className="text-3xl font-extrabold leading-tight text-[var(--text-main)] md:text-4xl">
            Squash The <span className="text-[var(--accent-main)]">Code Bugs!</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
            A fun 20-second mini-game. Tap/click on bugs as they pop up to clean the codebase and score high points!
          </p>
        </div>

        {/* Arcade Console Card */}
        <div className="reveal clay-card-static mx-auto max-w-xl p-6 sm:p-8" data-delay="100">
          {/* Top Scoreboard Bar */}
          <div className="clay-inset p-3.5 mb-6 flex items-center justify-between bg-[var(--bg-soft)] text-xs font-extrabold">
            <div className="flex items-center gap-2">
              <span className="clay-pill bg-[var(--bg-card)] px-3 py-1 text-[var(--accent-main)] flex items-center gap-1.5 shadow-sm">
                <FiZap /> Score: <span className="font-mono text-sm">{score}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`clay-pill px-3 py-1 flex items-center gap-1.5 shadow-sm ${
                timeLeft <= 5 ? "bg-[var(--danger-main)] text-white animate-pulse" : "bg-[var(--bg-card)] text-[var(--text-main)]"
              }`}>
                <FiClock /> {timeLeft}s
              </span>

              <span className="clay-pill bg-[var(--bg-card)] px-3 py-1 text-[var(--success-main)] flex items-center gap-1 shadow-sm hidden sm:inline-flex">
                <FiAward /> Best: <span className="font-mono">{highScore}</span>
              </span>
            </div>
          </div>

          {/* 3x3 Grid of Clay Pods */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 relative">
            {Array.from({ length: 9 }).map((_, index) => {
              const bug = activeHoles[index];

              return (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => squashBug(index, bug, e)}
                  disabled={!isPlaying || !bug}
                  className="clay-inset h-24 sm:h-28 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all active:scale-95 bg-[var(--bg-soft)] select-none cursor-pointer"
                  style={{
                    boxShadow: bug
                      ? "var(--shadow-clay-card), 0 0 16px rgba(37, 99, 235, 0.25)"
                      : "var(--shadow-clay-inset)",
                  }}
                  aria-label={`Code module pod ${index + 1}`}
                >
                  {/* Empty Hole Indicator */}
                  <span className="text-[10px] font-mono text-[var(--text-muted)] opacity-30 select-none">
                    pod_{index + 1}
                  </span>

                  {/* Popping Bug */}
                  {bug && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center animate-bounce">
                      <span className="text-3xl sm:text-4xl filter drop-shadow-md transition-transform hover:scale-125">
                        {bug.icon}
                      </span>
                      <span className="text-[9px] font-bold text-[var(--accent-main)] bg-[var(--bg-card)] px-1.5 py-0.2 rounded-md mt-0.5 shadow-sm">
                        +{bug.points}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Start / Game Over Screen Overlay */}
          {!isPlaying && (
            <div className="mt-6 text-center">
              {gameOver ? (
                <div className="clay-inset p-5 mb-5 bg-[var(--bg-soft)]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-main)]">
                    Time&apos;s Up! Clean Run Completed 🎉
                  </p>
                  <p className="text-2xl font-black text-[var(--text-main)] mt-1">
                    Final Score: <span className="text-[var(--accent-main)]">{score} pts</span>
                  </p>
                  <p className="text-xs font-bold text-[var(--success-main)] mt-1.5">
                    Rank: {getRankTitle(score)}
                  </p>
                </div>
              ) : null}

              <button
                type="button"
                onClick={startGame}
                className="clay-button-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-extrabold shadow-lg transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto"
                style={{ borderRadius: "20px" }}
              >
                {gameOver ? <FiRefreshCw /> : <FiPlay />}
                {gameOver ? "Play Again" : "Start Bug Hunt (20s)"}
              </button>
            </div>
          )}

          {/* In-game Reset CTA */}
          {isPlaying && (
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={endGame}
                className="clay-pill bg-[var(--bg-card)] px-4 py-1.5 text-xs font-bold text-[var(--danger-main)] hover:bg-[var(--danger-main)] hover:text-white transition-colors"
              >
                End Session Early
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BugHunterGame;
