export const useCollection = async () => {
  const [krResult, usResult] = await Promise.all([
    useLive().newKr(),
    useLive().newUs(),
  ]);

  const { newSeoul, newKosdaq, originKosdaq, originSeoul } = krResult;
  const { newNasdaq, originNasdaq } = usResult;

  console.log("newSeoul", newSeoul.length);
  console.log("newKosdaq", newKosdaq.length);
  console.log("newNasdaq", newNasdaq.length);

  console.log("originSeoul", originSeoul.length);
  console.log("originKosdaq", originKosdaq.length);
  console.log("originNasdaq", originNasdaq.length);

  await Promise.all([
    useLive().seoulInsert(originSeoul),
    useLive().kosdaqInsert(originKosdaq),
    useLive().nasdaqInsert(originNasdaq),
  ]);
};
