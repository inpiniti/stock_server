import { getLoopData } from "../api/investing/code";

export const useInfo = () => {
  const truncate = async () => {
    await useSupabase().from("stock_info").delete();
  };
  const insert = async (country: string, market: string) => {
    try {
      const data = await getLoopData({
        country: country,
        market: market,
      });

      if (data.length == 0) return false;

      await processDataInsert(data, async (chunk: any[]) => {
        await useSupabase().from("stock_info").insert(chunk);
      });

      return true;
    } catch (error) {
      console.error("error004", error);
      throw error;
    }
  };
  const select = async (country: string, market: string) => {
    try {
      const data = (
        await useSupabase()
          .from("stock_info")
          .select("*")
          .eq("country", country)
          .eq("market", market)
      ).data;

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
