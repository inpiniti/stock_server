const appConfig = useAppConfig();
const codeList: any = appConfig.codeList;

let store: any = {};
let isUpdating = false; // 플래그를 추가

export default defineEventHandler(async (event) => {
  const countryCode = getRouterParam(event, "countryCode");
  const exchangeCode = getRouterParam(event, "exchangeCode");

  //const data = await updateStore(String(countryCode), String(exchangeCode));
  //await insertDataToSupabase(data);

  //return "null";

  return await updateStore(String(countryCode), String(exchangeCode));
});

export const getCurrentStoer = async (
  countryCode: string,
  exchangeCode: string
) => {
  const currentStore = store?.[countryCode + exchangeCode] ?? [];
  if (!isUpdating) {
    setTimeout(async () => {
      store[countryCode + exchangeCode] = await updateStore(
        countryCode,
        exchangeCode
      );
    });
  }
  return currentStore;
};

export async function updateStore(countryCode: string, exchangeCode: string) {
  //   const a = {
  //     pair_ID: 951042, // 데이터 쌍의 ID
  //     stock_symbol: "005935", // 주식 심볼
  //     parent_pair_ID: 0, // 부모 데이터 쌍의 ID
  //     canonical_to_pair_id: 0, // 표준화된 데이터 쌍 ID
  //     override_country_ID: 0, // 나라 ID를 덮어쓰기
  //     eq_pe_ratio: 26.39, // 주가수익비율(P/E Ratio)
  //     eq_market_cap: 541400000000000, // 시장가치(Market Capitalization)
  //     eq_one_year_return: 9.18, // 1년 수익률
  //     eq_dividend: 1444, // 배당금
  //     eq_eps: 2899.18, // 주당순이익(EPS)
  //     eq_beta: 0.838, // 베타값 (변동성 지표)
  //     eq_revenue: 267110000000000, // 매출
  //     exchange_ID: 60, // 거래소 ID
  //     security_type: "Preferred", // 주식 종류 (우선주)
  //     eq_pe_ratio_frmt: "26.39", // 주가수익비율(P/E Ratio) - 포맷된 문자열
  //     eq_market_cap_frmt: "541.40T", // 시장가치(Market Capitalization) - 포맷된 문자열
  //     eq_one_year_return_frmt: "9.18%", // 1년 수익률 - 포맷된 문자열
  //     eq_dividend_frmt: "1.44K", // 배당금 - 포맷된 문자열
  //     eq_eps_frmt: "2.90K", // 주당순이익(EPS) - 포맷된 문자열
  //     eq_beta_frmt: "0.84", // 베타값 (변동성 지표) - 포맷된 문자열
  //     eq_revenue_frmt: "267.11T", // 매출 - 포맷된 문자열
  //     a1fcf: "-13473865", // 자유현금흐름 (FCF)
  //     aastturn: "0.572656", // 총자산회전율
  //     abepsxclxo: "2130.738133", // 특별항목 제외 주당 순이익(EPS)
  //     abvps: "52002.204435318", // 장부가치(BVPS)
  //     acfshr: "6497.8030543737", // 주식당 현금흐름 (CFPS)
  //     acshps: "10169.918548588", // 주식당 현금 (CASHPS)
  //     acurratio: "2.587664", // 유동비율(Current Ratio)
  //     adiv5yavg: "11901042.4", // 5년 평균 배당수익율
  //     aebitd: "44033523", // 상각전 영업이익 (EBITDA)
  //     aebt: 11006265, // 세전 순이익 (EBT)
  //     aebtnorm: "10987401", // 정상세전 순이익 (Normalized EBT)
  //     aepsinclxo: "2130.738133", // 특별항목 포함 주당 순이익 (EPS)
  //     aepsxclxor: "2130.738133", // 특별항목 제외 주당 순이익 (EPS)
  //     agrosmgn: "30.3345", // 매출총이익률
  //     aintcov: "7.059344070914", // 이자보상비율
  //     ainvturn: "3.4752351663662", // 재고자산 회전율
  //     altd2eq: "0.15219892265398", // 부채비율
  //     aniac: 14473401, // 순 이익 후 현금 (Net Income After Cash)
  //     aniacnorm: "14473401", // 정규화된 순 이익 후 현금 (Normalized Net Income After Cash)
  //     aniperemp: "NA", // 직원당 순이익 (NIA per Employee)
  //     anpmgnpct: "5.5895778428893", // 순이익률
  //     aopmgnpct: "2.5361436157532", // 영업이익률
  //     apayratio: "68.1558", // 배당지급비율
  //     apeexclxor: "16.72139897663", // 이번 분기 EPS (주당순이익, 특별항목 제외) 예상치
  //     apenorm: "16.72139897663", // 이번 분기 NPE (정규화된 예상 주당수익)
  //     apr2rev: "1.9872085897893", // 주가 매출비율
  //     apr2tanbk: "1.5728467371431", // 주가 순자산비율 (순자산 대비 주가비율)
  //     aprfcfps: "12.145604048962", // 주식당 자유현금흐름 (FCFPS)
  //     aprice2bk: "1.4699544734604", // 주가 대비 장부가 비율
  //     aptmgnpct: "4.2505818070658", // 최종 순이익률
  //     aquickrati: "1.7043784601082", // 당좌비율 (Quick Ratio)
  //     arecturn: "7.155982", // 매출채권 회전율
  //     arevperemp: "NA", // 직원당 매출
  //     arevps: "38119.844271823", // 주식당 매출(Revenue per Share)
  //     aroa5yavg: "8.1244960169858", // 자산수익률 (ROA) 5년 평균
  //     aroapct: "3.4250974002605", // 자산수익률 (ROA) 현재
  //     aroe5yavg: "11.060309801637", // 자기자본수익률 (ROE) 5년 평균
  //     aroepct: "4.1446129034147", // 자기자본수익률 (ROE) 현재
  //     aroi5yravg: "8.307160576936", // 투자수익률 (ROI) 5년 평균
  //     aroipct: "1.2931186478952", // 투자수익률 (ROI) 현재
  //     atanbvps: "48654.203647", // 주식당 순자산 (Tangible BVPS)
  //     atotd2eq: "3.4882364919295", // 총 부채 대비 자본 (Debt to Equity Ratio)
  //     bvtrendgr: "8.0302125016632", // 장부가 성장률 (Book Value Growth Rate)
  //     country_id: "11", // 국가 ID (대한민국)
  //     csptrendgr: "14.280254337619", // 주당 매출 성장률 (Sales per Share Growth Rate)
  //     divyield_curttm: "2.2387596899", // 현재 배당수익률 (Current Dividend Yield)
  //     ebitda_ayr5cagr: "-12.314591187088", // 상각전 영업이익 5년 CAGR
  //     ebitda_ttmy5cagr: "-7.9901631572833", // 상각전 영업이익 최근 5년 CAGR
  //     epschngyr: "372.50815854859", // 주당순이익 (EPS) 전년 대비 변화율
  //     epsgrpct: "-17.833621753397", // 주당순이익 (EPS) 성장률
  //     epstrendgr: "-19.896820991764", // 주당순이익 (EPS) 트렌드 성장률
  //     ev2fcf_cura: "-27.316740204695", // 기업가치(Enterprise Value) 대비 FCF
  //     ev2fcf_curttm: "19.487165852712", // 기업가치(Enterprise Value) 대비 FCF (TTM)
  //     focf_ayr5cagr: "-8.0175136880674", // 자유현금흐름(FCF) 5년 CAGR
  //     grosmgn5yr: "37.05777", // 매출총이익률 5년 평균
  //     industry_id: "217", // 산업 ID
  //     margin5yr: "12.230302760976", // 순이익률 5년 평균
  //     mktcap: "541404404.74", // 시장가치(Market Capitalization)
  //     netdebt_a: "-79721266", // 순부채(NETDEBT)
  //     netdebt_i: "-81888673", // 순부채(NETDEBT)
  //     npmtrendgr: "-20.859734000808", // 순이익률 트렌드 성장률
  //     opmgn5yr: "13.160321667441", // 영업이익률 5년 평균
  //     pair_id: "951042", // 데이터 쌍 ID (중복 확인)
  //     pebexclxor: "27.448875055927", // 주가수익 비율 (P/E Ratio, 특별 항목 제외)
  //     peexclxor: "27.471083332457", // 주가수익 비율 (P/E Ratio, 특별 항목 제외)
  //     pr2tanbk: "1.5967406557353", // 주가 대 순자산 비율 (Price to Tangible Book Value)
  //     price2bk: "1.4931561165346", // 주가 대 장부가 비율 (Price to Book)
  //     ptmgn5yr: "14.080675851689", // 최종 순이익률 (Profit Margin) 5년 평균
  //     qbvps: "53339.130121785", // 주당 장부가치 (Quarterly BVPS)
  //     qcshps: "9113.6627916927", // 주당 현금 (Quarterly CASHPS)
  //     qcurratio: "2.550365", // 유동비율 (Quarterly Current Ratio)
  //     qltd2eq: "0.15472445061345", // 부채비율 (Quarterly LTD/EQ)
  //     qquickrati: "1.6942352396538", // 당좌비율 (Quarterly Quick Ratio)
  //     qtanbvps: "49916.822609", // 주당 순자산 (Quarterly Tangible BVPS)
  //     qtotd2eq: "4.2791907724931", // 총 부채비율 (Quarterly Total Debt to Equity)
  //     revchngyr: "12.816977722194", // 매출변화율 (Revenue Change Year-over-Year)
  //     revgrpct: "3.0225647356619", // 매출 성장률 (Revenue Growth Rate)
  //     revps5ygr: "1.2142733640928", // 주당 매출 5년 성장률
  //     revtrendgr: "1.2142733640928", // 매출 트렌드 성장률
  //     stld_ayr5cagr: "-2.8605389422639", // 유보이익 5년 CAGR
  //     ttmastturn: "0.577531", // 총자산회전율 (TTM)
  //     ttminvturn: "3.3455012605865", // 재고자산 회전율 (TTM)
  //     ttmniac: "19693179", // 순이익 후 현금 (TTM)
  //     ttmnpmgn: "7.3728030628052", // 순이익률 (TTM)
  //     ttmopmgn: "4.6920772839746", // 영업이익률 (TTM)
  //     ttmpayrat: "55.2326", // 배당지급비율 (TTM)
  //     ttmpr2rev: "2.0253888733212", // 주가 매출비율 (TTM)
  //     ttmprcfps: "10.882551648991", // 주식당 현금흐름 (TTM)
  //     ttmprfcfps: "-66.976374907922", // 주식당 자유현금흐름 (TTM)
  //     ttmptmgn: "6.3220689347713", // 최종 순이익률 (TTM)
  //     ttmrecturn: "7.395604", // 매출채권 회전율 (TTM)
  //     ttmrevchg: "-7.3177855096583", // 매출 변화율 (TTM)
  //     ttmrevps: "39322.645365075", // 주당 매출 (TTM)
  //     ttmroapct: "4.4686260354975", // 자산수익률 (ROA) (TTM)
  //     ttmroepct: "5.454309488431", // 자기자본수익률 (ROE) (TTM)
  //     ttmroipct: "2.4166434693974", // 투자수익률 (ROI) (TTM)
  //     vdes_ttm: "1412.466268", // 밸류에이션 수치 (TTM)
  //     yield: "2.3500810644", // 배당수익률
  //     yld5yavg: "2.432446804405", // 배당수익률 5년 평균
  //     RSI: 61.715, // 상대강도지수 (RSI)
  //     STOCH: 96.881, // 스토캐스틱 (Stochastic)
  //     CCI: 250.5747, // 상품채널지수 (CCI)
  //     MACD: 321.228, // 이동평균수렴확산지수 (MACD)
  //     ADX: 26.565, // 평균방향성지표 (ADX)
  //     WilliamsR: -0.178, // 윌리엄스 %R
  //     STOCHRSI: 100, // 스토캐스틱 RSI
  //     ATR: 1114.2857, // 평균진폭 (ATR)
  //     HL: 1564.2857, // 고저폭 (HL)
  //     UO: 63.383, // 절대오실레이터(UO)
  //     ROC: 2.484, // 가격변화율 (ROC)
  //     BullBear: 2853.542, // Bull/Bear 파워
  //     tech_sum_300: "strong_buy", // 기술적 분석 요약 (5분 간격)
  //     tech_sum_300_Define: "_Currencies_Strong_Buy", // 5분간 강한 매수 추천
  //     tech_sum_300_Define_order_priority: 0, // 5분 간격 분석 우선순위
  //     tech_sum_300_Color: "green", // 5분 간격 추천 색상
  //     tech_sum_900: "strong_buy", // 기술적 분석 요약 (15분 간격)
  //     tech_sum_900_Define: "_Currencies_Strong_Buy", // 15분간 강한 매수 추천
  //     tech_sum_900_Define_order_priority: 0, // 15분 간격 분석 우선순위
  //     tech_sum_900_Color: "green", // 15분 간격 추천 색상
  //     tech_sum_1800: "strong_buy", // 기술적 분석 요약 (30분 간격)
  //     tech_sum_1800_Define: "_Currencies_Strong_Buy", // 30분간 강한 매수 추천
  //     tech_sum_1800_Define_order_priority: 0, // 30분 간격 분석 우선순위
  //     tech_sum_1800_Color: "green", // 30분 간격 추천 색상
  //     tech_sum_3600: "strong_buy", // 기술적 분석 요약 (1시간 간격)
  //     tech_sum_3600_Define: "_Currencies_Strong_Buy", // 1시간 간격 강한 매수 추천
  //     tech_sum_3600_Define_order_priority: 0, // 1시간 간격 분석 우선순위
  //     tech_sum_3600_Color: "green", // 1시간 간격 추천 색상
  //     tech_sum_18000: "strong_buy", // 기술적 분석 요약 (5시간 간격)
  //     tech_sum_18000_Define: "_Currencies_Strong_Buy", // 5시간 간격 강한 매수 추천
  //     tech_sum_18000_Define_order_priority: 0, // 5시간 간격 분석 우선순위
  //     tech_sum_18000_Color: "green", // 5시간 간격 추천 색상
  //     tech_sum_86400: "strong_buy", // 기술적 분석 요약 (1일 간격)
  //     tech_sum_86400_Define: "_Currencies_Strong_Buy", // 1일 간격 강한 매수 추천
  //     tech_sum_86400_Define_order_priority: 0, // 1일 간격 분석 우선순위
  //     tech_sum_86400_Color: "green", // 1일 간격 추천 색상
  //     tech_sum_week: "strong_buy", // 기술적 분석 요약 (1주일 간격)
  //     tech_sum_week_Define: "_Currencies_Strong_Buy", // 1주일 간격 강한 매수 추천
  //     tech_sum_week_Define_order_priority: 0, // 1주일 간격 분석 우선순위
  //     tech_sum_week_Color: "green", // 1주일 간격 추천 색상
  //     tech_sum_month: "strong_buy", // 기술적 분석 요약 (1개월 간격)
  //     tech_sum_month_Define: "_Currencies_Strong_Buy", // 1개월 간격 강한 매수 추천
  //     tech_sum_month_Define_order_priority: 0, // 1개월 간격 분석 우선순위
  //     tech_sum_month_Color: "green", // 1개월 간격 추천 색상
  //     daily: 2.33, // 일일 변화율
  //     daily_eu: "2,33", // 일일 변화율 - 유럽 형식
  //     daily_frmt: "2.33", // 일일 변화율 - 포맷된 문자열
  //     sector_id: 31, // 섹터 ID
  //     avg_volume: 1204679, // 평균 거래량
  //     pair_change_percent: 2.33, // 주식 가격 변화율
  //     pair_change_percent_frmt: "2.33", // 주식 가격 변화율 - 포맷된 문자열
  //     a52_week_high: 70000, // 52주 최고가
  //     a52_week_high_eu: "70.000", // 52주 최고가 - 유럽 형식
  //     a52_week_low: 53000, // 52주 최저가
  //     a52_week_low_eu: "53.000", // 52주 최저가 - 유럽 형식
  //     turnover_volume: 2152408, // 거래량
  //     last: 66000, // 최근 가격
  //     last_eu: "66.000", // 최근 가격 - 유럽 형식
  //     last_frmt: "66.00K", // 최근 가격 - 포맷된 문자열
  //     avg_volume_frmt: "1.20M", // 평균 거래량 - 포맷된 문자열
  //     a52_week_high_frmt: "70.00K", // 52주 최고가 - 포맷된 문자열
  //     a52_week_low_frmt: "53.00K", // 52주 최저가 - 포맷된 문자열
  //     turnover_volume_frmt: "2.15M", // 거래량 - 포맷된 문자열
  //     a52_week_high_diff: -5.7142857142857, // 52주 최고가 대비 차이
  //     a52_week_high_diff_eu: "-5,71", // 52주 최고가 대비 차이 - 유럽 형식
  //     a52_week_low_diff: 24.528301886792, // 52주 최저가 대비 차이
  //     a52_week_low_diff_eu: "24,53", // 52주 최저가 대비 차이 - 유럽 형식
  //     exchange_trans: "서울", // 거래소 번역
  //     name_trans: "삼성전자우", // 이름 번역
  //     sector_trans: "기술", // 섹터 번역
  //     industry_trans: "컴퓨터, 전화 및 가전제품", // 산업 번역
  //     viewData: {
  //       flag: "South_Korea", // 국가 플래그
  //       symbol: "005935", // 주식 심볼
  //       link: "/equities/samsung-electronics-co-pref", // 주식 링크
  //       name: "삼성전자우", // 이름 번역
  //     },
  //     month_change: 5.47, // 월간 변화율
  //     month_change_eu: "5,47%", // 월간 변화율 - 유럽 형식
  //     ytd: 5.94, // 연초 대비 변화율 (Year-to-Date)
  //     week: 3.45, // 주간 변화율
  //     month: 5.43, // 월간 변화율
  //     year: 10.55, // 연간 변화율
  //     "3year": -10.33, // 3년 변화율
  //     ytd_eu: "5,94", // 연초 대비 변화율 - 유럽 형식
  //     week_eu: "3,45", // 주간 변화율 - 유럽 형식
  //     month_eu: "5,43", // 월간 변화율 - 유럽 형식
  //     year_eu: "10,55", // 연간 변화율 - 유럽 형식
  //     "3year_eu": "-10,33", // 3년 변화율 - 유럽 형식
  //   };

  isUpdating = true; // updateStore가 실행 중임을 표시
  let allData: any = []; // 모든 데이터를 저장할 배열 초기화

  try {
    var formData = new FormData();
    formData.append("country[]", String(codeList[countryCode].countryId));
    formData.append("sector", "29,34,31,33,26,27,25,36,24,32,35,28,30");
    formData.append(
      "industry",
      "173,201,184,179,178,220,183,228,230,185,197,225,194,196,213,206,226,216,212,193,174,172,191,203,219,224,200,202,188,176,189,204,199,210,190,175,222,232,198,186,215,229,211,180,227,192,207,223,181,217,214,221,218,205,208,231,182,209,195,187,177"
    );
    formData.append(
      "equityType",
      "ORD,DRC,Preferred,Unit,ClosedEnd,REIT,ELKS,OpenEnd,Right,ParticipationShare,CapitalSecurity,PerpetualCapitalSecurity,GuaranteeCertificate,IGC,Warrant,SeniorNote,Debenture,ETF,ADR,ETC"
    );
    formData.append("exchange[]", exchangeCode);
    formData.append("pn", "1");
    formData.append("order[col]", "eq_market_cap");
    formData.append("order[dir]", "d");

    let response = await fetch(
      `https://kr.investing.com/stock-screener/Service/SearchStocks`,
      {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let responseJson = await response.json();
    const totalPages = Math.ceil(
      responseJson.totalCount / responseJson.hits.length
    ); // 총 페이지 수 계산

    allData = allData.concat(responseJson.hits); // 첫 페이지 데이터 추가

    // 2페이지부터 총 페이지 수까지 데이터 가져오기
    for (let page = 2; page <= totalPages; page++) {
      formData.set("pn", page.toString()); // 페이지 번호 업데이트

      response = await fetch(
        `https://kr.investing.com/stock-screener/Service/SearchStocks`,
        {
          method: "POST",
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      responseJson = await response.json();
      allData = allData.concat(responseJson.hits); // 현재 페이지 데이터 추가
    }

    return allData.map((item: any) => {
      return {
        flag: item.viewData.flag, // 국가 플래그
        symbol: item.viewData.symbol, // 주식 심볼
        link: item.viewData.link, // 주식 링크
        name: item.viewData.name, // 이름 번역
        stock_symbol: item.stock_symbol,
        parent_pair_id: item.parent_pair_ID,
        canonical_to_pair_id: item.canonical_to_pair_id,
        override_country_id: item.override_country_ID,
        eq_pe_ratio: item.eq_pe_ratio,
        eq_market_cap: item.eq_market_cap,
        eq_one_year_return: item.eq_one_year_return,
        eq_dividend: item.eq_dividend,
        eq_eps: item.eq_eps,
        eq_beta: item.eq_beta,
        eq_revenue: item.eq_revenue,
        exchange_id: item.exchange_ID,
        security_type: item.security_type,
        a1fcf: item.a1fcf,
        aastturn: item.aastturn,
        abepsxclxo: item.abepsxclxo,
        abvps: item.abvps,
        acfshr: item.acfshr,
        acshps: item.acshps,
        acurratio: item.acurratio,
        adiv5yavg: item.adiv5yavg,
        aebitd: item.aebitd,
        aebt: item.aebt,
        aebtnorm: item.aebtnorm,
        aepsinclxo: item.aepsinclxo,
        aepsxclxor: item.aepsxclxor,
        agrosmgn: item.agrosmgn,
        aintcov: item.aintcov,
        ainvturn: item.ainvturn,
        altd2eq: item.altd2eq,
        aniac: item.aniac,
        aniacnorm: item.aniacnorm,
        aniperemp: item.aniperemp,
        anpmgnpct: item.anpmgnpct,
        aopmgnpct: item.aopmgnpct,
        apayratio: item.apayratio,
        apeexclxor: item.apeexclxor,
        apenorm: item.apenorm,
        apr2rev: item.apr2rev,
        apr2tanbk: item.apr2tanbk,
        aprfcfps: item.aprfcfps,
        aprice2bk: item.aprice2bk,
        aptmgnpct: item.aptmgnpct,
        aquickrati: item.aquickrati,
        arecturn: item.arecturn,
        arevperemp: item.arevperemp,
        arevps: item.arevps,
        aroa5yavg: item.aroa5yavg,
        aroapct: item.aroapct,
        aroe5yavg: item.aroe5yavg,
        aroepct: item.aroepct,
        aroi5yravg: item.aroi5yravg,
        aroipct: item.aroipct,
        atanbvps: item.atanbvps,
        atotd2eq: item.atotd2eq,
        bvtrendgr: item.bvtrendgr,
        country_id: item.country_id,
        csptrendgr: item.csptrendgr,
        divyield_curttm: item.divyield_curttm,
        ebitda_ayr5cagr: item.ebitda_ayr5cagr,
        ebitda_ttmy5cagr: item.ebitda_ttmy5cagr,
        epschngyr: item.epschngyr,
        epsgrpct: item.epsgrpct,
        epstrendgr: item.epstrendgr,
        ev2fcf_cura: item.ev2fcf_cura,
        ev2fcf_curttm: item.ev2fcf_curttm,
        focf_ayr5cagr: item.focf_ayr5cagr,
        grosmgn5yr: item.grosmgn5yr,
        industry_id: item.industry_id,
        margin5yr: item.margin5yr,
        mktcap: item.mktcap,
        netdebt_a: item.netdebt_a,
        netdebt_i: item.netdebt_i,
        npmtrendgr: item.npmtrendgr,
        opmgn5yr: item.opmgn5yr,
        pair_id: item.pair_id,
        pebexclxor: item.pebexclxor,
        peexclxor: item.peexclxor,
        pr2tanbk: item.pr2tanbk,
        price2bk: item.price2bk,
        ptmgn5yr: item.ptmgn5yr,
        qbvps: item.qbvps,
        qcshps: item.qcshps,
        qcurratio: item.qcurratio,
        qltd2eq: item.qltd2eq,
        qquickrati: item.qquickrati,
        qtanbvps: item.qtanbvps,
        qtotd2eq: item.qtotd2eq,
        revchngyr: item.revchngyr,
        revgrpct: item.revgrpct,
        revps5ygr: item.revps5ygr,
        revtrendgr: item.revtrendgr,
        stld_ayr5cagr: item.stld_ayr5cagr,
        ttmastturn: item.ttmastturn,
        ttminvturn: item.ttminvturn,
        ttmniac: item.ttmniac,
        ttmnpmgn: item.ttmnpmgn,
        ttmopmgn: item.ttmopmgn,
        ttmpayrat: item.ttmpayrat,
        ttmpr2rev: item.ttmpr2rev,
        ttmprcfps: item.ttmprcfps,
        ttmprfcfps: item.ttmprfcfps,
        ttmptmgn: item.ttmptmgn,
        ttmrecturn: item.ttmrecturn,
        ttmrevchg: item.ttmrevchg,
        ttmrevps: item.ttmrevps,
        ttmroapct: item.ttmroapct,
        ttmroepct: item.ttmroepct,
        ttmroipct: item.ttmroipct,
        vdes_ttm: item.vdes_ttm,
        yield: item.yield,
        yld5yavg: item.yld5yavg,
        rsi: item.RSI,
        stoch: item.STOCH,
        cci: item.CCI,
        macd: item.MACD,
        adx: item.ADX,
        williamsr: item.WilliamsR,
        stochrsi: item.STOCHRSI,
        atr: item.ATR,
        hl: item.HL,
        uo: item.UO,
        roc: item.ROC,
        bullbear: item.BullBear,
        tech_sum_300: item.tech_sum_300,
        tech_sum_900: item.tech_sum_900,
        tech_sum_1800: item.tech_sum_1800,
        tech_sum_3600: item.tech_sum_3600,
        tech_sum_18000: item.tech_sum_18000,
        tech_sum_86400: item.tech_sum_86400,
        tech_sum_week: item.tech_sum_week,
        tech_sum_month: item.tech_sum_month,
        daily: item.daily,
        sector_id: item.sector_id,
        avg_volume: item.avg_volume,
        pair_change_percent: item.pair_change_percent,
        a52_week_high: item.a52_week_high,
        a52_week_low: item.a52_week_low,
        turnover_volume: item.turnover_volume,
        last: item.last,
        a52_week_high_diff: item.a52_week_high_diff,
        a52_week_low_diff: item.a52_week_low_diff,
        exchange_trans: item.exchange_trans,
        name_trans: item.name_trans,
        sector_trans: item.sector_trans,
        industry_trans: item.industry_trans,
        month_change: item.month_change,
        ytd: item.ytd,
        week: item.week,
        month: item.month,
        year: item.year,
        "3year": item["3year"],
      };
    });
  } catch (error) {
    console.error(error);
    return error;
  } finally {
    isUpdating = false; // updateStore가 완료되었음을 표시
  }
}
