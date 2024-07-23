import { getCurrentStoer as investingStore } from "../../investing/[countryCode]/[exchangeCode]";
import { getCurrentStoer as tradingviewStore } from "../../tradingview/[countryCode]";

let store: any = [];

export default defineEventHandler(async (event) => {
  const countryCode = getRouterParam(event, "countryCode");
  const exchangeCode = getRouterParam(event, "exchangeCode");
  const body = await readBody(event);

  setTimeout(async () => {
    const investingArr = await investingStore(
      String(countryCode),
      String(exchangeCode)
    );
    // "Symbol": "005935",

    const tradingviewArr = await tradingviewStore(String(countryCode));
    // "name": "005935",

    // Symbol과 name이 일치하는 데이터를 찾아서 합친다.
    store = investingArr.map((i: any) => {
      const t = tradingviewArr.find((t: any) => t.name === i.stock_symbol);
      return {
        ...i,
        ...t,
      };
    });
  });

  const scoreStore = store
    .map((stock: any) => ({
      ...stock,
      score: getScore(stock, body),
      volumeRate:
        Math.round((stock.turnover_volume / stock.avg_volume) * 100 * 10) / 10,
    }))
    .sort((a: any, b: any) => {
      return b.score - a.score;
    })
    .slice(0, 100);

  return scoreStore;
});

const getScore = (stock: any, controller: any) => {
  let totalScore = 0;

  // 오버뷰.상대적 거래량이 1보다 크면 3점
  // 오버뷰.P/E가 50보다 크면 0
  // 오버뷰.P/E가 25~50 1점
  // 오버뷰.P/E가 15~25 2점
  // 오버뷰.P/E가 5~15 3점
  // 오버뷰.P/E가 5보다 작으면 4점
  if (Number(stock?.relative_volume_10d_calc) > 1)
    totalScore += controller.relative_volume_10d_calc[0];
  if (stock?.price_earnings_ttm > 50) totalScore += 0;
  else if (stock?.price_earnings_ttm > 25)
    totalScore += 1 * controller.price_earnings_ttm[0];
  else if (stock?.price_earnings_ttm > 15)
    totalScore += 2 * controller.price_earnings_ttm[0];
  else if (stock?.price_earnings_ttm >= 5)
    totalScore += 3 * controller.price_earnings_ttm[0];
  else totalScore += 4 * controller.price_earnings_ttm[0];

  // 오버뷰.EPS 희석 성장 TTM YoY가 50 이상이면 5점
  // 오버뷰.EPS 희석 성장 TTM YoY가 25~50이면 4점
  // 오버뷰.EPS 희석 성장 TTM YoY가 10~25이면 3점
  // 오버뷰.EPS 희석 성장 TTM YoY가 0~10이면 2점
  // 오버뷰.EPS 희석 성장 TTM YoY가 -25~0 미만이면 1점
  // 오버뷰.EPS 희석 성장 TTM YoY가 -25 미만이면 0점
  if (stock?.earnings_per_share_diluted_yoy_growth_ttm >= 50)
    totalScore += 5 * controller.earnings_per_share_diluted_yoy_growth_ttm[0];
  else if (stock?.earnings_per_share_diluted_yoy_growth_ttm >= 25)
    totalScore += 4 * controller.earnings_per_share_diluted_yoy_growth_ttm[0];
  else if (stock?.earnings_per_share_diluted_yoy_growth_ttm >= 10)
    totalScore += 3 * controller.earnings_per_share_diluted_yoy_growth_ttm[0];
  else if (stock?.earnings_per_share_diluted_yoy_growth_ttm >= 0)
    totalScore += 2 * controller.earnings_per_share_diluted_yoy_growth_ttm[0];
  else if (stock?.earnings_per_share_diluted_yoy_growth_ttm >= -25)
    totalScore += 1 * controller.earnings_per_share_diluted_yoy_growth_ttm[0];
  else totalScore += 0;

  // ROE 30% 이상이면 4점
  // ROE 15% ~ 3점
  // ROE 0% ~ 2점
  // ROE -15% ~ 1점
  // ROE -15% 보다 작으면 0점
  if (stock.return_on_equity_fq >= 30)
    totalScore += 4 * controller.return_on_equity_fq[0];
  else if (stock.return_on_equity_fq >= 15)
    totalScore += 3 * controller.return_on_equity_fq[0];
  else if (stock.return_on_equity_fq >= 0)
    totalScore += 2 * controller.return_on_equity_fq[0];
  else if (stock.return_on_equity_fq >= -15)
    totalScore += 1 * controller.return_on_equity_fq[0];
  else totalScore += 0;

  // PEG 1 이하면 3점

  // 시간외.갭 % 0 이상이면 3점
  // 시간외.볼륨변화 0 이상이면 3점
  if (stock?.gap >= 0) totalScore += controller.gap[0];
  if (stock?.volume_change >= 0) totalScore += controller.volume_change[0];

  // 평가.시가총액 실적 % 1Y가 0 이상이면 3점
  if (stock?.["Perf.1Y.MarketCap"] >= 0) totalScore += controller.marketCap[0];

  // 수익성.총마진 0 이상이면 3점
  // 수익성.영업마진 0 이상이면 3점
  // 수익성.세전 마진 0 이상이면 3점
  // 수익성.넷 마진 0 이상이면 3점
  // 수익성.FCF 마진 0 이상이면 3점
  // 수익성.ROA 0 이상이면 3점
  // 수익성.ROE 0 이상이면 3점
  // 수익성.투하자본수익률 0 이상이면 3점
  if (stock.gross_margin_ttm >= 0) totalScore += controller.gross_margin_ttm[0];
  if (stock.operating_margin_ttm >= 0)
    totalScore += controller.operating_margin_ttm[0];
  if (stock.pre_tax_margin_ttm >= 0) totalScore += 3;
  if (stock.net_margin_ttm >= 0) totalScore += 3;
  if (stock.free_cash_flow_margin_ttm >= 0) totalScore += 3;
  if (stock.return_on_assets_fq >= 0) totalScore += 3;
  if (stock.return_on_equity_fq >= 0) totalScore += 3;
  if (stock.return_on_invested_capital_fq >= 0) totalScore += 3;

  // 손익계산.매출 성장률 0 이상이면 3점
  if (stock?.PerformanceYear >= 0) totalScore += 3;

  // 테크니컬즈.기술등급 0.5 ~ 이면 5점
  // 테크니컬즈.기술등급 0.1 ~ 0.5 이상이면 4점
  // 테크니컬즈.기술등급 -0.1 ~ 0.1  이상이면 3점
  // 테크니컬즈.기술등급 -0.5 ~ -0.1  이상이면 2점
  // 테크니컬즈.기술등급 ~ -0.5 이상이면 1점
  if (stock?.["Recommend.All"] >= 0.5) totalScore += 5;
  else if (stock?.["Recommend.All"] >= 0.1) totalScore += 4;
  else if (stock?.["Recommend.All"] >= -0.1) totalScore += 3;
  else if (stock?.["Recommend.All"] >= -0.5) totalScore += 2;
  else totalScore += 1;

  // 테크니컬즈.MA 레이팅 0 이상이면 3점
  // 테크니컬즈.Os 등급 0 이상이면 3점
  if (stock?.["Recommend.MA"] >= 0) totalScore += 3;
  if (stock?.["Recommend.Other"] >= 0) totalScore += 3;

  return totalScore;
};
