const database = require("../storage/memory");

const MutationResolver = {
  order: (_, { dishes }) => {
    console.log("Order mutation received");
    const items = dishes.map(dishToOrder => {
      const dish = database.getDish(dishToOrder.dishId);

      if (!dish) throw new Error("Invalid dish: Doesn't exist");

      return dish;
    });

    const order = {
      orderId: `${Math.random()}`,
      delivery: new Date().toISOString(),
      delivered: null,
      items: items
    };

    database.addOrder(order);

    console.log("Order completed");

    return order;
  },
  markDelivered: (_, { orderId }) => {
    console.log("Mark delivered mutation received");

    database.markAsDelivered(orderId);

    return orderId;
  }
};

module.exports = MutationResolver;
