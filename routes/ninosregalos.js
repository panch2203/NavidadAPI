var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const mongoose = require('mongoose');
const NinoRegalo = require('../models/ninoregalo');

/* GET empleados lista. */
router.get('/', verifyToken, function(req, res, next) {
  jwt.verify(
    req.token,
    'secretKey',
    (err, authData) => {
      console.log("Error de verify " + err);
      if (err) next(err);
      NinoRegalo.find({})
        .then(result => {
            if(result.length){
              res.status(200).json({ result });
            }
            else {
                res.status(404).send('Niño sin regalos');
            }
        })
        .catch(next)
    }
  )
});

/* GET niño_regalo:id */
router.get('/:id', verifyToken, (req, res, next) =>{
  jwt.verify(
    req.token,
    'secretKey',
    (err, authData) => {
      console.log("Error de verify " + err);
      if (err) next(err);
      let id = req.params.id;
      NinoRegalo.findById(id).exec()
          .then(result => {
            if(result){
              res.status(200).json({
                ninoregalo: result
              });
            }
            else{
              res.status(404).send('Niño no existe');
            }
          })
          .catch(next);
    }
  )

});

/* POST niños_regalos creacion. */
router.post('/', verifyToken, (req, res, next) => {
  jwt.verify(
    req.token,
    'secretKey',
    (err, authData) => {
      console.log("Error de verify " + err);
      if (err) next(err);
      const body = req.body;
      NinoRegalo.create(body)
        .then(result => {
          if(result){
            res.status(201).json({
              message: "Asignación de regalo a niño exitosa",
              ninoregalo: result
            })
          }else {
            next({
              message: "No se asigno nada",
              name: "Invalid"
            })
          }
        })
        .catch(next);
    }
  )
});

/* POST niños_regalos modificación por ID */
router.put('/:id', verifyToken, (req, res, next) =>{
    jwt.verify(
      req.token,
      'secretKey',
      (err, authData) => {
        console.log("Error de verify " + err);
        if (err) next(err);
        let id = req.params.id;
        let body = req.body;

        NinoRegalo.findByIdAndUpdate(id, body, {new: true})
          .then(result => {
            if(result){
              res.status(200).json({
                ninoregalo: result
              });
            }
            else{
              res.status(404).send('Acción no posible, Asignación no existe');
            }
          })
          .catch(next)
      }
    )
});

/* DELETE niño:id */
router.delete('/:id', (req, res, next) =>{
    jwt.verify(
      req.token,
      'secretKey',
      (err, authData) => {
        console.log("Error de verify " + err);
        if (err) next(err);
        let id = req.params.id;

        NinoRegalo.findByIdAndRemove(id)
          .then(() => {
            res.status(204).json({
              message: "Asignación eliminada"
            });
          })
          .catch(next)
      }
    )    
});

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
