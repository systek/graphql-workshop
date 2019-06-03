const database = require("../storage");
const marketPriceClient = require("../clients/marketPrice");

const QueryResolvers = {
  dishes: () => {
    console.log("Query resolver: dishes");

    return database.getDishes();
  },
  dish: (_, { dishId }) => {
    console.log(`Query resolver: dish(${dishId})`);

    return database.getDish(dishId);
  },
  orders: () => {
    console.log("Query resolver: getOrders");

    return database.getOrders();
  },
  ingredients: async (_, { orderBy }) => {
    const ingredients = await database.getIngredients();

    if (orderBy === "NAME") {
      console.log("Ordering by name");

      return ingredients.sort((a, b) => a.name.localeCompare(b.name));
    } else if (orderBy === "PRICE") {
      console.log(
        "Ordering by price (looking up every item twice because of resolving)"
      );

      const ingredientsWithPrice = await Promise.all(
        ingredients.map(async ingredient =>
          marketPriceClient
            .getPriceForIngredient(ingredient.name)
            .then(price => ({
              ...ingredient,
              marketPrice: price
            }))
        )
      );

      return ingredientsWithPrice.sort((a, b) => b.marketPrice - a.marketPrice);
    } else {
      return ingredients;
    }
  }
};

module.exports = QueryResolvers;
