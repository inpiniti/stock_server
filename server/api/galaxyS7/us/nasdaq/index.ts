export default defineEventHandler(async (event) => {
  try {
    const data = await useGalaxy().select().from(pgTableUsNasdaq);
    return data;
  } catch (error) {
    return error;
  }
});
