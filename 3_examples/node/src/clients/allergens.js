const fetch = require("node-fetch");

const OPTIONS = {
  method: "POST",
  headers: {
    "content-type": "application/json"
  }
};

const API_URL = "https://allergens.gql.systek.dev/";

const ALLERGENS_BY_INGREDIENT_QUERY = `
  query GetAllergensForIngredient($ingredient: String!) {
    allergens(ingredient: $ingredient)
  }
`;

const allergensClient = {
  getAllergensForIngredient: async ingredient => {
    console.info(`API: Getting allergerns for ingredient ${ingredient}`);

    const payload = {
      query: ALLERGENS_BY_INGREDIENT_QUERY,
      operationName: "GetAllergensForIngredient",
      variables: { ingredient: ingredient.toLowerCase() }
    };

    const response = await fetch(API_URL, {
      ...OPTIONS,
      body: JSON.stringify(payload)
    });

    if (response.status !== 200) {
      console.error(
        "API: Allergen service responded with non-200 status",
        response.status
      );
      return [];
    }

    const result = await response.json();

    if (result.error) {
      console.error("API: GraphQL error occured", result.error);
      return [];
    }

    return result.data.allergens;
  }
};

module.exports = allergensClient;
