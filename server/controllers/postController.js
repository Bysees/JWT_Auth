const postService = require('../services/postService')
const ApiError = require('../error/apiError')
const { validatedResult } = require('../validation')

class PostController {
  async create(req, res, next) {
    try {
      const errors = validatedResult(req)
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().join(', ')
        return next(ApiError.badRequest(errorMessage))
      }

      const newPost = req.body
      const { userId } = req.user
      const post = await postService.create(newPost, userId)

      res.json(post)
    } catch (err) {
      next(err)
    }
  }

  async getAll(req, res, next) {
    try {
      const { userId } = req.user
      const posts = await postService.getAll(userId)

      res.json(posts)
    } catch (err) {
      next(err)
    }
  }

  async update(req, res, next) {
    try {
      const errors = validatedResult(req)
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().join(', ')
        return next(ApiError.badRequest(errorMessage))
      }

      const { id } = req.params
      const { text } = req.body
      const updatedPost = await postService.update(id, text)

      res.json(updatedPost)
    } catch (err) {
      next(err)
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params
      const deletedPost = await postService.remove(id)

      res.json(deletedPost)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new PostController()