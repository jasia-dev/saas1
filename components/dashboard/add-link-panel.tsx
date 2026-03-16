"use client";

import { useState } from "react";

import { AddLinkForm } from "@/components/dashboard/add-link-form";

export function AddLinkPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="rounded-[2rem] border border-[#e4e7eb] bg-white p-6 shadow-[0_12px_40px_rgba(17,17,17,0.04)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6d7480]">Quick action</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">
            Add a new link
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#616975]">
            Keep creation lightweight and open the editor only when you are ready to save a new reference.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#111111] px-6 text-sm font-semibold text-white transition hover:bg-[#23262d]"
        >
          {isOpen ? "Close form" : "New link"}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-6 border-t border-[#eef1f4] pt-6">
          <AddLinkForm />
        </div>
      ) : null}
    </section>
  );
}
