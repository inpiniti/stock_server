export default defineEventHandler(async (event) => {
  try {
    const data = await useGalaxy().select().from(pgTableKrSeoulLive);
    return data;
  } catch (error) {
    return error;
  }
});
