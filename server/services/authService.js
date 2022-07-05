const { UserModel } = require("../models")
const tokenService = require("./tokenService")
const bcrypt = require('bcryptjs')
const ApiError = require("../error/apiError")

class AuthSerivce {
  async registration(login, password) {
    const candidate = await UserModel.findOne({ login })
    if (candidate) {
      throw ApiError.badRequest(`Login <${login}> already taken`)
    }

    const hashPassword = bcrypt.hashSync(password, 3)
    const user = await UserModel.create({ login, password: hashPassword })

    const { accessToken, refreshToken, refreshExpire } = await tokenService.generateTokens({
      login: user.login,
      userId: user.id
    })

    return { accessToken, refreshToken, refreshExpire }
  }

  async login(login, password) {
    const user = await UserModel.findOne({ login })

    if (!user) {
      throw ApiError.badRequest(`Incorrect login or password`)
    }

    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) {
      throw ApiError.badRequest(`Incorrect login or password `)
    }

    const { accessToken, refreshToken, refreshExpire } = await tokenService.generateTokens({
      login: user.login,
      userId: user.id
    })

    return { accessToken, refreshToken, refreshExpire }
  }

  async logout(refreshToken) {
    await tokenService.deleteRefreshFromBD(refreshToken)
  }

  async refresh(refreshToken) {
    const userTokenData = tokenService.verifyRefreshToken(refreshToken)
    const refreshTokenDB = await tokenService.findRefreshInDb(refreshToken)
    if (!userTokenData || !refreshTokenDB) {
      throw ApiError.unauthorized()
    }

    const { login, userId } = userTokenData
    const user = await UserModel.findOne({ login, _id: userId })

    const { accessToken, refreshToken: newRefreshToken, refreshExpire } = await tokenService.generateTokens({
      login: user.login,
      userId: user.id
    })

    return {
      login: user.login,
      accessToken,
      newRefreshToken,
      refreshExpire
    }
  }
}

module.exports = new AuthSerivce()