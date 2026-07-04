"use client";

import {
  BadgeCheck,
  FileSearch2,
  HandHeart,
  LineChart,
} from "lucide-react";
import {
  JourneyFlow,
  type JourneyConnectionDefinition,
  type JourneyNodeDefinition,
} from "@/components/landing/journey-flow";

const journeyNodes:
  readonly JourneyNodeDefinition[] = [
    {
      id: "apply",
      label: "Apply",
      title:
        "A student shares the need",
      description:
        "The journey begins with a guided application that captures the student’s educational context without making the experience feel bureaucratic or impersonal.",
      eyebrow:
        "Student-led beginning",
      icon: FileSearch2,
      accent: "#6ee7c7",
      accentSoft: "#173d38",
      outcome:
        "A structured student request enters the platform with the context required for responsible review.",
      details: [
        "Clear, guided application flow",
        "Education and support context captured together",
        "A respectful starting point for follow-up",
      ],
      position: {
        x: 150,
        y: 155,
      },
    },
    {
      id: "review",
      label: "Review",
      title:
        "The trust verifies the context",
      description:
        "Administrators examine the request, supporting information, and practical circumstances before assistance is connected to a campaign or program.",
      eyebrow:
        "Human verification",
      icon: BadgeCheck,
      accent: "#82c8ff",
      accentSoft: "#16334a",
      outcome:
        "The request becomes a reviewable, accountable case rather than an unverified fundraising claim.",
      details: [
        "Human review remains central",
        "Supporting information can be evaluated together",
        "Clear ownership for the next decision",
      ],
      position: {
        x: 380,
        y: 380,
      },
    },
    {
      id: "support",
      label: "Support",
      title:
        "Approved needs meet responsible support",
      description:
        "Verified needs connect with donors, sponsorship pathways, program assistance, or volunteers while remaining tied to the original student context.",
      eyebrow:
        "Purposeful participation",
      icon: HandHeart,
      accent: "#f2c66d",
      accentSoft: "#49391b",
      outcome:
        "Every contribution or action remains connected to a specific, verified education-support purpose.",
      details: [
        "Campaign and sponsorship pathways",
        "Support connected to the verified need",
        "Donor and volunteer participation with context",
      ],
      position: {
        x: 650,
        y: 145,
      },
    },
    {
      id: "report",
      label: "Report",
      title:
        "Progress remains visible",
      description:
        "Contribution records, campaign progress, administrative actions, and student-support outcomes remain available for responsible follow-through.",
      eyebrow:
        "Visible accountability",
      icon: LineChart,
      accent: "#d9a2ff",
      accentSoft: "#3b2448",
      outcome:
        "The journey closes with records that make progress visible and future follow-up easier to manage.",
      details: [
        "Progress connected to platform records",
        "Reviewable administrative activity",
        "A stronger foundation for outcome reporting",
      ],
      position: {
        x: 865,
        y: 380,
      },
    },
  ];

const journeyConnections:
  readonly JourneyConnectionDefinition[] = [
    {
      from: "apply",
      to: "review",
      curvature: 0.5,
    },
    {
      from: "review",
      to: "support",
      curvature: 0.48,
    },
    {
      from: "support",
      to: "report",
      curvature: 0.5,
    },
  ];

export function ImpactPathway() {
  return (
    <JourneyFlow
      sectionId="pathway"
      eyebrow="How support moves"
      title="Follow the journey from student need to visible impact."
      description="Explore each stage of Devasiri’s support system. The connected flow shows how an application becomes a verified decision, responsible support, and an accountable record."
      nodes={journeyNodes}
      connections={
        journeyConnections
      }
      initialNodeId="apply"
    />
  );
}
