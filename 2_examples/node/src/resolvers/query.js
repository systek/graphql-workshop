const database = require("../storage/memory");

const Queryresolvers = {
  dishes: () => database.getDishes(),
  dish: (...args) => {
    console.log(args);
  },
  orders: () => database.getOrders(),
  ingredients: () => ({})
};

module.exports = Queryresolvers;
