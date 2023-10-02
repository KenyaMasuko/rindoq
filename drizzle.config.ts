import { Config } from "drizzle-kit";

const drizzleConfig = {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  breakpoints: true,
  driver: "mysql2",
  dbCredentials: {
    connectionString:
      'mysql://ftp21khfrxwymb48iid3:pscale_pw_3us15kt80rvUaX4Whfg6HpVOHvnAZMtTiKRMfcWpk8B@aws.connect.psdb.cloud/rindoq?ssl={"rejectUnauthorized":true}',
  },
} satisfies Config;

export default drizzleConfig;
