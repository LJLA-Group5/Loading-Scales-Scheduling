const seed = require('./psql.js');

const reservationsTable = `
  DROP TABLE IF EXISTS reservations;
  CREATE TABLE reservations (
    checkInDate VARCHAR(100),
    checkOutDate VARCHAR(100),
    adults INT,
    children INT,
    infants INT,
    totalCost NUMERIC(8, 2),
    listing_id INT,
    user_id INT
  );
`;

const importData = `
  COPY reservations (checkInDate,checkOutDate,adults,children,infants,totalCost,listing_id,user_id )
  FROM '${process.env.PG_RESERVATIONS_DATA}'
  DELIMITER ','
  CSV HEADER;
`;

seed('reservations', reservationsTable, importData);

// async function seedReviews() {
//   await seed('reservations', reservationsTable, importData);
// }

// module.exports = seedReviews;