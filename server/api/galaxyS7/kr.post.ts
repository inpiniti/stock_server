import { updateStore } from "../tradingview/[countryCode]";
import { getStockInfo } from "./stockInfo.get";
import { getLatestKosdaq } from "./kr/kosdaq/last";
import { getLatestSeoul } from "./kr/seoul/last";

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
    const seoul_data_list: any[] = data.filter((item: { name: string }) => {
      return seoul_code_list.includes(item.name);
    });
    console.log("seoul_data_list_leanth", seoul_data_list.length);
    // [{ name: '005930',
    //   description: '삼성전자보통주',
    //   logoid: 'samsung',
    //   update_mode: 'delayed_streaming_1200',
    //   type: 'stock',
    //   close: 80900,
    //   pricescale: 1,
    //   minmov: 100,
    //   fractional: 'false',
    //   minmove2: 0,
    //   currency: 'KRW',
    //   change: 0.6218905472636816,
    //   volume: 14508334,
    //   relative_volume_10d_calc: 0.7210958969907112,
    //   market_cap_basic: 535208732147217,
    //   fundamental_currency_code: 'KRW',
    //   price_earnings_ttm: 27.904432320714022,
    //   earnings_per_share_diluted_ttm: 2899.181,
    //   earnings_per_share_diluted_yoy_growth_ttm: -56.239496682084734,
    //   dividends_yield_current: 1.78492,
    //   sector_tr: '전자 기술',
    //   market: 'korea',
    //   sector: 'Electronic Technology',
    //   recommendation_mark: 1.225,
    //   exchange: 'KRX',
    //   perf_w: -5.490654205607477,
    //   perf_1_m: 0.9987515605493134,
    //   perf_3_m: 3.9845758354755785,
    //   perf_6_m: 9.76933514246947,
    //   perf_y_t_d: 3.452685421994885,
    //   perf_y: 15.736766809728183,
    //   perf_5_y: 71.58006362672323,
    //   perf_10_y: 198.74446085672082,
    //   perf_all: 25458.9536221255,
    //   volatility_w: 1.659131365931498,
    //   volatility_m: 1.9780899848756683,
    //   premarket_close: null,
    //   premarket_change: null,
    //   premarket_gap: null,
    //   premarket_volume: null,
    //   gap: 0.3731343283582089,
    //   volume_change: -28.6141068719838,
    //   postmarket_close: null,
    //   postmarket_change: null,
    //   postmarket_volume: null,
    //   perf_1_y_market_cap: 19.13703792246997,
    //   price_earnings_growth_ttm: null,
    //   price_sales_current: 2.044623603798172,
    //   price_book_fq: 1.5167101491530661,
    //   price_to_cash_f_operating_activities_ttm: 11.054221439955725,
    //   price_free_cash_flow_ttm: null,
    //   price_to_cash_ratio: 5.642376605849798,
    //   enterprise_value_current: 462921114147217,
    //   enterprise_value_to_revenue_ttm: 1.7331006884270925,
    //   enterprise_value_to_ebit_ttm: 36.96527085126417,
    //   enterprise_value_ebitda_ttm: 8.979345308284302,
    //   dps_common_stock_prim_issue_fy: 1444,
    //   dps_common_stock_prim_issue_fq: 361,
    //   dividends_yield: 1.7849196,
    //   dividend_payout_ratio_ttm: 49.80716967998893,
    //   dps_common_stock_prim_issue_yoy_growth_fy: 0,
    //   continuous_dividend_payout: 8,
    //   continuous_dividend_growth: 0,
    //   gross_margin_ttm: 31.6295449362965,
    //   operating_margin_ttm: 4.68845662027071,
    //   pre_tax_margin_ttm: 5.98941339048204,
    //   net_margin_ttm: 7.3728030628052,
    //   free_cash_flow_margin_ttm: -3.024034782571713,
    //   return_on_assets_fq: 4.25802336674004,
    //   return_on_equity_fq: 5.5291903621015,
    //   return_on_invested_capital_fq: 5.46229392982746,
    //   research_and_dev_ratio_ttm: 11.07827288643204,
    //   sell_gen_admin_exp_other_ratio_ttm: 15.862815429593713,
    //   total_assets_fq: 470899812000000,
    //   total_current_assets_fq: 208544280000000,
    //   cash_n_short_term_invest_fq: 97392826000000,
    //   total_liabilities_fq: 98983688000000,
    //   total_debt_fq: 15504153000000,
    //   net_debt_fq: -81888673000000,
    //   total_equity_fq: 371916124000000,
    //   current_ratio_fq: 2.55036534939832,
    //   quick_ratio_fq: 1.89795653938399,
    //   debt_to_equity_fq: 0.04279190772493101,
    //   cash_n_short_term_invest_to_total_debt_fq: 6.281725031996266,
    //   cash_f_operating_activities_ttm: 49711959000000,
    //   cash_f_investing_activities_ttm: -55427376000000,
    //   cash_f_financing_activities_ttm: -6343413000000,
    //   free_cash_flow_ttm: -8077370000000,
    //   capital_expenditures_ttm: -60785535000000,
    //   recommend_all: -0.02121212121212121,
    //   recommend_m_a: -0.13333333333333333,
    //   recommend_other: 0.09090909090909091,
    //   r_s_i: 42.50882184060312,
    //   mom: -3500,
    //   a_o: -260.58823529411166,
    //   c_c_i20: -117.79815571138703,
    //   stoch_k: 4.697651174412793,
    //   stoch_d: 10.328422861218975 },{...

    // db의 마지막 데이터 조회
    // WITH LatestEntries AS (
    //   SELECT kr_seoul.name, kr_seoul.volume, kr_seoul.created_at,
    //          ROW_NUMBER() OVER(PARTITION BY kr_seoul.name ORDER BY kr_seoul.created_at DESC) AS rn
    //   FROM kr_seoul
    // )
    // SELECT LatestEntries.name, CAST(LatestEntries.volume AS bigint),
    //        LatestEntries.created_at AT TIME ZONE 'UTC' AS created_at
    // FROM LatestEntries
    // WHERE rn = 1;

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

    // getLatestSeoul 와 seoul_data_list 를 비교하여, 새로운 데이터만 저장
    const latestSeoulList: { name: string; volume: string }[] =
      await getLatestSeoul();
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
        await useGalaxy().insert(pgTableKrSeoul).values(chunk);
      }
    }

    if (new_kosdaq_data_list.length !== 0) {
      const firstRowParamCount = Object.keys(new_kosdaq_data_list[0]).length; // 첫 번째 행의 파라미터 수를 계산합니다.
      const chunkSize = Math.floor(65534 / firstRowParamCount); // 83은 각 행의 파라미터 수입니다.
      const dataChunks = splitData(new_kosdaq_data_list, chunkSize);

      // 분할된 데이터 삽입
      for (const chunk of dataChunks) {
        await useGalaxy().insert(pgTableKrKosdaq).values(chunk);
      }
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
