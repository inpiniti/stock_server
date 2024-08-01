export default defineEventHandler(async (event) => {
  return await useHistory().seoulOneHourSelect();
});
