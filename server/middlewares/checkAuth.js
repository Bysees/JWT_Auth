const ApiError = require("../error/apiError")

const checkAuth = (req, res, next) => {

  const login = req.headers.authorization?.split(' ')[1]

  if (login) {
    req.auth = { login }
    return next()
  }

  return ApiError.unauthorized('You must be authorized for this operation')
}

module.exports = checkAuth