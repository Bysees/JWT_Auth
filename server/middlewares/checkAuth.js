const ApiError = require("../error/apiError")
const TokenService = require("../services/tokenService")

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (token) {
    const { login } = TokenService.verify(token)
    req.auth = { login }
    return next()
  }

  return next(ApiError.unauthorized('You must be authorized for this operation'))
}

module.exports = checkAuth