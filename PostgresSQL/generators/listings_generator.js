/* eslint-disable vars-on-top */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const faker = require('faker');
const path = require('path');
const helpers = require('./helpers.js');
require('events').EventEmitter.defaultMaxListeners = 100000000;

const listingsStream = fs.createWriteStream(
  path.join(__dirname, '../data/postgres_listings_data.csv'),
);

const reservationsStream = fs.createWriteStream(
  path.join(__dirname, '../data/postgres_reservations_data.csv'),
);

listingsStream.write('listing_id,listing_name,listing_perNight,listing_cleaning,listing_service,user_id  \n');

reservationsStream.write('reservation_id,listing_id,reservation_checkin,reservation_checkout,reservation_adults,reservation_children,reservation_infant,reservation_totalCost,user_id  \n');

const randomNum = (num) => (Math.floor(Math.random() * num));

let listinginfo = null;
const startDate = new Date();
let numberOfReservations = 0;
let counter = 1;

function listingsGenerator(numberOfListings) {
  if (numberOfListings === 0) return listingsStream.end();
  const listing = helpers.makeListing(numberOfListings);
  const listing_entry = `${listing.id},${listing.name},${listing.perNight},${listing.cleaning},${listing.service},${listing.user_id}\n`;
  const num = randomNum(15);
  numberOfReservations = num;
  listinginfo = listing;

  var reservations = helpers.makeReservations(listinginfo, numberOfReservations, startDate);
  for (let i = 0; i < reservations.length; i++) {
    let reservation_entry = `${counter},${reservations[i].listing},${reservations[i].checkin},${reservations[i].checkout},${reservations[i].adults},${reservations[i].children},${reservations[i].infants},${reservations[i].totalCost},${reservations[i].guestId}\n`;
    counter++;
    let reservations_streamOkay = reservationsStream.write(reservation_entry);
    if (!reservations_streamOkay) listingsStream.once('drain', () => { console.log('drain')});
  }
  const streamOkay = listingsStream.write(listing_entry);
  if (!streamOkay) listingsStream.once('drain', () => listingsGenerator(numberOfListings - 1));
  else listingsGenerator(numberOfListings - 1);
}

listingsGenerator(10000000);
console.log('end');

