const seed = require('./psql.js');

const reservationsTable = `
  DROP TABLE IF EXISTS reservations;
  CREATE TABLE reservations (
    reservation_id SERIAL  PRIMARY KEY NOT NULL,
    listing_id INT references listings(listing_id),
    reservation_checkin VARCHAR(100),
    reservation_checkout VARCHAR(100),
    reservation_adults INT,
    reservation_children INT,
    reservation_infant INT,
    reservation_totalCost NUMERIC(8, 2),
    user_id INT references users(user_id)
  );
`;

const importData = `
  COPY reservations (reservation_id,listing_id,reservation_checkin,reservation_checkout,reservation_adults,reservation_children,reservation_infant,reservation_totalCost,user_id  )
  FROM '${process.env.PG_RESERVATIONS_DATA}'
  DELIMITER ','
  CSV HEADER;
`;

seed('reservations', reservationsTable, importData);

// async function seedReviews() {
//   await seed('reservations', reservationsTable, importData);
// }

// module.exports = seedReviews;