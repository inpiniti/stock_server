export default defineEventHandler(async (event) => {
  try {
    const data = await useGalaxy().select().from(pgTableUsNasdaqLive);
    return data;
  } catch (error) {
    return error;
  }
});
