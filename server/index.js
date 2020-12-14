/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const Helpers = require('../db/models.js');
const { Pool } = require('pg');
require('dotenv').config();
// const format = require('pg-format');

const app = express();

const pool = new Pool({
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
});

app.use(morgan('dev'));
app.use('/', express.json());
app.use('/listings/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));

// app.get('/api/listings/', (req, res) => {
//   Helpers.listingModel.find()
//     .then((listings) => {
//       res.header('Content-Type', 'application/json');
//       res.send(JSON.stringify(listings, 0, 2));
//     });
// });
// app.get('/api/listings/:id', (req, res) => {
//   Helpers.listingModel.find({ id: req.params.id })
//     .then((listings) => {
//       res.header('Content-Type', 'application/json');
//       res.send(JSON.stringify(listings, 0, 2));
//     });
// });

app.get('/api/:id', (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      console.log(err);
    } else {
      const query = (`SELECT listings.*, reservations.checkindate, reservations.checkoutdate FROM listings INNER JOIN reservations ON (listings.id=reservations.listing_id) WHERE listings.id=${req.params.id}`);
      client.query(query, (err, success) => {
        if (err) {
          process.exit(-1);
        } else {
          res.send(success.rows);
          client.release();
        }
      });
    }
  });
  // const query = `SELECT listings.*, reservations.checkindate, reservations.checkoutdate
  // FROM listings INNER JOIN reservations ON (listings.id=reservations.listing_id)
  // WHERE listings.id=${req.params.id};`;
  // some connect function (query, callback)
  //callback = (err, result) => {if(err)}{console.log(err)} else {console.log(result)}}
});

module.exports = app;
