import { conn } from '../../../functions/connection';

export default function getUsers(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      try {
        conn.query(`SELECT * FROM thp_productos;`, (err, result) => { 
          if (err) throw err; 
          if(result.length === 0){
            res.status(200).json({ "message": "Error de la base de datos" });
          } else {
            res.status(200).json(result);
          }
  
          resolve();
        });
      } catch(error) {
        res.status(error.status || 500).json({ message: error.message });
      }
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};