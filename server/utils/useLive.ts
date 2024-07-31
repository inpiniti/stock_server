export const useLive = () => {
  const seoulSelect = async () => {
    try {
      const data = await useGalaxy().select().from(pgTableSeoulLive);
      return data;
    } catch (error) {
      return false;
    }
  };
  const seoulInsert = async (data: any) => {
    try {
      const firstRowParamCount = Object.keys(data[0]).length; // 첫 번째 행의 파라미터 수를 계산합니다.
      const chunkSize = Math.floor(65534 / firstRowParamCount); // 83은 각 행의 파라미터 수입니다.
      const dataChunks = splitData(data, chunkSize);

      // 분할된 데이터 삽입
      for (const chunk of dataChunks) {
        await useGalaxy().insert(pgTableSeoulLive).values(chunk);
      }

      return true;
    } catch (error) {
      return false;
    }
  };
  const kosdaqSelect = async () => {
    try {
      const data = await useGalaxy().select().from(pgTableKosdaqLive);
      return data;
    } catch (error) {
      return false;
    }
  };
  const kosdaqInsert = async (data: any) => {
    try {
      const firstRowParamCount = Object.keys(data[0]).length; // 첫 번째 행의 파라미터 수를 계산합니다.
      const chunkSize = Math.floor(65534 / firstRowParamCount); // 83은 각 행의 파라미터 수입니다.
      const dataChunks = splitData(data, chunkSize);

      // 분할된 데이터 삽입
      for (const chunk of dataChunks) {
        await useGalaxy().insert(pgTableKosdaqLive).values(chunk);
      }

      return true;
    } catch (error) {
      return false;
    }
  };
  const nasdaqSelect = async () => {
    try {
      const data = await useGalaxy().select().from(pgTableNasdaqLive);
      return data;
    } catch (error) {
      return false;
    }
  };
  const nasdaqInsert = async (data: any) => {
    try {
      const firstRowParamCount = Object.keys(data[0]).length; // 첫 번째 행의 파라미터 수를 계산합니다.
      const chunkSize = Math.floor(65534 / firstRowParamCount); // 83은 각 행의 파라미터 수입니다.
      const dataChunks = splitData(data, chunkSize);

      // 분할된 데이터 삽입
      for (const chunk of dataChunks) {
        await useGalaxy().insert(pgTableNasdaqLive).values(chunk);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const newKr = async () => {
    const [krFiterResult, prevSeoul, prevKosdaq] = await Promise.all([
      useTradingview().tradingviewKrFiter(),
      seoulSelect(),
      kosdaqSelect(),
    ]);

    const { seoul, kosdaq } = krFiterResult;

    // seoul 데이터들과 prev 데이터들을 비교하는데, 각 로우에서 일치하는 name을 찾아서 volume을 비교한다.
    // volume이 다른 데이터만 newSeoul에 넣는다.
    const newSeoul = seoul.filter((newRow: any) => {
      const prevRow = prevSeoul.find(
        (prevRow: any) => prevRow.name === newRow.name
      );
      return prevRow.volume !== newRow.volume;
    });

    const newKosdaq = kosdaq.filter((newRow: any) => {
      const prevRow = prevKosdaq.find(
        (prevRow: any) => prevRow.name === newRow.name
      );
      return prevRow.volume !== newRow.volume;
    });

    return { newSeoul, newKosdaq };
  };

  const newUs = async () => {
    const [nasdaqResult, prevNasdaq] = await Promise.all([
      useTradingview().tradingviewUsFiter(),
      nasdaqSelect(),
    ]);
    const { nasdaq } = nasdaqResult;

    const newNasdaq = nasdaq.filter((newRow: any) => {
      const prevRow = prevNasdaq.find(
        (prevRow: any) => prevRow.name === newRow.name
      );
      return prevRow.volume !== newRow.volume;
    });

    return { newNasdaq };
  };

  return {
    seoulSelect,
    seoulInsert,
    kosdaqSelect,
    kosdaqInsert,
    nasdaqSelect,
    nasdaqInsert,
    newKr,
    newUs,
  };
};
