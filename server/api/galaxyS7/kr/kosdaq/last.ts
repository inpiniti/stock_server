export default defineEventHandler(async (event) => {
  return await getLatestKosdaq();
});

export const getLatestKosdaq = async () => {
  try {
    const table_name = "kosdaq"; // 예시로 'kr_seoul'을 사용합니다. 필요에 따라 변수를 조정하세요.
    const query = `
      WITH LatestEntries AS (
        SELECT name, volume, created_at,
               ROW_NUMBER() OVER(PARTITION BY name ORDER BY created_at DESC) AS rn
        FROM ${table_name}
      )
      SELECT name, volume, created_at
      FROM LatestEntries
      WHERE rn = 1;
    `;

    const { data, error } = await useSupabase().rpc("execute_sql", { query });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
