import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  Check,
  CircleCheckBig,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow
} from "lucide-react";
import {
  formatINRFromPaise,
  getCampaignProgress,
  getFeaturedCampaigns,
  type PublicCampaign
} from "@/features/campaigns/campaign.queries";
import {
  formatINRCompactFromPaise,
  getPlatformImpactSummary,
  type PlatformImpactSummary
} from "@/features/impact/impact.queries";
import styles from "./premium-home-page.module.css";
import { ImpactPathway } from "@/components/landing/impact-pathway";

const fallbackImpact: PlatformImpactSummary = {
  totalRaisedPaise: 0,
  successfulDonationCount: 0,
  activeCampaignCount: 0,
  studentRecordCount: 0,
  volunteerRecordCount: 0
};

const programs = [
  {
    icon: BookOpenCheck,
    title: "Education assistance",
    description:
      "We help eligible students continue their studies through needs-led educational support."
  },
  {
    icon: Building2,
    title: "Hostel continuity",
    description:
      "We support accommodation-related needs that can otherwise interrupt a student’s education."
  },
  {
    icon: GraduationCap,
    title: "Scholarship pathways",
    description:
      "We connect applications, human review, transparent records, and responsible support decisions."
  },
  {
    icon: HandHeart,
    title: "Volunteer guidance",
    description:
      "Volunteers strengthen follow-up, mentorship, verification, and student communication."
  }
] as const;

const pathway = [
  {
    step: "01",
    title: "Apply",
    description:
      "Students submit their need through a structured application journey."
  },
  {
    step: "02",
    title: "Review",
    description:
      "The trust evaluates the request and supporting details through human review."
  },
  {
    step: "03",
    title: "Support",
    description:
      "Approved needs are connected to campaigns, sponsorship, or program assistance."
  },
  {
    step: "04",
    title: "Report",
    description:
      "Progress and contribution records remain visible through the platform."
  }
] as const;

const trustPoints = [
  "Human-reviewed student applications",
  "Campaign-level contribution visibility",
  "Role-based access for students, donors, volunteers, and administrators",
  "Audit-oriented operational records"
] as const;

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl"
      }
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-emerald-800 shadow-sm backdrop-blur-xl">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        {eyebrow}
      </div>

      <h2 className="mt-5 text-balance [font-family:ui-sans-serif,system-ui,sans-serif] text-4xl font-black tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function Metric({
  value,
  label
}: {
  readonly value: string;
  readonly label: string;
}) {
  return (
    <div className="rounded-[26px] border border-white/70 bg-white/70 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
      <p className="[font-family:ui-sans-serif,system-ui,sans-serif] text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-4xl">
        {value}
      </p>

      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
        {label}
      </p>
    </div>
  );
}

