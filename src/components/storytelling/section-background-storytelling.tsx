"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export interface StoryNode {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly branch?: string;
  readonly radius?: number;
  readonly secondary?: boolean;
}

export interface StoryConnection {
  readonly id: string;
  readonly from: string;
  readonly to: string;
  readonly branch?: string;
  readonly particle?: boolean;
  readonly secondary?: boolean;
}

export interface SectionBackgroundStory {
  readonly theme: "light" | "dark";
  readonly accent: string;
  readonly secondaryAccent: string;
  readonly tertiaryAccent: string;
  readonly nodes: readonly StoryNode[];
  readonly connections: readonly StoryConnection[];
  readonly guides: readonly string[];
}

interface SectionBackgroundStorytellingProps {
  readonly story: SectionBackgroundStory;
  readonly interactionAttribute?: string;
}

function buildPath(source: StoryNode, target: StoryNode) {
  const deltaX = target.x - source.x;

  const control = Math.max(72, Math.abs(deltaX) * 0.32);

  const direction = deltaX >= 0 ? 1 : -1;

  return [
    `M ${source.x} ${source.y}`,
    `C ${source.x + control * direction} ${source.y},`,
    `${target.x - control * direction} ${target.y},`,
    `${target.x} ${target.y}`,
  ].join(" ");
}

