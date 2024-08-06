export default defineEventHandler(async (event) => {
  try {
    return await useLive().nasdaqSelect();
  } catch (error) {
    console.log("error", error);
    return error;
  }
});
