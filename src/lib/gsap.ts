import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export { isReducedMotion } from "./motion";

let registered = false;

export function registerGsap() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };
