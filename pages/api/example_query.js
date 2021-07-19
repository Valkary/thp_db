import { conn } from '../../connection';

export default function getUsers(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      conn.query("SELECT * FROM thp_db.thp_users;", (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
        resolve();
      });
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};