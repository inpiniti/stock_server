export default defineEventHandler(async (event) => {
  try {
    const data = await useGalaxy().select().from(pgTableKrKosdaq);
    return data;
  } catch (error) {
    return error;
  }
});
