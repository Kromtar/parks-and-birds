const mongoose = require('mongoose')

const risk_enum = [
  'No evaluado',
  'Datos insuficientes',
  'Menor riesgo',
  'Casi amenazado',
  'Vulnerable',
  'Peligro de extinción',
  'Peligro de extinción critico',
  'Extinto en la naturaleza',
  'Extinto',
]

const birdSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 100,
    required: true,
    unique: true,
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
    enum: risk_enum,
    default: 'No evaluado',
  },
  link: {
    type: String,
    maxLength: 300,
  },
  parks: {
    type: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Park',
      },
    ],
    default: [],
  },
})

const Bird = mongoose.model('Bird', birdSchema)

module.exports = Bird
module.exports.schema = birdSchema
module.exports.risk_enum = risk_enum
