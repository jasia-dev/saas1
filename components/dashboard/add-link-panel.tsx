"use client";

import { useState } from "react";

import { AddLinkForm } from "@/components/dashboard/add-link-form";

export function AddLinkPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[#f0dfb9] bg-[linear-gradient(135deg,_#fffef7_0%,_#fff4d6_100%)] p-6 shadow-[0_20px_60px_rgba(222,163,58,0.08)]">
      <div className="absolute -left-6 top-10 h-20 w-20 rounded-full bg-[#ffd24f]/30 blur-2xl" />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b06f00]">Quick action</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">
            Add a new link
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
            Keep the dashboard focused on discovery, then open the editor only when you want to save something new.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#ffb800] px-6 text-sm font-semibold text-stone-950 transition hover:-translate-y-0.5 hover:bg-[#f3b100]"
        >
          {isOpen ? "Close form" : "New link"}
        </button>
      </div>

      {isOpen ? (
        <div className="relative mt-6 border-t border-[#ebd39c] pt-6">
          <AddLinkForm />
        </div>
      ) : null}
    </section>
  );
}
