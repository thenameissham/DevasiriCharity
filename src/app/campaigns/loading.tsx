export default function CampaignsLoading() {
  return (
    <main className="min-h-screen bg-[#f7fbff] px-6 pb-20 pt-32 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <div className="h-8 w-72 animate-pulse rounded-full bg-blue-100" />
        <div className="mt-6 h-20 max-w-3xl animate-pulse rounded-[28px] bg-slate-100" />
        <div className="mt-5 h-16 max-w-2xl animate-pulse rounded-[24px] bg-slate-100" />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-[28px] bg-white shadow-sm"
            />
          ))}
        </div>

        <div className="mt-10 h-20 animate-pulse rounded-[32px] bg-white shadow-sm" />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[520px] animate-pulse rounded-[34px] bg-white shadow-sm"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
