const mysql = require("mysql2");

async function makeConnection() {
  const connection = mysql.createConnection({
    user: process.env.SCALINGO_USER,
    password: process.env.SCALINGO_PWD,
    host: process.env.SCALINGO_HOST,
    port: process.env.SCALINGO_PORT,
    database: process.env.SCALINGO_DB,
  });

  connection.connect((err) => {
    if(err) {
      console.log(err);
      console.log("Not connected");
      return null;
    } else {
      console.log("Connected!");
      connection.query("SHOW TABLES", (err, result) => {
        if (err) throw err;
        console.log(result);
      }); 
      return connection;
    }
  })
}

export const conn = makeConnection();

