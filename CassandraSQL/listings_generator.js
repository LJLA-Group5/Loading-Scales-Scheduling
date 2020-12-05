
const fs = require('fs');
const faker = require('faker');

const path = require('path');
const helpers = require('./helpers.js');
require('events').EventEmitter.defaultMaxListeners = 1000000;
// 10m users
const listingsStream = fs.createWriteStream(path.join(__dirname, '/data/cass_listing_data.csv'));
listingsStream.write('listing_id,listing_name,listing_perNight,listing_cleaning,listing_service, user_id,user_name\n');

function listingsGenerator(numberOfListings) {
  if (numberOfListings === 0) {
    return listingsStream.end();
  }
  const listing = helpers.makeListing(numberOfListings);
  const listing_entry = `${listing.id},${listing.name},${listing.perNight},${listing.cleaning},${listing.service},${listing.user_id},${listing.user_name}\n`;
  const streamOkay = listingsStream.write(listing_entry);
  if (!streamOkay) listingsStream.once('drain', () => listingsGenerator(numberOfListings - 1));
  else listingsGenerator(numberOfListings - 1);
}

listingsGenerator(1000);
