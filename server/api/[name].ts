import list from "../../currencies/list.json";

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name");
  const singleCurrency = list.find(c => {
    return c.currency
  })

  return singleCurrency;
});
