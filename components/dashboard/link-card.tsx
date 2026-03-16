import { LinkEditor } from "@/components/dashboard/link-editor";
import { deleteLinkAction } from "@/lib/links/actions";

type LinkCardProps = {
  link: {
    id: string;
    url: string;
    title: string;
    description: string | null;
    notes: string | null;
    tags: string[];
    created_at: string;
    updated_at: string;
  };
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function LinkCard({ link }: LinkCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-[#f0dfb9] bg-white p-6 shadow-[0_20px_60px_rgba(222,163,58,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(222,163,58,0.12)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div className="space-y-2">
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-xl font-semibold tracking-tight text-stone-950 transition hover:text-[#d08900]"
            >
              {link.title}
            </a>
            <p className="break-all text-sm text-stone-500">{link.url}</p>
          </div>

          {link.description ? (
            <p className="text-sm leading-6 text-stone-700">{link.description}</p>
          ) : null}

          {link.notes ? (
            <div className="rounded-2xl bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-600">
              {link.notes}
            </div>
          ) : null}

          {link.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {link.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/dashboard?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-[#f1d48a] bg-[#fff6dc] px-3 py-1 text-xs font-medium text-[#9a6800] transition hover:bg-[#ffefbf]"
                >
                  #{tag}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="shrink-0 text-xs text-stone-500">
          <p>Created {formatDate(link.created_at)}</p>
          <p className="mt-1">Updated {formatDate(link.updated_at)}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <details className="group w-full rounded-2xl border border-[#f0dfb9] bg-[#fffaf0] p-4">
          <summary className="inline-flex h-12 min-w-[110px] cursor-pointer list-none items-center justify-center rounded-full border border-[#ead39d] bg-white px-5 text-sm font-semibold text-stone-700 transition hover:bg-[#fff7e2] [&::-webkit-details-marker]:hidden">
            Edit link
          </summary>

          <div className="mt-4">
            <LinkEditor
              mode="edit"
              compact
              submitLabel="Save changes"
              initialValues={{
                id: link.id,
                url: link.url,
                title: link.title,
                description: link.description,
                notes: link.notes,
                tags: link.tags,
              }}
            />
          </div>
        </details>

        <form action={deleteLinkAction}>
          <input type="hidden" name="id" value={link.id} />
          <button
            type="submit"
            className="inline-flex h-12 min-w-[110px] items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-5 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
          >
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}
