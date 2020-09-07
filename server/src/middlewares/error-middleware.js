const { CommonError } = require('../errors')
const { INTERNAL_SERVER_ERROR } = require('http-status-codes')

module.exports = (err, req, res, next) => {
  if (!(err instanceof CommonError)) {
    const oldStack = err.stack
    err = new UnknownError()
    err.stack = oldStack
  }

  if (!err.statusCode) {
    err.statusCode = INTERNAL_SERVER_ERROR
  }
  err.message = err.message.charAt(0).toLowerCase() + err.message.slice(1)
  res.status(err.statusCode).json({
    error: err.name,
    message: err.message,
    requestId: req.requestId
  })
  next()
}
