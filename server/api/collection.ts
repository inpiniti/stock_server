export default defineEventHandler(async (event) => {
  console.time("collection");
  try {
    await useCollection();
    console.timeEnd("collection");
    return true;
  } catch (error) {
    console.error(error);
    console.timeEnd("collection");
    return false;
  }
});
