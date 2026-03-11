export type AuthActionState = {
  status?: "error" | "success";
  message?: string;
  email?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "password", string[]>>;
};

export const initialAuthActionState: AuthActionState = {};
