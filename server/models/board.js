const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
  boardName: {
    type: String,
    required: true
  },
  boardContent: {
    type: Object,
    required: true
  }
})

module.exports = mongoose.model('Board', boardSchema)