export function SectionBackgroundStorytelling({
  story,
  interactionAttribute = "data-story-key",
}: SectionBackgroundStorytellingProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });

  const guidesY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  const networkY = useTransform(scrollYProgress, [0, 1], [9, -9]);

  const nodeMap = useMemo(
    () => new Map(story.nodes.map((node) => [node.id, node])),
    [story.nodes],
  );

  const connections = useMemo(
    () =>
      story.connections.flatMap((connection) => {
        const source = nodeMap.get(connection.from);

        const target = nodeMap.get(connection.to);

        if (!source || !target) {
          return [];
        }

        return [
          {
            ...connection,
            d: buildPath(source, target),
          },
        ];
      }),
    [nodeMap, story.connections],
  );

  useEffect(() => {
    const section = rootRef.current?.closest("section");

    if (!section) {
      return;
    }

    const selector = `[${interactionAttribute}]`;

    const activate = (event: Event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const item = event.target.closest<HTMLElement>(selector);

      if (item && section.contains(item)) {
        setActiveBranch(item.getAttribute(interactionAttribute));
      }
    };

    const reset = () => {
      setActiveBranch(null);
    };

    const resetFocus = (event: FocusEvent) => {
      if (
        !(event.relatedTarget instanceof Node) ||
        !section.contains(event.relatedTarget)
      ) {
        reset();
      }
    };

    section.addEventListener("pointerover", activate);

    section.addEventListener("pointerleave", reset);

    section.addEventListener("focusin", activate);

    section.addEventListener("focusout", resetFocus);

    return () => {
      section.removeEventListener("pointerover", activate);

      section.removeEventListener("pointerleave", reset);

      section.removeEventListener("focusin", activate);

      section.removeEventListener("focusout", resetFocus);
    };
  }, [interactionAttribute]);

  const foreground = story.theme === "dark" ? "#ffffff" : "#091e42";

  const isActive = (branch?: string) =>
    Boolean(branch && branch === activeBranch);

  const isDimmed = (branch?: string) =>
    Boolean(branch && activeBranch && branch !== activeBranch);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-storytelling-engine="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-70 md:opacity-90"
    >
      <motion.svg
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern
            id={`${instanceId}-grid`}
            width="52"
            height="52"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 52 0 L 0 0 0 52"
              fill="none"
              stroke={foreground}
              strokeOpacity="0.055"
            />

            <circle r="1.5" fill={foreground} fillOpacity="0.12" />
          </pattern>

          <radialGradient
            id={`${instanceId}-light-a`}
            cx="72%"
            cy="28%"
            r="50%"
          >
            <stop stopColor={story.accent} stopOpacity="0.11" />

            <stop offset="100%" stopColor={story.accent} stopOpacity="0" />
          </radialGradient>

          <radialGradient
            id={`${instanceId}-light-b`}
            cx="18%"
            cy="82%"
            r="44%"
          >
            <stop stopColor={story.secondaryAccent} stopOpacity="0.09" />

            <stop
              offset="100%"
              stopColor={story.secondaryAccent}
              stopOpacity="0"
            />
          </radialGradient>

          <linearGradient id={`${instanceId}-network`} x2="100%" y2="100%">
            <stop stopColor={story.accent} />

            <stop offset="56%" stopColor={story.secondaryAccent} />

            <stop offset="100%" stopColor={story.tertiaryAccent} />
          </linearGradient>

          <linearGradient id={`${instanceId}-sweep`} x2="100%">
            <stop stopColor={story.accent} stopOpacity="0" />

            <stop offset="50%" stopColor={story.accent} stopOpacity="0.09" />

            <stop offset="100%" stopColor={story.accent} stopOpacity="0" />
          </linearGradient>

          <filter
            id={`${instanceId}-glow`}
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
          >
            <feGaussianBlur stdDeviation="4" result="blur" />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1200" height="720" fill={`url(#${instanceId}-light-a)`} />

        <rect width="1200" height="720" fill={`url(#${instanceId}-light-b)`} />

        <rect width="1200" height="720" fill={`url(#${instanceId}-grid)`} />

        <motion.g style={reducedMotion ? undefined : { y: guidesY }}>
          {story.guides.map((path, index) => (
            <motion.path
              key={path}
              d={path}
              fill="none"
              stroke={foreground}
              strokeOpacity="0.14"
              strokeWidth="1"
              strokeDasharray={index % 2 === 0 ? "4 9" : undefined}
              vectorEffect="non-scaling-stroke"
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      pathLength: 0,
                    }
              }
              whileInView={
                reducedMotion
                  ? undefined
                  : {
                      opacity: 1,
                      pathLength: 1,
                    }
              }
              viewport={{
                once: true,
                margin: "-15%",
              }}
              transition={{
                duration: 1.5,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </motion.g>

        <motion.g style={reducedMotion ? undefined : { y: networkY }}>
          {connections.map((connection, index) => {
            const active = isActive(connection.branch);

            const dimmed = isDimmed(connection.branch);

            const pathId = `${instanceId}-${connection.id}`;

            return (
              <g
                key={connection.id}
                className={connection.secondary ? "hidden lg:block" : undefined}
              >
                <motion.path
                  id={pathId}
                  d={connection.d}
                  fill="none"
                  stroke={`url(#${instanceId}-network)`}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          pathLength: 0,
                        }
                  }
                  whileInView={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: 1,
                          pathLength: 1,
                        }
                  }
                  viewport={{
                    once: true,
                    margin: "-12%",
                  }}
                  animate={{
                    opacity: dimmed ? 0.05 : active ? 0.8 : 0.22,
                    strokeWidth: active ? 2.3 : 1.1,
                  }}
                  transition={{
                    pathLength: {
                      duration: 1.8,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    opacity: {
                      duration: 0.32,
                    },
                  }}
                  filter={active ? `url(#${instanceId}-glow)` : undefined}
                />

                {!reducedMotion && connection.particle ? (
                  <circle
                    r={active ? 3.2 : 2.1}
                    fill={active ? story.accent : story.secondaryAccent}
                    opacity={dimmed ? 0.05 : active ? 0.76 : 0.28}
                  >
                    <animateMotion
                      dur={`${15 + index}s`}
                      begin={`${-index * 1.6}s`}
                      repeatCount="indefinite"
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>
                ) : null}
              </g>
            );
          })}

          {story.nodes.map((node, index) => {
            const active = isActive(node.branch);

            const radius = node.radius ?? 5;

            return (
              <motion.g
                key={node.id}
                className={node.secondary ? "hidden lg:block" : undefined}
                animate={{
                  opacity: isDimmed(node.branch) ? 0.1 : active ? 1 : 0.7,
                }}
                transition={{
                  duration: 0.32,
                }}
              >
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={radius * 3.2}
                  fill={story.accent}
                  animate={
                    reducedMotion
                      ? {
                          opacity: 0.05,
                        }
                      : {
                          opacity: active
                            ? [0.08, 0.2, 0.08]
                            : [0.025, 0.07, 0.025],
                          scale: [1, active ? 1.2 : 1.07, 1],
                        }
                  }
                  transition={{
                    duration: active ? 3.8 : 7.4,
                    delay: index * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    transformOrigin: `${node.x}px ${node.y}px`,
                  }}
                />

                <circle
                  cx={node.x}
                  cy={node.y}
                  r={active ? radius + 1.5 : radius}
                  fill={active ? story.accent : story.secondaryAccent}
                  stroke={foreground}
                  strokeOpacity="0.22"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </motion.g>
            );
          })}
        </motion.g>

        <motion.ellipse
          cx="820"
          cy="260"
          rx="170"
          ry="92"
          fill="none"
          stroke={story.accent}
          strokeOpacity="0.12"
          strokeWidth="1"
          className="hidden md:block"
          style={{
            transformOrigin: "820px 260px",
          }}
          animate={reducedMotion ? undefined : { rotate: 360 }}
          transition={{
            duration: 52,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.rect
          y="-120"
          width="170"
          height="960"
          fill={`url(#${instanceId}-sweep)`}
          transform="skewX(-14)"
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [-260, -260, 1420],
                }
          }
          transition={{
            duration: 22,
            times: [0, 0.72, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
}

export const whoWeAreStory: SectionBackgroundStory = {
  theme: "light",
  accent: "#0c66e4",
  secondaryAccent: "#0e9384",
  tertiaryAccent: "#b7791f",

  nodes: [
    {
      id: "foundation",
      x: 144,
      y: 512,
      radius: 7,
      branch: "continuity",
    },
    {
      id: "student",
      x: 278,
      y: 392,
      radius: 6,
      branch: "continuity",
    },
    {
      id: "learning",
      x: 426,
      y: 278,
      branch: "continuity",
    },
    {
      id: "community",
      x: 542,
      y: 454,
      radius: 6,
      branch: "participation",
    },
    {
      id: "supporter",
      x: 692,
      y: 338,
      branch: "participation",
    },
    {
      id: "volunteer",
      x: 814,
      y: 214,
      radius: 6,
      branch: "participation",
    },
    {
      id: "trust",
      x: 756,
      y: 536,
      radius: 7,
      branch: "accountability",
    },
    {
      id: "record",
      x: 946,
      y: 430,
      branch: "accountability",
    },
    {
      id: "outcome",
      x: 1072,
      y: 286,
      radius: 7,
      branch: "accountability",
    },
    {
      id: "shared-a",
      x: 590,
      y: 220,
      secondary: true,
    },
    {
      id: "shared-b",
      x: 928,
      y: 150,
      secondary: true,
    },
    {
      id: "shared-c",
      x: 346,
      y: 580,
      secondary: true,
    },
  ],

  connections: [
    {
      id: "c1",
      from: "foundation",
      to: "student",
      branch: "continuity",
      particle: true,
    },
    {
      id: "c2",
      from: "student",
      to: "learning",
      branch: "continuity",
      particle: true,
    },
    {
      id: "c3",
      from: "learning",
      to: "community",
    },
    {
      id: "c4",
      from: "community",
      to: "supporter",
      branch: "participation",
      particle: true,
    },
    {
      id: "c5",
      from: "supporter",
      to: "volunteer",
      branch: "participation",
      particle: true,
    },
    {
      id: "c6",
      from: "community",
      to: "trust",
    },
    {
      id: "c7",
      from: "trust",
      to: "record",
      branch: "accountability",
      particle: true,
    },
    {
      id: "c8",
      from: "record",
      to: "outcome",
      branch: "accountability",
      particle: true,
    },
    {
      id: "c9",
      from: "learning",
      to: "shared-a",
      secondary: true,
    },
    {
      id: "c10",
      from: "shared-a",
      to: "volunteer",
      secondary: true,
    },
    {
      id: "c11",
      from: "volunteer",
      to: "shared-b",
      secondary: true,
    },
    {
      id: "c12",
      from: "student",
      to: "shared-c",
      secondary: true,
    },
    {
      id: "c13",
      from: "shared-c",
      to: "trust",
      secondary: true,
    },
  ],

  guides: [
    "M 72 610 H 1128",
    "M 426 92 V 650",
    "M 92 458 H 278 V 576 H 92 Z",
    "M 380 360 A 226 226 0 1 0 832 360 A 226 226 0 1 0 380 360",
    "M 684 264 A 132 132 0 1 0 948 264 A 132 132 0 1 0 684 264",
    "M 890 106 H 1116 V 484 H 890 Z",
    "M 114 548 L 246 448 L 384 354 L 518 260 L 652 184 L 790 130",
    "M 120 596 V 624 M 606 596 V 624 M 1080 596 V 624",
  ],
};
