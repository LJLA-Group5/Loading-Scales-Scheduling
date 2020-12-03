CREATE DATABASE IF NOT EXISTS Reservations;

CREATE TABLE Listings (
    Listing_id INT AUTO_INCREMENT PRIMARY KEY,
    Listing_name VARCHAR(100),
    Listing_perNight INT,
    Listing_cleaning INT,
    Listing_service INT
    User_id INT
     FOREIGN KEY (User_id) REFERENCES Users(User_id)
);



CREATE TABLE Owners (
    Owner_id INT AUTO_INCREMENT PRIMARY KEY,
    Owner_name VARCHAR(100),

);

CREATE TABLE Reservations (
    Reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    Reservation_adults INT,
    Reservation_children INT,
    Reservation_Infants INT,
    Reservation_checkIn INT,
    Reservation_checkOut INT
    Listing_id INT,
    User_id INT
    FOREIGN KEY (Listing_id) REFERENCES Listings(Listing_id)
    FOREIGN KEY (User_id) REFERENCES Users(User_id)
);

