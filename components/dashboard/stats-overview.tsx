type StatsOverviewProps = {
  totalLinks: number;
  linksAddedToday: number;
  frequentTagCount: number;
};

const stats = [
  {
    key: "totalLinks",
    label: "Total links",
    description: "Everything saved in your library",
  },
  {
    key: "linksAddedToday",
    label: "Added today",
    description: "Fresh captures from today",
  },
  {
    key: "frequentTagCount",
    label: "Frequent tags",
    description: "Tags used on 2 or more links",
  },
] as const;

export function StatsOverview({
  totalLinks,
  linksAddedToday,
  frequentTagCount,
}: StatsOverviewProps) {
  const values = {
    totalLinks,
    linksAddedToday,
    frequentTagCount,
  };

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <article
          key={stat.key}
          className="rounded-[1.75rem] border border-[#e4e7eb] bg-white px-5 py-4 shadow-[0_12px_40px_rgba(17,17,17,0.04)]"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6d7480]">
                {stat.label}
              </p>
              <p className="mt-1 truncate text-sm text-[#7a828f]">{stat.description}</p>
            </div>
            <p className="shrink-0 text-3xl font-semibold tracking-tight text-[#111111] md:text-4xl">
              {values[stat.key]}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
