type EmptyStateProps = {
  hasQuery: boolean;
};

export function EmptyState({ hasQuery }: EmptyStateProps) {
  return (
    <section className="rounded-[2rem] border border-dashed border-[#f0d89b] bg-[linear-gradient(180deg,_#fffef9_0%,_#fff6df_100%)] p-10 text-center shadow-[0_18px_50px_rgba(222,163,58,0.05)]">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[#ffefbf] text-4xl shadow-inner">
        {hasQuery ? "?" : "+"}
      </div>
      <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#b06f00]">
        {hasQuery ? "No matching links" : "아직 저장한 링크가 없습니다"}
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">
        {hasQuery ? "Try a different keyword or tag" : "Save your first resource"}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-600">
        {hasQuery
          ? "Search checks your titles, descriptions, notes, and tags. Clear the filters or try another phrase."
          : "Start with one useful URL. Once you save links here, search, tags, and AI suggestions will become much more useful."}
      </p>
      {!hasQuery ? (
        <p className="mt-4 text-sm text-stone-500">Use the New link button to begin.</p>
      ) : null}
    </section>
  );
}
