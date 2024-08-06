export default defineEventHandler(async (event) => {
  try {
    console.log("runAll", 1);
    console.log("runAll", 2);
    console.log("runAll", 3);
    for (let i = 0; i < [1, 2, 3].length; i++) {
      console.log("runAll", [1, 2, 3][i]);
    }
    return true;
    //const data = await useLive().kosdaqSelect();
    //return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
});
