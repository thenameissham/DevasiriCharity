import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { BrandBackground } from "@/components/landing/brand-background";
import { Button } from "@/components/ui/button";

const programLinks = [
  { label: "Education assistance", href: "/#programs" },
  { label: "Scholarship support", href: "/apply" },
  { label: "Hostel continuity", href: "/#programs" },
  { label: "Volunteer guidance", href: "/volunteer" },
] as const;

const platformLinks = [
  { label: "Verified campaigns", href: "/campaigns" },
  { label: "Impact dashboard", href: "/#impact" },
  { label: "Student application", href: "/apply" },
  { label: "Secure portal", href: "/login" },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-5 pb-8 pt-24 text-white sm:px-8 lg:px-12">
      <BrandBackground tone="dark" />

      <div className="relative mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_42px_120px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-9 lg:p-11">
          <div className="grid gap-9 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#9ce5d8]">
                <ShieldCheck className="h-4 w-4 text-[#e4b85e]" />
                Start with a clear next step
              </div>

              <h2 className="font-headline text-balance mt-5 max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-5xl">
                Help education continue—with dignity, verification, and visible accountability.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">
                Apply for support, explore a verified campaign, or contribute
                your time as a volunteer. Every journey connects to the same
                responsible support system.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button
                href="/apply"
                size="lg"
                className="group relative h-14 overflow-hidden rounded-full bg-[#e4b85e] px-7 text-[#11282a] hover:bg-[#efc978]"
              >
                <span className="absolute -left-10 top-0 h-full w-10 rotate-[16deg] bg-white/25 blur-md transition-all duration-700 group-hover:left-[120%]" />
                <span className="relative inline-flex items-center gap-2">
                  Check eligibility
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Button>

              <Button
                href="/campaigns"
                variant="secondary"
                size="lg"
                className="h-14 rounded-full border-white/15 bg-white/10 px-7 text-white hover:bg-white/14"
              >
                Explore campaigns
                <HeartHandshake className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="mt-10 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.9fr]">
            <div>
              <Image
                src="/brand/devasiri-logo.png"
                alt="Devasiri Charitable Trust"
                width={220}
                height={70}
                className="h-12 w-auto object-contain brightness-[1.22]"
              />

              <p className="mt-5 max-w-md text-sm leading-7 text-white/62">
                Devasiri is a charitable technology platform for education
                assistance, student continuity, volunteering, and transparent
                operational records.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#9ce5d8]">
                <Sparkles className="h-3.5 w-3.5 text-[#e4b85e]" />
                Education support with accountable action
              </div>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/48">
                Programs
              </p>
              <div className="mt-5 grid gap-3">
                {programLinks.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className="footer-link-underline text-sm font-semibold text-white/70"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/48">
                Platform
              </p>
              <div className="mt-5 grid gap-3">
                {platformLinks.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className="footer-link-underline text-sm font-semibold text-white/70"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/48">
                Contact
              </p>

              <div className="mt-5 grid gap-4 text-sm text-white/70">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#9ce5d8]" />
                  <span>Gangavathi, Karnataka, India</span>
                </div>

                <a
                  href="mailto:official@devasiri.org"
                  className="footer-link-underline inline-flex items-center gap-3 text-sm font-semibold text-white/78"
                >
                  <Mail className="h-4 w-4 text-[#9ce5d8]" />
                  official@devasiri.org
                </a>

                <Link
                  href="/login"
                  className="footer-link-underline inline-flex w-fit text-sm font-semibold text-white/78"
                >
                  Access secure portal
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/48 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Devasiri Charitable Trust.</p>
            <p className="font-semibold text-white/62">
              Built to support dignity, continuity, and visibility.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
