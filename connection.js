const mysql = require('mysql');

function makeConnection() { 
  const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

  conn.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });

  return conn;
}

export const conn = makeConnection();