function CampaignCard({
  campaign
}: {
  readonly campaign: PublicCampaign;
}) {
  const progress = getCampaignProgress(
    campaign.raisedAmountPaise,
    campaign.goalAmountPaise
  );

  const backgroundImage = campaign.coverImageUrl
    ? `url(${JSON.stringify(campaign.coverImageUrl)})`
    : "url('/illustrations/campaign-education-support.png')";

  return (
    <article className="group overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/90 shadow-[0_24px_90px_rgba(15,23,42,0.09)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:shadow-[0_36px_120px_rgba(15,23,42,0.16)]">
      <div
        role="img"
        aria-label={campaign.title}
        className="relative h-56 overflow-hidden bg-[length:cover] bg-center transition duration-700 group-hover:scale-[1.035]"
        style={{ backgroundImage }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/5 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/50 bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-emerald-800 shadow-sm backdrop-blur-xl">
            {campaign.category}
          </span>

          {campaign.isFeatured ? (
            <span className="rounded-full border border-amber-200/70 bg-amber-50/95 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-amber-800 shadow-sm backdrop-blur-xl">
              Featured
            </span>
          ) : null}
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm font-bold text-white">
          <span>{campaign.donationCount} supporters</span>
          <span>{progress}% funded</span>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <h3 className="[font-family:ui-sans-serif,system-ui,sans-serif] text-2xl font-black tracking-[-0.04em] text-slate-950">
          {campaign.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
          {campaign.description}
        </p>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between gap-4 text-sm">
            <span className="font-bold text-slate-700">
              {formatINRFromPaise(campaign.raisedAmountPaise)} raised
            </span>

            <span className="font-semibold text-slate-500">
              Goal {formatINRFromPaise(campaign.goalAmountPaise)}
            </span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-400 transition-[width] duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link
          href={`/campaigns/${campaign.slug}`}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[18px] bg-slate-950 px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(15,23,42,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
        >
          View campaign
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export async function PremiumHomePage() {
  const [campaigns, impact] = await Promise.all([
    getFeaturedCampaigns(3),
    getPlatformImpactSummary().catch((error) => {
      console.error("Failed to load homepage impact summary", error);
      return fallbackImpact;
    })
  ]);

  return (
    <div className="overflow-x-clip bg-[#f7faf7] text-slate-950">
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[26px] border border-white/75 bg-white/78 px-3 py-2.5 shadow-[0_18px_70px_rgba(15,23,42,0.1)] backdrop-blur-2xl sm:px-5">
          <Link
            href="/"
            aria-label="Devasiri home"
            className="flex items-center gap-3"
          >
            <Image
              src="/brand/devasiri-logo.png"
              alt="Devasiri Charitable Trust"
              width={220}
              height={70}
              priority
              className="h-10 w-auto object-contain sm:h-12"
            />
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-white/70 p-1.5 lg:flex">
            {[
              ["Who we are", "#about"],
              ["How it works", "#pathway"],
              ["Campaigns", "#campaigns"],
              ["Volunteer", "#volunteer"]
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden h-11 items-center justify-center rounded-[17px] border border-slate-200 bg-white px-4 text-sm font-black text-slate-800 transition hover:bg-slate-50 sm:inline-flex"
            >
              Portal login
            </Link>

            <Link
              href="/apply"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[17px] bg-emerald-800 px-4 text-sm font-black text-white shadow-[0_14px_40px_rgba(6,95,70,0.22)] transition hover:-translate-y-0.5 hover:bg-emerald-900 sm:px-5"
            >
              Apply now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section
          className={`${styles.hero} relative isolate min-h-[820px] overflow-hidden px-6 pb-20 pt-36 sm:px-8 sm:pt-40 lg:px-12 lg:pt-44`}
        >
          <div aria-hidden="true" className={styles.grid} />
          <div aria-hidden="true" className={styles.orbA} />
          <div aria-hidden="true" className={styles.orbB} />
          <div aria-hidden="true" className={styles.ribbon} />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div className={styles.reveal}>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/72 px-3.5 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-800 shadow-sm backdrop-blur-xl">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Education support with accountable action
              </div>

              <h1 className="mt-7 max-w-5xl text-balance [font-family:ui-sans-serif,system-ui,sans-serif] text-5xl font-black leading-[0.96] tracking-[-0.07em] text-slate-950 sm:text-6xl lg:text-[78px]">
                Every student deserves the chance to keep learning.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
                Devasiri Charitable Trust connects verified student needs with
                education assistance, hostel support, sponsorship,
                volunteering, and transparent digital records.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/apply"
                  className={`${styles.shine} inline-flex h-14 items-center justify-center gap-2 rounded-[20px] bg-emerald-800 px-7 text-base font-black text-white shadow-[0_22px_65px_rgba(6,95,70,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-emerald-900`}
                >
                  Check student eligibility
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>

                <Link
                  href="/campaigns"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-[20px] border border-slate-200/90 bg-white/75 px-7 text-base font-black text-slate-900 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  Explore campaigns
                  <HeartHandshake
                    className="h-5 w-5 text-amber-600"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {[
                  "Human reviewed",
                  "Role-based access",
                  "Visible progress"
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-[18px] border border-white/75 bg-white/62 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-xl"
                  >
                    <CircleCheckBig
                      className="h-4 w-4 shrink-0 text-emerald-700"
                      aria-hidden="true"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`${styles.revealDelayed} relative mx-auto w-full max-w-[590px]`}
            >
              <div
                className={`${styles.floatCard} relative rounded-[38px] border border-white/80 bg-white/72 p-4 shadow-[0_45px_140px_rgba(15,23,42,0.17)] backdrop-blur-2xl sm:p-6`}
              >
                <div className="overflow-hidden rounded-[30px] bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-5 sm:p-8">
                  <Image
                    src="/illustrations/student-scholarship-hero.png"
                    alt="Student education support through Devasiri"
                    width={900}
                    height={700}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </div>

                <div className="absolute -bottom-6 -left-5 rounded-[24px] border border-white/80 bg-slate-950 p-4 text-white shadow-[0_24px_70px_rgba(15,23,42,0.28)] sm:-left-8 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-emerald-500/15 text-emerald-300">
                      <ShieldCheck
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                        Trust pathway
                      </p>

                      <p className="mt-1 font-black">
                        Apply → Review → Support
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 top-8 rounded-[22px] border border-amber-200/70 bg-amber-50/95 p-4 shadow-[0_18px_60px_rgba(146,96,12,0.14)] backdrop-blur-xl sm:-right-8">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-800">
                    Built for continuity
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    Education • Hostel • Guidance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="impact"
          className="relative -mt-12 px-6 pb-24 sm:px-8 lg:px-12"
        >
          <div className="mx-auto grid max-w-7xl gap-4 rounded-[34px] border border-white/80 bg-white/70 p-4 shadow-[0_30px_100px_rgba(15,23,42,0.11)] backdrop-blur-2xl sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
            <Metric
              value={formatINRCompactFromPaise(impact.totalRaisedPaise)}
              label="Recorded successful support"
            />

            <Metric
              value={String(impact.successfulDonationCount)}
              label="Successful contribution records"
            />

            <Metric
              value={String(impact.activeCampaignCount)}
              label="Active education campaigns"
            />

            <Metric
              value={String(impact.studentRecordCount)}
              label="Student records on the platform"
            />
          </div>
        </section>

        <section
          id="about"
          className="relative px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <SectionHeading
                eyebrow="Who we are"
                title="A digital trust platform built around student continuity."
                description="Devasiri brings charitable operations, student applications, donor participation, volunteer support, and administrative accountability into one structured platform."
              />

              <div className="rounded-[32px] border border-emerald-900/10 bg-slate-950 p-7 text-white shadow-[0_32px_100px_rgba(15,23,42,0.18)] sm:p-9">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
                  Our promise
                </p>

                <p className="mt-4 [font-family:ui-sans-serif,system-ui,sans-serif] text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
                  Support should be compassionate, structured, and visible.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {trustPoints.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-[20px] bg-white/7 p-4 ring-1 ring-white/10"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
                        aria-hidden="true"
                      />

                      <span className="text-sm leading-6 text-slate-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {programs.map((program, index) => {
                const Icon = program.icon;

                return (
                  <article
                    key={program.title}
                    className={`${styles.programCard} rounded-[30px] border border-slate-200/80 bg-white/85 p-7 shadow-[0_24px_80px_rgba(15,23,42,0.07)] backdrop-blur-xl`}
                    style={{ animationDelay: `${index * 130}ms` }}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>

                    <h3 className="mt-6 [font-family:ui-sans-serif,system-ui,sans-serif] text-2xl font-black tracking-[-0.035em] text-slate-950">
                      {program.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {program.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <ImpactPathway />

        <section
          id="campaigns"
          className="px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Featured campaigns"
                title="Support a current education need."
                description="Featured campaigns are loaded from the platform database and remain connected to contribution and progress records."
              />

              <Link
                href="/campaigns"
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[18px] border border-slate-200 bg-white px-5 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                View all campaigns
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {campaigns.length > 0 ? (
              <div className="mt-12 grid gap-6 lg:grid-cols-3">
                {campaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-[34px] border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-sm backdrop-blur-xl">
                <HeartHandshake
                  className="mx-auto h-10 w-10 text-emerald-700"
                  aria-hidden="true"
                />

                <h3 className="mt-5 [font-family:ui-sans-serif,system-ui,sans-serif] text-3xl font-black tracking-[-0.04em] text-slate-950">
                  Campaigns will appear here automatically.
                </h3>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Once an active campaign is marked as featured from the admin
                  dashboard, it will be displayed in this section.
                </p>
              </div>
            )}
          </div>
        </section>

        <section
          id="volunteer"
          className="px-6 pb-24 sm:px-8 lg:px-12 lg:pb-32"
        >
          <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[40px] border border-emerald-900/10 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 p-8 text-white shadow-[0_40px_130px_rgba(6,95,70,0.24)] sm:p-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:p-16">
            <div aria-hidden="true" className={styles.ctaGlow} />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-emerald-100 ring-1 ring-white/15">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Participate in the mission
              </div>

              <h2 className="mt-5 text-balance [font-family:ui-sans-serif,system-ui,sans-serif] text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                Students, supporters, and volunteers belong in one trusted
                journey.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-emerald-50/85 sm:text-lg">
                Apply for assistance, support a verified campaign, or
                contribute time and guidance through Devasiri’s growing
                platform.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/apply"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-[18px] bg-white px-6 text-sm font-black text-emerald-900 shadow-lg transition hover:-translate-y-0.5"
                >
                  Apply for support
                  <GraduationCap
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href="/volunteer"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-[18px] border border-white/20 bg-white/10 px-6 text-sm font-black text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Join as volunteer
                  <Workflow className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="relative mt-10 lg:mt-0">
              <Image
                src="/illustrations/volunteer-student-support.png"
                alt="Volunteer supporting a student"
                width={800}
                height={620}
                className="mx-auto h-auto w-full max-w-[520px] object-contain drop-shadow-[0_30px_50px_rgba(2,44,34,0.35)]"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/80 px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Image
              src="/brand/devasiri-logo.png"
              alt="Devasiri Charitable Trust"
              width={220}
              height={70}
              className="h-12 w-auto object-contain"
            />

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
              A charitable technology platform for education assistance,
              student support, volunteering, and transparent operational
              records.
            </p>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-950">
              Explore
            </p>

            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600">
              <Link
                href="/apply"
                className="w-fit hover:text-emerald-800"
              >
                Student application
              </Link>

              <Link
                href="/campaigns"
                className="w-fit hover:text-emerald-800"
              >
                Campaigns
              </Link>

              <Link
                href="/volunteer"
                className="w-fit hover:text-emerald-800"
              >
                Volunteer
              </Link>

              <Link
                href="/login"
                className="w-fit hover:text-emerald-800"
              >
                Portal login
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-950">
              Based in Karnataka
            </p>

            <div className="mt-4 flex gap-3 text-sm leading-7 text-slate-600">
              <MapPin
                className="mt-1 h-4 w-4 shrink-0 text-emerald-700"
                aria-hidden="true"
              />

              <span>Gangavathi, Karnataka, India</span>
            </div>

            <a
              href="mailto:official@devasiri.org"
              className="mt-3 inline-flex text-sm font-bold text-emerald-800 hover:text-emerald-900"
            >
              official@devasiri.org
            </a>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Devasiri Charitable Trust.
          </p>

          <p className="font-semibold text-slate-600">
            Education support with accountable action.
          </p>
        </div>
      </footer>
    </div>
  );
}
