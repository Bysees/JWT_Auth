const { ObjectId } = require('mongodb')
const { Post, User } = require('../schema')
const ApiError = require('../error/apiError')

class PostController {

  async create(req, res, next) {
    try {
      const post = req.body
      const { login } = req.auth

      const user = await User.findOne({ login })
      const refPost = { ...post, user_id: user.id }
      const postDocument = await Post.create(refPost)
      postDocument.user_id = undefined //? Remove the field

      res.json(postDocument)
    } catch (err) {
      console.log(err)
      next(ApiError.internal('Server error, try again later'))
    }
  }

  async getAll(req, res, next) {
    try {
      const { login } = req.auth

      const user = await User.findOne({ login })
      const filter = { user_id: user.id, }
      const projector = { user_id: 0, }
      const posts = await Post.find(filter).select(projector)

      res.json(posts)
    } catch (err) {
      console.log(err)
      next(ApiError.internal('Server error, try again later'))
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
      const { text } = req.body

      const filter = { _id: ObjectId(id) }
      const update = { $set: { text } }
      const options = { runValidators: true, returnDocument: 'after' }
      const projector = { user_id: 0 }
      const updatedPost = await Post.findOneAndUpdate(filter, update, options).select(projector)

      return res.json(updatedPost)
    } catch (err) {
      console.log(err)
      next(ApiError.internal('Server error, try again later'))
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params

      const filter = { _id: ObjectId(id) }
      const projector = { user_id: 0 }
      const deletedPost = await Post.findOneAndDelete(filter).select(projector)

      return res.json(deletedPost)
    } catch (err) {
      console.log(err)
      next(ApiError.internal('Server error, try again later'))
    }
  }
}


module.exports = new PostController()