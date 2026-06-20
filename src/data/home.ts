import {
  BedDouble,
  BookOpenCheck,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Users
} from "lucide-react";

export const impactMetrics = [
  {
    label: "Students supported",
    value: 418
  },
  {
    label: "Hostel seats assisted",
    value: 72
  },
  {
    label: "Active campaigns",
    value: 9
  },
  {
    label: "Verified donors",
    value: 1286
  }
] as const;

export const campaigns = [
  {
    title: "Emergency Education Fee Support",
    category: "Education",
    description:
      "Help students continue classes by covering urgent college, exam, and admission fee gaps.",
    raised: 485000,
    goal: 900000,
    donors: 246
  },
  {
    title: "Hostel Safety Support Program",
    category: "Hostel",
    description:
      "Support safe accommodation for students who travel far from home to continue education.",
    raised: 320000,
    goal: 650000,
    donors: 181
  },
  {
    title: "Student Sponsorship Track",
    category: "Sponsorship",
    description:
      "Sponsor verified students through structured, milestone-based educational support.",
    raised: 780000,
    goal: 1200000,
    donors: 392
  }
] as const;

export const donationTiers = [
  {
    name: "Bronze",
    amount: 1000,
    description: "Supports exam forms, documents, and basic learning needs."
  },
  {
    name: "Silver",
    amount: 5000,
    description: "Helps with monthly education essentials and travel support."
  },
  {
    name: "Gold",
    amount: 10000,
    description: "Supports hostel, food, and study continuity assistance."
  },
  {
    name: "Platinum",
    amount: 25000,
    description: "Funds milestone-based student sponsorship support."
  }
] as const;

export const impactStories = [
  {
    title: "From uncertainty to college admission",
    content:
      "A student received fee assistance at the right time and continued engineering studies without dropping out.",
    metric: "1 full-year fee support"
  },
  {
    title: "Safe stay through hostel support",
    content:
      "Hostel assistance helped a student stay closer to college and focus on attendance, food, and exams.",
    metric: "12 months hostel aid"
  },
  {
    title: "Mentorship beyond donation",
    content:
      "Volunteer guidance helped a beneficiary prepare documents, apply for exams, and build confidence.",
    metric: "6 volunteer sessions"
  }
] as const;

export const tickerItems = [
  "₹5,000 donated for exam fees",
  "3 hostel applications verified",
  "12 volunteers active this month",
  "1 student sponsorship completed",
  "₹25,000 raised for education kit",
  "8 beneficiary records updated"
] as const;

export const transparencyStats = [
  {
    label: "Education assistance",
    value: "₹14.2L",
    helper: "Fee, exam, document and admission support",
    icon: GraduationCap
  },
  {
    label: "Hostel support",
    value: "₹6.4L",
    helper: "Accommodation and monthly student safety support",
    icon: BedDouble
  },
  {
    label: "Student sponsorships",
    value: "₹4.2L",
    helper: "Milestone-based verified sponsorship aid",
    icon: ShieldCheck
  }
] as const;

export const fundAllocation = [
  {
    label: "Education assistance",
    value: 57
  },
  {
    label: "Hostel support",
    value: 26
  },
  {
    label: "Sponsorships",
    value: 17
  }
] as const;

export const trustPillars = [
  {
    title: "Verified student support",
    description:
      "Every student assistance path is designed for review, tracking, and accountability.",
    icon: GraduationCap
  },
  {
    title: "Education-first giving",
    description:
      "Funds are mapped to fees, hostel care, learning essentials, and sponsorship milestones.",
    icon: BookOpenCheck
  },
  {
    title: "Volunteer-backed operations",
    description:
      "Volunteers can support verification, mentoring, events, and follow-up activities.",
    icon: HeartHandshake
  },
  {
    title: "Transparent reporting",
    description:
      "Impact dashboards help donors understand how support moves from campaign to outcome.",
    icon: ShieldCheck
  }
] as const;

export const sponsorBenefits = [
  {
    title: "Sponsor one student milestone",
    description:
      "Support a verified education need such as admission fee, exam fee, hostel stay, or learning kit.",
    icon: GraduationCap
  },
  {
    title: "Track program-level impact",
    description:
      "See how assistance flows across education, hostel, sponsorship, and volunteer programs.",
    icon: Users
  },
  {
    title: "Build long-term trust",
    description:
      "Create repeatable giving with clean records, transparent campaign tracking, and future receipts.",
    icon: ShieldCheck
  }
] as const;

export const testimonials = [
  {
    quote:
      "Support at the right time can change whether a student continues education or drops out.",
    name: "Program Volunteer",
    role: "Student verification support"
  },
  {
    quote:
      "Transparent updates make donors feel connected to the real outcome behind every contribution.",
    name: "Donor Community Member",
    role: "Education assistance supporter"
  },
  {
    quote:
      "Hostel support is not just accommodation. It gives stability, safety, and time to study.",
    name: "Student Support Team",
    role: "Hostel program coordination"
  }
] as const;