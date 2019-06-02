const { parse } = require('url')
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

const MarketPrice = mongoose.model(
  'marketprice',
  new Schema({
    ingredient: String,
    price: Number,
  }),
)

const handleRequest = async (req, res) => {
  const { query } = parse(req.url, true)
  const { ingredient = undefined, ingredients = undefined } = query

  if (ingredient !== undefined) {
    await getMarketPrice(ingredient, res)
  } else if (ingredients !== undefined) {
    await getMarketPrices(ingredients, res)
  } else {
    res.statusCode = 400
    res.end(JSON.stringify({ message: 'no valid parameters supplied' }))
  }
}


const getMarketPrice = async (ingredient, res) => {

  res.setHeader('Content-Type', 'application/json')
  let result
  try {
    result = await MarketPrice.findOne({ ingredient: ingredient })
  } catch (e) {
    res.statusCode = 500
    res.end(
      JSON.stringify({
        message: 'Error during communication with data source',
      }),
    )
  }

  if (result === null) {
    res.end(JSON.stringify({}))
  } else {
    res.end(
      JSON.stringify({
        name: result.ingredient,
        price: result.price,
      }),
    )
  }
}

const getMarketPrices = async (ingredients, res) => {
  const ingredientsArray = ingredients.split(',');

  res.setHeader('Content-Type', 'application/json')
  let result
  try {
    result = await MarketPrice.find({ ingredient: { $in: ingredientsArray } })
  } catch (e) {
    res.statusCode = 500
    res.end(
      JSON.stringify({
        message: 'Error during communication with data source',
      }),
    )
    return
  }

  if (result === null) {
    res.end(JSON.stringify({}))
  } else {
    res.end({
      data: JSON.stringify(result.map(item => ({
        ingredient: item.ingredient,
        price: item.price,
      })))
    })
  }
}

module.exports = handleRequest

if (!process.env.IS_NOW) {
  const http = require('http')
  const app = http.createServer((req, res) => {
    handleRequest(req, res)
  })

  app.listen(3000, () =>
    console.log(`Running locally in dev mode on port ${3000}!`),
  )
}
