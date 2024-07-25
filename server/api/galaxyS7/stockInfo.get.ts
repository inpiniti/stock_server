import { drizzle } from "drizzle-orm/postgres-js";
import { eq, and } from "drizzle-orm";
import postgres from "postgres";

export default defineEventHandler(async (event) => {
  // "KR", "Seoul" 이런식으로 들어옴
  const { country, market } = getQuery(event);

  try {
    const data = await useGalaxy()
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
