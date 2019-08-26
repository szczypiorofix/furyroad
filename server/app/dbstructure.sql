/**
-------------------------- USERS --------------------------
*/

CREATE TABLE IF NOT EXISTS user (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
email TEXT,
password TEXT
);

CREATE TABLE IF NOT EXISTS stats (
    fuel INTEGER,
    maxFuel INTEGER,
    water INTEGER,
    food INTEGER,
    scrap INTEGER,
    carHealth INTEGER,
    carMaxHealth INTEGER,
    carTemperature INTEGER,
    carMaxTemperature INTEGER,
    distanceDriven INTEGER,
    carSpeed INTEGER,
    carMaxSpeed INTEGER,
    carFuelUsage INTEGER,
    attactRate INTEGER,
    defenseRate INTEGER,
    hoursPassed INTEGER,
    daysPassed INTEGER,
    score INTEGER
);