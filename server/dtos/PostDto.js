class PostDto {
  constructor(document) {
    this.id = document._id
    this.text = document.text
    this.timestamp = document.timestamp
  }
}

module.exports = PostDto