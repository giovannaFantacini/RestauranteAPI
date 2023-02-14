const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PratoSchema = new Schema({
  cod: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }, 
});


const Prato = mongoose.model('Pratos', PratoSchema);

module.exports = Prato;