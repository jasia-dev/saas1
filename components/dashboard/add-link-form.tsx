import { LinkEditor } from "@/components/dashboard/link-editor";

export function AddLinkForm() {
  return (
    <section className="rounded-[1.75rem] border border-[#e7eaee] bg-[#fafbfc] p-6 shadow-[0_10px_30px_rgba(17,17,17,0.03)]">
      <div className="space-y-2">
        <p className="text-sm font-medium text-[#6d7480]">Add a link</p>
        <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
          Save something useful
        </h2>
        <p className="text-sm leading-6 text-[#616975]">
          Capture the source, write a clean title, and keep enough context for future search.
        </p>
      </div>

      <div className="mt-8">
        <LinkEditor mode="create" submitLabel="Save link" />
      </div>
    </section>
  );
}
