const mongoose = require('mongoose')

const parkTypeEnum = ['Parque', 'Reserva', 'Monumento']

const parkSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 100,
    required: true,
    unique: true,
  },
  region: {
    type: String,
    required: true,
    maxLength: 100,
  },
  park_type: {
    type: String,
    enum: parkTypeEnum,
    required: true,
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
module.exports.parkTypeEnum = parkTypeEnum
