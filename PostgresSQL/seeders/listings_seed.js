const seed = require('./psql.js');

const listingsTable = `
  DROP TABLE IF EXISTS reservations;
  DROP TABLE IF EXISTS listings;
  CREATE TABLE Listings (
    listing_id SERIAL  PRIMARY KEY NOT NULL,
    listing_name VARCHAR(100),
    listing_perNight INT,
    listing_cleaning INT,
    listing_service INT,
    user_id INT references users(user_id) NOT NULL
 );
`;

const importData = `
  COPY listings (listing_id,listing_name,listing_perNight,listing_cleaning,listing_service,user_id)
  FROM '${process.env.PG_LISTINGS_DATA}'
  DELIMITER ','
  CSV HEADER;
`;

seed('listings', listingsTable, importData);

async function seedListings() {
  await seed('listings', listingsTable, importData);
}

module.exports = seedListings;