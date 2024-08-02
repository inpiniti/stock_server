import { eq, sql } from "drizzle-orm";

// Abstracted insert function
const insertData = async (tableName: any, data: any) => {
  try {
    const firstRowParamCount = Object.keys(data[0]).length;
    const chunkSize = Math.floor(65534 / firstRowParamCount);
    const dataChunks = splitData(data, chunkSize);
    for (const chunk of dataChunks) {
      await useGalaxy().insert(tableName).values(chunk);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

// Abstracted selection function
const selectByTimeFrame = async (tableName: string, timeFrame: string) => {
  const sqlStr = `SELECT name, close, created_at
                  FROM ${tableName}
                  WHERE DATE_TRUNC('${timeFrame}', ${tableName}.created_at) = DATE_TRUNC('${timeFrame}', TIMESTAMP '${
    timeFrame === "hour" ? oneHourAgo() : oneDayAgo()
  }')`;
  return await useGalaxy().execute(sql.raw(sqlStr));
};

// Abstracted update function
const updateByTimeFrame = async (
  tableName: string,
  timeFrame: string,
  currentList: any[]
) => {
  try {
    const prevList = await selectByTimeFrame(tableName, timeFrame);
    await useGalaxy().transaction(async (trx: any) => {
      for (const currentItem of currentList) {
        const prevItem = prevList.find(
          (prev: any) => prev.name == currentItem.name
        );
        if (!prevItem) continue;

        const changeRate =
          ((currentItem.close - prevItem.close) / prevItem.close) * 100;
        const sqlStr = `UPDATE ${tableName}
                      SET change_${
                        timeFrame === "hour" ? "1h" : "1d"
                      } = ${changeRate}
                      WHERE name = '${currentItem.name}'
                      AND DATE_TRUNC('${timeFrame}', created_at) = DATE_TRUNC('${timeFrame}', TIMESTAMP '${
          timeFrame === "hour" ? oneHourAgo() : oneDayAgo()
        }')`;
        await trx.execute(sql.raw(sqlStr));
      }
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const useHistory = () => {
  const seoulInsert = async (data: any) => await insertData(pgTableSeoul, data);

  const seoulOneHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList);

  const seoulOneDayUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "day", currentSeoulList);

  const kosdaqInsert = async (data: any) =>
    await insertData(pgTableKosdaq, data);

  const kosdaqOneHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList);

  const kosdaqOneDayUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "day", currentKosdaqList);

  const nasdaqInsert = async (data: any) =>
    await insertData(pgTableNasdaq, data);

  const nasdaqOneHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList);

  const nasdaqOneDayUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "day", currentNasdaqList);

  return {
    seoulInsert,
    kosdaqInsert,
    nasdaqInsert,
    seoulOneHourUpdate,
    seoulOneDayUpdate,
    kosdaqOneHourUpdate,
    kosdaqOneDayUpdate,
    nasdaqOneHourUpdate,
    nasdaqOneDayUpdate,
  };
};
