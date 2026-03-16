"use client";

import { useState, useTransition } from "react";

import { createLinkAction, updateLinkAction } from "@/lib/links/actions";
import { parseTagList } from "@/lib/tags";

type LinkEditorProps = {
  mode: "create" | "edit";
  initialValues?: {
    id?: string;
    url?: string;
    title?: string;
    description?: string | null;
    notes?: string | null;
    tags?: string[];
  };
  submitLabel: string;
  compact?: boolean;
};

export function LinkEditor({
  mode,
  initialValues,
  submitLabel,
  compact = false,
}: LinkEditorProps) {
  const [tags, setTags] = useState((initialValues?.tags ?? []).join(", "));
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const action = mode === "create" ? createLinkAction : updateLinkAction;

  async function handleRecommendTags(formData: FormData) {
    setAiMessage(null);

    startTransition(async () => {
      const response = await fetch("/api/ai/recommend-tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: String(formData.get("url") ?? ""),
          title: String(formData.get("title") ?? ""),
          description: String(formData.get("description") ?? ""),
          notes: String(formData.get("notes") ?? ""),
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { tags?: string[]; error?: string }
        | null;

      if (!response.ok || !payload?.tags) {
        setAiMessage(payload?.error ?? "Could not recommend tags.");
        return;
      }

      const mergedTags = parseTagList([...parseTagList(tags), ...payload.tags].join(","));
      setTags(mergedTags.join(", "));
      setAiMessage("AI tags added.");
    });
  }

  return (
    <form action={action} className="grid gap-5">
      {mode === "edit" ? (
        <input type="hidden" name="id" value={initialValues?.id} />
      ) : null}

      <div className={`grid gap-5 ${compact ? "" : "md:grid-cols-2"}`}>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          URL
          <input
            name="url"
            type="url"
            defaultValue={initialValues?.url ?? ""}
            placeholder="https://example.com/article"
            required
            className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-500"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Title
          <input
            name="title"
            type="text"
            defaultValue={initialValues?.title ?? ""}
            placeholder="Interesting article about product design"
            required
            className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-500"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium text-stone-700">
        Description
        <textarea
          name="description"
          rows={3}
          defaultValue={initialValues?.description ?? ""}
          placeholder="Short summary or context"
          className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-500"
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-stone-700">
        Notes
        <textarea
          name="notes"
          rows={4}
          defaultValue={initialValues?.notes ?? ""}
          placeholder="Why do you want to keep this link?"
          className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-500"
        />
      </label>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-stone-700" htmlFor={`${mode}-tags`}>
          Tags
        </label>
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            id={`${mode}-tags`}
            name="tags"
            type="text"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="design, product, inspiration"
            className="min-w-0 flex-1 rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-500"
          />
          <button
            type="button"
            disabled={isPending}
            onClick={(event) => {
              const form = event.currentTarget.form;

              if (!form) {
                return;
              }

              handleRecommendTags(new FormData(form));
            }}
            className="inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Thinking..." : "Recommend tags"}
          </button>
        </div>
        <p className="text-xs leading-5 text-stone-500">
          Separate tags with commas. AI suggestions are merged into the current list.
        </p>
        {aiMessage ? <p className="text-sm text-stone-600">{aiMessage}</p> : null}
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs leading-5 text-stone-500">
          Title is required for now. Metadata scraping can be added later.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
