import { AxiosResponse } from 'axios';
import { http } from "../http/http"
import { IPost } from '../models/IPost';


type CreatePost = Omit<IPost, 'id'>
type UpdatePost = Pick<IPost, 'text'>

export class PostService {
  static async create(body: CreatePost): Promise<AxiosResponse<IPost>> {
    const response = await http.post<IPost>('/post', body)
    return response
  }

  static async getAll(): Promise<AxiosResponse<IPost[]>> {
    const response = await http.get<IPost[]>('/post')
    return response
  }

  static async update(id: string, body: UpdatePost): Promise<AxiosResponse<IPost>> {
    const response = await http.put<IPost>(`/post/${id}`, body)
    return response
  }

  static async remove(id: string): Promise<AxiosResponse<IPost>> {
    const response = await http.delete<IPost>(`/post/${id}`)
    return response
  }
}

