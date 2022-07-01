const ApiError = require('../error/apiError')
const { User } = require('../models')
const bcrypt = require('bcryptjs')

class AuthController {
  async registration(req, res, next) {
    try {
      const { login, password } = req.body

      //? Сделать касмотную проверку на существование логина.
      const candidate = await User.findOne({ login })

      if (candidate) {
        return next(ApiError.badRequest(`Login <${login}> already taken`))
      }

      const hashPassword = bcrypt.hashSync(password, 5)
      await User.create({ login, password: hashPassword })

      res.json({ login })
    } catch (err) {
      console.log(err)
      next(ApiError.badRequest(`Failed to register an account`))
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body

      const user = await User.findOne({ login })

      const isValidPassword = bcrypt.compareSync(password, user.password)

      if (!isValidPassword) {
        return next(ApiError.badRequest(`Incorrect login or password `))
      }


      if (user) {
        return res.json({ login })
      }

      return next(ApiError.badRequest(`Incorrect login or password`))
    } catch (err) {
      console.log(err)
      next(ApiError.badRequest(`Failed to login`))
    }
  }

  async isAuth(req, res, next) {
    //? в процессе
  }
}


module.exports = new AuthController()