const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true }
  }
});

module.exports = mongoose.model('categorias', categoriaSchema);
