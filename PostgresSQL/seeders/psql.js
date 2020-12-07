const { Client } = require('pg');
require('dotenv').config();
const debug = require('debug')('app:psql:seed');

async function seed(tableName, createTableQuery, importDataQuery) {
  const client = new Client({
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    port: process.env.PG_PORT,
  });

  try {
    debug(`Seeding ${tableName}`);
    await client.connect();
    debug(`Connected to ${process.env.PG_DB}`);
    await client.query(createTableQuery);
    debug(`Created ${tableName} table`);
    await client.query(importDataQuery);
    debug(`Imported ${tableName} data`);
  } catch (err) {
    debug(err);
  }

  client.end();
  debug(`Done seeding ${tableName}`);
}

module.exports = seed;
