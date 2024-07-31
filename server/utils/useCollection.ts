export const useCollection = async () => {
  const [krResult, usResult] = await Promise.all([
    useLive().newKr(),
    useLive().newUs(),
  ]);

  const { newSeoul, newKosdaq } = krResult;
  const { newNasdaq } = usResult;

  useLive().seoulInsert(newSeoul);
  useLive().kosdaqInsert(newKosdaq);
  useLive().nasdaqInsert(newNasdaq);
};
