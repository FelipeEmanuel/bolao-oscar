const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {type: String, required: [true, 'Please add a name'], unique: true},
    email: {type: String, required: [true, 'Please add an email'], unique: true},
    password: {type: String, required: [true, 'Please add a password']},
    role: {type: String, default: "user"},
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)