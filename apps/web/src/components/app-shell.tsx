import type { ReactNode } from "react";
import type { User } from "better-auth";

import { ProtectedShell } from "@/components/protected-shell";

export function AppShell({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) {
  return <ProtectedShell user={user}>{children}</ProtectedShell>;
}
