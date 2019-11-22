const mongoose = require('mongoose');

const ninoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  status: {
    type: Boolean,
  },
  calle: {
    type: String,
    required: [true, 'Cant be blank!']
  },
  numero: {
    type: Number,
  },
  colonia: {
    type: String,
    required: [true, 'Cant be blank!']
  },
  genero: {
    type: Boolean,
    required: [true, 'Cant be blank!']
  },
  fechaNacimiento: {
    type: String,
    required: [true, 'Cant be blank!']
  },
});

module.exports = mongoose.model('ninos', ninoSchema);
