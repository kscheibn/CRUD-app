const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('Item', itemSchema);