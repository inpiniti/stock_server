import { eq, sql } from "drizzle-orm";

// Abstracted insert function
const insertData = async (tableName: any, data: any) => {
  if (data.length == 0) return false;
  try {
    const firstRowParamCount = Object.keys(data[0]).length;
    const chunkSize = Math.floor(65534 / firstRowParamCount);
    const dataChunks = splitData(data, chunkSize);
    for (const chunk of dataChunks) {
      await useGalaxy().insert(tableName).values(chunk);
    }
    return true;
  } catch (error) {
    console.error("error002", error);
    throw error;
  }
};

// Abstracted selection function
const selectByTimeFrame = async (
  tableName: string,
  timeFrame: string,
  daysAgo: number = 1
) => {
  let intervalUnit;
  switch (timeFrame) {
    case "hour":
      intervalUnit = "hours";
      break;
    case "day":
      intervalUnit = "days";
      break;
    case "week":
      intervalUnit = "weeks";
      break;
    case "year":
      intervalUnit = "years";
      break;
    default:
      intervalUnit = "days"; // 기본값
  }

  const dateOffset =
    daysAgo > 0 ? ` - INTERVAL '${daysAgo} ${intervalUnit}'` : "";
  const sqlStr = `SELECT name, close, created_at
                  FROM ${tableName}
                  WHERE DATE_TRUNC('${timeFrame}', ${tableName}.created_at) = DATE_TRUNC('${timeFrame}', NOW()${dateOffset})`;
  return await useGalaxy().execute(sql.raw(sqlStr));
};

// Abstracted update function
const updateByTimeFrame = async (
  tableName: string,
  timeFrame: string,
  currentList: any[],
  daysAgo: number = 1 // 기본값을 1로 설정
) => {
  try {
    const prevList = await selectByTimeFrame(tableName, timeFrame, daysAgo);
    await useGalaxy().transaction(async (trx: any) => {
      for (const currentItem of currentList) {
        const prevItem = prevList.find(
          (prev: any) => prev.name == currentItem.name
        );
        if (!prevItem) continue;

        let intervalUnit;
        switch (timeFrame) {
          case "hour":
            intervalUnit = "hours";
            break;
          case "day":
            intervalUnit = "days";
            break;
          case "week":
            intervalUnit = "weeks";
            break;
          case "year":
            intervalUnit = "years";
            break;
          default:
            intervalUnit = "days"; // 기본값
        }

        const changeRate =
          ((currentItem.close - prevItem.close) / prevItem.close) * 100;
        const dateOffset =
          daysAgo > 0 ? ` - INTERVAL '${daysAgo} ${intervalUnit}'` : "";

        let changeColumn;
        if (timeFrame === "hour") {
          changeColumn = "change_1h";
        } else if (timeFrame === "day") {
          changeColumn = daysAgo === 1 ? "change_1d" : `change_${daysAgo}d`;
        } else if (timeFrame === "week") {
          changeColumn = "change_1w";
        } else if (timeFrame === "year") {
          changeColumn = "change_1y";
        }

        const sqlStr = `UPDATE ${tableName}
                      SET ${changeColumn} = ${changeRate}
                      WHERE name = '${currentItem.name}'
                      AND DATE_TRUNC('${timeFrame}', created_at) = DATE_TRUNC('${timeFrame}', NOW()${dateOffset})`;
        await trx.execute(sql.raw(sqlStr));
      }
    });
    return true;
  } catch (error) {
    console.error("error003", error);
    throw error;
  }
};

export const useHistory = () => {
  const seoulInsert = async (data: any) => await insertData(pgTableSeoul, data);
  const kosdaqInsert = async (data: any) =>
    await insertData(pgTableKosdaq, data);
  const nasdaqInsert = async (data: any) =>
    await insertData(pgTableNasdaq, data);

  const seoulOneHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList);
  const seoulOneDayUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "day", currentSeoulList);
  const kosdaqOneHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList);

  const kosdaqOneDayUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "day", currentKosdaqList);
  const nasdaqOneHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList);
  const nasdaqOneDayUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "day", currentNasdaqList);

  // New update functions for 2, 3, 4, 5, 6 days ago
  const seoulTwoDaysUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "day", currentSeoulList, 2);
  const seoulThreeDaysUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "day", currentSeoulList, 3);
  const seoulFourDaysUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "day", currentSeoulList, 4);
  const seoulFiveDaysUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "day", currentSeoulList, 5);
  const seoulSixDaysUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "day", currentSeoulList, 6);

  const kosdaqTwoDaysUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "day", currentKosdaqList, 2);
  const kosdaqThreeDaysUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "day", currentKosdaqList, 3);
  const kosdaqFourDaysUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "day", currentKosdaqList, 4);
  const kosdaqFiveDaysUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "day", currentKosdaqList, 5);
  const kosdaqSixDaysUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "day", currentKosdaqList, 6);

  const nasdaqTwoDaysUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "day", currentNasdaqList, 2);
  const nasdaqThreeDaysUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "day", currentNasdaqList, 3);
  const nasdaqFourDaysUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "day", currentNasdaqList, 4);
  const nasdaqFiveDaysUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "day", currentNasdaqList, 5);
  const nasdaqSixDaysUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "day", currentNasdaqList, 6);

  // New update functions for week and year
  const seoulOneWeekUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "week", currentSeoulList);
  const seoulTwoWeekUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "week", currentSeoulList, 2);
  const seoulThreeWeekUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "week", currentSeoulList, 3);
  const seoulFourWeekUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "week", currentSeoulList, 4);

  const kosdaqOneWeekUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "week", currentKosdaqList);
  const kosdaqTwoWeekUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "week", currentKosdaqList, 2);
  const kosdaqThreeWeekUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "week", currentKosdaqList, 3);
  const kosdaqFourWeekUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "week", currentKosdaqList, 4);

  const nasdaqOneWeekUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "week", currentNasdaqList);
  const nasdaqTwoWeekUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "week", currentNasdaqList, 2);
  const nasdaqThreeWeekUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "week", currentNasdaqList, 3);
  const nasdaqFourWeekUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "week", currentNasdaqList, 4);

  const kosdaqOneYearUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "year", currentKosdaqList);
  const seoulOneYearUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "year", currentSeoulList);
  const nasdaqOneYearUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "year", currentNasdaqList);

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

    seoulTwoDaysUpdate,
    seoulThreeDaysUpdate,
    seoulFourDaysUpdate,
    seoulFiveDaysUpdate,
    seoulSixDaysUpdate,

    kosdaqTwoDaysUpdate,
    kosdaqThreeDaysUpdate,
    kosdaqFourDaysUpdate,
    kosdaqFiveDaysUpdate,
    kosdaqSixDaysUpdate,

    nasdaqTwoDaysUpdate,
    nasdaqThreeDaysUpdate,
    nasdaqFourDaysUpdate,
    nasdaqFiveDaysUpdate,
    nasdaqSixDaysUpdate,

    seoulOneWeekUpdate,
    seoulTwoWeekUpdate,
    seoulThreeWeekUpdate,
    seoulFourWeekUpdate,

    kosdaqOneWeekUpdate,
    kosdaqTwoWeekUpdate,
    kosdaqThreeWeekUpdate,
    kosdaqFourWeekUpdate,

    nasdaqOneWeekUpdate,
    nasdaqTwoWeekUpdate,
    nasdaqThreeWeekUpdate,
    nasdaqFourWeekUpdate,

    kosdaqOneYearUpdate,
    seoulOneYearUpdate,
    nasdaqOneYearUpdate,
  };
};
