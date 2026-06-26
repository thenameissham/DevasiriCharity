import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export type AppRole = "ADMIN" | "DONOR" | "VOLUNTEER" | "STUDENT";

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function requireRole(allowedRoles: readonly AppRole[]) {
  const session = await requireAuth();

  if (!allowedRoles.includes(session.user.role as AppRole)) {
    redirect("/unauthorized");
  }

  return session;
}