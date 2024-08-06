export default defineEventHandler(async (event) => {
  try {
    return await useLive().seoulSelect();
  } catch (error) {
    console.log("error", error);
    return error;
  }
});
