const { readFile } = require("fs");
const path = require("path");
const urlMod = require('url');
const getData = require("./queries/getData.js");
const dbConnection = require('./database/db_connection');
const querystring = require('querystring');
const pgFormat = require('pg-format');
const extension = {
    html: { "Content-Type": "text/html" },
    css: { "Content-Type": "text/css" },
    js: { "Content-Type": "application/javascript" },
    png: { "Content-Type": "image/png" },
    jpg: { "Content-Type": "image/jpg" },
    ico: { "Content-Type": "image/x-icon" },
    json: { "Content-Type": "application/json" },
    text: { "Content-Type": "text/plain" }
};

const serverError = (err, response) => {
    response.writeHead(500, extension.html);
    response.end("<h1>Sorry, there was a problem loading the page</h1>");
    console.log(err);
};


const homeHandler = response => {
    const filepath = path.join(__dirname, "..", "public", "index.html");
    readFile(filepath, (err, file) => {
        if (err) return serverError(err, response);
        response.writeHead(200, extension.html);
        response.end(file);
    });
};

const hostelHandler = (url, response) => {
    const queries = querystring.parse(urlMod.parse(url).query);
    let cityNameInsensitive = queries.city.substring(0, 1).toUpperCase() +queries.city.substring(1, queries.city.length).toLowerCase()
    let today = new Date();
    let curYear = today.getFullYear();
    let curMonth = today.getMonth()+1;
    let arrivalInputDate = parseInt((queries.arrival.split('-'))[2]);
    let departureInputDate = parseInt((queries.departure.split('-'))[2]);
    if(parseInt(queries.arrival.split('-')[0]) !== parseInt(curYear) || parseInt(queries.departure.split('-')[0]) !== parseInt(curYear)){
        response.end(JSON.stringify(['Invalid year']))
    }else if(parseInt(queries.arrival.split('-')[1]) !== parseInt(curMonth) || parseInt(queries.departure.split('-')[1]) !== parseInt(curMonth)){
        response.end(JSON.stringify(['Invalid month, enter current month']))

    }else if(departureInputDate < arrivalInputDate){
        response.end(JSON.stringify(['Departure day must be after arrival day!']))

    }
    
   


    const rangeQuery = getData.createRangeQuery(arrivalInputDate,departureInputDate);
    
    getData.getAvaialbeHostels(
    rangeQuery,
    cityNameInsensitive,
    (err,result) =>{
    response.writeHead(200, extension.json);
        
    if(result===undefined || result==='' || result.length === 0){
        console.log('Result is empty, returning empty arr');
        response.end(JSON.stringify([]));
    }
    response.end(JSON.stringify(result));
})
};
//Updates the reservation table to reserver hostel according to dates
const reserverHostelHandler = (request, response) => {
        response.writeHead(301, {"Location": "/"});
        var allTheData = '';
        request.on('data', function (chunkOfData) {
            allTheData += chunkOfData;
        });
        request.on('end', function () {
        allTheData = JSON.parse(allTheData);
        let arrivalInputDate = parseInt((allTheData.dayOfArrival.split('-'))[2]);
        let departureInputDate = parseInt((allTheData.dayOfDeparture.split('-'))[2]);
        for(var i=arrivalInputDate; i <= departureInputDate; i++){
            let dayToString = 'day'+i;
            const sqlQuery = pgFormat('UPDATE reservation SET %I = TRUE WHERE hostel_id=$1', dayToString)
            dbConnection.query(sqlQuery,[allTheData.hostelID]);
        }
        response.end();
  });
};


const publicHandler = (url, response) => {
    const filepath = path.join(__dirname, "..", url);
    const fileExt = url.split('.')[1]

    readFile(filepath, (err, file) => {
        if (err) return serverError(err, response);

        response.writeHead(200, extension[fileExt]);
        response.end(file);
    });
};

const errorHandler = response => {
    response.writeHead(404, extension.html);
    response.end("<h1>404 Page Requested Cannot be Found</h1>");
};

module.exports = {
    homeHandler,
    publicHandler,
    errorHandler,
    hostelHandler,
    reserverHostelHandler
};