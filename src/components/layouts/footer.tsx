import {
  ArrowUpRight,
  Globe,
  HeartHandshake,
  Mail,
  MapPin,
  Phone
} from "lucide-react";

const programLinks = [
  {
    label: "Education Assistance",
    href: "#campaigns"
  },
  {
    label: "Student Sponsorship",
    href: "#campaigns"
  },
  {
    label: "Hostel Support",
    href: "#campaigns"
  },
  {
    label: "Volunteer Programs",
    href: "#volunteer"
  },
  {
    label: "Transparency",
    href: "#impact"
  }
] as const;

const trustLinks = [
  {
    label: "Impact Stories",
    href: "#stories"
  },
  {
    label: "Donation Tiers",
    href: "#donate"
  },
  {
    label: "Live Metrics",
    href: "#impact"
  }
] as const;

const quickActions = [
  {
    label: "Visit website",
    href: "/",
    icon: Globe
  },
  {
    label: "Email Devasiri",
    href: "mailto:official@devasiri.org",
    icon: Mail
  },
  {
    label: "Explore campaigns",
    href: "#campaigns",
    icon: ArrowUpRight
  }
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white px-6 py-14 sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(37,99,235,0.08),transparent_28%),radial-gradient(circle_at_85%_0%,rgba(6,182,212,0.08),transparent_24%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.35fr_0.8fr_0.75fr_0.9fr]">
        <div>
          <a
            href="/"
            aria-label="Go to Devasiri home"
            className="inline-flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-slate-950 text-white shadow-[0_18px_45px_rgba(15,23,42,0.22)]">
              <HeartHandshake aria-hidden="true" className="h-5 w-5" />
            </span>

            <span>
              <span className="block text-2xl font-bold tracking-[-0.055em] text-slate-950">
                Devasiri
              </span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Charitable Trust
              </span>
            </span>
          </a>

          <p className="mt-5 max-w-md text-sm leading-6 text-slate-600">
            Helping underprivileged students through education assistance,
            hostel support, sponsorships, volunteering, and transparent public
            accountability.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 hover:shadow-md focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue-500"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4 transition duration-200 group-hover:scale-110"
                  />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-950">
            Programs
          </p>

          <nav aria-label="Footer program links" className="mt-5 grid gap-3">
            {programLinks.map((link) => (
              <a
                href={link.href}
                key={link.label}
                className="w-fit text-sm font-medium text-slate-600 transition duration-200 hover:translate-x-0.5 hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-950">
            Trust
          </p>

          <nav aria-label="Footer trust links" className="mt-5 grid gap-3">
            {trustLinks.map((link) => (
              <a
                href={link.href}
                key={link.label}
                className="w-fit text-sm font-medium text-slate-600 transition duration-200 hover:translate-x-0.5 hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-950">
            Contact
          </p>

          <address className="mt-5 grid gap-4 text-sm not-italic text-slate-600">
            <p className="flex gap-3">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
              />
              <span>Gangavathi, Karnataka, India</span>
            </p>

            <p className="flex gap-3">
              <Phone
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
              />
              <span>Official contact number will be updated soon</span>
            </p>

            <a
              href="mailto:official@devasiri.org"
              className="flex gap-3 transition duration-200 hover:text-green-600"
            >
              <Mail
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
              />
              <span>official@devasiri.org</span>
            </a>
          </address>
        </div>
      </div>

      <div className="relative mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Devasiri. All rights reserved.</p>
        <p className="font-medium text-slate-600">
          Powered By <span className="font-bold text-muted">Shambhulingappa, Software Engineer.</span>
        </p>
      </div>
    </footer>
  );
}