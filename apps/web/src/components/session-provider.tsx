"use client";

import { createContext, useContext, useState } from "react";
import type { Session } from "@/src/lib/auth";

const SessionContext = createContext<Session | null>(null);

interface SessionProviderProps {
  initialSession: Session | null;
  children: React.ReactNode;
}

export default function SessionProvider({
  initialSession,
  children,
}: SessionProviderProps) {
  const [session] = useState(initialSession);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
