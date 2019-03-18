const { createServer } = require('http')
const mongoose = require('mongoose')
const groupBy = require('lodash.groupby')
const { ResponseModel } = require('./lib/mongo')

const CONNECTION_STRING = `mongodb+srv://app_user:${
  process.env.MONGO_PASSWORD
}@questionnaire-gylae.mongodb.net/banderql?retryWrites=true`

mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.info('Connected to Mongo')
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

module.exports = async (req, res) => {
  const list = await ResponseModel.find({})

  console.info('things', list)

  const grouped = groupBy(list, 'response')

  const stats = {
    dotNet: (grouped['.NET Core'] || []).length,
    kotlin: (grouped['Kotlin'] || []).length,
    java: (grouped['Java'] || []).length,
    node: (grouped['Node'] || []).length,
  }

  res.end(JSON.stringify(stats))
}

if (!process.env.IS_NOW) {
  // so we have a server with the handler!
  createServer(module.exports).listen(3000)
}
