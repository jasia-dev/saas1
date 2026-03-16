"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { loginSchema, signupSchema } from "@/lib/auth/schemas";
import {
  type AuthFormState,
} from "@/lib/auth/types";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

function withConfigGuard() {
  if (!isSupabaseConfigured()) {
    return {
      status: "error",
      message:
        "Supabase environment variables are missing. Add them to .env.local before testing auth.",
    } satisfies AuthFormState;
  }

  return null;
}

export async function signInAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const configError = withConfigGuard();

  if (configError) {
    return configError;
  }

  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    } satisfies AuthFormState;
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(validatedFields.data);

  if (error) {
    return {
      status: "error",
      message: error.message,
    } satisfies AuthFormState;
  }

  redirect("/dashboard");
}

export async function signUpAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const configError = withConfigGuard();

  if (configError) {
    return configError;
  }

  const validatedFields = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    } satisfies AuthFormState;
  }

  const headerList = await headers();
  const origin = headerList.get("origin") ?? headerList.get("x-forwarded-host");
  const emailRedirectTo = origin
    ? `${origin.startsWith("http") ? origin : `https://${origin}`}/auth/confirm?next=/dashboard`
    : undefined;

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    options: {
      data: {
        name: validatedFields.data.name,
      },
      emailRedirectTo,
    },
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    } satisfies AuthFormState;
  }

  return {
    status: "success",
    message:
      "Account created. Check your email for a confirmation link, or log in now if email confirmation is disabled.",
  } satisfies AuthFormState;
}

export async function signOutAction() {
  const configError = withConfigGuard();

  if (!configError) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  redirect("/login");
}
