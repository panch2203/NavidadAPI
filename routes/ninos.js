var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const mongoose = require('mongoose');
const Nino = require('../models/nino');

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

/* POST empleados creacion. */
router.post('/', (req, res, next) => {
  //SIGN UP
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
              message: "Cant create user",
              name: "Invalid"
            })
          }
        })
        .catch(next);
});

module.exports = router;
