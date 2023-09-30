import { Config } from "drizzle-kit";

const drizzleConfig = {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  breakpoints: true,
} satisfies Config;

export default drizzleConfig;
