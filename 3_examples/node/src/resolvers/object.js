const database = require("../storage/memory");
const marketPriceClient = require("../clients/marketPrice");

/* Use one of these clients, one uses normal fetch for communication, other uses apollo-link */
//const allergensClient = require("../clients/allergens");
const allergensClient = require("../clients/allergensApollo");

const ObjectResolvers = {
  Dish: {
    ingredients: dish => {
      console.log("Resolving ingredients for dish ", dish.id);
      return database.findIngredientsInDish(dish.id);
    }
  },
  Ingredient: {
    marketPrice: ingredient => {
      console.log("Resolving marketPrice for ingredient ", ingredient);
      return marketPriceClient.getPriceForIngredient(ingredient.name);
    },
    allergens: ingredient => {
      console.log("Resolving allergens for ingredient ", ingredient);
      return allergensClient.getAllergensForIngredient(ingredient.name);
    }
  }
};

module.exports = ObjectResolvers;
