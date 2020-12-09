const seed = require('./psql.js');

const listingsTable = `
  DROP TABLE IF EXISTS reservations;
  DROP TABLE IF EXISTS listings;
  CREATE TABLE Listings (
    name VARCHAR(100),
    maxStay INT,
    maxGuests INT,
    feePerNight INT,
    feeCleaning INT,
    feeService INT,
    owner INT
 );
`;

const importData = `
  COPY listings (name,maxStay,maxGuests,feePerNight,feeCleaning,feeService,owner)
  FROM '${process.env.PG_LISTINGS_DATA}'
  DELIMITER ','
  CSV HEADER;
`;

seed('listings', listingsTable, importData);

async function seedListings() {
  await seed('listings', listingsTable, importData);
}

module.exports = seedListings;