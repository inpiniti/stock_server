import { eq, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  // "KR", "Seoul" 이런식으로 들어옴
  const { country, market } = getQuery(event);
  return await getStockInfo({
    country: String(country),
    market: String(market),
  });
});

export const getStockInfo = async ({
  country,
  market,
}: {
  country: string;
  market: string;
}) => {
  try {
    const data = await useGalaxy()
      .select()
      .from(pgTableStockInfo)
      .where(
        and(
          eq(pgTableStockInfo.country, country),
          eq(pgTableStockInfo.market, market)
        )
      );

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
