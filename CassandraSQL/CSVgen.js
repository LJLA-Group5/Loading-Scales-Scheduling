/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */
const fs = require('fs');
const faker = require('faker');
const path = require('path');

const listingsWriter = fs.createWriteStream(path.join(__dirname, '/data/cass_listing_data.csv'));
listingsWriter.write('listings_id,listing_name,owner,owner_id,maxStay,maxGuests,feePerNight,feeCleaning,feeService\n');
const reservationsWriter = fs.createWriteStream(path.join(__dirname, '/data/cass_reservations_data.csv'));
reservationsWriter.write('reservation_id,listing_id,user_id,checkInDate,checkOutDate,adults,children,infants,totalCost\n');

const random = (num, skew = 1) => (
  Math.floor(Math.random() ** skew * num)
);

const addDays = (date, days) => {
  const day = new Date(date);
  const result = new Date(day.setDate(day.getDate() + days));
  return result.toISOString().substring(0, 10);
};

// listingInfo = {id, name, maxStay, maxGuests, feePerNight, feeCleaning, feeService, owner}
const dataGenReservations = (startingId, reviewAmount, startDate, listingInfo) => {
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
  let id = startingId;
  let bookings = '';
  do {
    if (id % 5000000 === 0) {
      console.log(id, '+5000000 into reservations');
    }
    i -= 1;
    id += 1;
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

    // const data = `${id}|${listingInfo.id}|${guestId}|${checkin}|${checkout}|{adults: ${adults}, children: ${children}, infants: ${infants}}|${totalCost}\n`;
    const data = `${id}|${listingInfo.id}|${guestId}|${checkin}|${checkout}|${adults}|${children}|${infants}|${totalCost}\n`;
    bookings += data;
  } while (i > 0);

  return bookings;
};

const dataGenListings = (i, writer, callback) => {
  let reservationId = 0;
  let reviewAmount;
  let listingInfo;
  const startDate = new Date();

  let id = 0;
  function write() {
    let ok = true;
    do {
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
      // const data = `${listingInfo.id}|"${listingInfo.name}"|"${faker.name.findName()}"|${listingInfo.owner}|${listingInfo.maxStay}|${listingInfo.maxGuests}|{pernight:${listingInfo.feePerNight},cleaning:${listingInfo.feeCleaning},service:${listingInfo.feeService}}\n`;
      const data = `${listingInfo.id}|"${listingInfo.name}"|"${faker.name.findName()}"|${listingInfo.owner}|${listingInfo.maxStay}|${listingInfo.maxGuests}|${listingInfo.feePerNight}|${listingInfo.feeCleaning}|${listingInfo.feeService}\n`;
      if (i === 0) {
        writer.write(data);
        reviewAmount = random(21);
        if (reviewAmount) {
          reservationsWriter.write(dataGenReservations(reservationId, reviewAmount, startDate, listingInfo), callback);
        }
      } else {
        writer.write(data);
        reviewAmount = random(21);
        if (reviewAmount) {
          ok = reservationsWriter.write(dataGenReservations(reservationId, reviewAmount, startDate, listingInfo));
          reservationId += reviewAmount;
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      reservationsWriter.once('drain', write);
    }
  }
  write();
};

function dataGen() {
  dataGenListings(10000000, listingsWriter, () => {
    listingsWriter.end();
    reservationsWriter.end();
    console.log('done listings / bookings');
  });
}

dataGen();