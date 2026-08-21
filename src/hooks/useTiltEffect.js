import { useRef, useCallback } from "react";

/**
 * 3D tilt effect hook for cards.
 * Returns onMouseMove and onMouseLeave handlers + a ref.
 *
 * Usage:
 *   const { tiltRef, tiltHandlers } = useTiltEffect(12);
 *   <div ref={tiltRef} {...tiltHandlers}> ... </div>
 */
export default function useTiltEffect(maxTilt = 10) {
  const ref = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    },
    [maxTilt]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
  }, []);

  return {
    tiltRef: ref,
    tiltHandlers: { onMouseMove, onMouseLeave },
  };
}
