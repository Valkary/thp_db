import { conn } from '../../../functions/remoteConnection';
import verifyToken from "../../../functions/verifyCredentials";

function fetchWorkers() {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT u_index, u_first_names, u_last_names FROM thp_users;`, (err, result) => { 
      return err ? reject(err) : resolve(result);
    });
  });
}

const verifyAndRequest = async (token) => {
  const session = await verifyToken(token);
  
  if(session.verified) {
    const workers = await fetchWorkers();

    return workers;
  } else {
    return false;
  }
}

export default function getUsers(req, res) {
  const apiToken = req.body.apiKey;

  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      console.log("* Verificando sesión");

      verifyAndRequest(apiToken).then(result => {
        if(!result) {
          res.status(200).json({ message: "No se ha iniciado sesión en el sistema!" });
          resolve();
        } else {
          res.status(200).send(result);
          resolve();
        }
      });
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};