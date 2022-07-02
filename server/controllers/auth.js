const ApiError = require('../error/apiError')
const { User } = require('../models')
const bcrypt = require('bcryptjs')
const TokenService = require('../services/tokenService')


class AuthController {
  async registration(req, res, next) {
    try {
      const { login, password } = req.body
      const candidate = await User.findOne({ login })

      if (candidate) {
        return next(ApiError.badRequest(`Login <${login}> already taken`))
      }

      const hashPassword = bcrypt.hashSync(password, 3)
      const user = await User.create({ login, password: hashPassword })

      const token = TokenService.generate({ login, id: user.id })
      res.json({ token })
    } catch (err) {
      console.log(err)
      next(ApiError.badRequest(`Failed to register an account`))
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body
      const user = await User.findOne({ login })

      if (!user) {
        return next(ApiError.badRequest(`Incorrect login or password`))
      }

      const isValidPassword = bcrypt.compareSync(password, user.password)

      if (!isValidPassword) {
        return next(ApiError.badRequest(`Incorrect login or password `))
      }

      const token = TokenService.generate({ login, id: user.id })
      res.json({ token })
    } catch (err) {
      console.log(err)
      next(ApiError.badRequest(`Failed to login`))
    }
  }

  async isAuth(req, res, next) {
    try {
      const { login } = req.auth
      const user = await User.findOne({ login })

      if (!user) {
        next(ApiError.unauthorized(`Invalid token, login doesn't exist`))
      }

      const token = TokenService.generate({ login: user.login, id: user.id })
      res.json({ token })
    } catch (err) {
      next(ApiError.unauthorized(`Unexpected auth error`))
    }

  }
}


module.exports = new AuthController()