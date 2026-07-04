"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Check,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import {
  type CSSProperties,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./journey-flow.module.css";

export interface JourneyNodeDefinition {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly eyebrow: string;
  readonly icon: LucideIcon;
  readonly accent: string;
  readonly accentSoft: string;
  readonly outcome: string;
  readonly details: readonly string[];
  readonly position: {
    readonly x: number;
    readonly y: number;
  };
}

export interface JourneyConnectionDefinition {
  readonly from: string;
  readonly to: string;
  readonly curvature?: number;
}

interface JourneyFlowProps {
  readonly sectionId?: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly nodes: readonly JourneyNodeDefinition[];
  readonly connections: readonly JourneyConnectionDefinition[];
  readonly initialNodeId?: string;
}

interface LayoutNode extends JourneyNodeDefinition {
  readonly layoutX: number;
  readonly layoutY: number;
}

const backgroundParticles = [
  [8, 22, 3, -2],
  [18, 73, 2, -8],
  [29, 35, 4, -5],
  [42, 84, 2, -11],
  [55, 18, 3, -7],
  [67, 68, 2, -3],
  [78, 28, 4, -10],
  [89, 76, 3, -6],
  [95, 42, 2, -13],
] as const;

function createPath(
  source: {
    readonly x: number;
    readonly y: number;
  },
  target: {
    readonly x: number;
    readonly y: number;
  },
  curvature = 0.45,
) {
  const deltaX = target.x - source.x;
  const deltaY = target.y - source.y;

  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    const controlDistance = Math.max(
      70,
      Math.abs(deltaX) * curvature,
    );

    const direction = deltaX >= 0 ? 1 : -1;

    return [
      `M ${source.x} ${source.y}`,
      `C ${source.x + controlDistance * direction} ${source.y},`,
      `${target.x - controlDistance * direction} ${target.y},`,
      `${target.x} ${target.y}`,
    ].join(" ");
  }

  const controlDistance = Math.max(
    55,
    Math.abs(deltaY) * curvature,
  );

  const direction = deltaY >= 0 ? 1 : -1;

  return [
    `M ${source.x} ${source.y}`,
    `C ${source.x} ${source.y + controlDistance * direction},`,
    `${target.x} ${target.y - controlDistance * direction},`,
    `${target.x} ${target.y}`,
  ].join(" ");
}

function useMobileJourneyLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(max-width: 820px)",
    );

    const update = () => {
      setIsMobile(media.matches);
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  return isMobile;
}

