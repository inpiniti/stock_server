const appConfig = useAppConfig();
const codeList: any = appConfig.codeList;

export const useTradingview = () => {
  // countryCode: kr, us
  const crawling = async (countryCode: string) => {
    try {
      // url https://scanner.tradingview.com/korea/scan
      // 메서드 POST

      const 오버뷰 = [
        "name", // 이름
        "description", // 설명
        "logoid", // 로고 ID
        "update_mode", // 업데이트 모드
        "type", // 유형
        "close", // 종가
        "pricescale", // 가격 척도
        "minmov", // 최소 이동
        "fractional", // 분수
        "minmove2", // 최소 이동 2
        "currency", // 통화
        "change", // 변화
        "volume", // 거래량
        "relative_volume_10d_calc", // 10일 상대 거래량 계산
        "market_cap_basic", // 기본 시장 규모
        "fundamental_currency_code", // 기본 통화 코드
        "price_earnings_ttm", // 시가 총액 대비 이익(TTM)
        "earnings_per_share_diluted_ttm", // 주당 순이익(TTM, 희석)
        "earnings_per_share_diluted_yoy_growth_ttm", // 주당 순이익 연간 성장률(TTM, 희석)
        "dividends_yield_current", // 현재 배당 수익률
        "sector.tr", // TR 섹터
        "market", // 시장
        "sector", // 섹터
        "recommendation_mark", // 추천 마크
        "exchange", // 거래소
      ];
      const 성과 = [
        "name", // 이름
        "description", // 설명
        "logoid", // 로고 ID
        "update_mode", // 업데이트 모드
        "type", // 유형
        "close", // 종가
        "pricescale", // 가격 척도
        "minmov", // 최소 이동
        "fractional", // 분수
        "minmove2", // 최소 이동 2
        "currency", // 통화
        "change", // 변화
        "Perf.W", // 주간 성과
        "Perf.1M", // 1개월 성과
        "Perf.3M", // 3개월 성과
        "Perf.6M", // 6개월 성과
        "Perf.YTD", // 연초부터 현재까지의 성과
        "Perf.Y", // 1년 성과
        "Perf.5Y", // 5년 성과
        "Perf.10Y", // 10년 성과
        "Perf.All", // 전체 성과
        "Volatility.W", // 주간 변동성
        "Volatility.M", // 월간 변동성
        "exchange", // 거래소
      ];
      const 시간외 = [
        "name", // 이름
        "description", // 설명
        "logoid", // 로고 ID
        "update_mode", // 업데이트 모드
        "type", // 유형
        "premarket_close", // 시장 개장 전 종가
        "pricescale", // 가격 척도
        "minmov", // 최소 이동
        "fractional", // 분수
        "minmove2", // 최소 이동 2
        "currency", // 통화
        "close", // 종가
        "change", // 변화
        "gap", // 갭
        "volume", // 거래량
        "volume_change", // 거래량 변동
        "exchange", // 거래소
      ];
      const 평가 = [
        "name", // 이름
        "description", // 설명
        "logoid", // 로고 ID
        "update_mode", // 업데이트 모드
        "type", // 유형
        "market_cap_basic", // 기본 시장 규모
        "fundamental_currency_code", // 기본 통화 코드
        "Perf.1Y.MarketCap", // 1년 시장 규모 성과
        "price_earnings_ttm", // 시가 총액 대비 이익(TTM)
        "price_earnings_growth_ttm", // 시가 총액 대비 이익 성장(TTM)
        "price_sales_current", // 현재 매출 대비 가격
        "price_book_fq", // 분기별 자산 대비 가격
        "price_to_cash_f_operating_activities_ttm", // 영업 활동으로 인한 현금 흐름 대비 가격(TTM)
        "price_free_cash_flow_ttm", // 자유 현금 흐름 대비 가격(TTM)
        "price_to_cash_ratio", // 현금 대비 가격 비율
        "enterprise_value_current", // 현재 기업 가치
        "enterprise_value_to_revenue_ttm", // 수익 대비 기업 가치(TTM)
        "enterprise_value_to_ebit_ttm", // EBIT 대비 기업 가치(TTM)
        "enterprise_value_ebitda_ttm", // EBITDA 대비 기업 가치(TTM)
        "exchange", // 거래소
      ];
      const 배당 = [
        "name", // 이름
        "description", // 설명
        "logoid", // 로고 ID
        "update_mode", // 업데이트 모드
        "type", // 유형
        "dps_common_stock_prim_issue_fy", // 주식 기본 발행 DPS(연간)
        "fundamental_currency_code", // 기본 통화 코드
        "dividends_yield_current", // 현재 배당 수익률
        "dividends_yield", // 배당 수익률
        "dividend_payout_ratio_ttm", // 배당 지급 비율(TTM)
        "dps_common_stock_prim_issue_yoy_growth_fy", // 주식 기본 발행 DPS 연간 성장률(FY)
        "continuous_dividend_payout", // 연속 배당 지급
        "continuous_dividend_growth", // 연속 배당 성장
        "exchange", // 거래소
      ];
      const 수익성 = [
        "name", // 이름
        "description", // 설명
        "logoid", // 로고 ID
        "update_mode", // 업데이트 모드
        "type", // 유형
        "gross_margin_ttm", // 총 마진(TTM)
        "operating_margin_ttm", // 운영 마진(TTM)
        "pre_tax_margin_ttm", // 세전 마진(TTM)
        "net_margin_ttm", // 순 마진(TTM)
        "free_cash_flow_margin_ttm", // 자유 현금 흐름 마진(TTM)
        "return_on_assets_fq", // 자산 대비 수익률(분기별)
        "return_on_equity_fq", // 자본 대비 수익률(분기별)
        "return_on_invested_capital_fq", // 투자된 자본 대비 수익률(분기별)
        "research_and_dev_ratio_ttm", // 연구 개발 비율(TTM)
        "sell_gen_admin_exp_other_ratio_ttm", // 판매, 일반 및 관리 비용 비율(TTM)
        "exchange", // 거래소
      ];
      const 손익계산 = [
        "name", // 이름
        "description", // 설명
        "logoid", // 로고 ID
        "update_mode", // 업데이트 모드
        "type", // 유형
        "gross_margin_ttm", // 총 마진(TTM)
        "operating_margin_ttm", // 운영 마진(TTM)
        "pre_tax_margin_ttm", // 세전 마진(TTM)
        "net_margin_ttm", // 순 마진(TTM)
        "free_cash_flow_margin_ttm", // 자유 현금 흐름 마진(TTM)
        "return_on_assets_fq", // 자산 대비 수익률(분기별)
        "return_on_equity_fq", // 자본 대비 수익률(분기별)
        "return_on_invested_capital_fq", // 투자된 자본 대비 수익률(분기별)
        "research_and_dev_ratio_ttm", // 연구 개발 비율(TTM)
        "sell_gen_admin_exp_other_ratio_ttm", // 판매, 일반 및 관리 비용 비율(TTM)
        "exchange", // 거래소
      ];
      const 대차대조표 = [
        "name", // 이름
        "description", // 설명
        "logoid", // 로고 ID
        "update_mode", // 업데이트 모드
        "type", // 유형
        "total_assets_fq", // 총 자산(분기별)
        "fundamental_currency_code", // 기본 통화 코드
        "total_current_assets_fq", // 총 유동 자산(분기별)
        "cash_n_short_term_invest_fq", // 현금 및 단기 투자(분기별)
        "total_liabilities_fq", // 총 부채(분기별)
        "total_debt_fq", // 총 부채(분기별)
        "net_debt_fq", // 순 부채(분기별)
        "total_equity_fq", // 총 자본(분기별)
        "current_ratio_fq", // 유동비율(분기별)
        "quick_ratio_fq", // 당좌비율(분기별)
        "debt_to_equity_fq", // 부채 대 자본 비율(분기별)
        "cash_n_short_term_invest_to_total_debt_fq", // 현금 및 단기 투자 대 총 부채 비율(분기별)
        "exchange", // 거래소
      ];
      const 현금흐름 = [
        "name", // 이름
        "description", // 설명
        "logoid", // 로고 ID
        "update_mode", // 업데이트 모드
        "type", // 유형
        "cash_f_operating_activities_ttm", // 운영 활동으로 인한 현금 흐름(TTM)
        "fundamental_currency_code", // 기본 통화 코드
        "cash_f_investing_activities_ttm", // 투자 활동으로 인한 현금 흐름(TTM)
        "cash_f_financing_activities_ttm", // 재무 활동으로 인한 현금 흐름(TTM)
        "free_cash_flow_ttm", // 자유 현금 흐름(TTM)
        "capital_expenditures_ttm", // 자본 지출(TTM)
        "exchange", // 거래소
      ];
      const 테크니컬즈 = [
        "name", // 이름
        "description", // 설명
        "logoid", // 로고 ID
        "update_mode", // 업데이트 모드
        "type", // 유형
        "Recommend.All", // 모든 추천
        "Recommend.MA", // 이동 평균 추천
        "Recommend.Other", // 기타 추천
        "RSI", // 상대 강도 지수
        "Mom", // 모멘텀
        "pricescale", // 가격 척도
        "minmov", // 최소 이동
        "fractional", // 분수
        "minmove2", // 최소 이동 2
        "AO", // 놀람의 오실레이터
        "CCI20", // 상품 채널 지수 20
        "Stoch.K", // 스토캐스틱 K
        "Stoch.D", // 스토캐스틱 D
        "exchange", // 거래소
      ];

      const columns: any = Array.from(
        new Set([
          ...오버뷰,
          ...성과,
          ...시간외,
          ...평가,
          ...배당,
          ...수익성,
          ...손익계산,
          ...대차대조표,
          ...현금흐름,
          ...테크니컬즈,
        ])
      );

      const response = await fetch(
        `https://scanner.tradingview.com/${codeList[countryCode].name}/scan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            columns: columns,
            ignore_unknown_fields: false,
            options: { lang: "ko" },
            range: [0, 99999],
            sort: { sortBy: "market_cap_basic", sortOrder: "desc" },
            symbols: {},
            markets: ["korea"],
            filter2: {
              operator: "and",
              operands: [
                {
                  operation: {
                    operator: "or",
                    operands: [
                      {
                        operation: {
                          operator: "and",
                          operands: [
                            {
                              expression: {
                                left: "type",
                                operation: "equal",
                                right: "stock",
                              },
                            },
                            {
                              expression: {
                                left: "typespecs",
                                operation: "has",
                                right: ["common"],
                              },
                            },
                          ],
                        },
                      },
                      {
                        operation: {
                          operator: "and",
                          operands: [
                            {
                              expression: {
                                left: "type",
                                operation: "equal",
                                right: "stock",
                              },
                            },
                            {
                              expression: {
                                left: "typespecs",
                                operation: "has",
                                right: ["preferred"],
                              },
                            },
                          ],
                        },
                      },
                      {
                        operation: {
                          operator: "and",
                          operands: [
                            {
                              expression: {
                                left: "type",
                                operation: "equal",
                                right: "dr",
                              },
                            },
                          ],
                        },
                      },
                      {
                        operation: {
                          operator: "and",
                          operands: [
                            {
                              expression: {
                                left: "type",
                                operation: "equal",
                                right: "fund",
                              },
                            },
                            {
                              expression: {
                                left: "typespecs",
                                operation: "has_none_of",
                                right: ["etf"],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();

      const data = responseJson.data.map((item: any) => {
        let obj: any = {};
        for (let i = 0; i < columns.length; i++) {
          obj[columns[i]] = item.d[i];
        }
        return obj;
      });

      return data.map((item: any) => toSnakeCase(item));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const tradingviewKrFiter = async () => {
    const [kr_crawling, seoulSelect, kosdaqSelect] = await Promise.all([
      crawling("kr"),
      useInfo().seoulSelect(),
      useInfo().kosdaqSelect(),
    ]);

    return {
      seoul: kr_crawling.filter((item: any) => {
        return seoulSelect
          .map((item: any) => item.stock_code)
          .includes(item.name);
      }),
      kosdaq: kr_crawling.filter((item: any) => {
        return kosdaqSelect
          .map((item: any) => item.stock_code)
          .includes(item.name);
      }),
    };
  };

  const tradingviewUsFiter = async () => {
    const [us_crawling, nasdaqSelect] = await Promise.all([
      crawling("us"),
      useInfo().nasdaqSelect(),
    ]);

    return {
      nasdaq: us_crawling.filter((item: any) => {
        return nasdaqSelect
          .map((item: any) => item.stock_code)
          .includes(item.name);
      }),
    };
  };

  return {
    crawling,
    tradingviewKrFiter,
    tradingviewUsFiter,
  };
};
