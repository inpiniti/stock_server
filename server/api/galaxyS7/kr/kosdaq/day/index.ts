import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const data = await useGalaxy().execute(
      sql.raw(`select * from kosdaq_one_day_change`)
    );
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
});
