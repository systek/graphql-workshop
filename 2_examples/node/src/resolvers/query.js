const database = require("../storage/memory");

const Queryresolvers = {
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
    const ingredients = database.getIngredients();

    if (orderBy == "NAME") {
      console.log("Ordering by name");
      return ingredients.sort((a, b) => a.name > b.name);
    } else {
      return ingredients;
    }
  }
};

module.exports = Queryresolvers;
