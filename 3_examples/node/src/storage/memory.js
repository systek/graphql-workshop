const ingredients = [
  { id: 1, name: "Good Fish" },
  { id: 2, name: "Bad Fish" },
  { id: 3, name: "Wasabi" },
  { id: 4, name: "Soy Sauce" },
  { id: 5, name: "Wicked Fish" },
  { id: 6, name: "Saffron" }
];

// Simple in memory data store
const database = {
  dishes: [
    {
      id: 100,
      name: "Sushi 8 pieces",
      price: 89.0
    },
    {
      id: 101,
      name: "Sushi 16 pieces",
      price: 89.0
    },
    {
      id: 102,
      name: "Sashimi Only",
      price: 129.0
    },
    {
      id: 103,
      name: "Maki Town 1",
      price: 59.0
    },
    {
      id: 104,
      name: "Tempered Tempura",
      price: 220
    },
    {
      id: 105,
      name: "One Man Party Platter (38 pieces)",
      price: 429
    }
  ],
  ingredients: {
    100: [ingredients[0], ingredients[2]],
    101: [ingredients[5]],
    102: [ingredients[5]],
    103: [ingredients[5]],
    104: [ingredients[5]],
    105: [ingredients[5]]
  },
  orders: []
};

function getDishes() {
  console.log("Getting all dishes");
  return database.dishes;
}

function getDish(id) {
  console.log(`Getting dish by id ${id}`);
  return database.dishes.find(dish => dish.id === id);
}

function getIngredients() {
  console.log(`Getting all ingredients`);
  return ingredients;
}

function addOrder(order) {
  console.log(`Adding order ${order.id}`);
  database.orders.push(order);
}

function markAsDelivered(orderId) {
  console.log(`Marking order ${orderId} as delivered`);

  const orderToUpdateIndex = database.orders.findIndex(
    order => order.id === orderId
  );

  if (orderToUpdateIndex === -1) {
    throw new Error("Order does not exist");
  }

  database.orders[orderToUpdateIndex].delivered = new Date().toISOString();

  return database.orders[orderToUpdateIndex]
}

function getOrders() {
  console.log(`Getting orders`);
  return database.orders;
}

function findIngredientsInDish(dishId) {
  console.log("Getting ingredinents for dish", dishId);
  return database.ingredients[dishId];
}

module.exports = {
  getDishes,
  getDish,
  addOrder,
  markAsDelivered,
  getOrders,
  getIngredients,
  findIngredientsInDish
};
