const seed = require('./psql.js');

const usersTable = `
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS reservations;
  DROP TABLE IF EXISTS listings;
  CREATE TABLE users (
    name VARCHAR(70)
);
`;

const importData = `
  COPY users (name)
  FROM '${process.env.PG_USERS_DATA}'
  DELIMITER ','
  CSV HEADER;
`;

seed('users', usersTable, importData);

// async function seedUsers() {
//   await seed('users', usersTable, importData);
// }
