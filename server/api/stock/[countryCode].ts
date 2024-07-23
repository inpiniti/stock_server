const COUNTRY_CODE = {
  kr: "korea",
  us: "america",
};

export default defineEventHandler(async (event) => {
  const countryCode = String(getRouterParam(event, "countryCode")) as
    | "kr"
    | "us";

  return [];
});
