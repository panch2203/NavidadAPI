const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

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

empleadoSchema.pre('save', function(next){
  let empleado = this;

  if(!empleado.isModified('password')) return next();

  bcrypt.hash(empleado.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);
    empleado.password = hash;
    next();
  })
});

empleadoSchema.methods.comparePass = function(testPass, callback){
  let empleado = this;
  bcrypt.compare(testPass, empleado.password, function(err, isMatch){
    if (err) return callback(err);

    callback(null, isMatch);
  })
}

module.exports = mongoose.model('empleados', empleadoSchema);
