import { trustPillars } from "@/data/home";

export function TrustPillars() {
  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Platform Principles
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-slate-950">
            Designed for dignity, speed, and public accountability.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.title}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.1)]"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[18px] bg-slate-950 text-white">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-bold tracking-[-0.035em] text-slate-950">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}