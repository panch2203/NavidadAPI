var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Categoria = require('../models/categoria');
const Regalo = require('../models/regalo');

/* GET categorias listing. */
router.get('/', function(req, res, next) {
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
  const body = req.body;
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
    let id = req.params.id;
    let body = req.body;

    console.log("nombre cat es" + req.params.nombre);

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
    let id = req.params.id;

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

module.exports = router;
