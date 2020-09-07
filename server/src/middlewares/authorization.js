const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require("../errors");
const { JWT_SECRET } = require('../config');


const authorization = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      throw new UnauthorizedError()
    }
    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      // Add user from payload
      req.user = decoded;
      next();
    } catch (ex) {
      console.log(ex)
      throw new UnauthorizedError()
    }
  } catch (ex) {
    next(ex)
  }
}
module.exports = {
  authorization
}