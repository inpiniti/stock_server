import { eq, sql } from "drizzle-orm";

// Abstracted insert function
const insertData = async (tableName: any, data: any) => {
  if (data.length == 0) return false;
  try {
    await processDataInsert(data, async (chunk: any[]) => {
      await useGalaxy().insert(tableName).values(chunk);
    });

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
  console.log("selectByTimeFrame", sqlStr);
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
    console.log("updateByTimeFrame", tableName, timeFrame, daysAgo);
    const prevList = await selectByTimeFrame(tableName, timeFrame, daysAgo);
    console.log(
      `${daysAgo} ${timeFrame} 전 ${tableName} 데이터의 length`,
      prevList.length
    );
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
          changeColumn = `change_${daysAgo}h`;
        } else if (timeFrame === "day") {
          changeColumn = `change_${daysAgo}d`;
        } else if (timeFrame === "week") {
          changeColumn = `change_${daysAgo}w`;
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
  const seoulTwoHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 2);
  const seoulThreeHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 3);
  const seoulFourHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 4);
  const seoulFiveHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 5);
  const seoulSixHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 6);
  const seoulSevenHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 7);
  const seoulEightHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 8);
  const seoulNineHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 9);
  const seoulTenHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 10);
  const seoulElevenHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 11);
  const seoulTwelveHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 12);
  const seoulThirteenHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 13);
  const seoulFourteenHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 14);
  const seoulFifteenHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 15);
  const seoulSixteenHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 16);
  const seoulSeventeenHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 17);
  const seoulEighteenHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 18);
  const seoulNineteenHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 19);
  const seoulTwentyHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 20);
  const seoulTwentyOneHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 21);
  const seoulTwentyTwoHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 22);
  const seoulTwentyThreeHourUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "hour", currentSeoulList, 23);

  const kosdaqOneHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList);
  const kosdaqTwoHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 2);
  const kosdaqThreeHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 3);
  const kosdaqFourHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 4);
  const kosdaqFiveHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 5);
  const kosdaqSixHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 6);
  const kosdaqSevenHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 7);
  const kosdaqEightHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 8);
  const kosdaqNineHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 9);
  const kosdaqTenHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 10);
  const kosdaqElevenHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 11);
  const kosdaqTwelveHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 12);
  const kosdaqThirteenHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 13);
  const kosdaqFourteenHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 14);
  const kosdaqFifteenHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 15);
  const kosdaqSixteenHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 16);
  const kosdaqSeventeenHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 17);
  const kosdaqEighteenHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 18);
  const kosdaqNineteenHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 19);
  const kosdaqTwentyHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 20);
  const kosdaqTwentyOneHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 21);
  const kosdaqTwentyTwoHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 22);
  const kosdaqTwentyThreeHourUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "hour", currentKosdaqList, 23);

  const nasdaqOneHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList);
  const nasdaqTwoHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 2);
  const nasdaqThreeHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 3);
  const nasdaqFourHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 4);
  const nasdaqFiveHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 5);
  const nasdaqSixHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 6);
  const nasdaqSevenHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 7);
  const nasdaqEightHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 8);
  const nasdaqNineHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 9);
  const nasdaqTenHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 10);
  const nasdaqElevenHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 11);
  const nasdaqTwelveHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 12);
  const nasdaqThirteenHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 13);
  const nasdaqFourteenHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 14);
  const nasdaqFifteenHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 15);
  const nasdaqSixteenHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 16);
  const nasdaqSeventeenHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 17);
  const nasdaqEighteenHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 18);
  const nasdaqNineteenHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 19);
  const nasdaqTwentyHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 20);
  const nasdaqTwentyOneHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 21);
  const nasdaqTwentyTwoHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 22);
  const nasdaqTwentyThreeHourUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "hour", currentNasdaqList, 23);

  // New update functions for 2, 3, 4, 5, 6 days ago
  const seoulOneDayUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "day", currentSeoulList);
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

  const kosdaqOneDayUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "day", currentKosdaqList);
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

  const nasdaqOneDayUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "day", currentNasdaqList);
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

  // month
  const seoulOneMonthUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "month", currentSeoulList);
  const seoulTwoMonthUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "month", currentSeoulList, 2);
  const seoulThreeMonthUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "month", currentSeoulList, 3);
  const seoulFourMonthUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "month", currentSeoulList, 4);
  const seoulFiveMonthUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "month", currentSeoulList, 5);
  const seoulSixMonthUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "month", currentSeoulList, 6);
  const seoulSevenMonthUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "month", currentSeoulList, 7);
  const seoulEightMonthUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "month", currentSeoulList, 8);
  const seoulNineMonthUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "month", currentSeoulList, 9);
  const seoulTenMonthUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "month", currentSeoulList, 10);
  const seoulElevenMonthUpdate = async (currentSeoulList: any[]) =>
    await updateByTimeFrame("seoul", "month", currentSeoulList, 11);

  const kosdaqOneMonthUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "month", currentKosdaqList);
  const kosdaqTwoMonthUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "month", currentKosdaqList, 2);
  const kosdaqThreeMonthUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "month", currentKosdaqList, 3);
  const kosdaqFourMonthUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "month", currentKosdaqList, 4);
  const kosdaqFiveMonthUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "month", currentKosdaqList, 5);
  const kosdaqSixMonthUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "month", currentKosdaqList, 6);
  const kosdaqSevenMonthUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "month", currentKosdaqList, 7);
  const kosdaqEightMonthUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "month", currentKosdaqList, 8);
  const kosdaqNineMonthUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "month", currentKosdaqList, 9);
  const kosdaqTenMonthUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "month", currentKosdaqList, 10);
  const kosdaqElevenMonthUpdate = async (currentKosdaqList: any[]) =>
    await updateByTimeFrame("kosdaq", "month", currentKosdaqList, 11);

  const nasdaqOneMonthUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "month", currentNasdaqList);
  const nasdaqTwoMonthUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "month", currentNasdaqList, 2);
  const nasdaqThreeMonthUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "month", currentNasdaqList, 3);
  const nasdaqFourMonthUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "month", currentNasdaqList, 4);
  const nasdaqFiveMonthUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "month", currentNasdaqList, 5);
  const nasdaqSixMonthUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "month", currentNasdaqList, 6);
  const nasdaqSevenMonthUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "month", currentNasdaqList, 7);
  const nasdaqEightMonthUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "month", currentNasdaqList, 8);
  const nasdaqNineMonthUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "month", currentNasdaqList, 9);
  const nasdaqTenMonthUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "month", currentNasdaqList, 10);
  const nasdaqElevenMonthUpdate = async (currentNasdaqList: any[]) =>
    await updateByTimeFrame("nasdaq", "month", currentNasdaqList, 11);

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
    seoulTwoHourUpdate,
    seoulThreeHourUpdate,
    seoulFourHourUpdate,
    seoulFiveHourUpdate,
    seoulSixHourUpdate,
    seoulSevenHourUpdate,
    seoulEightHourUpdate,
    seoulNineHourUpdate,
    seoulTenHourUpdate,
    seoulElevenHourUpdate,
    seoulTwelveHourUpdate,
    seoulThirteenHourUpdate,
    seoulFourteenHourUpdate,
    seoulFifteenHourUpdate,
    seoulSixteenHourUpdate,
    seoulSeventeenHourUpdate,
    seoulEighteenHourUpdate,
    seoulNineteenHourUpdate,
    seoulTwentyHourUpdate,
    seoulTwentyOneHourUpdate,
    seoulTwentyTwoHourUpdate,
    seoulTwentyThreeHourUpdate,

    kosdaqOneHourUpdate,
    kosdaqTwoHourUpdate,
    kosdaqThreeHourUpdate,
    kosdaqFourHourUpdate,
    kosdaqFiveHourUpdate,
    kosdaqSixHourUpdate,
    kosdaqSevenHourUpdate,
    kosdaqEightHourUpdate,
    kosdaqNineHourUpdate,
    kosdaqTenHourUpdate,
    kosdaqElevenHourUpdate,
    kosdaqTwelveHourUpdate,
    kosdaqThirteenHourUpdate,
    kosdaqFourteenHourUpdate,
    kosdaqFifteenHourUpdate,
    kosdaqSixteenHourUpdate,
    kosdaqSeventeenHourUpdate,
    kosdaqEighteenHourUpdate,
    kosdaqNineteenHourUpdate,
    kosdaqTwentyHourUpdate,
    kosdaqTwentyOneHourUpdate,
    kosdaqTwentyTwoHourUpdate,
    kosdaqTwentyThreeHourUpdate,

    nasdaqOneHourUpdate,
    nasdaqTwoHourUpdate,
    nasdaqThreeHourUpdate,
    nasdaqFourHourUpdate,
    nasdaqFiveHourUpdate,
    nasdaqSixHourUpdate,
    nasdaqSevenHourUpdate,
    nasdaqEightHourUpdate,
    nasdaqNineHourUpdate,
    nasdaqTenHourUpdate,
    nasdaqElevenHourUpdate,
    nasdaqTwelveHourUpdate,
    nasdaqThirteenHourUpdate,
    nasdaqFourteenHourUpdate,
    nasdaqFifteenHourUpdate,
    nasdaqSixteenHourUpdate,
    nasdaqSeventeenHourUpdate,
    nasdaqEighteenHourUpdate,
    nasdaqNineteenHourUpdate,
    nasdaqTwentyHourUpdate,
    nasdaqTwentyOneHourUpdate,
    nasdaqTwentyTwoHourUpdate,
    nasdaqTwentyThreeHourUpdate,

    seoulOneDayUpdate,
    seoulTwoDaysUpdate,
    seoulThreeDaysUpdate,
    seoulFourDaysUpdate,
    seoulFiveDaysUpdate,
    seoulSixDaysUpdate,

    kosdaqOneDayUpdate,
    kosdaqTwoDaysUpdate,
    kosdaqThreeDaysUpdate,
    kosdaqFourDaysUpdate,
    kosdaqFiveDaysUpdate,
    kosdaqSixDaysUpdate,

    nasdaqOneDayUpdate,
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

    seoulOneMonthUpdate,
    seoulTwoMonthUpdate,
    seoulThreeMonthUpdate,
    seoulFourMonthUpdate,
    seoulFiveMonthUpdate,
    seoulSixMonthUpdate,
    seoulSevenMonthUpdate,
    seoulEightMonthUpdate,
    seoulNineMonthUpdate,
    seoulTenMonthUpdate,
    seoulElevenMonthUpdate,

    kosdaqOneMonthUpdate,
    kosdaqTwoMonthUpdate,
    kosdaqThreeMonthUpdate,
    kosdaqFourMonthUpdate,
    kosdaqFiveMonthUpdate,
    kosdaqSixMonthUpdate,
    kosdaqSevenMonthUpdate,
    kosdaqEightMonthUpdate,
    kosdaqNineMonthUpdate,
    kosdaqTenMonthUpdate,
    kosdaqElevenMonthUpdate,

    nasdaqOneMonthUpdate,
    nasdaqTwoMonthUpdate,
    nasdaqThreeMonthUpdate,
    nasdaqFourMonthUpdate,
    nasdaqFiveMonthUpdate,
    nasdaqSixMonthUpdate,
    nasdaqSevenMonthUpdate,
    nasdaqEightMonthUpdate,
    nasdaqNineMonthUpdate,
    nasdaqTenMonthUpdate,
    nasdaqElevenMonthUpdate,

    kosdaqOneYearUpdate,
    seoulOneYearUpdate,
    nasdaqOneYearUpdate,
  };
};
