export default defineEventHandler(async (event) => {
  await useInfo().seoulInsert();
  await useInfo().kosdaqInsert();
  await useInfo().nasdaqInsert();
  return {
    hello: "world",
  };
});
