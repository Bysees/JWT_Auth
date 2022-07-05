const ApiError = require("../error/apiError")
const tokenService = require("../services/tokenService")

const checkAuth = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1]

    if (accessToken) {
      const { login, userId } = tokenService.verifyAccessToken(accessToken)

      req.user = { login, userId }
      return next()
    }

  } catch (err) {
    next(ApiError.unauthorized())
  }
}

module.exports = checkAuth