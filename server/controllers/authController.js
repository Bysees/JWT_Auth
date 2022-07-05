const ApiError = require('../error/apiError')
const authSerivce = require('../services/authService')
const { validatedResult } = require('../validation')

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validatedResult()
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().join(', ')
        return next(ApiError.badRequest(errorMessage))
      }

      const { login, password } = req.body
      const { accessToken, refreshToken, refreshExpire } = await authSerivce.registration(login, password)

      res.cookie('refreshToken', refreshToken, { maxAge: refreshExpire, httpOnly: true })
      res.json({ login, token: accessToken })
    } catch (err) {
      next(err)
    }
  }

  async login(req, res, next) {
    try {
      const errors = validatedResult(req)
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().join(', ')
        return next(ApiError.badRequest(errorMessage))
      }

      const { login, password } = req.body
      const { accessToken, refreshToken, refreshExpire } = await authSerivce.login(login, password)

      res.cookie('refreshToken', refreshToken, { maxAge: refreshExpire, httpOnly: true })
      res.json({ login, token: accessToken })
    } catch (err) {
      next(err)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      await authSerivce.logout(refreshToken)

      res.clearCookie('refreshToken')
      res.json({ message: 'success' })
    } catch (err) {
      next(err)
    }
  }

  async refreshAuth(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      if (!refreshToken) {
        return next(ApiError.unauthorized())
      }

      const { login, accessToken, newRefreshToken, refreshExpire } = await authSerivce.refresh(refreshToken)

      res.cookie('refreshToken', newRefreshToken, { maxAge: refreshExpire, httpOnly: true })
      res.json({ login, token: accessToken })
    } catch (err) {
      next(err)
    }
  }
}


module.exports = new AuthController()