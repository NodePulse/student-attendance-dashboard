// import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// const sql = neon(process.env.DATABASE_URL);
// const db = drizzle({ client: sql });

// const result = await db.execute("select 1");
// backend setup
export const db = drizzle(process.env.DATABASE_URL);
