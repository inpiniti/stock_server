import { useHistory } from "./useHistory";

export const useCollection = async () => {
  try {
    const [krResult, usResult] = await Promise.all([
      useLive().newKr(),
      useLive().newUs(),
    ]);

    const { newSeoul, newKosdaq, originKosdaq, originSeoul } = krResult;
    const { newNasdaq, originNasdaq } = usResult;

    await Promise.all([
      useLive().seoulInsert(originSeoul),
      useLive().kosdaqInsert(originKosdaq),
      useLive().nasdaqInsert(originNasdaq),
    ]);

    // 현재시간이 정각인지 확인
    if (new Date().getMinutes() == 0) {
      await Promise.all([
        useHistory().seoulInsert(newSeoul),
        useHistory().kosdaqInsert(newKosdaq),
        useHistory().nasdaqInsert(newNasdaq),
      ]);

      await Promise.all([
        useHistory().seoulOneHourUpdate(newSeoul),
        useHistory().seoulTwoHourUpdate(newSeoul),
        useHistory().seoulThreeHourUpdate(newSeoul),
        useHistory().seoulFourHourUpdate(newSeoul),
        useHistory().seoulFiveHourUpdate(newSeoul),
        useHistory().seoulSixHourUpdate(newSeoul),
        useHistory().seoulSevenHourUpdate(newSeoul),
        useHistory().seoulEightHourUpdate(newSeoul),
        useHistory().seoulNineHourUpdate(newSeoul),
        useHistory().seoulTenHourUpdate(newSeoul),
        useHistory().seoulElevenHourUpdate(newSeoul),
        useHistory().seoulTwelveHourUpdate(newSeoul),
      ]);

      await Promise.all([
        useHistory().seoulThirteenHourUpdate(newSeoul),
        useHistory().seoulFourteenHourUpdate(newSeoul),
        useHistory().seoulFifteenHourUpdate(newSeoul),
        useHistory().seoulSixteenHourUpdate(newSeoul),
        useHistory().seoulSeventeenHourUpdate(newSeoul),
        useHistory().seoulEighteenHourUpdate(newSeoul),
        useHistory().seoulNineteenHourUpdate(newSeoul),
        useHistory().seoulTwentyHourUpdate(newSeoul),
        useHistory().seoulTwentyOneHourUpdate(newSeoul),
        useHistory().seoulTwentyTwoHourUpdate(newSeoul),
        useHistory().seoulTwentyThreeHourUpdate(newSeoul),
      ]);

      await Promise.all([
        useHistory().kosdaqOneHourUpdate(newKosdaq),
        useHistory().kosdaqTwoHourUpdate(newKosdaq),
        useHistory().kosdaqThreeHourUpdate(newKosdaq),
        useHistory().kosdaqFourHourUpdate(newKosdaq),
        useHistory().kosdaqFiveHourUpdate(newKosdaq),
        useHistory().kosdaqSixHourUpdate(newKosdaq),
        useHistory().kosdaqSevenHourUpdate(newKosdaq),
        useHistory().kosdaqEightHourUpdate(newKosdaq),
        useHistory().kosdaqNineHourUpdate(newKosdaq),
        useHistory().kosdaqTenHourUpdate(newKosdaq),
        useHistory().kosdaqElevenHourUpdate(newKosdaq),
        useHistory().kosdaqTwelveHourUpdate(newKosdaq),
      ]);

      await Promise.all([
        useHistory().kosdaqThirteenHourUpdate(newKosdaq),
        useHistory().kosdaqFourteenHourUpdate(newKosdaq),
        useHistory().kosdaqFifteenHourUpdate(newKosdaq),
        useHistory().kosdaqSixteenHourUpdate(newKosdaq),
        useHistory().kosdaqSeventeenHourUpdate(newKosdaq),
        useHistory().kosdaqEighteenHourUpdate(newKosdaq),
        useHistory().kosdaqNineteenHourUpdate(newKosdaq),
        useHistory().kosdaqTwentyHourUpdate(newKosdaq),
        useHistory().kosdaqTwentyOneHourUpdate(newKosdaq),
        useHistory().kosdaqTwentyTwoHourUpdate(newKosdaq),
        useHistory().kosdaqTwentyThreeHourUpdate(newKosdaq),
      ]);

      await Promise.all([
        useHistory().nasdaqOneHourUpdate(newNasdaq),
        useHistory().nasdaqTwoHourUpdate(newNasdaq),
        useHistory().nasdaqThreeHourUpdate(newNasdaq),
        useHistory().nasdaqFourHourUpdate(newNasdaq),
        useHistory().nasdaqFiveHourUpdate(newNasdaq),
        useHistory().nasdaqSixHourUpdate(newNasdaq),
        useHistory().nasdaqSevenHourUpdate(newNasdaq),
        useHistory().nasdaqEightHourUpdate(newNasdaq),
        useHistory().nasdaqNineHourUpdate(newNasdaq),
        useHistory().nasdaqTenHourUpdate(newNasdaq),
        useHistory().nasdaqElevenHourUpdate(newNasdaq),
        useHistory().nasdaqTwelveHourUpdate(newNasdaq),
      ]);

      await Promise.all([
        useHistory().nasdaqThirteenHourUpdate(newNasdaq),
        useHistory().nasdaqFourteenHourUpdate(newNasdaq),
        useHistory().nasdaqFifteenHourUpdate(newNasdaq),
        useHistory().nasdaqSixteenHourUpdate(newNasdaq),
        useHistory().nasdaqSeventeenHourUpdate(newNasdaq),
        useHistory().nasdaqEighteenHourUpdate(newNasdaq),
        useHistory().nasdaqNineteenHourUpdate(newNasdaq),
        useHistory().nasdaqTwentyHourUpdate(newNasdaq),
        useHistory().nasdaqTwentyOneHourUpdate(newNasdaq),
        useHistory().nasdaqTwentyTwoHourUpdate(newNasdaq),
        useHistory().nasdaqTwentyThreeHourUpdate(newNasdaq),
      ]);

      await Promise.all([
        useHistory().seoulOneDayUpdate(newSeoul),
        useHistory().seoulTwoDaysUpdate(newSeoul),
        useHistory().seoulThreeDaysUpdate(newSeoul),
        useHistory().seoulFourDaysUpdate(newSeoul),
        useHistory().seoulFiveDaysUpdate(newSeoul),
        useHistory().seoulSixDaysUpdate(newSeoul),
      ]);

      await Promise.all([
        useHistory().kosdaqOneDayUpdate(newKosdaq),
        useHistory().kosdaqTwoDaysUpdate(newKosdaq),
        useHistory().kosdaqThreeDaysUpdate(newKosdaq),
        useHistory().kosdaqFourDaysUpdate(newKosdaq),
        useHistory().kosdaqFiveDaysUpdate(newKosdaq),
        useHistory().kosdaqSixDaysUpdate(newKosdaq),
      ]);

      await Promise.all([
        useHistory().nasdaqOneDayUpdate(newNasdaq),
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
