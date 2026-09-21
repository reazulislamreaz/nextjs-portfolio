import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export { isReducedMotion } from "./motion";

let registered = false;

export function registerGsap() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    registered = true;
  }
  return { gsap, ScrollTrigger, ScrollToPlugin };
}

export { gsap, ScrollTrigger, ScrollToPlugin };
