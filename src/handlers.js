const { readFile } = require("fs");
const path = require("path");
const urlMod = require('url')
const getData = require("./queries/getData.js");
const dbConnection = require('./database/db_connection')
const querystring = require('querystring')

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
    dbConnection.query('SELECT * FROM hostel WHERE city_id IN (SELECT id FROM city WHERE name=$1)', [queries.city], (error, result) => {
        if (error) {
            response.writeHead(503, extension.text);
            response.end('Server failed to load the hostels for that city. eemchem ha sleha')
        }
        response.writeHead(200, extension.json);
        response.end(JSON.stringify(result.rows));
    })

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
    hostelHandler
};