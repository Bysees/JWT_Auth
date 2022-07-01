const ApiError = require("../error/apiError")

const checkAuth = (req, res, next) => {
  const login = req.headers.authentification?.split(' ')[1]

  if (login) {
    req.auth = { login }
    return next()
  }

  return next(ApiError.unauthorized('You must be authorized for this operation'))
}

module.exports = checkAuth