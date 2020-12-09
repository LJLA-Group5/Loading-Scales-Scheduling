/* eslint-disable no-loop-func */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
const fs = require('fs');
const faker = require('faker');
const path = require('path');
const helpers = require('./helpers.js');
require('events').EventEmitter.defaultMaxListeners = 100000000;

const reservationsStream = fs.createWriteStream(
  path.join(__dirname, '../data/postgres_reservations_data.csv'),
);

reservationsStream.write('reservation_id,listing_id,reservation_checkin,reservation_checkout,reservation_adults,reservation_children,reservation_infant,user_id  \n');

const array = [0, 1, 1, 2, 2, 3, 4, 10];

function reservationsGenerator(numberOfreservations, reservationId) {
  const num = array[reservationId % array.length];

  const startDate = new Date();
  const reservations = helpers.makeReservations(num, startDate);
  let reservations_streamOkay = true;
  if (numberOfreservations === 0) return reservationsStream.end();
  // Loop over reservations
  for (let i = 0; i < reservations.length; i++) {
    const reservation_entry = `${reservationId},${numberOfreservations},${reservations[i].checkin},${reservations[i].checkout},${reservations[i].adults},${reservations[i].children},${reservations[i].infants},${reservations[i].guestId}\n`;
    reservations_streamOkay = reservationsStream.write(reservation_entry);
    if (!reservations_streamOkay) {
      reservationsStream.once('drain', () => reservationsGenerator((numberOfreservations - 1), reservationId));
    }
    reservationId++;
  }

reservationsGenerator((numberOfreservations - 1), reservationId);
}

reservationsGenerator(10000000, 1);
