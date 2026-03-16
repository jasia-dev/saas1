import { LinkEditor } from "@/components/dashboard/link-editor";

export function AddLinkForm() {
  return (
    <section className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6 shadow-[0_14px_40px_rgba(28,25,23,0.04)]">
      <div className="space-y-2">
        <p className="text-sm font-medium text-amber-700">Add a link</p>
        <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
          Save something useful
        </h2>
        <p className="text-sm leading-6 text-stone-600">
          Start with the core CRUD flow. Tags and search can build on top of this data.
        </p>
      </div>

      <div className="mt-8">
        <LinkEditor mode="create" submitLabel="Save link" />
      </div>
    </section>
  );
}
