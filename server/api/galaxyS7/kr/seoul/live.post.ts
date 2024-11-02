export default defineEventHandler(async (event) => {
  // "KR", "Seoul" 이런식으로 들어옴
});

export const seoul_live_save = async (data: any) => {
  console.log("seoul_live_save", data.length);
  try {
    const firstRowParamCount = Object.keys(data[0]).length; // 첫 번째 행의 파라미터 수를 계산합니다.
    const chunkSize = Math.floor(65534 / firstRowParamCount); // 83은 각 행의 파라미터 수입니다.
    const dataChunks = splitData(data, chunkSize);

    console.log("delete seoul_live");
    const delete_data = await useDrizzle().delete(pgTableKrSeoulLive);
    console.log("delete_data", delete_data);
    console.log("delete seoul_live");

    // 분할된 데이터 삽입
    for (const chunk of dataChunks) {
      console.log("insert seoul_live");
      await useDrizzle().insert(pgTableKrSeoulLive).values(chunk);
      console.log("insert seoul_live");
    }

    return "success";
  } catch (error) {
    return error;
  }
};

// 데이터 분할 함수
function splitData(data: any, chunkSize: number) {
  let result = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    result.push(data.slice(i, i + chunkSize));
  }
  return result;
}
