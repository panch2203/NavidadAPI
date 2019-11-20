var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const mongoose = require('mongoose');
const Categoria = require('../models/categoria');
const Regalo = require('../models/regalo');

/* GET categorias listing. */
router.get('/', function(req, res, next) {
  // jwt.verify(
  //   req.token,
  //   'secretKey',
  //   (err, authData) => {
  //     console.log("Error de verify " + err);
  //     if (err) next(err);
  //     Categoria.find({})
  //       .then(result => {
  //           if(result.length){
  //             res.status(200).json({ result });
  //           }
  //           else {
  //             res.status(404).send('No hay categorias');
  //           }
  //       })
  //       .catch(next)
  //     }
  // )
  Categoria.find({})
    .then(result => {
        if(result.length){
          res.status(200).json({ result });
        }
        else {
          res.status(404).send('No hay categorias');
        }
    })
    .catch(next)
});

/* GET categoria:id */
router.get('/:id', (req, res, next) =>{
  // jwt.verify(
  //   req.token,
  //   'secretKey',
  //   (err, authData) => {
  //     console.log("Error de verify " + err);
  //     if (err) next(err);
  //     let id = req.params.id;
  //     Categoria.findById(id).exec()
  //         .then(result => {
  //           if(result){
  //             res.status(200).json({
  //               categoria: result
  //             });
  //           }
  //           else{
  //             res.status(404).send('Categoria no existe');
  //           }
  //         })
  //         .catch(next);
  //   }
  // )
  let id = req.params.id;
  Categoria.findById(id).exec()
      .then(result => {
        if(result){
          res.status(200).json({
            categoria: result
          });
        }
        else{
          res.status(404).send('Categoria no existe');
        }
      })
      .catch(next);
});

/* POST categorias creacion. */
router.post('/', (req, res, next) => {
  // jwt.verify(
  //   req.token,
  //   'secretKey',
  //   (err, authData) => {
  //     console.log("Error de verify " + err);
  //     if (err) next(err);
  //     const body = req.body;
  //     Categoria.create(body)
  //       .then(result => {
  //         if(result){
  //           res.status(201).json({
  //             message: "Creacion de categoria exitosa",
  //             categoria: result
  //           })
  //         }else {
  //           next({
  //             message: "No se creo categoria",
  //             name: "Invalid"
  //           })
  //         }
  //       })
  //       .catch(next);
  //   }
  // )
  Categoria.create(body)
    .then(result => {
      if(result){
        res.status(201).json({
          message: "Creacion de categoria exitosa",
          categoria: result
        })
      }else {
        next({
          message: "No se creo categoria",
          name: "Invalid"
        })
      }
    })
    .catch(next);
});

// /* POST categorias modificación por ID */
router.put('/:id', (req, res, next) =>{
    // jwt.verify(
    //   req.token,
    //   'secretKey',
    //   (err, authData) => {
    //     console.log("Error de verify " + err);
    //     if (err) next(err);
    //     let id = req.params.id;
    //     let body = req.body;
    //
    //     Categoria.findByIdAndUpdate(id, body, {new: true})
    //       .then(result => {
    //         if(result){
    //           res.status(200).json({
    //             categoria: result
    //           });
    //         }
    //         else{
    //           res.status(404).send('Acción no posible, categoria no existe');
    //         }
    //       })
    //       .catch(next)
    //   }
    // )
    let id = req.params.id;
    let body = req.body;

    Categoria.findByIdAndUpdate(id, body, {new: true})
      .then(result => {
        if(result){
          res.status(200).json({
            categoria: result
          });
        }
        else{
          res.status(404).send('Acción no posible, categoria no existe');
        }
      })
      .catch(next)
});

/* DELETE categoria:id */
router.delete('/:id', (req, res, next) =>{
    // jwt.verify(
    //   req.token,
    //   'secretKey',
    //   (err, authData) => {
    //     console.log("Error de verify " + err);
    //     if (err) next(err);
    //     let id = req.params.id;
    //
    //     //Modificando categorias de los regalos
    //     Regalo.updateMany({"categoria": id}, {"$set":{"categoria": null}})
    //         .then(() => {
    //           console.log("Cambios a regalos");
    //           res.status(200).json({
    //           });
    //         })
    //         .catch(next)
    //
    //     Categoria.findByIdAndRemove(id)
    //         .then(() => {
    //           res.status(204).json({
    //             message: "Categoria eliminado"
    //           });
    //         })
    //         .catch(next)
    //   }
    // )
    let id = req.params.id;

    //Modificando categorias de los regalos
    Regalo.updateMany({"categoria": id}, {"$set":{"categoria": null}})
        .then(() => {
          console.log("Cambios a regalos");
          res.status(200).json({
          });
        })
        .catch(next)

    Categoria.findByIdAndRemove(id)
        .then(() => {
          res.status(204).json({
            message: "Categoria eliminado"
          });
        })
        .catch(next)
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
}

module.exports = router;
