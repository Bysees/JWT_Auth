import { http } from ".";

type RegistrationBody = {
  login: string
  password: string
}

type LoginBody = RegistrationBody

export class AuthService {
  static async registration(body: RegistrationBody) {
    const response = await http.post('/auth/registration', body)
    return response
  }

  static async login(body: LoginBody) {
    const response = await http.post('/auth/login', body)
    return response
  }

  //? Мб потом понадобиится
  // static async check() {
  //   const response = await http.get('/auth')
  //   return response
  // }
}


