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
    <section className="rounded-[1.75rem] border border-[#e4e7eb] bg-white p-5 shadow-[0_12px_40px_rgba(17,17,17,0.04)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6d7480]">Tag filter</p>
          <p className="mt-1 text-sm text-[#7a828f]">
            Narrow the list to the topics you use most.
          </p>
        </div>
        {activeTag ? (
          <a
            href="/dashboard"
            className="text-sm font-semibold text-[#23262d] transition hover:text-[#111111]"
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
                  ? "bg-[#111111] text-white"
                  : "border border-[#dde2e8] bg-[#f8f9fb] text-[#23262d] hover:border-[#cfd5dd] hover:bg-white"
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
