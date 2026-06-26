import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    AUTH_SECRET: z.string().min(32),
    AUTH_URL: z.string().url().optional()
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000")
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
  },
  emptyStringAsUndefined: true
});