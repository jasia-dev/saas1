"use client";

import { useEffect, useRef } from "react";

import { LinkEditor } from "@/components/dashboard/link-editor";

type LinkEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
  link: {
    id: string;
    url: string;
    title: string;
    description: string | null;
    notes: string | null;
    tags: string[];
  };
};

export function LinkEditModal({ isOpen, onClose, onExited, link }: LinkEditModalProps) {
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => firstInputRef.current?.focus(), 120);
    }
  }, [isOpen]);

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

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6 backdrop-blur-[2px] ${
        isOpen ? "modal-overlay-enter" : "pointer-events-none modal-overlay-exit"
      }`}
      onClick={onClose}
      role="presentation"
      aria-hidden={!isOpen}
      onAnimationEnd={(event) => {
        if (!isOpen && event.target === event.currentTarget) {
          onExited();
        }
      }}
    >
      <div
        className={`w-full max-w-2xl rounded-[2rem] border border-[#e4e7eb] bg-white shadow-[0_24px_80px_rgba(17,17,17,0.16)] ${
          isOpen ? "modal-panel-enter" : "modal-panel-exit"
        }`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`edit-link-${link.id}`}
      >
        <div className="modal-content-enter flex items-center justify-between gap-4 border-b border-[#eef1f4] px-6 py-5">
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

        <div className="modal-content-enter max-h-[calc(100vh-8rem)] overflow-y-auto px-6 py-5 [animation-delay:60ms]">
          <LinkEditor
            mode="edit"
            submitLabel="Save changes"
            initialFocusRef={firstInputRef}
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
