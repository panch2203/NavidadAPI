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
});

module.exports = mongoose.model('regalos', regaloSchema);
