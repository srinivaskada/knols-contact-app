const { OAuth2Client } = require('google-auth-library')
const { GOOGLE_CLIENT_ID } = require('../config')

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID)

const verifyGoogleLogin = async idToken => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  })
  const { email, picture, name, given_name: givenName, family_name: familyName, sub: socialId } = ticket.getPayload()
  return {
    email,
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
    res.status(200).json({
      status: 0,
      socialDetails
    })
  } catch (ex) {
    next(ex)
  }
}

module.exports = {
  socialLogin
}