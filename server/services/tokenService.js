const jwt = require('jsonwebtoken')
const { TokenModel } = require('../models')
const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = process.env

class TokenService {
  accessExpire = '15m'
  refreshExpire = 30 * 24 * 60 * 60 * 1000 //? 30d

  generateTokens = async ({ login, userId }) => {
    const accessToken = this.generateAccessToken({ login, userId })
    const refreshToken = this.generateRefreshToken({ login, userId })
    await this.saveRefreshInDB(refreshToken, userId)
    return {
      accessToken,
      refreshToken,
      refreshExpire: this.refreshExpire
    }
  }

  generateAccessToken(data) {
    const accessToken = jwt.sign(data, ACCESS_TOKEN_KEY, {
      expiresIn: this.accessExpire,
      noTimestamp: false
    })
    return accessToken
  }

  generateRefreshToken(data) {
    const refreshToken = jwt.sign(data, REFRESH_TOKEN_KEY, {
      expiresIn: this.refreshExpire,
      noTimestamp: false
    })
    return refreshToken
  }

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, ACCESS_TOKEN_KEY)
    } catch (err) {
      return null
    }
  }

  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, REFRESH_TOKEN_KEY)
    } catch (err) {
      return null
    }
  }

  async findRefreshInDb(token) {
    const refreshToken = await TokenModel.findOne({ refreshToken: token })
    return refreshToken
  }

  async deleteRefreshFromBD(token) {
    await TokenModel.deleteOne({ refreshToken: token })
  }

  async saveRefreshInDB(token, userId) {
    const tokenDB = await TokenModel.findOne({ user_id: userId })

    if (tokenDB) {
      tokenDB.refreshToken = token
      tokenDB.expireAt = Date.now() + this.refreshExpire
      tokenDB.save()
      return
    }

    await TokenModel.create({
      refreshToken: token,
      user_id: userId,
      expireAt: Date.now() + this.refreshExpire
    })
  }
}

module.exports = new TokenService()