const { Schema, model } = require('mongoose');

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: '', // قيمة افتراضية بدلاً من null
  },
});

const AdminModel = model('admin', AdminSchema);
module.exports = AdminModel;
