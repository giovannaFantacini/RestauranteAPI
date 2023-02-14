const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var idvalidator = require('mongoose-id-validator');

const ReservaSchema = new Schema({
  cod: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  pratoReservado: {
    type: Schema.Types.ObjectId, 
    ref:'Pratos',
    required: true
  }, 
  aluno: [{
    NumAluno: {
      type: Number,
      required: true
    },
    NomeAluno: {
      type: String,
      required: true
    },
    EmailAluno: {
      type: String,
      required: true
    }
  }]
});

ReservaSchema.plugin(idvalidator);

const Reserva = mongoose.model('Reservas', ReservaSchema);

module.exports = Reserva;