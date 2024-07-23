export default defineEventHandler(async (event) => {
  const data = await fetchData1Day10Percent();

  return data;
});
