import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

export type AppRole = "ADMIN" | "DONOR" | "VOLUNTEER" | "STUDENT";

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.status !== "ACTIVE") {
    redirect("/unauthorized");
  }

  return session;
}

export async function requireRole(allowedRoles: readonly AppRole[]) {
  const session = await requireAuth();

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, status: true }
  });

  if (
    !currentUser ||
    currentUser.status !== "ACTIVE" ||
    !allowedRoles.includes(currentUser.role)
  ) {
    redirect("/unauthorized");
  }

  session.user.role = currentUser.role;
  session.user.status = currentUser.status;

  return session;
}