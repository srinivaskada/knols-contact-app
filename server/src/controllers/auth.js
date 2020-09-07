const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')
const { GOOGLE_CLIENT_ID, JWT_SECRET } = require('../config')

const User = require('../models/User')

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID)

const verifyGoogleLogin = async idToken => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  })
  const { email, picture, name, given_name: givenName, family_name: familyName, sub: socialId, phoneNumber } = ticket.getPayload()
  return {
    email,
    phoneNumber,
    picture,
    name: name || `${givenName} ${familyName}`,
    socialId
  }
}

const socialLogin = async (req, res, next) => {
  try {
    const { providedBy, token } = req.body
    let socialDetails
    switch(providedBy) {
      case 'google': {
        socialDetails = await verifyGoogleLogin(token)
        break
      }
      default:
        throw new Error(`Unknown providedBy ${providedBy}`)
    }
    const { email } = socialDetails
    let user = await User.findOne({ email })
    if(!user) {
      const { name, phoneNumber, picture } = socialDetails
      let user = await new User({
        name,
        email,
        phoneNumber,
        picture,
        createdDate: new Date()
      }).save()
    }
    const userToken = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: 3600 })
    if (!userToken) throw Error('Couldnt sign the token')
    res.status(200).json({
      status: 0,
      token: userToken,
      userDetails: {
        id: user._id,
        email: user.email,
        picture: user.picture
      }
    })
  } catch (ex) {
    next(ex)
  }
}

module.exports = {
  socialLogin
}