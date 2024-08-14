export default defineEventHandler(async (event) => {
  return await useLive().kosdaqSelect();
});
