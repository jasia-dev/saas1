type TagFilterBarProps = {
  tags: Array<{
    name: string;
    count: number;
  }>;
  activeTag?: string;
};

export function TagFilterBar({ tags, activeTag }: TagFilterBarProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[1.75rem] border border-[#f0dfb9] bg-white p-5 shadow-[0_18px_50px_rgba(222,163,58,0.06)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b06f00]">Tag filter</p>
          <p className="mt-1 text-sm text-stone-500">
            Narrow the list to the topics you use most.
          </p>
        </div>
        {activeTag ? (
          <a
            href="/dashboard"
            className="text-sm font-semibold text-stone-700 transition hover:text-stone-950"
          >
            Clear tag filter
          </a>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => {
          const href = `/dashboard?tag=${encodeURIComponent(tag.name)}`;
          const isActive = activeTag === tag.name;

          return (
            <a
              key={tag.name}
              href={href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-[#ffb800] text-stone-950"
                  : "border border-[#f1d48a] bg-[#fff6dc] text-[#9a6800] hover:bg-[#ffefbf]"
              }`}
            >
              #{tag.name} ({tag.count})
            </a>
          );
        })}
      </div>
    </section>
  );
}
