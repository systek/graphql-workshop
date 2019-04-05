const MongoClient = require('mongodb').MongoClient
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${
  process.env.MONGODB_PASSWORD
}@cluster0-83mfa.mongodb.net/test?retryWrites=true`

const client = new MongoClient(uri, { useNewUrlParser: true })

const connectToMongo = () =>
  new Promise((resolve, reject) => {
    client.connect(function(err) {
      if (err != null) {
        console.error(err)
        return reject(err)
      }

      console.info('Connected successfully to mongo database')
      return resolve()
    })
  })

const getMarketPrice = (req, res) => {
  const { query } = parse(req.url, true)
  const { ingredient = undefined } = query

  if (ingredient === undefined) {
    res.statusCode = 400
    res.end(JSON.stringify({ message: 'missing ingredient parameter' }))
  }

  connectToMongo()
    .catch(reason => {
      console.error(reason)
      res.statusCode = 500
      res.end('Unable to connect to datasource')
    })
    .then(() => {
      const collection = client.db('gqlworkshop').collection('marketprice')
      collection
        .findOne({ ingredient: ingredient })
        .then(result => {
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
        })
        .catch(reason => {
          console.error('reason: ', reason)
          res.statusCode = 500
          res.end('error reading from datasource')
        })
    })
}

const { parse } = require('url')

module.exports = (req, res) => {
  getMarketPrice(req, res)
}

if (!process.env.IS_NOW) {
  const http = require('http')
  const app = http.createServer((req, res) => {
    getMarketPrice(req, res)
  })

  app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))
}
