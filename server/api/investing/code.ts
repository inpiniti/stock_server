import { exec } from "child_process";

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
  try {
    let skip = 0;

    const response: any = await getData({ skip, country, market });
    const result = response;

    // skip 을 100 씩 올려가면서, 다음페이지도 조회하도록 코드를 작성해줘
    while (result.page.hasNextPage) {
      skip += 100;
      const nextResponse: any = await getData({ skip, country, market });

      const nextResult = nextResponse;
      result.rows = result.rows.concat(nextResult.rows);
      result.page = nextResult.page;
    }

    console.log("rowlength", result.rows.length);

    return ticker({ result, country, market });
  } catch (error) {
    console.error("error 016", error);
    throw error;
  }
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
  try {
    console.log("skip", skip);

    const body = JSON.stringify({
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
    });

    const curlCommand = `
  curl -s 'https://www.investing.com/pro/_/screener-v2/query' \
    -H 'accept: */*' \
    -H 'accept-language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7' \
    -H 'content-type: application/json' \
    -H 'domain-id: kr' \
    -H 'origin: https://kr.investing.com' \
    -H 'priority: u=1, i' \
    -H 'referer: https://kr.investing.com/' \
    -H 'sec-ch-ua: "Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'sec-ch-ua-platform: "macOS"' \
    -H 'sec-fetch-d: empty' \
    -H 'sec-fetch-mode: cors' \
    -H 'sec-fetch-site: same-site' \
    -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36' \
    -H 'x-requested-with: investing-client/11876f1' \
    --data-raw '${body}'
  `;

    return new Promise((resolve, reject) => {
      exec(curlCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          reject(stderr);
          return;
        }
        try {
          const jsonResponse = JSON.parse(stdout);
          resolve(jsonResponse);
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  } catch (error) {
    console.error("error 015", error);
    throw error;
  }
};
