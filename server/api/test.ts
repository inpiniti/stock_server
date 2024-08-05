export default defineEventHandler(async (event) => {
  return await useTrainingData().getNasdaq("h1");
});
