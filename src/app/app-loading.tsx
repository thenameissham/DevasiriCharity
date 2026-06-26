import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="mt-4 h-12 w-72" />
          </div>
          <Skeleton className="h-11 w-32 rounded-[16px]" />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Skeleton className="h-64 rounded-[28px]" />
          <Skeleton className="h-64 rounded-[28px]" />
          <Skeleton className="h-64 rounded-[28px]" />
        </div>

        <Skeleton className="mt-5 h-96 rounded-[32px]" />
      </section>
    </main>
  );
}