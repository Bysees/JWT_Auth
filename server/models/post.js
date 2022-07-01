const mongoose = require("mongoose")
const { Schema } = mongoose

//? Удалять versionKey плохая практика! Но пока что удалю.
const options = {
  versionKey: false,
}

const post = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  timestamp: { type: String, required: true },
  text: { type: String, required: true }
}, options)

//? Изначально думал, что это помогает указывать ID, но вроде оно и так указывается.
// post.path('_id')

module.exports = mongoose.model('Post', post)

