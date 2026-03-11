"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type AuthSubmitButtonProps = {
  children: ReactNode;
  pendingLabel: string;
  disabled?: boolean;
};

export function AuthSubmitButton({
  children,
  pendingLabel,
  disabled,
}: AuthSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      variant="neon"
      size="lg"
      className="w-full rounded-[22px]"
    >
      {disabled ? pendingLabel : children}
    </Button>
  );
}
