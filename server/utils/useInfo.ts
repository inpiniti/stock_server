import { eq, and, sql } from "drizzle-orm";
import { getLoopData } from "../api/investing/code";

export const useInfo = () => {
  const truncate = async () => {
    await useGalaxy().execute(sql.raw(`TRUNCATE TABLE stock_info`));
  };
  const insert = async (country: string, market: string) => {
    try {
      const data = await getLoopData({
        country: country,
        market: market,
      });

      if (data.length == 0) return false;

      await processDataInsert(data, async (chunk: any[]) => {
        await useGalaxy().insert(pgTableStockInfo).values(chunk);
      });

      return true;
    } catch (error) {
      console.error("error004", error);
      throw error;
    }
  };
  const select = async (country: string, market: string) => {
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
      console.error("error005", error);
      throw error;
    }
  };

  const seoulInsert = async () => {
    return await insert("KR", "Seoul");
  };
  const seoulSelect = async () => {
    return await select("KR", "Seoul");
  };
  const kosdaqInsert = async () => {
    return await insert("KR", "KOSDAQ");
  };
  const kosdaqSelect = async () => {
    return await select("KR", "KOSDAQ");
  };
  const nasdaqInsert = async () => {
    return await insert("US", "NASDAQ");
  };
  const nasdaqSelect = async () => {
    return await select("US", "NASDAQ");
  };

  return {
    insert,
    select,
    truncate,
    seoulInsert,
    seoulSelect,
    kosdaqInsert,
    kosdaqSelect,
    nasdaqInsert,
    nasdaqSelect,
  };
};
