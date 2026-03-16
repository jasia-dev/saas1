"use client";

import { useEffect } from "react";

import { LinkEditor } from "@/components/dashboard/link-editor";

type LinkEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  link: {
    id: string;
    url: string;
    title: string;
    description: string | null;
    notes: string | null;
    tags: string[];
  };
};

export function LinkEditModal({ isOpen, onClose, link }: LinkEditModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6 backdrop-blur-[2px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-2xl rounded-[2rem] border border-[#e4e7eb] bg-white shadow-[0_24px_80px_rgba(17,17,17,0.16)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`edit-link-${link.id}`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#eef1f4] px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6d7480]">
              Link editor
            </p>
            <h2 id={`edit-link-${link.id}`} className="mt-2 text-2xl font-semibold tracking-tight text-[#111111]">
              Edit link
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 items-center justify-center rounded-full border border-[#dde2e8] bg-[#f8f9fb] px-4 text-sm font-semibold text-[#23262d] transition hover:border-[#cfd5dd] hover:bg-white"
          >
            Close
          </button>
        </div>

        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto px-6 py-5">
          <LinkEditor
            mode="edit"
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
  );
}
