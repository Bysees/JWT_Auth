const ApiError = require('../error/apiError')
const client = require('../mongodb')
const users = client.db().collection('users')

class AuthController {

  async registration(req, res, next) {
    try {
      const { login, password } = req.body

      const isLoginTaken = await users.findOne({ login })

      if (isLoginTaken) {
        return next(ApiError.badRequest(`Login <${login}> already taken`))
      }

      await users.insertOne({ login, password })

      res.json({ login })
    } catch (err) {
      console.log(err)
      next(ApiError.badRequest(`Failed to register an account`))
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body

      const user = await users.findOne({ login, password })

      if (user) {
        return res.json({ login })
      }

      return next(ApiError.badRequest(`Failed to login`))
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