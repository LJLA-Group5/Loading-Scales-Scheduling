/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-extend-native */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const randomNum = (num) => (Math.ceil(Math.random() * num));

const makeListing = (id) => {
  const listinginfo = {
    id,
    name: `${randomNum(3000)} ${faker.address.streetName()}`,
    perNight: randomNum(300),
    cleaning: randomNum(50),
    service: randomNum(70),
    user_id: randomNum(800000),
  };
  return listinginfo;
};

const makeReservations = (listing, reservationNumber, startDate) => {
  let checkin = startDate; // taken all from schema
  const allReservations = [];
  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  for (let i = 0; i < reservationNumber; i++) {
    const stay = randomNum(7);
    const reservation = { // add to  checkindate
      listing: listing.id,
      adults: randomNum(3) + 1,
      children: randomNum(2) + 1,
      infants: randomNum(2) + 1,
      totalCost: (listing.perNight * stay) + listing.cleaning + listing.service, // in case listing gets updated
      guestId: randomNum(10000),
      checkin,
      checkout: checkin.addDays(stay),
    };
    allReservations.push(reservation);
    checkin = checkin.addDays(stay + 1);
  }
  return allReservations;
};

module.exports.makeListing = makeListing;
module.exports.makeReservations = makeReservations;
