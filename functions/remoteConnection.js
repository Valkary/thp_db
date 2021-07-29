const mysql = require("mysql");

function makeConnection() {
  const connection = mysql.createConnection({
    user: process.env.REMOTE === "true" ? process.env.SCALINGO_USER : process.env.MYSQL_USERNAME,
    password: process.env.REMOTE === "true" ? process.env.SCALINGO_PWD : process.env.MYSQL_PASSWORD,
    host: process.env.REMOTE === "true" ? process.env.SCALINGO_HOST : process.env.MYSQL_HOST,
    port: process.env.REMOTE === "true" ? process.env.SCALINGO_PORT : process.env.MYSQL_PORT,
    database: process.env.REMOTE === "true" ? process.env.SCALINGO_DB : process.env.MYSQL_DATABASE
  });
  
  connection.connect((err) => {
    if (err) throw err;
  });

  return connection;
}

export const conn = makeConnection();