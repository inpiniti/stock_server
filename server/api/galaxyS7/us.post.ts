import { updateStore } from "../tradingview/[countryCode]";
import { getStockInfo } from "./stockInfo.get";
import { getLatestNasdaq } from "./us/nasdaq/last";
import { nasdaq_live_save } from "./us/nasdaq/live.post";

export default defineEventHandler(async (event) => {
  return usCollectSave();
});

// 수집 저장
export const usCollectSave = async () => {
  try {
    // 데이터 크롤링 조회
    const data = await updateStore("us");
    console.log("data.leanth", data.length);

    // nasdaq 만 뽑아내서 저장
    const nasdaq_orgin_list = await getStockInfo({
      country: "US",
      market: "NASDAQ",
    });
    console.log("nasdaq_orgin_list.leanth", nasdaq_orgin_list.length);

    const nasdaq_code_list = nasdaq_orgin_list.map(
      (item: { stock_code: string; country: string; market: string }) =>
        item.stock_code
    );
    const nasdaq_data_list: any[] = data.filter((item: { name: string }) => {
      return nasdaq_code_list.includes(item.name);
    });
    console.log("nasdaq_data_list_leanth", nasdaq_data_list.length);
    nasdaq_live_save(nasdaq_data_list);

    // getLatestSeoul 와 seoul_data_list 를 비교하여, 새로운 데이터만 저장
    const latestNasdaqList: { name: string; volume: string }[] =
      await getLatestNasdaq();
    // 최신 데이터를 기반으로 객체 생성
    const latestDataMap = latestNasdaqList.reduce(
      (acc: any, { name, volume }) => {
        acc[name] = volume;
        return acc;
      },
      {}
    );
    // 변동사항이 있는 데이터만 필터링
    const new_nasdaq_data_list = nasdaq_data_list.filter(({ name, volume }) => {
      // name과 volume이 모두 일치하지 않는 경우만 새 배열에 포함
      return !(name in latestDataMap && latestDataMap[name] == volume);
    });

    console.log("new_nasdaq_data_list.length", new_nasdaq_data_list.length);

    // 데이터 분할
    // 예를 들어, 각 행이 83개의 파라미터를 사용한다고 가정하면, 최대 6553개의 행을 한 번에 삽입할 수 있습니다.
    // , 추가적인 여유 100을 두어 계산합니다.
    // 행도 여유를 두어 90으로 계산합니다.
    if (new_nasdaq_data_list.length !== 0) {
      const firstRowParamCount = Object.keys(new_nasdaq_data_list[0]).length; // 첫 번째 행의 파라미터 수를 계산합니다.
      const chunkSize = Math.floor(65534 / firstRowParamCount); // 83은 각 행의 파라미터 수입니다.
      const dataChunks = splitData(new_nasdaq_data_list, chunkSize);

      // 분할된 데이터 삽입
      for (const chunk of dataChunks) {
        await useGalaxy().insert(pgTableUsNasdaq).values(chunk);
      }
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
