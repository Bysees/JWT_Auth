const { body } = require('express-validator');

class PostValidation {
  validateText() {
    const maxLength = 120
    return body('text')
      .notEmpty()
      .withMessage(`The post must not be empty`)
      .isLength({ max: maxLength })
      .withMessage(`The post must be no longer than ${maxLength} letters`)
  }
}

module.exports = new PostValidation()