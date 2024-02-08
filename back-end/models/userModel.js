const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 100,
  },
  email: {
    type: String,
    maxlength: 50,
    unique: true,
  },
  firstname: {
    type: String,
    maxlength: 50,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  password: {
  type: String, 
  required: true,
  },
});
//pk
userSchema.index({ username: 1 }, { unique: true });
//hashing password
userSchema.plugin(mongooseBcrypt);

module.exports = mongoose.model('User', userSchema);
