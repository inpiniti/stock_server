export const useHistory = () => {
  const seoulInsert = async (data: any) => {
    try {
      const firstRowParamCount = Object.keys(data[0]).length; // 첫 번째 행의 파라미터 수를 계산합니다.
      const chunkSize = Math.floor(65534 / firstRowParamCount); // 83은 각 행의 파라미터 수입니다.
      const dataChunks = splitData(data, chunkSize);

      // 분할된 데이터 삽입
      for (const chunk of dataChunks) {
        await useGalaxy().insert(pgTableSeoul).values(chunk);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const seoulOneHourSelect = async () => {
    try {
      const result = await useGalaxy()
        .select(pgTableSeoul)
        .where({})
        .orderBy("id", "desc")
        .limit(60)
        .run();
      return result;
    } catch (error) {
      return [];
    }
  };

  const kosdaqInsert = async (data: any) => {
    try {
      const firstRowParamCount = Object.keys(data[0]).length; // 첫 번째 행의 파라미터 수를 계산합니다.
      const chunkSize = Math.floor(65534 / firstRowParamCount); // 83은 각 행의 파라미터 수입니다.
      const dataChunks = splitData(data, chunkSize);

      // 분할된 데이터 삽입
      for (const chunk of dataChunks) {
        await useGalaxy().insert(pgTableKosdaq).values(chunk);
      }

      return true;
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
        await useGalaxy().insert(pgTableNasdaq).values(chunk);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    seoulInsert,
    kosdaqInsert,
    nasdaqInsert,
  };
};
