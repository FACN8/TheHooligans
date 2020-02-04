const dbConnection = require("../database/db_connection");

const getAllData = cb => {
  getGuestTable(cb);
  getHostelTable(cb);
  getReservationTable(cb);
  getCityTable(cb);
};

const getGuestTable = cb => {
  dbConnection.query("SELECT * FROM guest;", (err, res) => {
    if (err) return cb(err);

    cb(null, res.rows);
  });
};

const getHostelTable = cb => {
  dbConnection.query("SELECT * FROM hostel;", (err, res) => {
    if (err) return cb(err);

    cb(null, res.rows);
  });
};

const getReservationTable = cb => {
  dbConnection.query("SELECT * FROM reservation;", (err, res) => {
    if (err) return cb(err);

    cb(null, res.rows);
  });
};

const getCityTable = cb => {
  dbConnection.query("SELECT * FROM city;", (err, res) => {
    if (err) return cb(err);

    cb(null, res.rows);
  });
};

module.exports = {
  getAllData,
  getCityTable,
  getGuestTable,
  getHostelTable,
  getReservationTable
};
