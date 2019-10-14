var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Regalo = require('../models/regalo');

/* GET regalos listing. */
router.get('/', function(req, res, next) {
  Regalo.find({})
    .then(result => {
        if(result.length){
          res.status(200).json({ result });
        }
        else {
            res.status(404).send('No hay regalos');
        }
    })
    .catch(next)
});

/* GET regalo:id */
router.get('/:id', (req, res, next) =>{
  let id = req.params.id;
  Regalo.findById(id).exec()
      .then(result => {
        if(result){
          res.status(200).json({
            regalo: result
          });
        }
        else{
          res.status(404).send('Regalo no existe');
        }
      })
      .catch(next);
});

/* POST regalos creacion. */
router.post('/', (req, res, next) => {
  const body = req.body;
  Regalo.create(body)
        .then(result => {
          if(result){
            res.status(201).json({
              message: "Creacion de regalo exitosa",
              regalo: result
            })
          }else {
            next({
              message: "No se creo regalo",
              name: "Invalid"
            })
          }
        })
        .catch(next);
});

// /* POST regalos modificación por ID */
router.put('/:id', (req, res, next) =>{
    let id = req.params.id;
    let body = req.body;

    Regalo.findByIdAndUpdate(id, body, {new: true})
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
});

/* DELETE regalo:id */
router.delete('/:id', (req, res, next) =>{
    let id = req.params.id;

    Regalo.findByIdAndRemove(id)
        .then(() => {
          res.status(204).json({
            message: "Niño eliminado"
          });
        })
        .catch(next)
});

module.exports = router;
