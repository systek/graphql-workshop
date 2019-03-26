const database = require('../storage')

const Queryresolvers = {
  dishes: () => database.getDishes(),
  dish: (...args) => {
      console.log(args)
  },
  ingredients: () => ({})
};

module.exports = Queryresolvers;
