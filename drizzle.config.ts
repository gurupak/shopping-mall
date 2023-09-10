import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgres://default:bz2qXsYa4SZx@ep-orange-hat-701156-pooler.ap-southeast-1.postgres.vercel-storage.com/verceldb?sslmode=require",
  },
} satisfies Config;
