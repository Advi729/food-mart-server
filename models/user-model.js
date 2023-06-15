const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: 'user',
        required: true,
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
      image: {
        type: String,
      },
});

module.exports = mongoose.model('User', userSchema);