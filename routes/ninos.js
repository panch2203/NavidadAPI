var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Nino = require('../models/nino');
const NinoRegalo = require('../models/ninoregalo');

/* GET empleados lista. */
router.get('/', function(req, res, next) {
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
});

/* GET niño:id */
router.get('/:id', (req, res, next) =>{
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
});

/* POST niños creacion. */
router.post('/', (req, res, next) => {
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
});

/* POST niños modificación por ID */
router.put('/:id', (req, res, next) =>{
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
});

/* DELETE niño:id */
router.delete('/:id', (req, res, next) =>{
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
});




module.exports = router;