export function JourneyFlow({
  sectionId = "journey-flow",
  eyebrow,
  title,
  description,
  nodes,
  connections,
  initialNodeId,
}: JourneyFlowProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useMobileJourneyLayout();
  const pathPrefix = useId().replaceAll(":", "");

  const nodeRefs = useRef(
    new Map<string, HTMLButtonElement>(),
  );

  const initialIndex = Math.max(
    0,
    nodes.findIndex(
      (node) => node.id === initialNodeId,
    ),
  );

  const [activeIndex, setActiveIndex] =
    useState(initialIndex);

  const [maxVisitedIndex, setMaxVisitedIndex] =
    useState(initialIndex);

  const viewBox = useMemo(
    () =>
      isMobile
        ? {
            width: 100,
            height: Math.max(
              520,
              nodes.length * 150,
            ),
          }
        : {
            width: 1000,
            height: 560,
          },
    [isMobile, nodes.length],
  );

  const layoutNodes = useMemo<
    readonly LayoutNode[]
  >(
    () =>
      nodes.map((node, index) => ({
        ...node,
        layoutX: isMobile
          ? 50
          : node.position.x,
        layoutY: isMobile
          ? 78 + index * 145
          : node.position.y,
      })),
    [isMobile, nodes],
  );

  const nodeIndexById = useMemo(
    () =>
      new Map(
        layoutNodes.map((node, index) => [
          node.id,
          index,
        ]),
      ),
    [layoutNodes],
  );

  const paths = useMemo(
    () =>
      connections.flatMap(
        (connection, index) => {
          const source = layoutNodes.find(
            (node) =>
              node.id === connection.from,
          );

          const target = layoutNodes.find(
            (node) =>
              node.id === connection.to,
          );

          if (!source || !target) {
            return [];
          }

          return [
            {
              id: `${pathPrefix}-path-${index}`,
              source,
              target,
              d: createPath(
                {
                  x: source.layoutX,
                  y: source.layoutY,
                },
                {
                  x: target.layoutX,
                  y: target.layoutY,
                },
                connection.curvature,
              ),
            },
          ];
        },
      ),
    [
      connections,
      layoutNodes,
      pathPrefix,
    ],
  );

  const activeNode =
    layoutNodes[activeIndex] ??
    layoutNodes[0];

  const activateNode = useCallback(
    (index: number) => {
      setActiveIndex(index);

      setMaxVisitedIndex((current) =>
        Math.max(current, index),
      );
    },
    [],
  );

  const moveFocus = useCallback(
    (index: number) => {
      const nextIndex = Math.max(
        0,
        Math.min(
          layoutNodes.length - 1,
          index,
        ),
      );

      activateNode(nextIndex);

      nodeRefs.current
        .get(
          layoutNodes[nextIndex]?.id ?? "",
        )
        ?.focus();
    },
    [
      activateNode,
      layoutNodes,
    ],
  );

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (
      [
        "ArrowRight",
        "ArrowDown",
      ].includes(event.key)
    ) {
      event.preventDefault();
      moveFocus(index + 1);
      return;
    }

    if (
      [
        "ArrowLeft",
        "ArrowUp",
      ].includes(event.key)
    ) {
      event.preventDefault();
      moveFocus(index - 1);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      moveFocus(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      moveFocus(layoutNodes.length - 1);
    }
  };

  if (!activeNode) {
    return null;
  }

  const ActiveIcon = activeNode.icon;

  return (
    <section
      id={sectionId}
      className={styles.section}
    >
      <div
        aria-hidden="true"
        className={styles.ambient}
      />

      <div
        aria-hidden="true"
        className={styles.grid}
      />

      <div
        aria-hidden="true"
        className={styles.particles}
      >
        {backgroundParticles.map(
          (
            [
              x,
              y,
              size,
              delay,
            ],
            index,
          ) => (
            <span
              key={index}
              style={
                {
                  "--x": `${x}%`,
                  "--y": `${y}%`,
                  "--size": `${size}px`,
                  "--delay": `${delay}s`,
                } as CSSProperties
              }
            />
          ),
        )}
      </div>

      <div className={styles.shell}>
        <motion.header
          className={styles.header}
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            margin: "-100px",
          }}
          transition={{
            duration: 0.65,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <span className={styles.eyebrow}>
            {eyebrow}
          </span>

          <h2>{title}</h2>

          <p>{description}</p>
        </motion.header>

        <motion.div
          className={styles.experience}
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{
            duration: 0.75,
            delay: 0.08,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <div
            className={styles.canvas}
            style={
              {
                "--mobile-canvas-height":
                  `${viewBox.height * 1.42}px`,
              } as CSSProperties
            }
          >
            <div
              className={styles.canvasLabel}
            >
              <span>
                Interactive support map
              </span>

              <span>
                Hover, click, or use arrow
                keys
              </span>
            </div>

            <svg
              aria-hidden="true"
              className={styles.svg}
              viewBox={
                `0 0 ${viewBox.width} ${viewBox.height}`
              }
              preserveAspectRatio="none"
            >
              <defs>
                <filter
                  id={`${pathPrefix}-glow`}
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur
                    stdDeviation="4"
                    result="blur"
                  />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {paths.map((path) => (
                  <linearGradient
                    key={`${path.id}-gradient`}
                    id={`${path.id}-gradient`}
                    gradientUnits="userSpaceOnUse"
                    x1={path.source.layoutX}
                    y1={path.source.layoutY}
                    x2={path.target.layoutX}
                    y2={path.target.layoutY}
                  >
                    <stop
                      offset="0%"
                      stopColor={
                        path.source.accent
                      }
                    />

                    <stop
                      offset="100%"
                      stopColor={
                        path.target.accent
                      }
                    />
                  </linearGradient>
                ))}
              </defs>

              {paths.map(
                (
                  path,
                  pathIndex,
                ) => {
                  const targetIndex =
                    nodeIndexById.get(
                      path.target.id,
                    ) ?? 999;

                  const reached =
                    targetIndex <=
                    maxVisitedIndex;

                  const activePath =
                    path.source.id ===
                      activeNode.id ||
                    path.target.id ===
                      activeNode.id;

                  return (
                    <g key={path.id}>
                      <path
                        id={path.id}
                        d={path.d}
                        className={
                          styles.pathBase
                        }
                      />

                      <motion.path
                        d={path.d}
                        fill="none"
                        stroke={
                          `url(#${path.id}-gradient)`
                        }
                        strokeLinecap="round"
                        strokeWidth={
                          activePath
                            ? 4
                            : 2.4
                        }
                        filter={
                          activePath
                            ? `url(#${pathPrefix}-glow)`
                            : undefined
                        }
                        initial={false}
                        animate={{
                          opacity: reached
                            ? 0.95
                            : 0.2,
                          pathLength: reached
                            ? 1
                            : 0.18,
                        }}
                        transition={{
                          duration:
                            reducedMotion
                              ? 0
                              : 0.65,
                        }}
                      />

                      {!reducedMotion
                        ? [0, 1].map(
                            (
                              particle,
                            ) => (
                              <circle
                                key={
                                  `${path.id}-${particle}`
                                }
                                r={
                                  activePath
                                    ? 4
                                    : 2.7
                                }
                                fill={
                                  reached
                                    ? "#dffff7"
                                    : "#688783"
                                }
                                opacity={
                                  activePath
                                    ? 0.95
                                    : reached
                                      ? 0.68
                                      : 0.25
                                }
                              >
                                <animateMotion
                                  dur={
                                    `${5.2 + pathIndex * 0.55}s`
                                  }
                                  begin={
                                    `${particle * -2.5}s`
                                  }
                                  repeatCount="indefinite"
                                >
                                  <mpath
                                    href={
                                      `#${path.id}`
                                    }
                                  />
                                </animateMotion>
                              </circle>
                            ),
                          )
                        : null}
                    </g>
                  );
                },
              )}
            </svg>

            {layoutNodes.map(
              (
                node,
                index,
              ) => {
                const Icon = node.icon;

                const active =
                  index === activeIndex;

                const complete =
                  index <=
                    maxVisitedIndex &&
                  !active;

                const future =
                  index >
                  maxVisitedIndex;

                return (
                  <button
                    key={node.id}
                    ref={(element) => {
                      if (element) {
                        nodeRefs.current.set(
                          node.id,
                          element,
                        );
                      } else {
                        nodeRefs.current.delete(
                          node.id,
                        );
                      }
                    }}
                    type="button"
                    className={styles.node}
                    style={
                      {
                        left:
                          `${(node.layoutX / viewBox.width) * 100}%`,
                        top:
                          `${(node.layoutY / viewBox.height) * 100}%`,
                        "--accent":
                          node.accent,
                        "--accent-soft":
                          node.accentSoft,
                      } as CSSProperties
                    }
                    aria-pressed={active}
                    aria-label={
                      `${node.label}: ${node.title}. ${
                        active
                          ? "Current stage"
                          : complete
                            ? "Completed stage"
                            : "Upcoming stage"
                      }`
                    }
                    onMouseEnter={() =>
                      activateNode(index)
                    }
                    onFocus={() =>
                      activateNode(index)
                    }
                    onClick={() =>
                      activateNode(index)
                    }
                    onKeyDown={(event) =>
                      handleKeyDown(
                        event,
                        index,
                      )
                    }
                  >
                    <motion.span
                      className={
                        `${styles.nodeInner} ${
                          active
                            ? styles.active
                            : ""
                        } ${
                          complete
                            ? styles.complete
                            : ""
                        }`
                      }
                      initial={false}
                      animate={{
                        scale: active
                          ? 1.09
                          : 1,
                        opacity: future
                          ? 0.56
                          : 1,
                      }}
                      transition={{
                        duration:
                          reducedMotion
                            ? 0
                            : 0.32,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                    >
                      <span
                        className={
                          styles.nodeGlow
                        }
                      />

                      <span
                        className={
                          styles.nodeIcon
                        }
                      >
                        {complete ? (
                          <Check
                            aria-hidden="true"
                          />
                        ) : (
                          <Icon
                            aria-hidden="true"
                          />
                        )}
                      </span>

                      <span
                        className={
                          styles.nodeCopy
                        }
                      >
                        <small>
                          {String(
                            index + 1,
                          ).padStart(
                            2,
                            "0",
                          )}{" "}
                          · {node.label}
                        </small>

                        <strong>
                          {node.title}
                        </strong>
                      </span>

                      <span
                        className={
                          styles.nodeState
                        }
                      >
                        {active
                          ? "In focus"
                          : complete
                            ? "Completed"
                            : "Upcoming"}
                      </span>
                    </motion.span>
                  </button>
                );
              },
            )}
          </div>

          <aside
            className={styles.panel}
            style={
              {
                "--accent":
                  activeNode.accent,
                "--accent-soft":
                  activeNode.accentSoft,
              } as CSSProperties
            }
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.article
                key={activeNode.id}
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 14,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: -10,
                      }
                }
                transition={{
                  duration:
                    reducedMotion
                      ? 0
                      : 0.32,
                }}
              >
                <div
                  className={
                    styles.panelMeta
                  }
                >
                  <span>
                    Stage{" "}
                    {String(
                      activeIndex + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <span>
                    {activeIndex + 1} /{" "}
                    {nodes.length}
                  </span>
                </div>

                <div
                  className={
                    styles.panelIconRow
                  }
                >
                  <span
                    className={
                      styles.panelIcon
                    }
                  >
                    <ActiveIcon
                      aria-hidden="true"
                    />
                  </span>

                  <span>
                    {activeNode.eyebrow}
                  </span>
                </div>

                <h3>
                  {activeNode.title}
                </h3>

                <p
                  className={
                    styles.panelDescription
                  }
                >
                  {activeNode.description}
                </p>

                <div
                  className={styles.details}
                >
                  {activeNode.details.map(
                    (detail) => (
                      <div key={detail}>
                        <span>
                          <Check
                            aria-hidden="true"
                          />
                        </span>

                        {detail}
                      </div>
                    ),
                  )}
                </div>

                <div
                  className={styles.outcome}
                >
                  <small>
                    Operational outcome
                  </small>

                  <p>
                    {activeNode.outcome}
                  </p>
                </div>

                <div
                  className={
                    styles.panelFooter
                  }
                >
                  <div
                    className={
                      styles.progress
                    }
                  >
                    <motion.span
                      initial={false}
                      animate={{
                        width:
                          `${((activeIndex + 1) / nodes.length) * 100}%`,
                      }}
                      transition={{
                        duration:
                          reducedMotion
                            ? 0
                            : 0.5,
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      activateNode(
                        (activeIndex + 1) %
                          nodes.length,
                      )
                    }
                  >
                    Next stage

                    <ChevronRight
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </motion.article>
            </AnimatePresence>
          </aside>
        </motion.div>
      </div>
    </section>
  );
}
