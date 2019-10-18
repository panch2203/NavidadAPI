var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const NinoRegalo = require('../models/ninoregalo');

/* GET empleados lista. */
router.get('/', function(req, res, next) {
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
});

/* GET niño_regalo:id */
router.get('/:id', (req, res, next) =>{
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
});

/* POST niños_regalos creacion. */
router.post('/', (req, res, next) => {
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
});

/* POST niños_regalos modificación por ID */
router.put('/:id', (req, res, next) =>{
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
});

/* DELETE niño:id */
router.delete('/:id', (req, res, next) =>{
    let id = req.params.id;

    NinoRegalo.findByIdAndRemove(id)
        .then(() => {
          res.status(204).json({
            message: "Asignación eliminada"
          });
        })
        .catch(next)
});




module.exports = router;
