import { http } from "."
import type { IPost } from '../types/index'

type CreatePostBody = Omit<IPost, '_id'>
type UpdatePostBody = Pick<IPost, 'text'>


export class PostService {
  static async create(body: CreatePostBody) {
    const response = await http.post<IPost>('/post', body)
    return response
  }

  static async getAll() {
    const response = await http.get<IPost[]>('/post')
    return response
  }

  static async update(id: string, body: UpdatePostBody) {
    const response = await http.put<IPost>(`/post/${id}`, body)
    return response
  }

  static async remove(id: string) {
    const response = await http.delete<IPost>(`/post/${id}`)
    return response
  }
}

