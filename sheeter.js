const { createServer } = require('http')
const url = require('url')
const mongoose = require('mongoose')

const CONNECTION_STRING = `mongodb+srv://app_user:${
  process.env.MONGO_PASSWORD
}@questionnaire-gylae.mongodb.net/banderql?retryWrites=true`

mongoose
  .connect(
    CONNECTION_STRING,
    { useNewUrlParser: true },
  )
  .then(() => {
    console.info('Connected to Mongo')
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

const getIpAdress = req => {
  let ipAddr = req.connection.remoteAddress
  if (req.headers && req.headers['x-forwarded-for']) {
    ipAddr = req.headers['x-forwarded-for'].split(',')[0]
  }
  return ipAddr
}

const getResponse = req => {
  const parts = url.parse(req.url, true)
  return parts.query.response || null
}

const getCookieId = req => {
  return req.headers['x-uuid'] || 'None'
}

const ResponseModel = mongoose.model('Response', {
  ip: String,
  response: String,
  userAgent: String,
  referer: String,
  uuid: String,
})

module.exports = async (req, res) => {
  const value = getResponse(req)
  if (!value) {
    res.statusCode = 400
    res.end(JSON.stringify({ message: 'Invalid response' }))
    return
  }

  const response = new ResponseModel({
    ip: getIpAdress(req),
    response: value,
    uuid: getCookieId(req),
    userAgent: req.headers['user-agent'],
    referer: req.headers['referer'] || 'None',
  })

  await response.save()

  res.end(JSON.stringify({ message: 'Thanks' }))
}

if (!process.env.IS_NOW) {
  // so we have a server with the handler!
  createServer(module.exports).listen(3000)
}
