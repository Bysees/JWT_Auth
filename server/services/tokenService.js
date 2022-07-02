const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_KEY } = process.env

class TokenService {
  static generate(data) {
    return jwt.sign({ ...data }, ACCESS_TOKEN_KEY, { expiresIn: '24h' })
  }

  static verify(token) {
    return jwt.verify(token, ACCESS_TOKEN_KEY)
  }
}

module.exports = TokenService