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

const getMarketPrice = async (req, res) => {
  const { query } = parse(req.url, true)
  const { ingredient = undefined } = query

  res.setHeader("Content-Type", "application/json")
  if (ingredient === undefined) {
    res.statusCode = 400
    res.end(JSON.stringify({ message: 'missing ingredient parameter' }))
  }

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

module.exports = getMarketPrice

if (!process.env.IS_NOW) {
  const http = require('http')
  const app = http.createServer((req, res) => {
    getMarketPrice(req, res)
  })

  app.listen(3000, () =>
    console.log(`Running locally in dev mode on port ${3000}!`),
  )
}
