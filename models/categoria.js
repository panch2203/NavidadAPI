const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Cant be blank!'],
  }
});

module.exports = mongoose.model('categorias', categoriaSchema);
