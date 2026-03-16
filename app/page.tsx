export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fef3c7_0%,_#fff7ed_35%,_#fff_70%)] px-6 py-16 text-stone-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <section className="grid gap-10 rounded-[2rem] border border-stone-200/70 bg-white/80 p-8 shadow-[0_24px_80px_rgba(120,53,15,0.08)] backdrop-blur md:grid-cols-[1.4fr_0.9fr] md:p-12">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-amber-300 bg-amber-100 px-4 py-1 text-sm font-medium text-amber-900">
              LinkBox MVP setup
            </span>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-stone-950 md:text-6xl">
                Save useful links, tag them fast, and find them later.
              </h1>
              <p className="max-w-xl text-base leading-7 text-stone-600 md:text-lg">
                LinkBox is a personal SaaS for collecting links, organizing them with tags, and using AI to recommend better labels while you save.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
              >
                Start with login flow
              </a>
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
              >
                Build signup next
              </a>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-950 p-6 text-stone-100 shadow-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-300">
              Confirmed MVP
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-stone-300">
              <li>Email sign-up and login</li>
              <li>Add, edit, and delete links</li>
              <li>Tag creation and management</li>
              <li>Search by title, memo, and tags</li>
              <li>AI tag recommendations with Gemini</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Frontend",
              description: "Next.js App Router, Tailwind CSS, and clean server-first routing.",
            },
            {
              title: "Backend",
              description: "Supabase for PostgreSQL, Auth, and RLS-ready data access.",
            },
            {
              title: "Forms + AI",
              description: "React Hook Form, Zod, and Gemini integration for tag suggestions.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(28,25,23,0.06)]"
            >
              <h2 className="text-lg font-semibold text-stone-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">{item.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
