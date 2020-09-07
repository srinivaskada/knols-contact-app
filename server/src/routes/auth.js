const { Router } = require('express')
const { socialLogin } = require('../controllers/auth')

const router = Router()

router.post('/social-login', socialLogin)

module.exports = router
