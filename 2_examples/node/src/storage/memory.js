const ingredients = [
  { id: 1, name: "Good Fish" },
  { id: 2, name: "Bad Fish" },
  { id: 3, name: "Wasabi" },
  { id: 4, name: "Soy Sauce" },
  { id: 5, name: "Wicked Fish" }
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
    }
  ],
  ingredients: {
    100: [ingredients[0], ingredients[2]]
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
  console.log(`Adding order ${order.orderId}`);
  database.orders.push(order);
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
  getOrders,
  getIngredients,
  findIngredientsInDish
};
