"use client";

import Link from "next/link";
import { useState } from "react";

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
  const [isEditing, setIsEditing] = useState(false);

  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-[#e4e7eb] bg-white p-5 shadow-[0_10px_30px_rgba(17,17,17,0.03)] transition hover:border-[#d5dae1] hover:shadow-[0_18px_50px_rgba(17,17,17,0.05)]">
      <div className="flex flex-1 flex-col gap-4">
        <div className="space-y-2">
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="line-clamp-2 text-lg font-semibold tracking-tight text-[#111111] transition hover:text-[#444b55]"
          >
            {link.title}
          </a>
          <p className="truncate text-sm text-[#7a828f]">{link.url}</p>
        </div>

        {link.description ? (
          <p className="line-clamp-2 text-sm leading-6 text-[#4d5560]">{link.description}</p>
        ) : null}

        <div className="mt-auto space-y-3">
          {link.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {link.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/dashboard?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-[#dde2e8] bg-[#f8f9fb] px-3 py-1 text-xs font-medium text-[#23262d] transition hover:border-[#cfd5dd] hover:bg-white"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          ) : null}

          <div className="text-xs text-[#7a828f]">
            <p>Created {formatDate(link.created_at)}</p>
            <p className="mt-1">Updated {formatDate(link.updated_at)}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsEditing((current) => !current)}
          className="inline-flex h-10 items-center justify-center rounded-full border border-[#dde2e8] bg-[#f8f9fb] px-4 text-sm font-semibold text-[#23262d] transition hover:border-[#cfd5dd] hover:bg-white"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>

        {!isEditing ? (
          <form action={deleteLinkAction} className="shrink-0">
            <input type="hidden" name="id" value={link.id} />
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-full border border-[#e5d7d7] bg-[#fbf7f7] px-4 text-sm font-semibold text-[#7d4444] transition hover:border-[#d9c8c8] hover:bg-white"
            >
              Delete
            </button>
          </form>
        ) : null}
      </div>

      <div
        className={`grid overflow-hidden transition-all duration-200 ease-out ${
          isEditing
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
        >
        <div className="min-h-0">
          <div className="w-full rounded-2xl border border-[#e7eaee] bg-[#fafbfc] p-4 transition-opacity duration-200 ease-out">
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
        </div>
      </div>
    </article>
  );
}
