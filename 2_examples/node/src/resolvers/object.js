const database = require("../storage/memory");
const marketPriceClient = require("../clients/marketPrice");
const allergensClient = require("../clients/allergens");

const ObjectResolvers = {
  Dish: {
    ingredients: dish => {
      console.log("Resolving ingredients for dish ", dish.id);
      return database.findIngredientsInDish(dish.id);
    }
  },
  Ingredient: {
    markedPrice: ingredient => {
      console.log("Resolving markedPrice for ingredient ", ingredient);
      return marketPriceClient.getPriceForIngredient(ingredient);
    },
    allergens: ingredient => {
      console.log("Resolving allergens for ingredient ", ingredient);
      return allergensClient.getAllergensForIngredient(ingredient);
    }
  }
};

module.exports = ObjectResolvers;
