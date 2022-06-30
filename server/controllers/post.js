const { ObjectId } = require('mongodb')
const ApiError = require('../error/apiError')
const client = require('../mongodb')

const postsDB = client.db().collection('posts')
const usersDB = client.db().collection('users')

class PostController {

  async create(req, res, next) {
    try {
      const post = req.body
      const { login } = req.auth

      const user = await usersDB.findOne({ login })
      const refPost = { ...post, user_id: user._id }
      const { insertedId } = await postsDB.insertOne(refPost)
      const postWithId = { ...post, _id: insertedId }

      res.json(postWithId)
    } catch {
      next(ApiError.internal('Server error, try again later'))
    }
  }

  async getAll(req, res, next) {
    try {
      const { login } = req.auth

      const user = await usersDB.findOne({ login })
      const filter = { user_id: user._id, }
      const projection = { user_id: 0 } //? Exclude that field from finded result
      const posts = await postsDB.find(filter).project(projection).toArray()

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
      const {
        ok: isUpdateSuccessful,
        value: post
      } = await postsDB.findOneAndUpdate(filter, update)

      if (isUpdateSuccessful) {
        delete post.user_id
        return res.json(post)
      }

      return next(ApiError.badRequest('Failed to update'))
    } catch (err) {
      console.log(err)
      next(ApiError.internal('Server error, try again later'))
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params

      const {
        ok: isDeleteSuccessful,
        value: post
      } = await postsDB.findOneAndDelete({ _id: ObjectId(id) })

      if (isDeleteSuccessful) {
        delete post.user_id
        return res.json(post)
      }

      return next(ApiError.badRequest('Failed to delete'))
    } catch (err) {
      console.log(err)
      next(ApiError.internal('Server error, try again later'))
    }
  }
}


module.exports = new PostController()