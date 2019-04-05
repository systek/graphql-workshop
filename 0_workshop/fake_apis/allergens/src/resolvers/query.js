const MongoClient = require('mongodb').MongoClient
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${
  process.env.MONGODB_PASSWORD
}@cluster0-83mfa.mongodb.net/test?retryWrites=true`

const client = new MongoClient(uri, { useNewUrlParser: true })

const connectToMongo = () =>
  new Promise((resolve, reject) => {
    client.connect(function(err) {
      if (err != null) {
        logError(err)
        return reject(err)
      }

      console.info('Connected successfully to mongo database')
      return resolve()
    })
  })

const lookupAllergens = async ingredient => {
  await connectToMongo()

  const collection = client.db('gqlworkshop').collection('allergens')
  const result = await collection.findOne({ ingredient: ingredient })

  if (result === null) {
    return []
  } else {
    return result.allergens
  }
}

const lookupFoods = async () => {
  await connectToMongo()

  const collection = client.db('gqlworkshop').collection('allergens')
  const result = await collection.find({}).toArray()

  console.log('result', result)

  // TODO this doesn't work. Needs to correcly shape the return object.

  if (result === null) {
    return []
  } else {
    return result.allergens
  }
}

const Queryresolvers = {
  allergens: (_, { ingredient }) => {
    console.log(`Query resolver: allergen(${ingredient})`)
    return lookupAllergens(ingredient)
  },
  foods: () => {
    console.log(`Query resolver: foods()`)
    return lookupFoods()
  },
}

module.exports = Queryresolvers
