export default defineEventHandler(async (event) => {
  try {
    const data = await useDrizzle().select().from(pgTableKrSeoulLive);
    return data;
  } catch (error) {
    return error;
  }
});
