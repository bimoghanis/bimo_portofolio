import { useEffect, useRef } from "react";

/**
 * Scroll-reveal hook: observes elements entering the viewport
 * and toggles the "revealed" class with optional stagger delay.
 * Uses MutationObserver so dynamically added elements (e.g. "View All", filters)
 * are automatically observed and revealed.
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const threshold = options.threshold ?? 0.1;
    const rootMargin = options.rootMargin ?? "0px 0px -40px 0px";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add("revealed");
            }, Number(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    const observeElement = (target) => {
      if (!target || target.classList.contains("revealed")) return;
      if (
        target.classList.contains("reveal") ||
        target.classList.contains("reveal-scale") ||
        target.classList.contains("reveal-left") ||
        target.classList.contains("reveal-right")
      ) {
        observer.observe(target);
      }
    };

    // Observe root element if it has a reveal class
    observeElement(el);

    // Observe existing matching children
    const children = el.querySelectorAll(
      ".reveal, .reveal-scale, .reveal-left, .reveal-right"
    );
    children.forEach((child) => observeElement(child));

    // MutationObserver to watch for dynamic DOM insertions
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            observeElement(node);
            if (node.querySelectorAll) {
              const matchingDescendants = node.querySelectorAll(
                ".reveal, .reveal-scale, .reveal-left, .reveal-right"
              );
              matchingDescendants.forEach((descendant) =>
                observeElement(descendant)
              );
            }
          }
        });
      });
    });

    mutationObserver.observe(el, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return ref;
}
