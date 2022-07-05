const { body } = require('express-validator');

class AuthValidation {
  validateLogin() {
    const minLength = 4
    const maxLength = 12
    return body('login')
      .isAlphanumeric()
      .withMessage('Login must contain only alphanumeric letters')
      .isLength({ min: minLength, max: maxLength })
      .withMessage(`Login must be longer than ${minLength} and less than ${maxLength} letters`)
  }

  validatePassword() {
    const minLength = 4
    const maxLength = 24
    return body('password')
      .isAlphanumeric()
      .withMessage('Password must contain only alphanumeric letters')
      .isLength({ min: minLength, max: maxLength })
      .withMessage(`Password must be longer than ${minLength} and less than ${maxLength} letters`)
  }
}

module.exports = new AuthValidation()