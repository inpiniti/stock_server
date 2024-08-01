import { useHistory } from "./useHistory";

export const useCollection = async () => {
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
    console.log("newSeoul", newSeoul.length);
    console.log("newKosdaq", newKosdaq.length);
    console.log("newNasdaq", newNasdaq.length);

    await Promise.all([
      useHistory().seoulInsert(newSeoul),
      useHistory().kosdaqInsert(newKosdaq),
      useHistory().nasdaqInsert(newNasdaq),
    ]);
  }
};
