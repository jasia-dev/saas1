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
          className="relative overflow-hidden rounded-[1.75rem] border border-[#f0dfb9] bg-[linear-gradient(180deg,_#fffdfa_0%,_#fff4d8_100%)] p-6 shadow-[0_20px_60px_rgba(222,163,58,0.08)]"
        >
          <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-[#ffd86f]/40 blur-xl" />
          <p className="relative text-sm font-semibold uppercase tracking-[0.18em] text-[#b06f00]">
            {stat.label}
          </p>
          <p className="relative mt-4 text-4xl font-semibold tracking-tight text-stone-950 md:text-5xl">
            {values[stat.key]}
          </p>
          <p className="relative mt-3 text-sm leading-6 text-stone-600">{stat.description}</p>
        </article>
      ))}
    </section>
  );
}
