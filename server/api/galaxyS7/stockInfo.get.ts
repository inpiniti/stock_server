import { drizzle } from "drizzle-orm/postgres-js";
import { eq, and } from "drizzle-orm";
import postgres from "postgres";

export default defineEventHandler(async (event) => {
  // "KR", "Seoul" 이런식으로 들어옴
  const { country, market } = getQuery(event);

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
    const data = await db
      .select()
      .from(pgTableStockInfo)
      .where(
        and(
          eq(pgTableStockInfo.country, String(country)),
          eq(pgTableStockInfo.market, String(market))
        )
      );

    return data;
  } catch (error) {
    return error;
  }
});
