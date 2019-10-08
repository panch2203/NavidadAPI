const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  fotoPerfil: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  password: {
    type: String,
    required: [true, 'Cant be blank!']
  },
});

module.exports = mongoose.model('empleados', empleadoSchema);
