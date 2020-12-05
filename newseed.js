/* eslint-disable no-extend-native */
/* eslint-disable func-names */
/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const csvWriter = require('csv-write-stream');

// eslint-disable-next-line no-unused-vars
const userWriter = csvWriter();
const listingWriter = csvWriter();
const reservationWriter = csvWriter();
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

const randomNum = (num) => (Math.floor(Math.random() * num));

const UserGen = () => {
  userWriter.pipe(fs.createWriteStream('users.csv'));
  //create users first
  for (let i = 0; i < 100; i++) {
    userWriter.write({
      id: i,
      name: faker.name.findName(),
    });
  }
  userWriter.end();
  console.log('done');
};

//listing gen should write to listing csv a table with keys same as schema
//create listing info object
//create all reservations for listing before going to next listing
//reservations get saved to reservations csv
//save current to listing csv
//move on to next listing

const makeListing = (id) => {
  let listinginfo = {
    id,
    name: `${randomNum(3000)} ${faker.address.streetName()}`,
    perNight: randomNum(300),
    cleaning: randomNum(50),
    service: randomNum(70),
    user_id: randomNum(100),
  };
  return listinginfo;
};

//inputs listing, num of reservations, startDate,
//output an array of reservation objects
//write out all the keys needed for the schema
//keep track of dates
const makeReservations = (listing, reservationNumber, startDate) => {
  let checkin = startDate; //taken all from schema
  let allReservations = [];
  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  for (let i = 0; i < reservationNumber; i++) {
    const stay = randomNum(7);
    let reservation = { //add to  checkindate
      adults: randomNum(3) + 1,
      children: randomNum(2) + 1,
      infants: randomNum(2) + 1,
      totalCost: (listing.perNight * reservation.stay) + listing.cleaning + listing.service, //in case listing gets updated
      guestId: randomNum(100),
      checkin,
    };
    allReservations.push(reservation);
    checkin = checkin.addDays(stay);
  }
  return allReservations;
};

const ListingGen = () => {
  let listinginfo; //we need to pass the listinginfo down to reservations
  let resNum; //need to keep track of number reservations
  let resId = 1; //need to keep track of reservation ids
  let startDate = new Date();
  listingWriter.pipe(fs.createWriteStream('listings.csv'));
  for (let i = 1; i <= 100; i++) { //create 100 listings
    const listing = makeListing(i);
    const reservations = makeReservations(listing,)
    listingWriter.write(listinginfo); //write listing to csv
     //generate how many reservations for that listing
    ReservationGen(resNum, resId, listinginfo, startDate); //pass down (listing info, startDate starting at today, resNum number of res for that listing, resID is ID of reservation so we dont go back to 1 everytime)
    resId += resNum; //to keep track on reservation ID because reservation ID is unique
  }
  listingWriter.end();
  console.log('listings done');
};

const ReservationGen = (resNum, resId, listinginfo, startDate) => {
  reservationWriter.pipe(fs.createWriteStream('reservations.csv'));

    reservationWriter.write({
      id: resId + i,
      checkInDate: checkin,
      checkOutDate: checkin.addDays(stay),
      adults,
      children,
      infants,
      totalCost,
      listing_id: listinginfo.id,
      user_id: guestId,
    });
    checkin = checkin.addDays(stay + 1);
  }
  reservationWriter.end();
  console.log('testing');
};

async function DataGen() {
  await UserGen();
  await ListingGen();
  await ReservationGen();
}

DataGen();

