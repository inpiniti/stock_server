import { eq, and } from "drizzle-orm";
import { getLoopData } from "../api/investing/code";

export const useInfo = () => {
  const insert = async (country: string, market: string) => {
    const [data] = await Promise.all([
      getLoopData({
        country: country,
        market: market,
      }),
      useGalaxy()
        .delete(pgTableStockInfo)
        .where(
          and(
            eq(pgTableStockInfo.country, String(country)),
            eq(pgTableStockInfo.market, String(market))
          )
        ),
    ]);

    // 데이터 분할
    // 예를 들어, 각 행이 83개의 파라미터를 사용한다고 가정하면, 최대 6553개의 행을 한 번에 삽입할 수 있습니다.
    // , 추가적인 여유 100을 두어 계산합니다.
    // 행도 여유를 두어 90으로 계산합니다.
    const firstRowParamCount = Object.keys(data[0]).length; // 첫 번째 행의 파라미터 수를 계산합니다.
    const chunkSize = Math.floor(65534 / firstRowParamCount); // 83은 각 행의 파라미터 수입니다.
    const dataChunks = splitData(data, chunkSize);

    // 분할된 데이터 삽입
    for (const chunk of dataChunks) {
      await useGalaxy().insert(pgTableStockInfo).values(chunk);
    }

    return "success";
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
    seoulInsert,
    seoulSelect,
    kosdaqInsert,
    kosdaqSelect,
    nasdaqInsert,
    nasdaqSelect,
  };
};
