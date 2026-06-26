import { NextResponse } from "next/server";
import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";

const roleRoutes = [
  {
    prefix: "/admin",
    roles: ["ADMIN"]
  },
  {
    prefix: "/donor",
    roles: ["DONOR", "ADMIN"]
  },
  {
    prefix: "/volunteer",
    roles: ["VOLUNTEER", "ADMIN"]
  },
  {
    prefix: "/student",
    roles: ["STUDENT", "ADMIN"]
  }
] as const;

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const pathname = request.nextUrl.pathname;
    const token = request.nextauth.token;

    const matchedRoute = roleRoutes.find((route) =>
      pathname.startsWith(route.prefix)
    );

    if (!matchedRoute) {
      return NextResponse.next();
    }

    const role = token?.role;

    if (typeof role !== "string") {
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }

    const allowedRoles: readonly string[] = matchedRoute.roles;

    if (!allowedRoles.includes(role)) {
      return NextResponse.redirect(
        new URL("/unauthorized", request.nextUrl.origin)
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token)
    },
    pages: {
      signIn: "/login"
    }
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/donor/:path*",
    "/volunteer/:path*",
    "/student/:path*"
  ]
};