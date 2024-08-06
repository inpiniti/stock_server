export default defineEventHandler(async (event) => {
  try {
    const data = await useGalaxy().select().from(pgTableKrKosdaqLive);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
});
