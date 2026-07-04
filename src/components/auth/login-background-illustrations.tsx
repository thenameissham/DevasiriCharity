"use client";

import { motion, useReducedMotion } from "framer-motion";

const ambientNodes = [
  {
    x: "8%",
    y: "18%",
    size: 5,
    delay: 0,
  },
  {
    x: "18%",
    y: "42%",
    size: 3,
    delay: 1.2,
  },
  {
    x: "31%",
    y: "14%",
    size: 4,
    delay: 2.4,
  },
  {
    x: "69%",
    y: "18%",
    size: 3,
    delay: 0.8,
  },
  {
    x: "82%",
    y: "38%",
    size: 5,
    delay: 1.8,
  },
  {
    x: "92%",
    y: "16%",
    size: 3,
    delay: 3,
  },
  {
    x: "12%",
    y: "76%",
    size: 4,
    delay: 1.4,
  },
  {
    x: "87%",
    y: "72%",
    size: 4,
    delay: 2.1,
  },
] as const;

export function LoginBackgroundIllustrations() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f7f8f9_0%,#f4f5f7_44%,#eef3f8_100%)]" />

      <div
        className="absolute inset-0 opacity-[0.34]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(9,30,66,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(9,30,66,0.055) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(circle at center, black 10%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 10%, transparent 82%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(12,102,228,0.5) 1.2px, transparent 1.2px)",
          backgroundSize: "42px 42px",
          backgroundPosition: "18px 16px",
        }}
      />

      <div className="absolute left-1/2 top-[-240px] h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-[#b3d4ff]/45 blur-[110px]" />

      <div className="absolute -left-40 top-[22%] h-[460px] w-[460px] rounded-full bg-[#79f2c0]/20 blur-[120px]" />

      <div className="absolute -right-40 top-[18%] h-[480px] w-[480px] rounded-full bg-[#85b8ff]/26 blur-[120px]" />

      <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(180deg,transparent,rgba(222,235,255,0.58))]" />

      {ambientNodes.map((node, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#0c66e4] shadow-[0_0_18px_rgba(12,102,228,0.32)]"
          style={{
            left: node.x,
            top: node.y,
            width: node.size,
            height: node.size,
          }}
          animate={
            reducedMotion
              ? {
                  opacity: 0.28,
                }
              : {
                  opacity: [0.16, 0.48, 0.16],
                  scale: [0.9, 1.22, 0.9],
                }
          }
          transition={{
            duration: 7,
            delay: node.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 hidden h-full w-full md:block"
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
              }
        }
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
      >
        <defs>
          <linearGradient id="login-flow-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c66e4" stopOpacity="0.12" />

            <stop offset="48%" stopColor="#0f766e" stopOpacity="0.46" />

            <stop offset="100%" stopColor="#579dff" stopOpacity="0.12" />
          </linearGradient>

          <filter
            id="login-node-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="5" result="blur" />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [-4, 4, -4],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            id="login-path-left"
            d="M 0 640 C 180 600 248 610 380 486 C 468 402 526 342 654 320"
            fill="none"
            stroke="url(#login-flow-gradient)"
            strokeWidth="2"
            strokeDasharray="7 11"
          />

          <path
            id="login-path-right"
            d="M 1600 650 C 1430 610 1360 610 1240 500 C 1140 410 1082 350 950 328"
            fill="none"
            stroke="url(#login-flow-gradient)"
            strokeWidth="2"
            strokeDasharray="7 11"
          />

          <path
            d="M 92 164 H 376 V 276 H 264 V 412"
            fill="none"
            stroke="#0c66e4"
            strokeOpacity="0.12"
            strokeWidth="1.5"
          />

          <path
            d="M 1508 164 H 1224 V 276 H 1336 V 412"
            fill="none"
            stroke="#0f766e"
            strokeOpacity="0.13"
            strokeWidth="1.5"
          />

          <path
            d="M 130 218 H 272 M 130 236 H 222"
            stroke="#579dff"
            strokeOpacity="0.18"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M 1470 218 H 1328 M 1470 236 H 1378"
            stroke="#0f766e"
            strokeOpacity="0.18"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <circle
            cx="360"
            cy="486"
            r="54"
            fill="none"
            stroke="#0c66e4"
            strokeOpacity="0.13"
          />

          <circle
            cx="360"
            cy="486"
            r="78"
            fill="none"
            stroke="#579dff"
            strokeOpacity="0.08"
            strokeDasharray="5 9"
          />

          <circle
            cx="1240"
            cy="500"
            r="54"
            fill="none"
            stroke="#0f766e"
            strokeOpacity="0.14"
          />

          <circle
            cx="1240"
            cy="500"
            r="78"
            fill="none"
            stroke="#0c66e4"
            strokeOpacity="0.08"
            strokeDasharray="5 9"
          />

          <circle
            cx="654"
            cy="320"
            r="5"
            fill="#0c66e4"
            opacity="0.5"
            filter="url(#login-node-glow)"
          />

          <circle
            cx="950"
            cy="328"
            r="5"
            fill="#0f766e"
            opacity="0.5"
            filter="url(#login-node-glow)"
          />

          {!reducedMotion ? (
            <>
              <circle r="4" fill="#0c66e4" opacity="0.55">
                <animateMotion dur="14s" repeatCount="indefinite">
                  <mpath href="#login-path-left" />
                </animateMotion>
              </circle>

              <circle r="4" fill="#0f766e" opacity="0.55">
                <animateMotion dur="16s" begin="-6s" repeatCount="indefinite">
                  <mpath href="#login-path-right" />
                </animateMotion>
              </circle>
            </>
          ) : null}
        </motion.g>
      </motion.svg>

      <motion.svg
        viewBox="0 0 460 330"
        className="absolute -bottom-6 -left-14 hidden h-[330px] w-[470px] lg:block"
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                x: -24,
                y: 14,
              }
        }
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <path d="M0 286H445" stroke="#091E42" strokeOpacity="0.12" />

        <path
          d="M20 252C92 214 134 222 188 172C247 118 310 122 438 80"
          fill="none"
          stroke="#579DFF"
          strokeWidth="2"
          strokeDasharray="7 9"
          opacity="0.68"
        />

        <path
          d="M22 274C110 247 154 252 218 214C288 172 346 170 438 134"
          fill="none"
          stroke="#0F766E"
          strokeWidth="2"
          opacity="0.5"
        />

        <rect x="30" y="184" width="88" height="92" rx="8" fill="#B3D4FF" />

        <rect x="52" y="160" width="96" height="114" rx="8" fill="#0C66E4" />

        <rect x="78" y="140" width="96" height="132" rx="8" fill="#85B8FF" />

        <path
          d="M96 168H152M96 188H138M96 208H148"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.9"
        />

        <circle cx="195" cy="171" r="13" fill="#0F766E" />

        <circle cx="280" cy="120" r="8" fill="#F5CD47" />

        <circle cx="374" cy="92" r="11" fill="#0C66E4" />

        <path
          d="M206 286V242H266V286M288 286V212H356V286"
          fill="none"
          stroke="#172B4D"
          strokeWidth="3"
          strokeOpacity="0.34"
        />

        <rect
          x="218"
          y="254"
          width="36"
          height="9"
          rx="4.5"
          fill="#0F766E"
          opacity="0.7"
        />

        <rect
          x="303"
          y="229"
          width="37"
          height="9"
          rx="4.5"
          fill="#0C66E4"
          opacity="0.68"
        />

        <circle
          cx="195"
          cy="171"
          r="28"
          fill="none"
          stroke="#0F766E"
          strokeOpacity="0.17"
          strokeDasharray="4 7"
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 470 340"
        className="absolute -bottom-8 -right-12 hidden h-[340px] w-[480px] lg:block"
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                x: 24,
                y: 14,
              }
        }
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <path d="M18 292H454" stroke="#091E42" strokeOpacity="0.12" />

        <path
          d="M18 124C132 92 192 100 260 150C310 186 360 192 458 164"
          fill="none"
          stroke="#579DFF"
          strokeWidth="2"
          strokeDasharray="6 8"
          opacity="0.64"
        />

        <rect x="198" y="154" width="190" height="116" rx="10" fill="#DEEBFF" />

        <rect
          x="216"
          y="132"
          width="190"
          height="122"
          rx="10"
          fill="white"
          stroke="#B3D4FF"
          strokeWidth="3"
        />

        <path
          d="M242 163H374M242 190H334M242 217H360"
          stroke="#85B8FF"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <circle
          cx="344"
          cy="108"
          r="50"
          fill="#E9F2FF"
          stroke="#0C66E4"
          strokeWidth="8"
        />

        <circle cx="344" cy="108" r="25" fill="#0F766E" opacity="0.88" />

        <path
          d="M379 145L419 188"
          stroke="#0C66E4"
          strokeWidth="11"
          strokeLinecap="round"
        />

        <circle cx="100" cy="226" r="13" fill="#F5CD47" />

        <circle cx="143" cy="182" r="8" fill="#0F766E" />

        <path
          d="M94 239L59 290M107 238L141 290M84 255H119"
          stroke="#172B4D"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.48"
        />

        <path
          d="M64 92H178V184H112"
          fill="none"
          stroke="#0F766E"
          strokeOpacity="0.17"
          strokeWidth="2"
        />

        <circle cx="64" cy="92" r="5" fill="#0F766E" opacity="0.48" />

        <circle cx="178" cy="184" r="5" fill="#0C66E4" opacity="0.48" />
      </motion.svg>

      <motion.div
        className="absolute left-1/2 top-[46%] h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0c66e4]/[0.06]"
        animate={
          reducedMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 70,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#0c66e4]/25" />

        <div className="absolute bottom-[12%] right-[6%] h-2.5 w-2.5 rounded-full bg-[#0f766e]/20" />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[46%] h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#0f766e]/[0.055]"
        animate={
          reducedMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={{
          duration: 96,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="absolute left-1/2 top-1/2 h-[620px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-[46%] bg-white/48 blur-[70px]" />
    </div>
  );
}
