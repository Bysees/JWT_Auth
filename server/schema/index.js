const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
const { Schema } = mongoose

//? Удалять versionKey плохая практика! Но пока что удалю.
const options = {
  versionKey: false,
}

const user = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
}, options)

user.path('_id')

const User = mongoose.model('User', user)



const post = new Schema({
  user_id: { type: ObjectId, required: true, ref: User },
  timestamp: { type: String, required: true },
  text: { type: String, required: true }
}, options)

post.path('_id')

const Post = mongoose.model('Post', post)

module.exports = {
  Post, User
}
