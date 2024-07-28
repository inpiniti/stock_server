import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  return await getLatestNasdaq();
});

export const getLatestNasdaq = async () => {
  try {
    const table_name = "us_nasdaq"; // 예시로 'kr_seoul'을 사용합니다. 필요에 따라 변수를 조정하세요.
    const lastData = await useGalaxy().execute(
      sql.raw(`WITH LatestEntries AS (
                SELECT name, volume, created_at,
                       ROW_NUMBER() OVER(PARTITION BY name ORDER BY created_at DESC) AS rn
                FROM ${table_name}
            )
            SELECT name, volume, created_at
            FROM LatestEntries
            WHERE rn = 1;`)
    );

    return lastData;
  } catch (error) {
    return error;
  }
};
