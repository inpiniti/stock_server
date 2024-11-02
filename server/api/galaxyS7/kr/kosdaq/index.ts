export default defineEventHandler(async (event) => {
  try {
    const data = await useDrizzle().select().from(pgTableKrKosdaq);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
});
