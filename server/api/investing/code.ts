export default defineEventHandler(async (event) => {
  // "KR", "Seoul" 이런식으로 들어옴
  const { country, market } = getQuery(event);

  return await getLoopData({
    country: String(country),
    market: String(market),
  });
});

export const getLoopData = async ({
  country,
  market,
}: {
  country: string;
  market: string;
}) => {
  let skip = 0;

  const response = await getData({ skip, country, market });
  const result = await response.json();

  // skip 을 100 씩 올려가면서, 다음페이지도 조회하도록 코드를 작성해줘
  while (result.page.hasNextPage) {
    skip += 100;
    const response = await getData({ skip, country, market });

    const nextResult = await response.json();
    result.rows = result.rows.concat(nextResult.rows);
    result.page = nextResult.page;
  }

  console.log("rowlength", result.rows.length);

  return ticker({ result, country, market });
};

// ticker 추출
export const ticker = ({
  result,
  country,
  market,
}: {
  result: any;
  country: string;
  market: string;
}) => {
  const ticket = result.rows.reduce((acc: any[], item: any) => {
    // 이미 acc 배열에 동일한 stock_code를 가진 항목이 있는지 확인
    if (!acc.find((accItem) => accItem.stock_code === item.asset.ticker)) {
      acc.push({
        stock_code: item.asset.ticker,
        country,
        market,
      });
    }
    return acc;
  }, []);

  return ticket;
};

const getData = ({
  skip,
  country,
  market,
}: {
  skip: number;
  country: string;
  market: string;
}) => {
  console.log("skip", skip);
  return fetch("https://www.investing.com/pro/_/screener-v2/query", {
    method: "POST",
    headers: {
      "Domain-Id": "kr",
      "X-Requested-With": "investing-client/4bbc9b1",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {
        filters: [],
        sort: {
          metric: "marketcap_adj_latest",
          direction: "DESC",
        },
        prefilters: {
          market: country,
          primaryOnly: true,
          exchange: market,
        },
      },
      metrics: [
        "investing_exchange",
        "investing_sector",
        "investing_industry",
        "marketcap_adj_latest",
        "pe_ltm_latest",
        "peg_ltm",
        "asset_price_latest",
        "asset_price_latest_change_pct",
        "fair_value",
        "fair_value_upside",
        "fair_value_label",
        "analyst_target",
        "analyst_target_upside",
        "fin_health_overall_label",
      ],
      page: {
        skip,
        limit: 100,
      },
    }),
  });
};
