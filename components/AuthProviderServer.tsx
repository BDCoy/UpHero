// components/AuthProviderServer.tsx
import React, { ReactNode } from "react";
import { getUser } from "@/utils/supabase/getUser";
import ClientAuthProvider from "./AuthProviderClient";

type Props = {
  children: ReactNode;
};

export default async function AuthProviderServer({ children }: Props) {
  const user = await getUser();

  return <ClientAuthProvider user={user}>{children}</ClientAuthProvider>;
}
