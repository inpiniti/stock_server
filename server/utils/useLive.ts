import { sql } from "drizzle-orm";

let dataOneHourAgo = {
  seoul: [] as any,
  kosdaq: [] as any,
  nasdaq: [] as any,
};

export const useLive = () => {
  const seoulSelect = async () => {
    try {
      const data = await useGalaxy().select().from(pgTableSeoulLive);
      return data;
    } catch (error) {
      console.error("error008", error);
      throw error;
    }
  };
  const seoulInsert = async (data: any) => {
    await useGalaxy().execute(sql.raw(`TRUNCATE TABLE seoul_live`));
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
      console.error("error009", error);
      throw error;
    }
  };
  const kosdaqSelect = async () => {
    try {
      const data = await useGalaxy().select().from(pgTableKosdaqLive);
      return data;
    } catch (error) {
      console.error("error010", error);
      throw error;
    }
  };
  const kosdaqInsert = async (data: any) => {
    await useGalaxy().execute(sql.raw(`TRUNCATE TABLE kosdaq_live`));
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
      console.error("error011", error);
      throw error;
    }
  };
  const nasdaqSelect = async () => {
    try {
      const data = await useGalaxy().select().from(pgTableNasdaqLive);
      return data;
    } catch (error) {
      console.error("error012", error);
      throw error;
    }
  };
  const nasdaqInsert = async (data: any) => {
    await useGalaxy().execute(sql.raw(`TRUNCATE TABLE nasdaq_live`));
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
      console.error("error013", error);
      throw error;
    }
  };

  const newKr = async () => {
    const { seoul, kosdaq } = await useTradingview().tradingviewKrFiter();
    const { seoul: prevSeoul, kosdaq: prevKosdaq } = dataOneHourAgo;

    let newSeoul = [];
    let newKosdaq = [];
    if (new Date().getMinutes() == 0) {
      if (prevSeoul.length === 0 || prevKosdaq.length === 0) {
        newSeoul = seoul;
        newKosdaq = kosdaq;
      } else {
        newSeoul = seoul.filter((newRow: any) => {
          const prevRow = prevSeoul.find(
            (prevRow: any) => prevRow.name === newRow.name
          );
          return prevRow && prevRow.volume != newRow.volume;
        });

        newKosdaq = kosdaq.filter((newRow: any) => {
          const prevRow = prevKosdaq.find(
            (prevRow: any) => prevRow.name === newRow.name
          );
          return prevRow && prevRow.volume != newRow.volume;
        });
      }

      dataOneHourAgo.seoul = seoul;
      dataOneHourAgo.kosdaq = kosdaq;
    }

    return { newSeoul, newKosdaq, originSeoul: seoul, originKosdaq: kosdaq };
  };

  const newUs = async () => {
    const { nasdaq } = await useTradingview().tradingviewUsFiter();
    const { nasdaq: prevNasdaq } = dataOneHourAgo;

    let newNasdaq = [];
    if (new Date().getMinutes() == 0) {
      if (prevNasdaq.length === 0) {
        newNasdaq = nasdaq;
      } else {
        newNasdaq = nasdaq.filter((newRow: any) => {
          const prevRow = prevNasdaq.find(
            (prevRow: any) => prevRow.name === newRow.name
          );
          return prevRow.volume != newRow.volume;
        });
      }

      dataOneHourAgo.nasdaq = nasdaq;
    }

    return { newNasdaq, originNasdaq: nasdaq };
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
