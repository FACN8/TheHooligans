const tape = require("tape");
const runDbBuild = require("../src/database/db_build");
const getData = require("../src/queries/getData");
const postData = require("../src/queries/postData");

tape("tape is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

// tape("Can we get data?", t => {
//   runDbBuild(function(error, result) {
//     getData((err, res) => {
//       if (err) return err;
//       t.equals(res[0].name, "Alina", "name should me alina");
//     });
//     getData((err, res) => {
//       if (err) return err;
//       t.equals(res[0].location, "Moscow", "location should be Moscow");
//     });
//     t.end();
//   });
// });
