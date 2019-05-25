const { Schema, model, connect } = require("mongoose");

const insertTestData = require("./mongoTestdata");

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${
  process.env.MONGODB_PASSWORD
}@cluster0-83mfa.mongodb.net/gqlworkshop?retryWrites=true`;

connect(
  uri,
  { useNewUrlParser: true }
)
  .then(() => {
    console.info("Successfully connected to mongodb");
  })
  .catch(err => {
    console.error(err);
  });

const Ingredient = model(
  "ingredient",
  new Schema({
    id: String,
    name: String
  })
);

const Dish = model(
  "dish",
  new Schema({
    id: String,
    name: String,
    price: Number
  })
);

const Order = model(
  "order",
  new Schema({
    id: String,
    delivery: String,
    delivered: String,
    items: [
      {
        id: String,
        name: String,
        price: Number
      }
    ]
  })
);

if (process.env.INSERT_DATA) {
  insertTestData(Dish, Order, Ingredient);
}

const getDishes = async () => {
  console.log("Getting all dishes");

  const dishes = await Dish.find({});

  return dishes;
};

const getDish = async id => {
  console.log(`Getting dish by id ${id}`);

  const dish = await Dish.findOne({ id });

  return dish;
};

const getIngredients = async () => {
  console.log(`Getting all ingredients`);

  return Ingredient.find({});
};

const addOrder = async order => {
  console.log(`Adding order ${order.id}`);

  await new Order(order).save();
};

const markAsDelivered = async orderId => {
  console.log(`Marking order ${orderId} as delivered`);

  const order = await Order.findOne({ id: orderId });

  if (order == null) {
    throw new Error("Order does not exist");
  }

  order.delivered = new Date().toISOString();

  await new Order(order).save();

  return order;
};

const getOrders = async () => {
  console.log(`Getting orders`);

  const orders = await Order.find({});

  return orders;
};

function findIngredientsInDish(dishId) {
  console.log("Getting ingredinents for dish", dishId);
  // return database.ingredients[dishId];
  return [];
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
