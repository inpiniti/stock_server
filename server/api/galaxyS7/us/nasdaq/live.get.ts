export default defineEventHandler(async (event) => {
  try {
    const data = await useDrizzle().select().from(pgTableUsNasdaqLive);
    return data;
  } catch (error) {
    return error;
  }
});
