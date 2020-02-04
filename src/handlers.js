const { readFile } = require("fs");
const path = require("path");
const urlMod = require('url')
const getData = require("./queries/getData.js");
const dbConnection = require('./database/db_connection')
const querystring = require('querystring')

const serverError = (err, response) => {
    response.writeHead(500, "Content-Type:text/html");
    response.end("<h1>Sorry, there was a problem loading the page</h1>");
    console.log(err);
  };
  
  const homeHandler = response => {
    const filepath = path.join(__dirname, "..", "public", "index.html");
    readFile(filepath, (err, file) => {
      if (err) return serverError(err, response);
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    });
  };
  
  const hostelHandler = (url, response) => {
    const queries = querystring.parse(urlMod.parse(url).query);
    dbConnection.query('SELECT * FROM hostel WHERE city_id IN (SELECT id FROM city WHERE name=$1)',[queries.city], (error,result)=>{
      if(error){
        response.writeHead(503, {"Content-Type": "text/plain"});
        response.end('Server failed to load the hostels for that city. eemchem ha sleha')
      }
      response.writeHead(200, {"Content-Type": "applicaton/json"});
      response.end(JSON.stringify(result.rows));
    })
    
  };


  const publicHandler = (url, response) => {
    const filepath = path.join(__dirname,"..", url);
    readFile(filepath, (err, file) => {
      if (err) return serverError(err, response);
      const extension = url.split(".")[1];
      const extensionType = {
        html: "text/html",
        css: "text/css",
        js: "application/javascript",
        ico: "image/x-icon"
      };
      response.writeHead(200, { "content-type": extensionType[extension] });
      response.end(file);
    });
  };

  const errorHandler = response => {
    response.writeHead(404, { "content-type": "text/html" });
    response.end("<h1>404 Page Requested Cannot be Found</h1>");
  };

  module.exports = {
    homeHandler,
    publicHandler,
    errorHandler,
    hostelHandler
  };
  