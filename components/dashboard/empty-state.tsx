type EmptyStateProps = {
  hasQuery: boolean;
};

export function EmptyState({ hasQuery }: EmptyStateProps) {
  return (
    <section className="rounded-[2rem] border border-dashed border-[#d8dde4] bg-white p-10 text-center shadow-[0_12px_40px_rgba(17,17,17,0.04)]">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-[#e7eaee] bg-[#f8f9fb] text-4xl text-[#23262d]">
        {hasQuery ? "?" : "+"}
      </div>
      <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#6d7480]">
        {hasQuery ? "No matching links" : "아직 저장한 링크가 없습니다"}
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">
        {hasQuery ? "Try a different keyword or tag" : "Save your first resource"}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#616975]">
        {hasQuery
          ? "Search checks your titles, descriptions, notes, and tags. Clear the filters or try another phrase."
          : "Start with one useful URL. Once you save links here, search, tags, and AI suggestions will become much more useful."}
      </p>
      {!hasQuery ? (
        <p className="mt-4 text-sm text-[#7a828f]">Use the New link button to begin.</p>
      ) : null}
    </section>
  );
}
