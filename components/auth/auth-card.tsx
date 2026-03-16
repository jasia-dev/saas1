import Link from "next/link";
import type { ReactNode } from "react";

type AuthCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  footerText: string;
  footerLinkHref: string;
  footerLinkLabel: string;
  children: ReactNode;
};

export function AuthCard({
  eyebrow,
  title,
  description,
  footerText,
  footerLinkHref,
  footerLinkLabel,
  children,
}: AuthCardProps) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#fff7ed_0%,_#fff_40%,_#f5f5f4_100%)] px-6 py-12">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <span className="inline-flex rounded-full border border-amber-300 bg-amber-100 px-4 py-1 text-sm font-medium text-amber-900">
            {eyebrow}
          </span>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-stone-950 md:text-5xl">
              {title}
            </h1>
            <p className="max-w-xl text-base leading-7 text-stone-600">
              {description}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-stone-200 bg-white/70 p-6 shadow-[0_24px_70px_rgba(28,25,23,0.06)] backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-stone-500">
              LinkBox MVP focus
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-700">
              <li>Store and manage personal links</li>
              <li>Organize records with custom tags</li>
              <li>Search across titles, notes, and tags</li>
              <li>Use AI to recommend useful labels</li>
            </ul>
          </div>
        </section>

        <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_24px_80px_rgba(28,25,23,0.08)] md:p-10">
          {children}
          <p className="mt-6 text-sm text-stone-600">
            {footerText}{" "}
            <Link href={footerLinkHref} className="font-semibold text-stone-950">
              {footerLinkLabel}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
