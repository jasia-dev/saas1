import { redirect } from "next/navigation";

import { AddLinkPanel } from "@/components/dashboard/add-link-panel";
import { DashboardToast } from "@/components/dashboard/dashboard-toast";
import { EmptyState } from "@/components/dashboard/empty-state";
import { LinkCard } from "@/components/dashboard/link-card";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { TagFilterBar } from "@/components/dashboard/tag-filter-bar";
import { signOutAction } from "@/lib/auth/actions";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type DashboardPageProps = {
  searchParams: Promise<{
    q?: string;
    tag?: string;
    status?: "success" | "error";
    message?: string;
  }>;
};

type LinkRecord = {
  id: string;
  url: string;
  title: string;
  description: string | null;
  notes: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
};

type LinkRow = Omit<LinkRecord, "tags">;

type LinkTagRow = {
  link_id: string;
  tag_id: string;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { q, tag, status, message } = await searchParams;
  const query = q?.trim() ?? "";
  const activeTag = tag?.trim() ?? "";

  if (!isSupabaseConfigured()) {
    redirect("/login?message=Add+Supabase+env+values+to+enable+the+dashboard.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: links, error }, { data: tags }, { data: linkTags }] = await Promise.all([
    supabase
    .from("links")
    .select("id, url, title, description, notes, created_at, updated_at")
      .order("created_at", { ascending: false }),
    supabase.from("tags").select("id, name").order("name"),
    supabase.from("link_tags").select("link_id, tag_id"),
  ]);

  const tagById = new Map((tags ?? []).map((tag) => [tag.id, tag.name]));
  const tagsByLinkId = new Map<string, string[]>();

  ((linkTags ?? []) as LinkTagRow[]).forEach((item) => {
    const tagName = tagById.get(item.tag_id);

    if (!tagName) {
      return;
    }

    const current = tagsByLinkId.get(item.link_id) ?? [];
    current.push(tagName);
    tagsByLinkId.set(item.link_id, current);
  });

  const allItems = ((links ?? []) as LinkRow[]).map((link) => ({
    ...link,
    tags: (tagsByLinkId.get(link.id) ?? []).sort((a, b) => a.localeCompare(b)),
  }));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tagCounts = new Map<string, number>();

  allItems.forEach((link) => {
    link.tags.forEach((name) => {
      tagCounts.set(name, (tagCounts.get(name) ?? 0) + 1);
    });
  });

  const topTags = Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 10);

  const linksAddedToday = allItems.filter(
    (link) => new Date(link.created_at) >= today,
  ).length;
  const frequentTagCount = Array.from(tagCounts.values()).filter(
    (count) => count >= 2,
  ).length;

  const items = allItems.filter((link) => {
    const matchesTag = activeTag ? link.tags.includes(activeTag) : true;

    if (!matchesTag) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [
      link.url,
      link.title,
      link.description ?? "",
      link.notes ?? "",
      link.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query.toLowerCase());
  });
  const hasError = Boolean(error);

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,_#fff5dc_0%,_#fff8eb_12%,_#fffdf8_32%,_#fff_100%)] px-4 py-6 md:px-6 md:py-8">
      <DashboardToast
        key={`${status ?? "none"}-${message ?? "none"}`}
        status={status}
        message={message}
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <header className="relative overflow-hidden rounded-[2rem] border border-[#f3d9a6] bg-[linear-gradient(135deg,_#fff4cb_0%,_#fff7dd_40%,_#ffffff_100%)] px-6 py-7 shadow-[0_24px_90px_rgba(215,134,28,0.14)] md:px-8 md:py-8">
          <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[#ffd869]/30 blur-2xl" />
          <div className="absolute bottom-0 right-10 h-24 w-24 rounded-full border border-[#f2ca71] bg-white/40" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="inline-flex rounded-full border border-[#f1cc74] bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#9f6a00]">
                Link dashboard
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">
              Welcome, {user.user_metadata.name ?? user.email}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 md:text-base">
                Save references like a curated board. Keep your best links visible, searchable, and ready for AI-assisted organization.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm">
                {allItems.length} saved
              </div>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[#efc870] bg-white px-5 text-sm font-semibold text-stone-700 transition hover:-translate-y-0.5 hover:bg-[#fff7e2]"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </header>

        <StatsOverview
          totalLinks={allItems.length}
          linksAddedToday={linksAddedToday}
          frequentTagCount={frequentTagCount}
        />

        <AddLinkPanel />

        <TagFilterBar tags={topTags} activeTag={activeTag || undefined} />

        <section className="flex flex-col gap-4">
          <div className="rounded-[2rem] border border-[#f0dfb9] bg-white p-6 shadow-[0_20px_60px_rgba(222,163,58,0.08)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-medium text-[#a66c00]">Saved links</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">
                  Your library
                </h2>
              </div>
              <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-center" method="get">
                {activeTag ? <input type="hidden" name="tag" value={activeTag} /> : null}
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Search title, description, notes, or tags"
                  className="min-w-0 flex-1 rounded-full border border-[#ead39d] bg-[#fffdf7] px-5 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-[#d89d22]"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#ffb800] px-6 text-sm font-semibold text-stone-950 transition hover:-translate-y-0.5 hover:bg-[#f3b100]"
                >
                  Search
                </button>
                {query || activeTag ? (
                  <a
                    href="/dashboard"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-[#ead39d] bg-white px-5 text-sm font-semibold text-stone-700 transition hover:bg-[#fff7e2]"
                  >
                    Clear
                  </a>
                ) : null}
              </form>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-stone-500">
              <span>Newest first</span>
              <span>
                {query || activeTag
                  ? `${items.length} matching result(s)`
                  : `${items.length} result(s)`}
              </span>
            </div>
            {activeTag ? (
              <div className="mt-4 inline-flex rounded-full border border-[#f2cf81] bg-[#fff5d6] px-4 py-2 text-sm font-medium text-[#9a6800]">
                Active tag: #{activeTag}
              </div>
            ) : null}
          </div>

          {hasError ? (
            <section className="rounded-[1.5rem] border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
              Could not load links: {error?.message}
            </section>
          ) : null}

          {!hasError && items.length === 0 ? (
            <EmptyState hasQuery={Boolean(query || activeTag)} />
          ) : null}

          {!hasError && items.length > 0
            ? items.map((link) => <LinkCard key={link.id} link={link} />)
            : null}
        </section>
      </div>
    </main>
  );
}
