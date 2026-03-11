export type AdminContentActionState = {
  status?: "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string[]>;
  createdHref?: string;
  createdLabel?: string;
};

export const initialAdminContentActionState: AdminContentActionState = {};
