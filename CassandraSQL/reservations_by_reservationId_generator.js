/* eslint-disable no-console */
/* eslint-disable no-loop-func */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers.js');
require('events').EventEmitter.defaultMaxListeners = 1000000;
// // 100m reviews
const reservationsStream = fs.createWriteStream(path.join(__dirname, '/data/cass_reservations_by_reservationId_data.csv'));
reservationsStream.write(
  'reservation_id,listing_id,reservation_checkin,reservation_checkout,reservation_adults,reservation_children,reservation_infants,reservation_totalCost,reservation_userId\n',
);

const startDate = new Date();

const randomNum = (num) => (Math.floor(Math.random() * num));

function reservationsByListing(numberOfListings, counter) {
  if (numberOfListings === 0) return reservationsStream.end();
  const listing = helpers.makeListing(numberOfListings);
  const NumberOfReservations = randomNum(17);
  const reservations = helpers.makeReservations(listing, NumberOfReservations, startDate);
  for (let i = 0; i < reservations.length; i++) {
    const reservation_entry = `${counter},${reservations[i].listing},${reservations[i].checkin},${reservations[i].checkout},${reservations[i].adults},${reservations[i].children},${reservations[i].infants},${reservations[i].totalCost},${reservations[i].guestId}\n`;
    counter++;
    const streamOK = reservationsStream.write(reservation_entry);
    if (!streamOK) reservationsStream.once('drain', () => reservationsByListing(numberOfListings - 1, counter));
    else continue;
  }
  if (numberOfListings > 0) reservationsByListing(numberOfListings - 1, counter);
}

reservationsByListing(1000, 1);
console.log('end');