export default defineEventHandler(async (event) => {
  // post https://www.investing.com/pro/_/screener-v2/query
  // header : Domain-Id:kr, X-Requested-With:investing-client/4bbc9b1
  // body : {
  //     "query": {
  //         "filters": [],
  //         "sort": {
  //             "metric": "marketcap_adj_latest",
  //             "direction": "DESC"
  //         },
  //         "prefilters": {
  //             "market": "KR",
  //             "primaryOnly": true,
  //             "exchange": "Seoul"
  //         }
  //     },
  //     "metrics": [
  //         "investing_exchange",
  //         "investing_sector",
  //         "investing_industry",
  //         "marketcap_adj_latest",
  //         "pe_ltm_latest",
  //         "peg_ltm",
  //         "asset_price_latest",
  //         "asset_price_latest_change_pct",
  //         "fair_value",
  //         "fair_value_upside",
  //         "fair_value_label",
  //         "analyst_target",
  //         "analyst_target_upside",
  //         "fin_health_overall_label"
  //     ],
  //     "page": {
  //         "skip": 0,
  //         "limit": 100
  //     }
  // }

  // result :
  // {
  //     "page": {
  //         "hasPreviousPage": false,
  //         "hasNextPage": true,
  //         "pageSize": 100,
  //         "totalItems": 1532
  //     },
  //     "rows": [
  //         {
  //             "asset": {
  //                 "hidden": false,
  //                 "uid": "KOSE:A005930",
  //                 "pairID": 43433,
  //                 "ticker": "005930",
  //                 "name": "삼성전자",
  //                 "primary": "KOSE:A005930",
  //                 "path": "/equities/samsung-electronics-co-ltd"
  //             },
  //             "data": [
  //                 {
  //                     "hidden": false,
  //                 ...
  //             },
  //         },
  //         ...
  //     ]
  // }

  // fetch 를 이용해서 위 url로 post 요청을 보내고, 결과를 받아서 처리한다.
  // 코드 작성해줘

  const response = await getData(0);
  const result = await response.json();

  // skip 을 100 씩 올려가면서, 다음페이지도 조회하도록 코드를 작성해줘

  while (result.page.hasNextPage) {
    const response = await getData(result.page.totalItems);

    const nextResult = await response.json();
    result.rows = result.rows.concat(nextResult.rows);
    result.page = nextResult.page;
  }

  return result;
});

const getData = (skip: number) => {
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
          market: "KR",
          primaryOnly: true,
          exchange: "Seoul",
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
