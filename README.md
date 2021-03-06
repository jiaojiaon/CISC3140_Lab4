# CISC3140_Lab4
## Description
The report show aggregate values that are computed from the CSV file provided by
```sh
git submodule add -f https://gist.github.com/d66a59b6db4e59c16efd4c42ad411f8e.git data
```
## Objective:

The objective of this lab is to build a backend API using a combination of SQL and JavaScript to enable users to view data that is stored in a database as well as update data.

This work is a continuation of the SQLite database management techniques from Lab 2.

## Requirements:
API endpoint support the following features:

1. Viewing data that is in the database as JSON formatted data

  - Display results of select all - I.e., all cars present in the CSV file, all the car owners contact information, showing results per class

  - Display data that is a list of records and a single record
 
 2. Inserting new data record(s)

  - Support query, parameter, and JSON body for inserting 1 record at a time and multiple records

3. Updating data records

  - Support query, parameter, and JSON body methods for updating 1 record at a time and across multiple records
 
  
## Dependencies

* Sample Data: https://gist.github.com/katychuang/d66a59b6db4e59c16efd4c42ad411f8e
* BC Linux machines

- express
- md5
- nodemon
- pg
- sqlite3
  
## Installation
Copy repo to local machine. The repo contains a single file named `data.csv`

```sh
$ git clone git@github.com:jiaojiaon/CISC3140_Lab4.git
$ git submodule init
$ git submodule update
```
You must have the following installed: 

- NodeJS
- npm install express
- npm install sqlite3
- npm install md5


## A description of API endpoints
- GET /all 
   - Display all the informaiton in the data CSV file
   - http://localhost:3030/all

- GET /cars 
  - Get a list of cars in the Cars table
  - http://localhost:3030/cars

- GET /owners 
  - Get a list of owners in the Owners table
  - http://localhost:3030/owners

- POST /owners/
  - Inserting new data record of owners by post 
  - http://localhost:3030/owners/

- POST /cars/
  - Inserting new data record of car by post 
  - http://localhost:3030/cars/

- PATCH /cars/{carid}
  - Updating car records by car id 
  - http://localhost:3030/cars/{carid}

- PATCH /owners/{carid}
  - Updating owner records by car id 
  - http://localhost:3030/{carid}

## Setup
1. Sign up for a GitHub account if you don't have one. Set up your SSH keys with github.
2. Clone this repository: `git clone git@github.com:jiaojiaon/CISC3140_Lab4.git` to your machine to get a copy.
3. Move into the project's root directory with `cd CISC3140_Lab4`
4. Update submodule: git submodule update
6. Run using the command below to create database tables in sql and csv. 
```sh
$ make lab4
``` 
7. Run using the command below to connect and run the database to the server in [index.js](index.js). 
```sh
node index.js
or
npm start
```
