import { eq, sql } from "drizzle-orm";

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
    const sql_str = `select name, close, created_at
                       from seoul 
                      where DATE_TRUNC('hour', seoul.created_at) = DATE_TRUNC('hour', TIMESTAMP '${oneHourAgo()}')`;

    return await useGalaxy().execute(sql.raw(sql_str));
  };

  const seoulOneHourUpdate = async (currentSeoulList: any[]) => {
    try {
      const prevSeoulList: any = await seoulOneHourSelect();

      await useGalaxy().transaction(async (trx: any) => {
        for (const currentSeoul of currentSeoulList) {
          const prevSeoul = prevSeoulList.find(
            (prev: any) => prev.name == currentSeoul.name
          );
          if (!prevSeoul) continue; // prevSeoul이 없으면 건너뜁니다.

          const changeRate =
            ((currentSeoul.close - prevSeoul.close) / prevSeoul.close) * 100;

          const sql_str = `UPDATE seoul
                              SET change_1h = ${changeRate}
                            WHERE name = '${currentSeoul.name}'
                              AND DATE_TRUNC('hour', created_at) = DATE_TRUNC('hour', TIMESTAMP '${oneHourAgo()}')`;

          await trx.execute(sql.raw(sql_str));
        }
      });

      return true;
    } catch (error) {
      console.error(error); // 에러 로그를 출력합니다.
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
    seoulOneHourSelect,
    seoulOneHourUpdate,
  };
};
