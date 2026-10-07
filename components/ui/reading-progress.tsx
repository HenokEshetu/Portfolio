/**
 * Page scroll progress as a hairline under the top edge. Pure CSS
 * (`animation-timeline: scroll()`): no JS, and browsers without
 * scroll-driven animations simply never show it.
 */
export const ReadingProgress = () => (
  <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
    <div className="scroll-progress h-full w-full bg-linear-to-r from-accent via-accent-bright to-signal shadow-[0_0_12px_var(--color-accent)]" />
  </div>
);
