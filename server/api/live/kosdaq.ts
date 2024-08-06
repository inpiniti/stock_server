export default defineEventHandler(async (event) => {
  try {
    return await useLive().kosdaqSelect();
  } catch (error) {
    console.log("error", error);
    return error;
  }
});
