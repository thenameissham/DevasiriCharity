"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function DashboardSignOutButton() {
  return (
    <button
      type="button"
      onClick={() => {
        void signOut({
          callbackUrl: "/"
        });
      }}
      className="flex w-full items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-semibold text-slate-600 transition duration-200 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-rose-500"
    >
      <LogOut aria-hidden="true" className="h-4 w-4" />
      Sign out
    </button>
  );
}