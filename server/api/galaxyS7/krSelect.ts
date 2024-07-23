import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export default defineEventHandler(async (event) => {
  try {
    const ip = "116.121.7.117";
    const port = "5432";
    const user = "inpiniti";
    const password = "wjd53850";
    const database = "inpiniti";

    const url = `postgres://${user}:${password}@${ip}:${port}/${database}`;

    // for query purposes
    const queryClient = postgres(url);
    const db = drizzle(queryClient);
    const data = await db.select().from(pgTableKrSeoul);

    return data;
  } catch (error) {
    return error;
  }
});
