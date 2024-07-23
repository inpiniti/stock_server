const appConfig = useAppConfig();
const codeList: any = appConfig.codeList;

export default defineEventHandler(async (event) => {
  return (await updateStore("kr", "60")).slice(0, 10);
});

async function updateStore(countryCode: string, exchangeCode: string) {
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

    return allData;
  } catch (error) {
    console.error(error);
    return error;
  }
}
