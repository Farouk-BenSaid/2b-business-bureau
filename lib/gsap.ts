"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/** Media query used everywhere: animate only if the visitor has not asked for less motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
