// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints
// a.i.Display all the informaiton in the data CSV file
app.get("/api/all", (req,res,next) => {
    var sql = "select * from Car_data"
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

// a.ii.Get a list of cars in the Cars table
app.get("/api/cars", (req,res,next) => {
    var sql = "select * from Cars"
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
app.get("/api/owners", (req,res,next) => {
    var sql = "select * from Owners"
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
app.get("/api/cars/:carid", (req,res,next) => {
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
app.get("/api/owners/:carid", (req,res,next) => {
    var sql = "select * from Owners where Car_ID = ?"
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
app.post("/api/owners/", (req, res, next) => {
    var errors=[]
    if (!req.body.Car_ID){
        errors.push("No id specified");
    }
    if (!req.body.Name){
        errors.push("No name specified");
    }
    if (!req.body.Email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Car_ID: req.body.Car_ID,
        Name: req.body.Name,
        Email: req.body.Email
    }
    var sql ='INSERT INTO Owners (Car_ID, Name, Email) VALUES (?,?,?)'
    var params =[data.Car_ID, data.Name, data.Email]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});

// b. Inserting new data record of cars by post 
app.post("/api/cars/", (req, res, next) => {
    var errors=[]
    if (!req.body.Car_ID){
        errors.push("No id specified");
    }
    if (!req.body.Year){
        errors.push("No year specified");
    }
    if (!req.body.Make){
        errors.push("No make specified");
    }
    if (!req.body.Model){
        errors.push("No model specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Car_ID: req.body.Car_ID,
        Year: req.body.Year,
        Make: req.body.Make,
        Model: req.body.Model
    }
    var sql ='INSERT INTO Cars (Car_ID, Year, Make, Model) VALUES (?,?,?,?)'
    var params =[data.Car_ID, data.Year, data.Make, data.Model]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});

// updating car records by car id 
//Since each field could be empty (not updated), we use COALESCE function to keep the current value if there is no new value (null).
app.patch("/api/cars/:carid", (req, res, next) => {
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
app.patch("/api/owners/:carid", (req, res, next) => {
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
