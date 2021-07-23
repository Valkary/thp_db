import { conn } from '../../../connection';
import axios from 'axios';

function fetchWorkers() {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT u_index, u_first_names, u_last_names FROM thp_users;`, (err, result) => { 
      return err ? reject(err) : resolve(result);
    });
  });
}

function verifySession(token) {
  return new Promise((resolve, reject) => {
    axios.post("/api/verifyToken", { apiToken: token }).then(result => {
      console.log(result);
      return err ? reject(err) : resolve(result);
    }).catch(err => {
      console.log(err);
      return err;
    });
  });
}

const verifyAndRequest = async (token) => {
  const session = await verifySession(token);
  
  if(session.verified) {
    const workers = await fetchWorkers();

    return workers;
  } else {
    return false;
  }
}

export default function getUsers(req, res) {
  const apiToken = req.body.apiToken;
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      const apiToken = req.body.apiToken;
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