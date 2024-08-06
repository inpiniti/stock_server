export default defineEventHandler(async (event) => {
  try {
    //useLearning().runAll();
    //return true;
    const data = await useLive().seoulSelect();
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
});
