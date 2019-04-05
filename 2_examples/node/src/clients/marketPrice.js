const fetch = require("node-fetch");

const API_URL = "https://market.gql.systek.dev";

const marketPriceClient = {
  getPriceForIngredient: async ingredient => {
    console.info(`API: Getting market price for ingredient ${ingredient}`);

    const result = await fetch(
      `${API_URL}/price?ingredient=${ingredient.toLowerCase()}`,
      { method: "GET" }
    );

    if (result.status !== 200) {
      console.error("API: Price service responded with non-200 status", result.status);
      return -1;
    }

    const body = await result.json();
    if (!body.price) {
      console.debug(`API: Price for ingredient ${ingredient} not found`);
      return -1;
    }

    return body.price;
  }
};

module.exports = marketPriceClient;
