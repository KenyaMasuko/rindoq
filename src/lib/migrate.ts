import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
import drizzleConfig from "../../drizzle.config";

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const connection = connect({
    url: process.env.DATABASE_URL,
    fetch,
  });

  const db = drizzle(connection);

  console.log("Running migrations...");

  const start = performance.now();

  await migrate(db, { migrationsFolder: drizzleConfig.out });

  const end = performance.now();

  console.log(`Migrations completed in ${end - start}ms`);

  process.exit(0);
};

runMigrate().catch((err) => {
  console.log("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
