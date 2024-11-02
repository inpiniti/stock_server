export default defineEventHandler(async (event) => {
  try {
    const data = await useDrizzle().select().from(pgTableKrSeoul);
    return data;
  } catch (error) {
    return error;
  }
});
