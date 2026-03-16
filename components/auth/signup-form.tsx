"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { signupSchema, type SignupInput } from "@/lib/auth/schemas";
import { signUpAction } from "@/lib/auth/actions";
import {
  initialAuthFormState,
  type AuthFieldErrors,
  type AuthFormState,
} from "@/lib/auth/types";

export function SignupForm() {
  const [state, setState] = useState<AuthFormState>(initialAuthFormState);
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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

      form.setError(fieldName as keyof SignupInput, {
        message: messages[0],
      });
    }
  }, [form, state.fieldErrors]);

  const onSubmit = form.handleSubmit((values) => {
    const formData = new FormData();

    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("password", values.password);
    formData.set("confirmPassword", values.confirmPassword);

    startTransition(() => {
      signUpAction(initialAuthFormState, formData).then((nextState) => {
        setState(nextState);
      });
    });
  });

  return (
    <div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-amber-700">Email sign-up</p>
        <h2 className="text-3xl font-semibold tracking-tight text-stone-950">
          Create your account
        </h2>
        <p className="text-sm leading-6 text-stone-600">
          This sets up the first authenticated flow for LinkBox with Supabase Auth.
        </p>
      </div>

      {state.message ? (
        <div
          className={`mt-6 rounded-2xl px-4 py-3 text-sm ${
            state.status === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-stone-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-500"
            {...form.register("name")}
          />
          {form.formState.errors.name ? (
            <p className="text-sm text-rose-600">{form.formState.errors.name.message}</p>
          ) : null}
        </div>

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
            autoComplete="new-password"
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-500"
            {...form.register("password")}
          />
          {form.formState.errors.password ? (
            <p className="text-sm text-rose-600">{form.formState.errors.password.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-stone-700"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-500"
            {...form.register("confirmPassword")}
          />
          {form.formState.errors.confirmPassword ? (
            <p className="text-sm text-rose-600">
              {form.formState.errors.confirmPassword.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
        >
          {isPending ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-4 text-sm text-stone-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-stone-950">
          Sign in
        </Link>
      </p>
    </div>
  );
}
