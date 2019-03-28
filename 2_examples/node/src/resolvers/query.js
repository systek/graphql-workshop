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
  ingredients: () => {
    console.log("Query resolver: ingredients");
    return database.getIngredients();
  }
};

module.exports = Queryresolvers;
