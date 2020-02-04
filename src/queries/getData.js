const dbConnection = require('../database/db_connection');

const getData = (cb) => {
    dbConnection.query('SELECT * FROM guest;', (err, res) => {
        if (err) return cb(err)

        cb(null, res.rows);
    });
    dbConnection.query('SELECT * FROM hostel;', (err, res) => {
        if (err) return cb(err)

        cb(null, res.rows);
    });
    dbConnection.query('SELECT * FROM reservation;', (err, res) => {
        if (err) return cb(err)

        cb(null, res.rows);
    });
    dbConnection.query('SELECT * FROM city;', (err, res) => {
        if (err) return cb(err)

        cb(null, res.rows);
    });
}

module.exports = getData;