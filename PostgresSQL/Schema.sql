CREATE DATABASE IF NOT EXISTS Reservations;

CREATE TABLE Listings (
   id SERIAL  PRIMARY KEY NOT NULL,
   name VARCHAR(100),
    perNight INT,
    cleaning INT,
    service INT,
     maxStay NUMERIC(3),
    user_id INT references Users(id)

);


CREATE TABLE Users (
   id SERIAL PRIMARY KEY NOT NULL,
   name VARCHAR(70),
);

CREATE TABLE Reservations (
  id SERIAL  PRIMARY KEY NOT NULL,
  adults INT,
  children INT,
  infants INT,
  checkIn Date,
  checkOut Date,
  totalCost NUMERIC(8, 2),
  listing_id INT references Listings(id),
  user_id INT references Users(id)


);

