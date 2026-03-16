function SkeletonCard() {
  return (
    <div className="rounded-[1.75rem] border border-[#e4e7eb] bg-white px-5 py-4 shadow-[0_12px_40px_rgba(17,17,17,0.04)]">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="h-3 w-24 animate-pulse rounded bg-[#dfe3e8]" />
          <div className="mt-2 h-4 w-40 animate-pulse rounded bg-[#edf0f3]" />
        </div>
        <div className="h-10 w-12 animate-pulse rounded bg-[#dfe3e8]" />
      </div>
    </div>
  );
}

function SkeletonLink() {
  return (
    <div className="rounded-[1.75rem] border border-[#e4e7eb] bg-white p-5 shadow-[0_10px_30px_rgba(17,17,17,0.03)]">
      <div className="h-6 w-3/4 animate-pulse rounded bg-[#dfe3e8]" />
      <div className="mt-3 h-4 w-full animate-pulse rounded bg-[#edf0f3]" />
      <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-[#edf0f3]" />
      <div className="mt-5 flex gap-2">
        <div className="h-7 w-20 animate-pulse rounded-full bg-[#edf0f3]" />
        <div className="h-7 w-24 animate-pulse rounded-full bg-[#edf0f3]" />
      </div>
      <div className="mt-4 h-8 w-20 animate-pulse rounded-full bg-[#edf0f3]" />
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-[#f6f7f8] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <div className="rounded-[2rem] border border-[#e4e7eb] bg-white px-6 py-6 shadow-[0_12px_40px_rgba(17,17,17,0.04)] md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="h-7 w-28 animate-pulse rounded-full bg-[#edf0f3]" />
              <div className="mt-4 h-10 w-72 animate-pulse rounded bg-[#dfe3e8]" />
              <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded bg-[#edf0f3]" />
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-24 animate-pulse rounded-full bg-[#edf0f3]" />
              <div className="h-11 w-24 animate-pulse rounded-full bg-[#edf0f3]" />
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </section>

        <div className="rounded-[2rem] border border-[#e4e7eb] bg-white p-6 shadow-[0_12px_40px_rgba(17,17,17,0.04)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="h-3 w-24 animate-pulse rounded bg-[#dfe3e8]" />
              <div className="mt-3 h-8 w-48 animate-pulse rounded bg-[#edf0f3]" />
            </div>
            <div className="h-12 w-24 animate-pulse rounded-full bg-[#dfe3e8]" />
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[#e4e7eb] bg-white p-5 shadow-[0_12px_40px_rgba(17,17,17,0.04)]">
          <div className="h-4 w-20 animate-pulse rounded bg-[#dfe3e8]" />
          <div className="mt-4 h-10 w-full animate-pulse rounded-full bg-[#edf0f3]" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <SkeletonLink />
          <SkeletonLink />
          <SkeletonLink />
        </div>
      </div>
    </main>
  );
}
