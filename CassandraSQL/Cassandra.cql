
CREATE KEYSPACE IF NOT EXISTS Listings WITH replication =
  {'class': 'SimpleStrategy', 'replication_factor' : 1};


CREATE TABLE Listings.ID (
    listings_id INT ,
    listing_name text,
    owner text,
    owner_id INT,
    maxStay INT,
    maxGuests INT,
    listing_perNight INT,
    listing_cleaning INT,
    listing_service INT,

   PRIMARY KEY(listing_id))
   WITH comment = 'Q1. Find Listings given ListingId';


CREATE TABLE Listings.reservations_by_listing (
    Listing_id INT ,
    Reservation_id INT,
    user_name text,
    user_id INT,
    Reservation_adults INT,
    Reservation_children INT,
    Reservation_Infants INT,
    Reservation_checkIn INT,
    Reservation_checkOut INT,

   PRIMARY KEY(Listing_id))
   WITH comment = 'Q2. Find all reservation associated with listingId';


CREATE TABLE Listings.reservations_by_reservation (
    Reservation_id INT,
    Listing_id INT,
    user_name text,
    user_id INT,
    Reservation_adults INT,
    Reservation_children INT,
    Reservation_Infants INT,
    Reservation_checkIn INT,
    Reservation_checkOut INT,

   PRIMARY KEY(Reservation_id))
   WITH comment = 'Q3. Find Reservation given ReservationId';


-- universally unique identifier (UUID)
-- change UUID for lisitng to be serial
-- figure out if you need third table
-- Try to understand cassandra