const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var idvalidator = require('mongoose-id-validator');


const EmentaSchema = new Schema({
  cod: {
    type: Number,
    required: true
  },
  data: {
    type: Date,
    default: Date.now()
  },
  listPratos: {
    type:[{type: Object, ref: 'Pratos' }],
    required: true
  }, 
});

EmentaSchema.plugin(idvalidator);
const Ementa = mongoose.model('Ementas', EmentaSchema);

module.exports = Ementa;