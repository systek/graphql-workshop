const mongoose = require('mongoose')

const ResponseModel = mongoose.model('Response', {
  ip: String,
  response: String,
  userAgent: String,
  referer: String,
  timestamp: String,
  uuid: String,
})

module.exports = {
  ResponseModel,
}
