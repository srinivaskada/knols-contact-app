const User = require('../models/User')

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select({
      name: 1,
      email: 1,
      phoneNumber: 1,
    })
    res.status(200).json({
      data: users
    })
  } catch(ex) {
    next(ex)
  }
}

module.exports = {
  getUsers
}
