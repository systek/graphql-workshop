const database = require("../storage");

const ObjectResolvers = {
  Dish: {
    ingredients: dish => database.findIngredients(dish.id)
  },
  Ingredient: {
    markedPrice: ingredient => {
      // TODO rest call
      return 69;
    },
    allergens: ingredient => {
      // TODO rest call
      return [];
    }
  }
};

module.exports = ObjectResolvers;
