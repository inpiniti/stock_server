import { updateStore } from "../tradingview/[countryCode]";
import { getStockInfo } from "./stockInfo.get";

export default defineEventHandler(async (event) => {
  try {
    // 데이터 크롤링 조회
    const data = await updateStore("kr");
    // [
    //   {
    //       "name": "005930",
    //       "description": "삼성전자보통주",
    //       "logoid": "samsung",
    //       "update_mode": "delayed_streaming_1200",
    //       "type": "stock",
    //       "close": 80900,
    //       "pricescale": 1,

    // seoul 만 뽑아내서 저장
    const seoul_orgin_list = await getStockInfo({
      country: "KR",
      market: "Seoul",
    });
    // [
    //   {
    //       "stock_code": "005935",
    //       "country": "KR",
    //       "market": "Seoul"
    //   },
    //   {
    //       "stock_code": "005930",
    //       "country": "KR",
    //       "m
    const seoul_code_list = seoul_orgin_list.map(
      (item: { stock_code: string; country: string; market: string }) =>
        item.stock_code
    );
    const seoul_data_list = data.filter((item: { name: string }) => {
      return seoul_code_list.includes(item.name);
    });
    console.log("seoul_data_list_leanth", seoul_data_list.length);
    console.log("seoul_data_list[0]", seoul_data_list[0]);

    // kosdaq 만 뽑아내서 저장
    const kosdaq_orgin_list = await getStockInfo({
      country: "KR",
      market: "KOSDAQ",
    });
    const kosdaq_code_list = kosdaq_orgin_list.map(
      (item: { stock_code: string; country: string; market: string }) =>
        item.stock_code
    );
    const kosdaq_data_list = data.filter((item: { name: string }) => {
      return kosdaq_code_list.includes(item.name);
    });
    console.log("kosdaq_data_list_leanth", kosdaq_data_list.length);
    console.log("kosdaq_data_list[0]", kosdaq_data_list[0]);

    // 데이터 분할
    // 예를 들어, 각 행이 83개의 파라미터를 사용한다고 가정하면, 최대 6553개의 행을 한 번에 삽입할 수 있습니다.
    // , 추가적인 여유 100을 두어 계산합니다.
    // 행도 여유를 두어 90으로 계산합니다.
    let firstRowParamCount = Object.keys(seoul_data_list[0]).length; // 첫 번째 행의 파라미터 수를 계산합니다.
    let chunkSize = Math.floor(65534 / firstRowParamCount); // 83은 각 행의 파라미터 수입니다.
    let dataChunks = splitData(data, chunkSize);

    // 분할된 데이터 삽입
    for (const chunk of dataChunks) {
      await useGalaxy().insert(pgTableKrSeoul).values(chunk);
    }

    firstRowParamCount = Object.keys(kosdaq_data_list[0]).length; // 첫 번째 행의 파라미터 수를 계산합니다.
    chunkSize = Math.floor(65534 / firstRowParamCount); // 83은 각 행의 파라미터 수입니다.
    dataChunks = splitData(data, chunkSize);

    // 분할된 데이터 삽입
    for (const chunk of dataChunks) {
      await useGalaxy().insert(pgTableKrKosdaq).values(chunk);
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
