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
}

const createRangeQuery = (arrivalInputDate,departureInputDate)=>{
  let dayToString = 'day'+arrivalInputDate;

  let rangeQuery = `SELECT * FROM hostel 
  INNER JOIN reservation ON reservation.hostel_id = hostel.id 
  WHERE hostel.city_id IN (SELECT id FROM city WHERE name = $1)
  and reservation.${dayToString} = FALSE`;

// Building the query dynamically
  for(var i=arrivalInputDate+1; i <= departureInputDate; i++){
      let dayToString = 'day'+i;
      rangeQuery += ` AND reservation.${dayToString} = FALSE`;
  }
 return rangeQuery;
}


const getAvaialbeHostels = (query,cityNameInsensitive,cb) =>{
  dbConnection.query(query,[cityNameInsensitive], (err, res) => {
    if (err) return cb(err);
    cb(null, res.rows);
  });

};


module.exports = {
  getAllData,
  getCityTable,
  getGuestTable,
  getHostelTable,
  getReservationTable,
  getAvaialbeHostels,
  createRangeQuery
};
