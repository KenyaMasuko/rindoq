import { Config } from "drizzle-kit";

const drizzleConfig: Config = {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  breakpoints: true,
};

export default drizzleConfig;
