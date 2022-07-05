const { validationResult } = require("express-validator");

function validatedResult(req) {
  return validationResult(req).formatWith(({ msg }) => msg)
}

module.exports = { validatedResult }