const { ObjectId } = require("mongodb")
const PostDto = require("../dtos/PostDto")
const { PostModel } = require("../models")

class PostService {
  async create(newPost, userId) {
    const refPost = { ...newPost, user_id: userId }
    const post = await PostModel.create(refPost)
    const postDto = new PostDto(post)
    return postDto
  }

  async getAll(userId) {
    const filter = { user_id: userId }
    const posts = await PostModel.find(filter)
    const postsDto = posts.map(post => new PostDto(post))
    return postsDto
  }

  async getAll(userId) {
    const filter = { user_id: userId }
    const posts = await PostModel.find(filter)
    const postsDto = posts.map(post => new PostDto(post))
    return postsDto
  }

  async update(id, text) {
    const filter = { _id: ObjectId(id) }
    const update = { $set: { text } }
    const options = { runValidators: true, returnDocument: 'after' }
    const updatedPost = await PostModel.findOneAndUpdate(filter, update, options)
    const postDto = new PostDto(updatedPost)
    return postDto
  }

  async remove(id) {
    const filter = { _id: ObjectId(id) }
    const deletedPost = await PostModel.findOneAndDelete(filter)
    const postDto = new PostDto(deletedPost)
    return postDto
  }
}

module.exports = new PostService()