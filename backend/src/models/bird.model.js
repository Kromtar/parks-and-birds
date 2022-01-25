const mongoose = require('mongoose')

const birdSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 100,
    required: true,
  },
  description: {
    type: String,
    maxLength: 500,
  },
  habitat: {
    type: String,
    maxLength: 500,
  },
  length_cm: {
    type: Number,
    min: 0,
  },
  risk: {
    type: String,
    maxLength: 50,
    trim: true,
    lowercase: true,
    //FUTURE: Existen 9 clasificaciones oficiales (iucnredlist.org) que pueden quedar como un Enum
    default: 'No evaluado',
  },
  link: {
    type: String,
    unique: true,
    maxLength: 300,
  },
})

const Bird = mongoose.model('Bird', birdSchema)

module.exports = Bird
module.exports.schema = birdSchema
