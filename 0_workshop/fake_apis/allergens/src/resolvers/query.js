const mongoose = require('mongoose')
const { Schema } = mongoose

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${
  process.env.MONGODB_PASSWORD
  }@cluster0-83mfa.mongodb.net/gqlworkshop?retryWrites=true`

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.info('Successfully connected to mongodb')
  })
  .catch(err => {
    console.error(err)
  })

const Allergen = mongoose.model(
  'allergen',
  new Schema({
    ingredient: String,
    allergens: [String],
  }),
)

const lookupAllergens = async ingredient => {
  const result = await Allergen.findOne({ ingredient: ingredient })

  if (result === null) {
    return []
  } else {
    return result.allergens
  }
}

const lookupAllergensIn = async ingredients => {
  const result = await Allergen.find({ ingredient: { $in: ingredients } })

  if (result === null) {
    return []
  } else {
    return result.map(item => ({
      name: item.ingredient,
      allergens: item.allergens
    }))
  }
}

const lookupFoods = async () => {
  const result = await Allergen.find({})

  if (result === null) {
    return []
  } else {
    return result.map(item => ({
      name: item.ingredient,
      allergens: item.allergens,
    }))
  }
}

const Queryresolvers = {
  allergens: (_, { ingredient }) => {
    console.log(`Query resolver: allergen(${ingredient})`)
    return lookupAllergens(ingredient)
  },
  allergensIn: (_, { ingredients }) => {
    console.log(`Query resolver: allergensIn(${ingredients})`)
    return lookupAllergensIn(ingredients)
  },
  foods: () => {
    console.log(`Query resolver: foods()`)
    return lookupFoods()
  },
}

module.exports = Queryresolvers
