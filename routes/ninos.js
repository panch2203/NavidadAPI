var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const mongoose = require('mongoose');
const Nino = require('../models/nino');
const NinoRegalo = require('../models/ninoregalo');

/* GET empleados lista. */
router.get('/', verifyToken, function(req, res, next) {
  jwt.verify(
    req.token,
    'secretKey',
    (err, authData) => {
      console.log("Error de verify " + err);
      if (err) next(err);
      Nino.find({})
        .then(result => {
            if(result.length){
              res.status(200).json({ result });
            }
            else {
                res.status(404).send('No hay niños');
            }
        })
        .catch(next)
    }
  )
});

/* GET niño:id */
router.get('/:id', verifyToken, (req, res, next) =>{
  jwt.verify(
    req.token,
    'secretKey',
    (err, authData) => {
      console.log("Error de verify " + err);
      if (err) next(err);
      let id = req.params.id;
      Nino.findById(id).exec()
        .then(result => {
          if(result){
            res.status(200).json({
              nino: result
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

/* POST niños creacion. */
router.post('/', verifyToken, (req, res, next) => {
  jwt.verify(
    req.token,
    'secretKey',
    (err, authData) => {
      console.log("Error de verify " + err);
      if (err) next(err);
      const body = req.body;
      Nino.create(body)
        .then(result => {
          if(result){
            res.status(201).json({
              message: "Creacion de niño exitosa",
              nino: result
            })
          }else {
            next({
              message: "No se creo niño",
              name: "Invalid"
            })
          }
        })
        .catch(next);
    }
  )
});

/* POST niños modificación por ID */
router.put('/:id', verifyToken, (req, res, next) =>{
    jwt.verify(
      req.token,
      'secretKey',
      (err, authData) => {
        console.log("Error de verify " + err);
        if (err) next(err);
        let id = req.params.id;
        let body = req.body;

        Nino.findByIdAndUpdate(id, body, {new: true})
          .then(result => {
            if(result){
              res.status(200).json({
                nino: result
              });
            }
            else{
              res.status(404).send('Acción no posible, niño no existe');
            }
          })
          .catch(next)
      }
    )
});

/* DELETE niño:id */
router.delete('/:id', verifyToken, (req, res, next) =>{
    jwt.verify(
      req.token,
      'secretKey',
      (err, authData) => {
        console.log("Error de verify " + err);
        if (err) next(err);
        let id = req.params.id;

        NinoRegalo.deleteMany({ idNino: id })
            .then(() => {
              res.status(204).json({
                message: "Niños eliminados"
              });
            })
            .catch(next)

        Nino.findByIdAndRemove(id)
            .then(() => {
              res.status(204).json({
                message: "Niño eliminado"
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
