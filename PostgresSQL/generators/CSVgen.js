
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */
const fs = require('fs');
const faker = require('faker');
const path = require('path');

const usersWriter = fs.createWriteStream(path.join(__dirname, '../data/postgres_users_data.csv'),);
usersWriter.write('name\n');
const listingsWriter = fs.createWriteStream(path.join(__dirname, '../data/postgres_listings_data.csv'));
listingsWriter.write('name,maxStay,maxGuests,feePerNight,feeCleaning,feeService,owner\n');
const reservationsWriter = fs.createWriteStream(path.join(__dirname, '../data/postgres_reservations_data.csv'));
reservationsWriter.write('checkInDate,checkOutDate,adults,children,infants,totalCost,listing_id,user_id\n');

const random = (num, skew = 1) => (
  Math.floor(Math.random() ** skew * num)
);

const addDays = (date, days) => {
  const day = new Date(date);
  const result = new Date(day.setDate(day.getDate() + days));
  return result.toISOString().substring(0, 10);
};

const dataGenUser = (i, writer, callback) => {
  function write() {
    let ok = true;
    do {
      i -= 1;
      const name = faker.name.findName();
      const data = `${name}\n`;
      if (i === 0) {
        writer.write(data, callback);
      } else {
        ok = writer.write(data);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

// listingInfo = {id, name, maxStay, maxGuests, feePerNight, feeCleaning, feeService, owner}
const dataGenReservations = (reviewAmount, startDate, listingInfo) => {
  let checkin = startDate;
  let checkout;
  let maxGuests;
  let adults;
  let children;
  let infants;
  let guestId;
  let stayLength;
  let totalCost;

  let i = reviewAmount;
  let bookings = '';

  do {
    i -= 1;
    checkin = addDays(checkin, random(7) + 1);
    maxGuests = listingInfo.maxGuests;
    adults = random(maxGuests) + 1;
    maxGuests -= adults;
    children = maxGuests ? random(maxGuests) : 0;
    maxGuests -= children;
    infants = maxGuests ? random(maxGuests) : 0;
    stayLength = random(listingInfo.maxStay) + 1;
    checkout = addDays(checkin, stayLength);
    totalCost = (listingInfo.feePerNight * stayLength) + listingInfo.feeCleaning + listingInfo.feeService;
    totalCost = (totalCost * 1.12).toFixed(2);
    guestId = random(1000000) + 1;

    const data = `${checkin},${checkout},${adults},${children},${infants},${totalCost},${listingInfo.id},${guestId}\n`;
    bookings += data;
  } while (i > 0);

  return bookings;
};

const dataGenListings = (i, writer, callback) => {
  // let reservationId = 0;
  let reviewAmount;
  let listingInfo;
  const startDate = new Date();

  let id = 0;
  function write() {
    let ok = true;
    do {
      if (id % 500000 === 0) {
        console.log(id, '+500000 into listings');
      }
      i -= 1;
      id += 1;
      listingInfo = {
        id,
        name: faker.lorem.words(random(2) + 1),
        maxStay: random(30) + 2,
        maxGuests: random(12) + 4,
        feePerNight: random(250) + 50,
        feeCleaning: random(3) ? random(50) + 50 : 0,
        feeService: random(20) + 5,
        owner: random(1000000) + 1,
      };
      const data = `${listingInfo.name},${listingInfo.maxStay},${listingInfo.maxGuests},${listingInfo.feePerNight},${listingInfo.feeCleaning},${listingInfo.feeService},${listingInfo.owner}\n`;
      if (i === 0) {
        writer.write(data);
        reviewAmount = random(7);
        reservationsWriter.write(dataGenReservations(reviewAmount, startDate, listingInfo), callback);
      } else {
        writer.write(data);
        reviewAmount = random(7);
        ok = reservationsWriter.write(dataGenReservations(reviewAmount, startDate, listingInfo));
        // reservationId += reviewAmount;
      }
    } while (i > 0 && ok);
    if (i > 0) {
      reservationsWriter.once('drain', write);
    }
  }
  write();
};

function dataGen() {
  dataGenUser(1000000, usersWriter, () => {
    usersWriter.end();
    console.log('done users');
  });
  dataGenListings(10000000, listingsWriter, () => {
    listingsWriter.end();
    reservationsWriter.end();
    console.log('done listings / bookings');
  });
}

dataGen();