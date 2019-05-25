const database = require("../storage");

const MutationResolver = {
  order: async (_, { dishes }) => {
    console.log("Order mutation received");
    const items = await Promise.all(
      dishes.map(async dishToOrder => {
        const dish = await database.getDish(dishToOrder.dishId);

        if (!dish) throw new Error("Invalid dish: Doesn't exist");

        return dish;
      })
    );

    const order = {
      id: `${Math.round(Math.random() * 10000000)}`,
      delivery: new Date().toISOString(),
      delivered: null,
      items: items
    };

    await database.addOrder(order);

    console.log("Order completed");

    return order;
  },
  markDelivered: (_, { orderId }) => {
    console.log("Mark delivered mutation received");

    return database.markAsDelivered(orderId);
  }
};

module.exports = MutationResolver;
