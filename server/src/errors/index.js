const {
  BAD_REQUEST,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
} = require('http-status-codes')
const { format } = require('util')
class CommonError extends Error {
  constructor (statusCode) {
    super()
    this.statusCode = statusCode
  }
}
class BadRequestError extends CommonError {
  constructor (message) {
    super(BAD_REQUEST)
    this.message = format('bad request error%s%s', message ? ': ' : '', message)
    this.name = BadRequestError.name
  }
}
class UnauthorizedError extends CommonError {
  constructor () {
    super(UNAUTHORIZED)
    this.message = 'unauthorized error'
    this.name = UnauthorizedError.name
  }
}
class UnknownError extends CommonError {
  constructor (message) {
    super(INTERNAL_SERVER_ERROR)
    this.message = message || 'internal server error'
    this.name = UnknownError.name
  }
}

module.exports = {
  CommonError,
  BadRequestError,
  UnauthorizedError,
  UnknownError,
}