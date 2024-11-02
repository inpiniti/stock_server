export default defineEventHandler(async (event) => {
  try {
    const data = await useDrizzle().select().from(pgTableUsNasdaq);
    return data;
  } catch (error) {
    return error;
  }
});
