const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors')
const app = express();
const db = require('./queries')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(pino);
app.use(cors({ origin: '*' }))

app.get('/api/cars', db.getCars)
app.get('/api/mileage', db.getMileageByBrand)
app.get('/api/cars/sales', db.getSalesByBrand)

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
