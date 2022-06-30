const mongoose = require('mongoose');

const uri = "mongodb+srv://bysees:DOtjewe9sQDPw8Dy@cluster0.natv9ay.mongodb.net/application?retryWrites=true&w=majority";

async function mongooseConnect() {
  await mongoose.connect(uri);
}

module.exports = { mongooseConnect }


