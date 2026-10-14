/* Measurements for the home scene that do not wobble on a phone. Mobile browsers grow and shrink the viewport as the
   address bar slides away, which changes `window.innerHeight` many times while you scroll; if the scene's progress and
   canvas size followed that, the picture would jump and be redrawn constantly. So the height is measured once from a
   `100vh` probe (the large, steady viewport) and only measured again when the width changes (a rotation or a resize). */

let cached = { w: 0, vh: 0 };

export function stableVh(): number {
  if (typeof window === "undefined") return 800;
  const w = window.innerWidth;
  if (cached.w !== w || !cached.vh) {
    const probe = document.createElement("div");
    probe.style.cssText = "position:fixed;top:0;left:0;width:0;height:100vh;visibility:hidden;pointer-events:none";
    document.body.appendChild(probe);
    cached = { w, vh: probe.offsetHeight || window.innerHeight };
    probe.remove();
  }
  return cached.vh;
}

/** The home frames play over this many screen heights: a little shorter on a phone, so the film does not drag. */
export const RANGE_DESKTOP = 3.2;
export const RANGE_PHONE = 2.4;
export function cinemaRange(): number {
  if (typeof window === "undefined") return RANGE_DESKTOP;
  return window.matchMedia("(max-width: 767px)").matches ? RANGE_PHONE : RANGE_DESKTOP;
}
