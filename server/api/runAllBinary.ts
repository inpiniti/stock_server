export default defineEventHandler(async (event) => {
  await useLearning().runAllBinary();
});
