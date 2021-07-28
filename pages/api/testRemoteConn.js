import makeConnection from "../../functions/remoteConnection";

export default function testConnection(req, res){
  return new Promise((resolve, reject) => {
    const connection = makeConnection();
    connection.query("SHOW TABLES", (err, result) => {
      if (err) throw err;
      console.log(result);
      res.status(200).json({working: false});
      resolve()
    });
  });
}