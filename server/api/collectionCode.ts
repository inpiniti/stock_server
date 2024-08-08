export default defineEventHandler(async (event) => {
  try {
    await useInfo().truncate();
    await Promise.all([
      useInfo().seoulInsert(),
      useInfo().kosdaqInsert(),
      useInfo().nasdaqInsert(),
    ]);
    return "코드 정보가 수집 완료 되었습니다.";
  } catch (error) {
    return `코드 정보 수집에 실패하였습니다. : ${error}`;
  }
});
