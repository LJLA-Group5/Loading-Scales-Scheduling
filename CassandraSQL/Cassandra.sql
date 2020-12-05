CREATE KEYSPACE Listings WITH replication =
  {‘class’: ‘SimpleStrategy’, ‘replication_factor’ : 1};

Create TYPE Listings.fees (
  Listing_perNight INT,
  Listing_cleaning INT,
  Listing_service INT,
)

Create TYPE Listings.guests (
  Reservation_adults INT,
  Reservation_children INT,
  Reservation_Infants INT,
)

CREATE TABLE Listings.ID (
    Listing_id INT ,
    Listing_name text,
    Listing_fees frozen<fees>
    Owner_id INT,
    Owner_name text,

   PRIMARY KEY(Listing_id)
   WITH comment = ‘Q1. Find Listings given ListingId’
);

CREATE TABLE Listings.reservations_by_listing (
    Listing_id INT ,
    Reservation_id INT,
    user_name text,
    user_id uuid,
    Reservation_guests frozen<guests>
    Reservation_checkIn INT,
    Reservation_checkOut INT

   PRIMARY KEY(Listing_id uuid)
   WITH comment = ‘Q2. Find all reservation associated with listingId’
);

CREATE TABLE Listings.reservations_by_reservation (
    Reservation_id INT,
    Listing_id INT,
    user_name text,
    user_id uuid,
    Reservation_guests frozen<guests>
    Reservation_checkIn INT,
    Reservation_checkOut INT

   PRIMARY KEY(Reservation_id)
   WITH comment = ‘Q3. Find Reservation given ReservationId’
);

-- universally unique identifier (UUID)
-- change UUID for lisitng to be serial
-- figure out if you need third table
-- Try to understand cassandra