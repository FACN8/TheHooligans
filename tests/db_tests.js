const tape = require("tape");
const runDbBuild = require("../database/db_build");
const getData = require("../src/queries/getData");
const postData = require("../src/queries/postData");

tape("tape is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

// tape('what you are going to test', (t)=> {
//   runDbBuild(function(err, res){
//    your test goes here
//   })
// })
