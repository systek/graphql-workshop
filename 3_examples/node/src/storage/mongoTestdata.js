const ingredients = [
  { id: 1, name: "Good Fish" },
  { id: 2, name: "Bad Fish" },
  { id: 3, name: "Wasabi" },
  { id: 4, name: "Soy Sauce" },
  { id: 5, name: "Wicked Fish" },
  { id: 6, name: "Saffron" }
];

const ingredientsMap = {
  100: [ingredients[0], ingredients[2]],
  101: [ingredients[5]],
  102: [ingredients[5]],
  103: [ingredients[5]],
  104: [ingredients[5]],
  105: [ingredients[5]]
};

const dishes = [
  { id: "100", name: "Sushi 8 pieces", price: 89.0 },
  { id: "101", name: "Sushi 16 pieces", price: 89.0 },
  { id: "102", name: "Sashimi Only", price: 129.0 },
  { id: "103", name: "Maki Town 1", price: 59.0 },
  { id: "104", name: "Tempered Tempura", price: 220 },
  { id: "105", name: "One Man Party Platter (38 pieces)", price: 429 }
];

const insertTestData = (DishModel, OrderModel, IngredientsModel) => {
  console.warn("Inserting test data");

  if (IngredientsModel) {
    ingredients.forEach(ingredient => {
      new IngredientsModel(ingredient).save();
    });
  }

  if (DishModel) {
    dishes.forEach(dish => {
      new DishModel(dish).save();
    });
  }

  if (OrderModel) {
    new OrderModel({
      id: "1000",
      delivery: new Date().toISOString(),
      delivered: null,
      items: [
        {
          id: 100,
          name: "Initial Sushi",
          price: 99
        }
      ]
    }).save();
  }
};

module.exports = insertTestData;
