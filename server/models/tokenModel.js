const mongoose = require("mongoose")
const { Schema } = mongoose

//? Удалять versionKey плохая практика! Но пока что удалю.
const options = {
  versionKey: false
}

const token = new Schema({
  expireAt: Date,
  user_id: { type: String, required: true, unique: true },
  refreshToken: { type: String, required: true }
}, options)

//? Настройка для автоудаления документа из бд
token.index({ "expireAt": 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model('Token', token)
