import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { updateStore } from "../tradingview/[countryCode]";

export default defineEventHandler(async (event) => {
  try {
    const ip = "116.121.7.117";
    const port = "5432";
    const user = "inpiniti";
    const password = "wjd53850";
    const database = "inpiniti";

    const url = `postgres://${user}:${password}@${ip}:${port}/${database}`;

    // for query purposes
    const queryClient = postgres(url);
    const db = drizzle(queryClient);
    //const data = await db.select().from(pgTableKrSeoul);

    // 데이터 조회
    const data = await updateStore("kr");

    // seoul 만 뽑아내서 저장
    // kosdaq 만 뽑아내서 저장

    // 데이터 분할
    // 예를 들어, 각 행이 83개의 파라미터를 사용한다고 가정하면, 최대 6553개의 행을 한 번에 삽입할 수 있습니다.
    // , 추가적인 여유 100을 두어 계산합니다.
    // 행도 여유를 두어 90으로 계산합니다.
    const firstRowParamCount = Object.keys(data[0]).length; // 첫 번째 행의 파라미터 수를 계산합니다.
    const chunkSize = Math.floor(65534 / firstRowParamCount); // 83은 각 행의 파라미터 수입니다.
    const dataChunks = splitData(data, chunkSize);

    // 분할된 데이터 삽입
    for (const chunk of dataChunks) {
      await db.insert(pgTableKrSeoul).values(chunk);
    }

    return "success";
  } catch (error) {
    return error;
  }
});

// 데이터 분할 함수
function splitData(data: any, chunkSize: number) {
  let result = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    result.push(data.slice(i, i + chunkSize));
  }
  return result;
}
