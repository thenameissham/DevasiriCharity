import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "dark" | "ghost" | "success";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
}

interface ButtonProps
  extends BaseButtonProps,
    ComponentPropsWithoutRef<"button"> {
  readonly href?: undefined;
}

interface LinkButtonProps
  extends BaseButtonProps,
    Omit<ComponentPropsWithoutRef<typeof Link>, "href"> {
  readonly href: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white shadow-[0_18px_45px_rgba(37,99,235,0.26)] hover:bg-blue-700",
  secondary:
    "border border-slate-200 bg-white text-slate-950 shadow-sm hover:bg-slate-50",
  dark:
    "bg-slate-950 text-white shadow-[0_18px_45px_rgba(15,23,42,0.24)] hover:bg-slate-800",
  ghost: "text-slate-700 hover:bg-slate-100",
  success:
    "bg-emerald-600 text-white shadow-[0_18px_45px_rgba(16,185,129,0.24)] hover:bg-emerald-700"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base"
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[16px] font-bold transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-blue-500 disabled:pointer-events-none disabled:opacity-50";

export function Button(props: ButtonProps | LinkButtonProps) {
  const {
    className,
    variant = "primary",
    size = "md",
    children,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return (
      <Link className={classes} {...(rest as LinkButtonProps)} href={props.href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonProps)}>
      {children}
    </button>
  );
}