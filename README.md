# Ailpup

Reservations component for a vacation rental marketplace site
<div align="center">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/WholeSite.png" height="450">
</div>
<div align="center">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/CalendarComponent.png" height="275">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/FeesComponent.png" height="275">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/GuestsComponent.png" height="275">
</div>

## Related Projects

  - https://github.com/spicy-boiz/photo-carousel-service
  - https://github.com/spicy-boiz/places-to-stay-service
  - https://github.com/spicy-boiz/reviews-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

- Access the individual component through http://18.217.62.125:3002/listings/5/
- Access the site in whole through http://3.20.233.115:3000/5/
- Change listings by modifying the numerical value after the site, e.g. from http://3.20.233.115:3000/5/ to http://3.20.233.115:3000/10/

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Development

### Installing Dependencies

From within the root directory:

## Building out CRUD operations

## Create
POST '/api/listings/'

Request Body: Expects JSON with the following keys
  {"fees": {
      "pernight": integer,
      "cleaning": integer,
      "service":  integer
    },
    "reserved": []
    "id": integer, Required Unique,
    "userID": integer, Required
    "name": String name of listing,
    }
returns: nothing

Status codes
201: Successfully creates new listing
400: Unsuccessful attempt at creating listing due to client error

POST '/api/listings/reservations'

Request Body: Expects JSON with the following keys
  {
    "id": integer, Required Unique,
    "adults": integer,
    "children": integer,
    "infants":integer,
    "checkIn":date,
    "checkOut":date,
    "userID": integer, Required
    "listingID": integer, Required
    }
returns: nothing

Status codes
201: Successfully creates new booking
400: Unsuccessful attempt at creating booking due to client error

## Read
GET /api/listings/:id
Path Parameters
  id - listing id: integer, Required

returns: JSON
[
  {
    "pernight": 141,
    "cleaning": 23,
    "service": 10

    "reserved": [array of reservation objects],
    "_id": "5fc6cc35a8e0a2acea7ca2ad",
    "id": 0,
    "owner": "Jordan Wilderman",
    "name": "Bernier, Dooley and Dickens Grocery Manors",
    "__v": 0
  }
]

GET /api/listings/reservations/:id
Path Parameters
  id - reservation id: integer, Required

returns: JSON
[
   {
    "id": integer, Required Unique,
    "adults": integer,
    "children": integer,
    "infants":integer,
    "checkIn":date,
    "checkOut":date,
    "userID": integer, Required
    "listingID": integer, Required
    }
]

Status codes
200: Successfully retrieves booking information
404: Unsuccessful attempt due to missing resource

## Update
PUT '/api/listings/:id/'
Path Parameters
  id - listing id: integer, Required

Request Body
Expects JSON with any of the following keys (include only keys to be updated)
   {"fees": {
      "pernight": integer,
      "cleaning": integer,
      "service":  integer
    },
    "reserved": []
    "id": integer, Required Unique,
    "userID": integer, Required
    "name": String name of listing,
    }

Status codes
201: Category successfully update
400: Unsuccessful attempt at updating record

## Delete
DELETE '/api/listings/:id/'
Path Parameters
  id - listing id: integer, Required

Returns
Nothing

Status codes
201: Category successfully deleted listing
400: Unsuccessful attempt at deleting listing

DELETE '/api/listings/reservations/:id/'
Path Parameters
  id - reservation id: integer, Required

Returns
Nothing

Status codes
201: Category successfully deleted reservation
400: Unsuccessful attempt at deleting reservation
```sh
npm install
npm run seed
npm run server
npm run build

