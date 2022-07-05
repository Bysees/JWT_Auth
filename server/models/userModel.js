const mongoose = require("mongoose")
const { Schema } = mongoose

//? Удалять versionKey плохая практика! Но пока что удалю.
const options = {
  versionKey: false
}

const user = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, options)

module.exports = mongoose.model('User', user)
