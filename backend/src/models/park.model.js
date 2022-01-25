const mongoose = require('mongoose')

const parkSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 100,
    required: true,
  },
  region: {
    type: String,
    required: true,
    maxLength: 100,
  },
  park_type: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  hectares: {
    type: Number,
    min: 0,
  },
  link: {
    type: String,
    maxLength: 300,
  },
  birds: {
    type: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Bird',
      },
    ],
    default: [],
  },
})

const Park = mongoose.model('Park', parkSchema)

module.exports = Park
module.exports.schema = parkSchema
