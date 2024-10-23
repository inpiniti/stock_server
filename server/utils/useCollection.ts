import { useHistory } from "./useHistory";

export const useCollection = async () => {
  try {
    const [krResult, usResult] = await Promise.all([
      useLive().newKr(),
      useLive().newUs(),
    ]);

    const { newSeoul, newKosdaq, originKosdaq, originSeoul } = krResult;
    const { newNasdaq, originNasdaq } = usResult;

    console.log("originSeoul", originSeoul.length);
    console.log("originKosdaq", originKosdaq.length);
    console.log("originNasdaq", originNasdaq.length);

    await Promise.all([
      useLive().seoulInsert(originSeoul),
      useLive().kosdaqInsert(originKosdaq),
      useLive().nasdaqInsert(originNasdaq),
    ]);

    // 현재시간이 정각인지 확인
    if (new Date().getMinutes() == 0) {
      console.log("정각 주기 실행");

      console.log("newSeoul", newSeoul.length);
      console.log("newKosdaq", newKosdaq.length);
      console.log("newNasdaq", newNasdaq.length);

      await Promise.all([
        useHistory().seoulInsert(newSeoul),
        useHistory().kosdaqInsert(newKosdaq),
        useHistory().nasdaqInsert(newNasdaq),

        useHistory().seoulOneHourUpdate(newSeoul),
        useHistory().kosdaqOneHourUpdate(newKosdaq),
        useHistory().nasdaqOneHourUpdate(newNasdaq),

        useHistory().seoulOneDayUpdate(newSeoul),
        useHistory().kosdaqOneDayUpdate(newKosdaq),
        useHistory().nasdaqOneDayUpdate(newNasdaq),
      ]);

      await Promise.all([
        useHistory().seoulTwoDaysUpdate(newSeoul),
        useHistory().seoulThreeDaysUpdate(newSeoul),
        useHistory().seoulFourDaysUpdate(newSeoul),
        useHistory().seoulFiveDaysUpdate(newSeoul),
        useHistory().seoulSixDaysUpdate(newSeoul),
      ]);

      await Promise.all([
        useHistory().kosdaqTwoDaysUpdate(newKosdaq),
        useHistory().kosdaqThreeDaysUpdate(newKosdaq),
        useHistory().kosdaqFourDaysUpdate(newKosdaq),
        useHistory().kosdaqFiveDaysUpdate(newKosdaq),
        useHistory().kosdaqSixDaysUpdate(newKosdaq),
      ]);

      await Promise.all([
        useHistory().nasdaqTwoDaysUpdate(newNasdaq),
        useHistory().nasdaqThreeDaysUpdate(newNasdaq),
        useHistory().nasdaqFourDaysUpdate(newNasdaq),
        useHistory().nasdaqFiveDaysUpdate(newNasdaq),
        useHistory().nasdaqSixDaysUpdate(newNasdaq),
      ]);

      await Promise.all([
        useHistory().seoulOneWeekUpdate(newSeoul),
        useHistory().seoulTwoWeekUpdate(newSeoul),
        useHistory().seoulThreeWeekUpdate(newSeoul),
        useHistory().seoulFourWeekUpdate(newSeoul),
      ]);

      await Promise.all([
        useHistory().kosdaqOneWeekUpdate(newKosdaq),
        useHistory().kosdaqTwoWeekUpdate(newKosdaq),
        useHistory().kosdaqThreeWeekUpdate(newKosdaq),
        useHistory().kosdaqFourWeekUpdate(newKosdaq),
      ]);

      await Promise.all([
        useHistory().nasdaqOneWeekUpdate(newNasdaq),
        useHistory().nasdaqTwoWeekUpdate(newNasdaq),
        useHistory().nasdaqThreeWeekUpdate(newNasdaq),
        useHistory().nasdaqFourWeekUpdate(newNasdaq),
      ]);

      await Promise.all([
        useHistory().seoulOneMonthUpdate(newSeoul),
        useHistory().seoulTwoMonthUpdate(newSeoul),
        useHistory().seoulThreeMonthUpdate(newSeoul),
        useHistory().seoulFourMonthUpdate(newSeoul),
        useHistory().seoulFiveMonthUpdate(newSeoul),
        useHistory().seoulSixMonthUpdate(newSeoul),
        useHistory().seoulSevenMonthUpdate(newSeoul),
        useHistory().seoulEightMonthUpdate(newSeoul),
        useHistory().seoulNineMonthUpdate(newSeoul),
        useHistory().seoulTenMonthUpdate(newSeoul),
        useHistory().seoulElevenMonthUpdate(newSeoul),
      ]);

      await Promise.all([
        useHistory().kosdaqOneMonthUpdate(newKosdaq),
        useHistory().kosdaqTwoMonthUpdate(newKosdaq),
        useHistory().kosdaqThreeMonthUpdate(newKosdaq),
        useHistory().kosdaqFourMonthUpdate(newKosdaq),
        useHistory().kosdaqFiveMonthUpdate(newKosdaq),
        useHistory().kosdaqSixMonthUpdate(newKosdaq),
        useHistory().kosdaqSevenMonthUpdate(newKosdaq),
        useHistory().kosdaqEightMonthUpdate(newKosdaq),
        useHistory().kosdaqNineMonthUpdate(newKosdaq),
        useHistory().kosdaqTenMonthUpdate(newKosdaq),
        useHistory().kosdaqElevenMonthUpdate(newKosdaq),
      ]);

      await Promise.all([
        useHistory().nasdaqOneMonthUpdate(newNasdaq),
        useHistory().nasdaqTwoMonthUpdate(newNasdaq),
        useHistory().nasdaqThreeMonthUpdate(newNasdaq),
        useHistory().nasdaqFourMonthUpdate(newNasdaq),
        useHistory().nasdaqFiveMonthUpdate(newNasdaq),
        useHistory().nasdaqSixMonthUpdate(newNasdaq),
        useHistory().nasdaqSevenMonthUpdate(newNasdaq),
        useHistory().nasdaqEightMonthUpdate(newNasdaq),
        useHistory().nasdaqNineMonthUpdate(newNasdaq),
        useHistory().nasdaqTenMonthUpdate(newNasdaq),
        useHistory().nasdaqElevenMonthUpdate(newNasdaq),
      ]);

      await Promise.all([
        useHistory().kosdaqOneYearUpdate(newKosdaq),
        useHistory().seoulOneYearUpdate(newSeoul),
        useHistory().nasdaqOneYearUpdate(newNasdaq),
      ]);
    }
  } catch (error) {
    console.error("error001", error);
    throw error;
  }
};
