export default defineEventHandler(async (event) => {
  // 데이터 가져오기 실행
  await main1Hour5Percent();

  return "success";
});
