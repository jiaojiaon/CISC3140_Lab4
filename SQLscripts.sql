DROP TABLE IF EXISTS Cars;
DROP TABLE IF EXISTS Owners;
DROP TABLE IF EXISTS Car_data; 
DROP TABLE IF EXISTS judges;

.header on
.mode csv
-- create a table that have all information in the provid data.csv
CREATE TABLE Car_data (
    Timestamp DATETIME,
    Email TEXT,
    Name TEXT,
    Year INT,
    Make TEXT,
    Model TEXT,
    Car_ID INT,
    Judge_ID TEXT,
    Judge_Name TEXT,
    Racer_Turbo INT,
    Racer_Supercharged INT,
    Racer_Performance INT,
    Racer_Horsepower INT,
    Car_Overall INT,
    Engine_Modifications INT,
    Engine_Performance INT,
    Engine_Chrome INT,
    Engine_Detailing INT,
    Engine_Cleanliness INT,
    Body_Frame_Undercarriage INT,
    Body_Frame_Suspension INT,
    Body_Frame_Chrome INT,
    Body_Frame_Detailing INT,
    Body_Frame_Cleanliness INT,
    Mods_Paint INT,
    Mods_Body INT,
    Mods_Wrap INT,
    Mods_Rims INT,
    Mods_Interior INT,
    Mods_Other INT,
    Mods_ICE INT,
    Mods_Aftermarket INT,
    Mods_WIP INT,
    Mods_Overall INT
);
.import data_lab4/data.csv Car_data

 -- create a table that only have car information 
CREATE TABLE Cars(
    Car_ID INT PRIMARY KEY,
    Year INT,
    Make TEXT,
    Model TEXT
);
.mode csv
.import \carsTable.csv Cars
DELETE FROM Cars WHERE Car_ID = 'Car_ID';

-- create a table that have owners information 
CREATE TABLE Owners(
    Car_ID INT PRIMARY KEY,
    Name TEXT,
    Email TEXT
);
.mode csv
.import \ownersTable.csv Owners

DELETE FROM Owners WHERE Car_ID = 'Car_ID';

CREATE TABLE judges(
    Timestamp datetime,
    Judge_ID text,
    Judge_Name text);
    
.mode csv
.import \judgesTable.csv judges
DELETE FROM judges WHERE Judge_ID = 'Judge_ID';
