export type AuthFieldErrors = Partial<Record<string, string[]>>;

export type AuthFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: AuthFieldErrors;
};

export const initialAuthFormState: AuthFormState = {
  status: "idle",
};
