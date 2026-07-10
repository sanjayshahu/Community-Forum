import { sql } from "drizzle-orm";
import { db } from "./client";

async function test() {
  const result = await db.execute(sql`SELECT NOW();`);

  console.log(result);

  process.exit(0);
}

test();