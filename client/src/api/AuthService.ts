import { AxiosResponse } from 'axios';
import { http } from ".";
import { AuthRequst } from '../models/request/AuthRequest';
import { AuthResponse } from '../models/response/AuthResponse';


export class AuthService {
  static async registration(body: AuthRequst): Promise<AxiosResponse<AuthResponse>> {
    const response = await http.post<AuthResponse>('/auth/registration', body)
    return response

  }

  static async login(body: AuthRequst): Promise<AxiosResponse<AuthResponse>> {
    const response = await http.post<AuthResponse>('/auth/login', body)
    return response
  }

  static async check(): Promise<AxiosResponse<AuthResponse>> {
    const response = await http.get<AuthResponse>(`/auth`)
    return response
  }
}


