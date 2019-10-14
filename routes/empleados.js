var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const mongoose = require('mongoose');
const Empleado = require('../models/empleado');

/* GET empleados listing. */
router.get('/', verifyToken, function(req, res, next) {
  // Empleado.find({})
  //   .then(result => {
  //       if(result.length){
  //         res.status(200).json({ result });
  //       }
  //       else {
  //           res.status(404).send('No hay Elfos');
  //       }
  //   })
  //   .catch(next)
  jwt.verify(
    req.token,
    'secretKey',
    (err, authData) => {
      console.log("Error de verify " + err);
      if (err) next(err);
      Empleado.find({})
          .then(result => {
              console.log("Result " + result);
              if (result.length){
                console.log("Si entre al result");
                res.status(200).json({ result });
                // res.send("HOLA");
              }
              else{
                res.status(404).send('Who let the dogs out');
              }
          })
          .catch(next);
    }
  )
});

/* POST empleados creación. */
router.post('/', (req, res, next) => {
  //Creando empleado
  const body = req.body;
  Empleado.create(body)
        .then(result => {
          if(result){
            res.status(201).json({
              message: "Elfo registrado",
              empleado: result
            })
          }else {
            next({
              message: "Elfo no se pudo crear",
              name: "Invalid"
            })
          }
        })
        .catch(next);
});

/* POST empleados Login. */
router.post('/login', (req, res, next) => {
  const body = req.body;

  if(!body.nombre || !body.password) return next({
    message: "Username or password are missing",
    name: "Invalid"
  });

  Empleado.findOne({ nombre: body.nombre })
        .then(result => {
          if(result){

            // COMPARAR CONTRASEÑA
            result.comparePass(body.password, function(err, isMatch){
              if(err) throw (err);

              if(isMatch){
                //NUEVO CÓDIGO CON ACCESSTOKEN
                jwt.sign(
                  { result }, //authData
                  'secretKey', //secret
                  { expiresIn: '500s' },
                  (err, accessToken) => {
                    if(err) next({
                      message: "Invalid operation",
                      name: "Forbidden"
                    });
                    res.status(200).json({accessToken});
                  }
                );
              }
              else {
                res.status(401).json({
                  message: "Username or password are incorrect",
                  name: "Forbidden"
                })
              }
            })
          } else {
            next({
              message: "Username or password are incorrect",
              name: "Forbidden"
            })
          }
        })
        .catch(next);
});

/* POST empleados modificación. */
router.put('/:id', (req, res, next) =>{
    let id = req.params.id;
    let body = req.body;

    Empleado.findByIdAndUpdate(id, body, {new: true})
          .then(result => {
            if(result){
              res.status(200).json({
                empleado: result
              });
            }
            else{
              res.status(404).send('Cant update, missing elf');
            }
          })
          .catch(next)
})

/* Verificación del accessToken. */
function verifyToken(req, res, next){
  //token es orrecto y válido
  //if true next()
  //if false next(err)
  console.log("Estoy en verifyToken");
  const bearerHeader = req.headers['authorization'];
  let token = bearerHeader.split(' ');
  if(token && token[1]){
    //si llegó un token
    req.token = token[1];
    next();
  } else {
    next({
      message: "Invalid token",
      name: "Forbidden" // 403
    });
  }
  // next();
}

module.exports = router;
