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
  return database.dishes;
}

function getDish(id) {
  return database.dishes.find(dish => dish.id === id);
}

function getIngredients() {
  return database.ingredients;
}

function addOrder(order) {
  database.orders.push(order);
}

function getOrders() {
  return database.orders;
}

function findIngredients(dishId) {
  console.log("Getting ingredinents for dish", dishId);
  return database.ingredients[dishId];
}

module.exports = {
  getDishes,
  getDish,
  addOrder,
  getOrders,
  findIngredients
};
