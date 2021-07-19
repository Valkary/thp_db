import { conn } from '../../connection';

export default function getUsers(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      conn.query(`SELECT u_first_names, u_last_names, u_security_lvl FROM thp_users WHERE u_name = "${req.body.username}" AND u_pass = "${req.body.password}"`, (err, result) => {
        if (err) throw err;

        if(result.length === 0){
          res.status(401).json({"message": "Nombre de usuario o contraseña incorrectos"});
        } else {
          res.status(200).json(result);
        }

        resolve();
      });
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};