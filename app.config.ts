export default defineAppConfig({
  theme: {
    primaryColor: "#ababab",
  },
  nameList: {
    Israel: "il", // 이스라엘
    Brazil: "br", // 브라질
    France: "fr", // 프랑스
    Hong: "hk", // 홍콩
    Belgium: "be", // 벨기에
    Finland: "fi", // 핀란드
    Italy: "it", // 이탈리아
    Sweden: "se", // 스웨덴
    Singapore: "sg", // 싱가포르
    Netherlands: "nl", // 네덜란드
    Switzerland: "ch", // 스위스
    Chile: "cl", // 칠레
    Canada: "ca", // 캐나다
    Germany: "de", // 독일
    Ireland: "ie", // 아일랜드
    Norway: "no", // 노르웨이
    Denmark: "dk", // 덴마크
    Portugal: "pt", // 포르투갈
    Spain: "es", // 스페인
    United: "uk", // 영국, 아랍에미라이트도 섞여 있음 ㅠㅠ
    Colombia: "co", // 콜롬비아
    Czech: "cz", // 체코
    Greece: "gr", // 그리스
    Egypt: "eg", // 이집트
    Hungary: "hu", // 헝가리
    India: "in", // 인도
    Indonesia: "id", // 인도네시아
    Korea: "kr", // 한국
    Malaysia: "my", // 말레이시아
    Mexico: "mx", // 멕시코
    Peru: "pe", // 페루
    Philippines: "ph", // 필리핀
    Poland: "pl", // 폴란드
    Thailand: "th", // 태국
    Turkey: "tr", // 터키
    Argentina: "ar", // 아르헨티나
    Jordan: "jo", // 요르단
    Morocco: "ma", // 모로코
    Oman: "om", // 오만
    Pakistan: "pk", // 파키스탄
    Qatar: "qa", // 카타르
    Sri: "lk", // 스리랑카
    Australia: "au", // 호주
    China: "cn", // 중국
    Japan: "jp", // 일본
    US: "us", // 미국
    Austria: "at", // 오스트리아
    Cyprus: "cy", // 키프로스
    Taiwan: "tw", // 대만,
    Jamaica: "jm", // 자메이카
    Costarica: "cr", // 코스타리카
    Latvia: "lv", // 라트비아
    Russia: "ru", // 러시아
    Romania: "ro", // 루마니아
    Luxembourg: "lu", // 룩셈부르크
    Lithuania: "lt", // 리투아니아
  },
  codeList: {
    il: { name: "israel", kr: "이스라엘" },
    br: {
      name: "brazil",
      kr: "브라질",
      countryId: 32,
      pageSize: 1406,
    },
    fr: { name: "france", kr: "프랑스" },
    hk: { name: "hong", kr: "홍콩" },
    be: { name: "belgium", kr: "벨기에" },
    fi: { name: "finland", kr: "핀란드" },
    it: { name: "italy", kr: "이탈리아" },
    se: { name: "sweden", kr: "스웨덴" },
    sg: { name: "singapore", kr: "싱가포르" },
    nl: { name: "netherlands", kr: "네덜란드", countryId: 21, pageSize: 200 },
    ch: { name: "switzerland", kr: "스위스" },
    cl: { name: "chile", kr: "칠레", countryId: 27, pageSize: 200 },
    ca: { name: "canada", kr: "캐나다", countryId: 6, pageSize: 5000 },
    de: { name: "germany", kr: "독일", countryId: 17, pageSize: 6000 },
    ie: { name: "ireland", kr: "아일랜드" },
    no: { name: "norway", kr: "노르웨이", countryId: 60, pageSize: 400 },
    dk: { name: "denmark", kr: "덴마크", countryId: 24, pageSize: 200 },
    pt: { name: "portugal", kr: "포르투갈" },
    es: { name: "spain", kr: "스페인" },
    uk: { name: "united", kr: "영국" },
    co: { name: "colombia", kr: "콜롬비아", countryId: 122, pageSize: 100 },
    cz: { name: "czech", kr: "체코" },
    gr: { name: "greece", kr: "그리스", countryId: 51, pageSize: 200 },
    eg: { name: "egypt", kr: "이집트" },
    hu: { name: "hungary", kr: "헝가리" },
    in: { name: "india", kr: "인도" },
    id: { name: "indonesia", kr: "인도네시아" },
    kr: { name: "korea", kr: "한국", countryId: 11, pageSize: 3000 },
    my: { name: "malaysia", kr: "말레이시아" },
    mx: { name: "mexico", kr: "멕시코", countryId: 7, pageSize: 800 },
    pe: { name: "peru", kr: "페루", countryId: 125, pageSize: 300 },
    ph: { name: "philippines", kr: "필리핀" },
    pl: { name: "poland", kr: "폴란드" },
    th: { name: "thailand", kr: "태국" },
    tr: { name: "turkey", kr: "터키" },
    ar: {
      name: "argentina",
      kr: "아르헨티나",
      countryId: 29,
      pageSize: 400,
    },
    jo: { name: "jordan", kr: "요르단" },
    ma: { name: "morocco", kr: "모로코" },
    om: { name: "oman", kr: "오만" },
    pk: { name: "pakistan", kr: "파키스탄" },
    qa: { name: "qatar", kr: "카타르" },
    lk: { name: "sri", kr: "스리랑카" },
    au: { name: "australia", kr: "호주" },
    cn: { name: "china", kr: "중국", countryId: 37, pageSize: 6000 },
    jp: { name: "japan", kr: "일본", countryId: 35, pageSize: 5000 },
    us: { name: "america", kr: "미국", countryId: 5, pageSize: 0 },
    at: { name: "austria", kr: "오스트리아" },
    cy: { name: "cyprus", kr: "키프로스" },
    tw: { name: "taiwan", kr: "대만" },
    jm: { name: "jamaica", kr: "자메이카", countryId: 119, pageSize: 100 },
    ve: { name: "venezuela", kr: "베네수엘라", countryId: 138, pageSize: 100 },
    cr: { name: "costarica", kr: "코스타리카", countryId: 15, pageSize: 100 },
    lv: { name: "latvia", kr: "라트비아", countryId: 97, pageSize: 100 },
    ru: { name: "russia", kr: "러시아", countryId: 56, pageSize: 300 },
    ro: { name: "romania", kr: "루마니아", countryId: 100, pageSize: 300 },
    lu: { name: "luxembourg", kr: "룩셈부르크", countryId: 103, pageSize: 100 },
    lt: { name: "lithuania", kr: "리투아니아", countryId: 96, pageSize: 100 },
    me: { name: "moNTENEGRO", kr: "몬테네그로", countryId: 247, pageSize: 100 },
  },
});
