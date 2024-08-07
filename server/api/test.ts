import { getLoopData } from "../api/investing/code";

export default defineEventHandler(async (event) => {
  const data = await getLoopData({
    country: "KR",
    market: "Seoul",
  });
  console.log(data.length);

  return {
    hello: "world",
  };
});
