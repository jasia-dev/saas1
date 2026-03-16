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
    <div className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      <div
        className={`w-full max-w-sm rounded-[1.5rem] border px-5 py-4 shadow-[0_18px_40px_rgba(17,17,17,0.08)] backdrop-blur ${
          status === "success"
            ? "border-[#d9e7d9] bg-white text-[#285c31]"
            : "border-[#ead6d4] bg-white text-[#8a4037]"
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
