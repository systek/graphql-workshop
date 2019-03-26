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
  }
};

function getDishes() {
  return database.dishes;
}

function getIngredients() {
  return database.ingredients;
}

function add(order) {
  database.orders.push(order);
}

function findIngredients(dishId) {
  console.log("Getting ingredinents for dish", dishId);
  return database.ingredients[dishId];
}

module.exports = {
  getDishes,
  findIngredients
};
