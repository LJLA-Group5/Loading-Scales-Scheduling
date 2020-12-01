/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const helpers = require('./helpers.js');
const models = require('./models.js');

const seedDatabase = (entryCount) => {
  mongoose.connect('mongodb://localhost/FEC', { useNewUrlParser: true })
    .catch((err) => console.error(err));
  const entries = new Array(entryCount).fill(undefined);
  const listings = entries.map((id, index) => helpers.generateListing(index));
  return models.listingModel.insertMany(listings)
    .then((createdListings) => console.log(`Number of Listings Created: ${createdListings.length}`))
    .catch((err) => console.error(err));
};

seedDatabase(100)
  .then(() => mongoose.disconnect())
  .then(() => console.log('Disconnected'));

  //testing testing