class ApiError extends Error {
  constructor(status, message) {
    super()
    this.status = status
    this.message = message
  }

  static badRequest(message) {
    return new ApiError(400, message)
  }

  static unauthorized() {
    return new ApiError(401, 'You must be authorized for this operation')
  }

  static forbidden(message) {
    return new ApiError(403, message)
  }

  static notFound(message) {
    return new ApiError(404, message)
  }

  static notAcceptable(message) {
    return new ApiError(406, message)
  }

  static internal(message) {
    return new ApiError(500, message)
  }
}

module.exports = ApiError