import axios, { AxiosResponse } from 'axios';
import { API_URL, http } from "../http/http";
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

  static async logout() {
    await http.delete('/auth/logout')
  }

  static async check(): Promise<AxiosResponse<AuthResponse>> {
    const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true })
    return response
  }
}


