"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

type ActivityEntry = {
  id: number;
  message: string;
};

type DashboardActivityContextValue = {
  activeMessage: string | null;
  beginActivity: (message: string) => number;
  endActivity: (id: number) => void;
};

const DashboardActivityContext = createContext<DashboardActivityContextValue | null>(null);

export function DashboardActivityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextIdRef = useRef(1);
  const [activities, setActivities] = useState<ActivityEntry[]>([]);

  const beginActivity = useCallback((message: string) => {
    const id = nextIdRef.current++;
    setActivities((current) => [...current, { id, message }]);
    return id;
  }, []);

  const endActivity = useCallback((id: number) => {
    setActivities((current) => current.filter((activity) => activity.id !== id));
  }, []);

  const activeMessage = activities.length > 0 ? activities[activities.length - 1]?.message ?? null : null;

  const contextValue = {
    activeMessage,
    beginActivity,
    endActivity,
  };

  return (
    <DashboardActivityContext.Provider value={contextValue}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-20 z-40 flex justify-center px-4">
        <div
          className={`transition-all duration-200 ease-out ${
            activeMessage
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dde2e8] bg-white/95 px-4 py-2 text-sm font-medium text-[#23262d] shadow-[0_12px_30px_rgba(17,17,17,0.08)] backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#111111]" />
            <span>{activeMessage ?? ""}</span>
          </div>
        </div>
      </div>
    </DashboardActivityContext.Provider>
  );
}

export function useDashboardActivity() {
  const context = useContext(DashboardActivityContext);

  if (!context) {
    throw new Error("useDashboardActivity must be used within DashboardActivityProvider.");
  }

  return context;
}
