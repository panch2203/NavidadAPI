const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');


const empleadosRouter = require('./routes/empleados');
const ninosRouter = require('./routes/ninos');
const regalosRouter = require('./routes/regalos');
const categoriasRouter = require('./routes/categorias');

mongoose.connect('mongodb://127.0.0.1:27017/santaDB',
  { useNewUrlParser: true, useUnifiedTopology: true}
);

const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/empleados', empleadosRouter);
app.use('/ninos', ninosRouter);
app.use('/regalos', regalosRouter);
app.use('/categorias',categoriasRouter);
app.get('*', (req, res) => {
  res.status(404).send('Route not found');
});
module.exports = app;
