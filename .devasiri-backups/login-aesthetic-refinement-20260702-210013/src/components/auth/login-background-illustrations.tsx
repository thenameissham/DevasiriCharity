"use client";

import { motion, useReducedMotion } from "framer-motion";

export function LoginBackgroundIllustrations() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(180deg,transparent,rgba(222,235,255,0.44))]" />

      <motion.svg
        viewBox="0 0 420 300"
        className="absolute -bottom-6 -left-10 hidden h-[310px] w-[430px] lg:block"
        initial={reducedMotion ? false : { opacity: 0, x: -24, y: 16 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <path
          d="M0 238C86 206 120 216 172 168C221 123 275 118 420 74"
          fill="none"
          stroke="#579DFF"
          strokeWidth="2"
          strokeDasharray="7 9"
          opacity="0.72"
        />

        <path
          d="M0 258C92 236 142 248 196 210C253 170 310 170 420 124"
          fill="none"
          stroke="#2BBBAD"
          strokeWidth="2"
          opacity="0.58"
        />

        <rect x="18" y="174" width="92" height="88" rx="8" fill="#B3D4FF" />

        <rect x="36" y="153" width="92" height="105" rx="8" fill="#0C66E4" />

        <rect x="58" y="136" width="90" height="119" rx="8" fill="#85B8FF" />

        <path
          d="M75 163H130M75 181H118M75 199H126"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.9"
        />

        <circle cx="172" cy="168" r="13" fill="#0F766E" />

        <circle cx="254" cy="122" r="8" fill="#F5CD47" />

        <circle cx="344" cy="91" r="11" fill="#0C66E4" />

        <path d="M166 270H400" stroke="#091E42" strokeOpacity="0.12" />

        <path
          d="M193 270V227H252V270M274 270V197H340V270"
          fill="none"
          stroke="#172B4D"
          strokeWidth="3"
          strokeOpacity="0.38"
        />

        <rect
          x="205"
          y="239"
          width="36"
          height="9"
          rx="4.5"
          fill="#0F766E"
          opacity="0.68"
        />

        <rect
          x="288"
          y="214"
          width="37"
          height="9"
          rx="4.5"
          fill="#0C66E4"
          opacity="0.68"
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 430 310"
        className="absolute -bottom-8 -right-8 hidden h-[320px] w-[440px] lg:block"
        initial={reducedMotion ? false : { opacity: 0, x: 24, y: 16 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <path
          d="M16 116C124 88 181 94 246 142C292 176 340 181 430 154"
          fill="none"
          stroke="#579DFF"
          strokeWidth="2"
          strokeDasharray="6 8"
          opacity="0.66"
        />

        <rect x="178" y="142" width="185" height="112" rx="10" fill="#DEEBFF" />

        <rect
          x="195"
          y="121"
          width="184"
          height="118"
          rx="10"
          fill="white"
          stroke="#B3D4FF"
          strokeWidth="3"
        />

        <path
          d="M220 151H348M220 176H310M220 201H334"
          stroke="#85B8FF"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <circle
          cx="322"
          cy="102"
          r="47"
          fill="#E9F2FF"
          stroke="#0C66E4"
          strokeWidth="8"
        />

        <circle cx="322" cy="102" r="24" fill="#0F766E" opacity="0.88" />

        <path
          d="M355 137L392 177"
          stroke="#0C66E4"
          strokeWidth="11"
          strokeLinecap="round"
        />

        <circle cx="92" cy="211" r="13" fill="#F5CD47" />

        <circle cx="131" cy="170" r="8" fill="#0F766E" />

        <path
          d="M86 224L54 272M99 223L131 272M77 240H111"
          stroke="#172B4D"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.55"
        />

        <path d="M17 276H414" stroke="#091E42" strokeOpacity="0.12" />
      </motion.svg>

      <div className="absolute left-1/2 top-0 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-[#e9f2ff]/55 blur-3xl" />
    </div>
  );
}
