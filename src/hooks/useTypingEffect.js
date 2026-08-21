import { useState, useEffect, useRef } from "react";

/**
 * Typing effect hook.
 * Types out an array of strings one by one with a blinking cursor.
 *
 * Usage:
 *   const { displayText, isTyping } = useTypingEffect(["React", "Python"], 90, 1500);
 *   <span>{displayText}<span className="typing-cursor" /></span>
 */
export default function useTypingEffect(
  words = [],
  typingSpeed = 80,
  pauseDuration = 2000
) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const wordIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    if (words.length === 0) return;

    const tick = () => {
      const currentWord = words[wordIndex.current];

      if (!isDeleting.current) {
        // Typing forward
        charIndex.current++;
        setDisplayText(currentWord.slice(0, charIndex.current));
        setIsTyping(true);

        if (charIndex.current === currentWord.length) {
          // Pause before deleting
          setIsTyping(false);
          setTimeout(() => {
            isDeleting.current = true;
            tick();
          }, pauseDuration);
          return;
        }
      } else {
        // Deleting
        charIndex.current--;
        setDisplayText(currentWord.slice(0, charIndex.current));
        setIsTyping(true);

        if (charIndex.current === 0) {
          isDeleting.current = false;
          wordIndex.current = (wordIndex.current + 1) % words.length;
        }
      }

      const speed = isDeleting.current ? typingSpeed / 2 : typingSpeed;
      timeoutId = setTimeout(tick, speed);
    };

    let timeoutId = setTimeout(tick, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, [words, typingSpeed, pauseDuration]);

  return { displayText, isTyping };
}
