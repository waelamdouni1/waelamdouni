/**
 * Shared page scroll lock. The wall and the open project both lock scrolling; counting the
 * locks means the page only scrolls again once the last one is released, whatever order
 * they unmount in (for example when "Read the case study" leaves both at once).
 */
let locks = 0;

export function lockScroll() {
  locks++;
  document.documentElement.style.overflow = "hidden";
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks--;
    if (locks === 0) document.documentElement.style.removeProperty("overflow");
  };
}
