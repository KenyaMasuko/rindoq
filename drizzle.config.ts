import { Config } from "drizzle-kit";

const drizzleConfig = {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  breakpoints: true,
} satisfies Config;

export default drizzleConfig;
