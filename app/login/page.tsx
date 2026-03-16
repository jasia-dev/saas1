import { redirect } from "next/navigation";

import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

type LoginPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { message } = await searchParams;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/dashboard");
    }
  }

  return (
    <AuthCard
      eyebrow="Authentication"
      title="Sign in to your LinkBox workspace"
      description="This is the first live auth step for the MVP. Once logged in, users will be routed into a protected dashboard shell."
      footerText="Don't have an account?"
      footerLinkHref="/signup"
      footerLinkLabel="Create one"
    >
      <LoginForm notice={message} />
    </AuthCard>
  );
}
