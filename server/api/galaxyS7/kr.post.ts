import { updateStore } from "../tradingview/[countryCode]";
import { getStockInfo } from "./stockInfo.get";
import { getLatestKosdaq } from "./kr/kosdaq/last";
import { getLatestSeoul } from "./kr/seoul/last";
import { kosdaq_live_save } from "./kr/kosdaq/live.post";
import { seoul_live_save } from "./kr/seoul/live.post";

export default defineEventHandler(async (event) => {
  return krCollectSave();
});

// 수집 저장
export const krCollectSave = async () => {
  try {
    // 데이터 크롤링 조회
    const data = await updateStore("kr");

    // seoul 만 뽑아내서 저장
    const seoul_orgin_list = await getStockInfo({
      country: "KR",
      market: "Seoul",
    });
    const seoul_code_list = seoul_orgin_list.map(
      (item: { stock_code: string; country: string; market: string }) =>
        item.stock_code
    );
    const seoul_data_list: any[] = data.filter((item: { name: string }) => {
      return seoul_code_list.includes(item.name);
    });
    console.log("seoul_data_list_leanth", seoul_data_list.length);
    //seoul_live_save(seoul_data_list);

    // kosdaq 만 뽑아내서 저장
    const kosdaq_orgin_list = await getStockInfo({
      country: "KR",
      market: "KOSDAQ",
    });
    const kosdaq_code_list = kosdaq_orgin_list.map(
      (item: { stock_code: string; country: string; market: string }) =>
        item.stock_code
    );
    const kosdaq_data_list: any[] = data.filter((item: { name: string }) => {
      return kosdaq_code_list.includes(item.name);
    });
    console.log("kosdaq_data_list_leanth", kosdaq_data_list.length);
    //kosdaq_live_save(kosdaq_data_list);

    // getLatestSeoul 와 seoul_data_list 를 비교하여, 새로운 데이터만 저장
    const latestSeoulList: { name: string; volume: string }[] =
      await getLatestSeoul();
    console.log("latestSeoulList", latestSeoulList);
    // 최신 데이터를 기반으로 객체 생성
    const latestDataMap = latestSeoulList.reduce(
      (acc: any, { name, volume }) => {
        acc[name] = volume;
        return acc;
      },
      {}
    );
    // 변동사항이 있는 데이터만 필터링
    const new_seoul_data_list = seoul_data_list.filter(({ name, volume }) => {
      // name과 volume이 모두 일치하지 않는 경우만 새 배열에 포함
      return !(name in latestDataMap && latestDataMap[name] == volume);
    });

    // getLatestKosdaq 와 kosdaq_data_list 를 비교하여, 새로운 데이터만 저장
    const latestKosdaqList: { name: string; volume: string }[] =
      await getLatestKosdaq();
    console.log("latestKosdaqList", latestKosdaqList);
    // 최신 데이터를 기반으로 객체 생성
    const latestKosdaqMap = latestKosdaqList.reduce(
      (acc: any, { name, volume }) => {
        acc[name] = volume;
        return acc;
      },
      {}
    );
    // 변동사항이 있는 데이터만 필터링
    const new_kosdaq_data_list = kosdaq_data_list.filter(
      ({ name, volume }) =>
        !(name in latestKosdaqMap && latestKosdaqMap[name] == volume)
    );

    console.log("new_seoul_data_list.length", new_seoul_data_list.length);
    console.log("new_kosdaq_data_list.length", new_kosdaq_data_list.length);

    // 데이터 분할
    // 예를 들어, 각 행이 83개의 파라미터를 사용한다고 가정하면, 최대 6553개의 행을 한 번에 삽입할 수 있습니다.
    // , 추가적인 여유 100을 두어 계산합니다.
    // 행도 여유를 두어 90으로 계산합니다.
    if (new_seoul_data_list.length !== 0) {
      const firstRowParamCount = Object.keys(new_seoul_data_list[0]).length; // 첫 번째 행의 파라미터 수를 계산합니다.
      const chunkSize = Math.floor(65534 / firstRowParamCount); // 83은 각 행의 파라미터 수입니다.
      const dataChunks = splitData(new_seoul_data_list, chunkSize);

      // 분할된 데이터 삽입
      for (const chunk of dataChunks) {
        //await useGalaxy().insert(pgTableKrSeoul).values(chunk);
        const { error } = await useSupabase().from("seoul").insert(chunk);
        if (error) {
          console.error("Error inserting data:", error);
          throw error;
        }
      }
    }

    if (new_kosdaq_data_list.length !== 0) {
      const firstRowParamCount = Object.keys(new_kosdaq_data_list[0]).length; // 첫 번째 행의 파라미터 수를 계산합니다.
      const chunkSize = Math.floor(65534 / firstRowParamCount); // 83은 각 행의 파라미터 수입니다.
      const dataChunks = splitData(new_kosdaq_data_list, chunkSize);

      // 분할된 데이터 삽입
      for (const chunk of dataChunks) {
        //await useGalaxy().insert(pgTableKrKosdaq).values(chunk);
        const { error } = await useSupabase().from("kosdaq").insert(chunk);
        if (error) {
          console.error("Error inserting data:", error);
          throw error;
        }
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
