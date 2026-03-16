"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { loginSchema, type LoginInput } from "@/lib/auth/schemas";
import { signInAction } from "@/lib/auth/actions";
import {
  initialAuthFormState,
  type AuthFieldErrors,
  type AuthFormState,
} from "@/lib/auth/types";

type LoginFormProps = {
  notice?: string;
};

export function LoginForm({ notice }: LoginFormProps) {
  const [state, setState] = useState<AuthFormState>(initialAuthFormState);
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!state.fieldErrors) {
      return;
    }

    for (const [fieldName, messages] of Object.entries(
      state.fieldErrors as AuthFieldErrors,
    )) {
      if (!messages?.length) {
        continue;
      }

      form.setError(fieldName as keyof LoginInput, {
        message: messages[0],
      });
    }
  }, [form, state.fieldErrors]);

  const onSubmit = form.handleSubmit((values) => {
    const formData = new FormData();

    formData.set("email", values.email);
    formData.set("password", values.password);

    startTransition(() => {
      signInAction(initialAuthFormState, formData).then((nextState) => {
        setState(nextState);
      });
    });
  });

  return (
    <div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-amber-700">Email login</p>
        <h2 className="text-3xl font-semibold tracking-tight text-stone-950">
          Welcome back
        </h2>
        <p className="text-sm leading-6 text-stone-600">
          Sign in to manage your saved links and prepare the dashboard flow.
        </p>
      </div>

      {notice ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {notice}
        </div>
      ) : null}

      {state.status === "error" && state.message ? (
        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.message}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-stone-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-500"
            {...form.register("email")}
          />
          {form.formState.errors.email ? (
            <p className="text-sm text-rose-600">{form.formState.errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-stone-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-500"
            {...form.register("password")}
          />
          {form.formState.errors.password ? (
            <p className="text-sm text-rose-600">{form.formState.errors.password.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-4 text-sm text-stone-600">
        Need an account?{" "}
        <Link href="/signup" className="font-semibold text-stone-950">
          Create one
        </Link>
      </p>
    </div>
  );
}
