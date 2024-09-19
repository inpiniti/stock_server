export default defineEventHandler(async (event) => {
  await useLearning().runAll();
});
