const database = require("../storage");
const marketPriceClient = require("../clients/marketPrice");
const allergensClient = require("../clients/allergens");

const ObjectResolvers = {
  Dish: {
    ingredients: dish => database.findIngredients(dish.id)
  },
  Ingredient: {
    markedPrice: ingredient => {
      return marketPriceClient.getPriceForIngredient(ingredient);
    },
    allergens: ingredient => {
      return allergensClient.getAllergensForIngredient(ingredient);
    }
  }
};

module.exports = ObjectResolvers;
