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

listingsStream.write('listing_id,listing_name,listing_perNight,listing_cleaning,listing_service,user_id  \n');


let listinginfo = null;
const startDate = new Date();
let numberOfReservations = 0;
let counter = 1;
//Creates two csv one with 10 million listings and the other with 30 million reservations.
function listingsGenerator(numberOfListings) {
  //If you made all the listings end listing stream
  if (numberOfListings === 0) return listingsStream.end();
  // Creating a listing
  const listing = helpers.makeListing(numberOfListings);
  // create a csv line
  const listing_entry = `${listing.id},${listing.name},${listing.perNight},${listing.cleaning},${listing.service},${listing.user_id}\n`;

  const streamOkay = listingsStream.write(listing_entry);
  if (!streamOkay) listingsStream.once('drain', () => listingsGenerator(numberOfListings - 1));
  else listingsGenerator(numberOfListings - 1);
}

listingsGenerator(10000000);
console.log('end');
