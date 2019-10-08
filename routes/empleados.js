var express = require('express');
var router = express.Router();

/* GET empleados listing. */
router.get('/', function(req, res, next) {
  res.send('empleados prueba');
});

module.exports = router;
