const mongoose = require('mongoose');

const ninoregaloSchema = new mongoose.Schema({
  idNino: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  idRegalo: {
    type: String,
    required: [true, 'Cant be blank!'],
  }
});

module.exports = mongoose.model('ninoregalo', ninoregaloSchema);
