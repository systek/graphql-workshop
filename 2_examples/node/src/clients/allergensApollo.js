const fetch = require("node-fetch");
const { execute, makePromise } = require("apollo-link");
const { HttpLink } = require("apollo-link-http");
const gql = require("graphql-tag");

const API_URL = "https://allergens.gql.systek.dev/";
const link = new HttpLink({ uri: API_URL, fetch });

const ALLERGENS_BY_INGREDIENT_QUERY = gql`
  query GetAllergensForIngredient($ingredient: String!) {
    allergens(ingredient: $ingredient)
  }
`;

const allergensClient = {
  getAllergensForIngredient: async ingredient => {
    console.info(`API: Getting allergerns for ingredient ${ingredient}`);

    const operation = {
      query: ALLERGENS_BY_INGREDIENT_QUERY,
      operationName: "GetAllergensForIngredient",
      variables: { ingredient: ingredient.toLowerCase() }
    };

    const response = await makePromise(execute(link, operation));

    if (response.error) {
      console.error("API: GraphQL error occured", response.error);
      return [];
    }

    return response.data.allergens;
  }
};

module.exports = allergensClient;
