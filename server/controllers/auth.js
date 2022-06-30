const ApiError = require('../error/apiError')
const { User } = require('../schema')

class AuthController {

  async registration(req, res, next) {
    try {
      const { login, password } = req.body

      //? Сделать касмотную проверку на существование логина.
      const isLoginTaken = await User.findOne({ login })

      if (isLoginTaken) {
        return next(ApiError.badRequest(`Login <${login}> already taken`))
      }

      await User.create({ login, password })

      res.json({ login })
    } catch (err) {
      console.log(err)
      next(ApiError.badRequest(`Failed to register an account`))
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body

      const user = await User.findOne({ login, password })

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