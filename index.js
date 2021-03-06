const sqlite3 = require('sqlite3');
var express = require("express");
var app = express();

const cors = require("cors");
app.use(cors());

// req.body
app.use(express.json())

const HTTP_PORT = 3030
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});

const db = new sqlite3.Database('Lab4DB.db', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {
        console.log('Connected to the SQLite database.')
    }
});

// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints
// a.i.Display all the informaiton in the data CSV file
// http://localhost:3030/all
app.get("/all", (req, res, next) => {
    db.all("SELECT * FROM Car_data", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ rows });
    });
});

// a.ii.Get a list of cars in the Cars table
// http://localhost:3030/cars
app.get("/cars", (req,res,next) => {
    var sql = "SELECT * FROM Cars"
    var params = []
    db.all(sql, params, (err, rows) =>{
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

// a.ii.Get a list of owners in the Owners table
// http://localhost:3030/owners
app.get("/owners", (req,res,next) => {
    var sql = "SELECT * FROM Owners"
    var params = []
    db.all(sql, params, (err, rows) =>{
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

// a.ii.Get a single record of car by id in the Cars table
// http://localhost:3030/cars/{carid}
app.get("/cars/:carid", (req,res,next) => {
    var sql = "select * from Cars where Car_ID = ?"
    var params = [req.params.carid]
    db.all(sql, params, (err, rows) =>{
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

// a.ii.Get a single record of owner by id in the Owners table
// http://localhost:3030/owners/(carid)
app.get("/owners/:carid", (req,res,next) => {
    var sql = "SELECT * FROM Owners where Car_ID = ?"
    var params = [req.params.carid]
    db.all(sql, params, (err, rows) =>{
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

// b. Inserting new data record of owners by post 
// http://localhost:3030/owners/
app.post("/owners/", (req, res, next) => {
  var sql = "INSERT INTO Owners (Car_ID, Name, Email) VALUES (?, ?, ?)"
  params = [];
  var errors = []
  if(!req.body.carid && req.body.carid != 0) { errors.push("No Car ID specified"); }
  if(!req.body.name) { errors.push("No Name specified"); }
  if(!req.body.email) { errors.push("No Email specified"); }
  if(errors.length) {
      res.status(400).json({"error": errors.join(",")});
      return;
  }
  params.push(req.body.carid, req.body.name, req.body.email)
  db.run(sql, params, function(err, result) {

      if(err) {
          res.status(400).json({"error": err.message})
          return;
      }
            res.json({
           "message": "success",
           "data": params,
           "id": this.lastID
      })

  });
});

// b. Inserting new data record of cars by post 
// http://localhost:3030/cars/
app.post("/cars/", (req, res, next) => {
    var reqBody = req.body;
    var sql = "INSERT INTO Cars (Car_ID, Year, Make, Model) VALUES (?, ?, ?, ?)"
    var params = []

    params.push(reqBody.Car_ID, reqBody.Year, reqBody.Make, reqBody.Model)

        db.run(sql,params,function(err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "message": "success",
                "data": params,
                "id": this.lastID
            })
        });
});


//updating car records by car id 
//Since each field could be empty (not updated), we use COALESCE function to keep the current value if there is no new value (null).
//http://localhost:3030/cars/{carid}
app.patch("/cars/:carid", (req, res, next) => {
    var data = {
        carid: req.params.carid,
        Year: req.body.Year,
        Make: req.body.Make,
        Model: req.body.Model
    }
    db.run(
        `UPDATE car set  
           Year = COALESCE(?,Year), 
           Make = COALESCE(?,Make),
           Model = COALESCE(?,Model) 
           WHERE Car_ID = ?`,
        [data.carid, data.Year, data.Make, data.Model],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
});

// updating owner records by carid
// http://localhost:3030/owners/{carid}
app.patch("/owners/:carid", (req, res, next) => {
    var data = {
        carid: req.params.carid,
        Email: req.body.Email,
        Name : req.body.Name
    }
    db.run(
        `UPDATE Owners set 
           Name = COALESCE(?,Name), 
           Email = COALESCE(?,Email), 
           password = COALESCE(?,password) 
           WHERE Car_ID = ?`,
        [data.name, data.email, data.carid],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
