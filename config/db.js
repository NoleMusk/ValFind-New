const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST=localhost,
  user: process.env.MYSQLUSE0R=root,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE=seattle_search,
  port: process.env.MYSQLPORT=3306
});

module.exports = db;