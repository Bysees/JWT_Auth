export const validator = (login: string, password: string) => {

  if (!login || !password) {
    return 'Login or password cannot be empty'
  }

  const minLengh = 4
  const maxLength = 12

  if (login.length < minLengh || password.length < minLengh) {
    return `Login or password cannot be less than ${minLengh} letters`
  }

  if (login.length > maxLength || password.length > maxLength) {
    return `Login or password cannot be more than ${maxLength} letters`
  }

  return null
}