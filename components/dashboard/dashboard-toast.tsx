"use client";

import { useEffect, useState } from "react";

type DashboardToastProps = {
  status?: "success" | "error";
  message?: string;
};

export function DashboardToast({ status, message }: DashboardToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [message]);

  if (!message || !isVisible) {
    return null;
  }

  return (
    <div className="fixed right-5 top-5 z-50 max-w-sm">
      <div
        className={`rounded-[1.5rem] border px-5 py-4 shadow-[0_20px_60px_rgba(28,25,23,0.14)] backdrop-blur ${
          status === "success"
            ? "border-[#bfe7be] bg-[#f3fff0] text-[#1f7a2e]"
            : "border-[#f2c7c0] bg-[#fff5f2] text-[#b13a28]"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              {status === "success" ? "Saved successfully" : "Something went wrong"}
            </p>
            <p className="mt-1 text-sm leading-6">{message}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="text-sm font-semibold opacity-70 transition hover:opacity-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
