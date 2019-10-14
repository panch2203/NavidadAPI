const mongoose = require('mongoose');

const regaloSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  costo: {
    type: Number,
    required: [true, 'Cant be blank!'],
  },
  urlImagen: {
    type: String,
    required: [true, 'Cant be blank!']
  },
  categoria: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,

});

module.exports = mongoose.model('regalos', regaloSchema);
