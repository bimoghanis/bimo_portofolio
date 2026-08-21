import { useState, useEffect, useRef } from "react";

/**
 * Animated count-up hook.
 * Counts from 0 to `target` when the element enters the viewport.
 *
 * Usage:
 *   const { count, countRef } = useCountUp(12, 1500);
 *   <span ref={countRef}>{count}</span>
 */
export default function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const numericTarget = parseInt(target, 10);

          if (isNaN(numericTarget)) {
            setCount(target);
            return;
          }

          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * numericTarget));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, countRef: ref };
}
