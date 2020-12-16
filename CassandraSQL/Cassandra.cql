
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

DROP TABLE listings_by_listings_id

CREATE TABLE listings_by_listings_id (
    listings_id INT ,
    listing_name text,
    owner text,
    owner_id INT,
    maxStay INT,
    maxGuests INT,
    feePerNight INT,
    feeCleaning INT,
    feeService INT,

   PRIMARY KEY(listings_id))
   WITH comment = 'Q2. Find listing with listings_id';

   COPY listings_by_listings_id (
    listings_id,
    listing_name,
    owner,
    owner_id,
    maxStay,
    maxGuests,
    feePerNight,
    feeCleaning,
    feeService)
    FROM '/Users/jackypan/reservations-service/CassandraSQL/data/cass_listing_data.csv'
    WITH DELIMITER='|' AND HEADER=TRUE;


listings_id,listing_name,owner,owner_id,maxStay,maxGuests,fees
reservation_id,listing_id,user_id,checkInDate,checkOutDate,adults,children,infants,totalCos
DROP TABLE reservations_by_reservation_id;

CREATE TABLE reservations_by_reservation_id (
    reservation_id INT,
    listing_id INT,
    user_id INT,
    checkInDate date,
    checkOutDate date,
    adults INT,
    children INT,
    infants INT,
    totalCost decimal,

   PRIMARY KEY(reservation_id))
   WITH comment = 'Q3. Find Reservation given ReservationId';

  COPY  reservations_by_reservation_id (
       reservation_id,
    listing_id,
    user_id,
    checkInDate,
    checkOutDate,
    adults,
    children,
    infants,
    totalCost )
    FROM '/Users/jackypan/reservations-service/CassandraSQL/data/cass_reservations_data.csv'
    WITH DELIMITER='|' AND HEADER=TRUE;

-- universally unique identifier (UUID)
-- change UUID for lisitng to be serial
-- figure out if you need third table
-- Try to understand cassandra