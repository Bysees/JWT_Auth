const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://bysees:DOtjewe9sQDPw8Dy@cluster0.natv9ay.mongodb.net/application?retryWrites=true&w=majority";

const client = new MongoClient(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
  });


module.exports = client


