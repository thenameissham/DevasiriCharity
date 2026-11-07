import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, ShieldCheck } from "lucide-react";

const programLinks = [
  { label: "Education assistance", href: "/#programs" },
  { label: "Scholarship support", href: "/apply" },
  { label: "Hostel continuity", href: "/#programs" },
  { label: "Volunteer guidance", href: "/volunteer" },
] as const;

const platformLinks = [
  { label: "Campaigns", href: "/campaigns" },
  { label: "Impact", href: "/#impact" },
  { label: "Student support", href: "/apply" },
  { label: "Sign in", href: "/login" },
] as const;

const linkClass =
  "rounded-sm text-sm text-[#59636e] transition-colors hover:text-[#1f2328] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f883d]";

export function Footer() {
  return (
    <footer className="border-t border-[#d1d9e0] bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" className="inline-flex items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f883d]">
              <Image
                src="/brand/devasiri-logo.png"
                alt="Devasiri Charitable Trust"
                width={176}
                height={56}
                className="h-10 w-auto object-contain object-left"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#59636e]">
              Connecting education support, student continuity, and community action with care and accountability.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#59636e]">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#1f883d]" />
              Education support with accountable action
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#1f2328]">Programs</h2>
            <ul className="mt-3 space-y-2.5">
              {programLinks.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className={linkClass}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#1f2328]">Explore</h2>
            <ul className="mt-3 space-y-2.5">
              {platformLinks.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className={linkClass}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#1f2328]">Contact</h2>
            <div className="mt-3 space-y-3 text-sm text-[#59636e]">
              <p className="flex items-start gap-2.5 leading-6">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#59636e]" />
                Gangavathi, Karnataka, India
              </p>
              <a
                href="mailto:official@devasiri.org"
                className="inline-flex items-center gap-2.5 rounded-sm hover:text-[#1f2328] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f883d]"
              >
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                official@devasiri.org
              </a>
              <Link href="/login" className={linkClass}>Access the secure portal</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[#d8dee4] pt-5 text-xs text-[#59636e] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Devasiri Charitable Trust.</p>
          <p>Supporting dignity, continuity, and opportunity.</p>
        </div>
      </div>
    </footer>
  );
}
