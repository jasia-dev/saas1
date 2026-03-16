function SkeletonCard() {
  return (
    <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(28,25,23,0.05)]">
      <div className="h-4 w-24 animate-pulse rounded bg-stone-200" />
      <div className="mt-4 h-10 w-20 animate-pulse rounded bg-stone-200" />
      <div className="mt-4 h-4 w-40 animate-pulse rounded bg-stone-100" />
    </div>
  );
}

function SkeletonLink() {
  return (
    <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(28,25,23,0.05)]">
      <div className="h-6 w-56 animate-pulse rounded bg-stone-200" />
      <div className="mt-3 h-4 w-full animate-pulse rounded bg-stone-100" />
      <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-stone-100" />
      <div className="mt-5 flex gap-2">
        <div className="h-7 w-20 animate-pulse rounded-full bg-amber-100" />
        <div className="h-7 w-24 animate-pulse rounded-full bg-amber-100" />
      </div>
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f5f5f4_0%,_#fafaf9_32%,_#fff_100%)] px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_18px_60px_rgba(28,25,23,0.08)]">
          <div className="h-5 w-28 animate-pulse rounded bg-amber-100" />
          <div className="mt-4 h-10 w-64 animate-pulse rounded bg-stone-200" />
          <div className="mt-4 h-4 w-3/5 animate-pulse rounded bg-stone-100" />
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </section>

        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(28,25,23,0.06)]">
          <div className="h-10 w-40 animate-pulse rounded bg-stone-200" />
        </div>

        <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(28,25,23,0.05)]">
          <div className="h-12 w-full animate-pulse rounded-full bg-stone-100" />
        </div>

        <div className="grid gap-4">
          <SkeletonLink />
          <SkeletonLink />
          <SkeletonLink />
        </div>
      </div>
    </main>
  );
}
