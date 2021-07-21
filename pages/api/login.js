import { conn } from '../../connection';
import bcrypt from 'bcrypt';
import createApiKey from 'uuid-apikey';

function getPassword(conn, username) {
  return new Promise((resolve, reject) => {
    conn.query("SELECT u_pass FROM thp_users WHERE u_name = ?", [username], (err, result) => {
      return err ? reject(err) : resolve(result[0].u_pass);
    });
  });
}

function compareHashes(password, hashed_pwd) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashed_pwd, (error, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function fetchCredentials(conn, username) {
  return new Promise((resolve, reject) => {
    conn.query("SELECT u_first_names, u_last_names, u_security_lvl FROM thp_users WHERE u_name = ?", [username], (err, result) => {
      return err ? reject(err) : resolve(result[0]);
    });
  });
}

const getCredentials = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const hashed_pwd = await getPassword(conn, username);
  const verifyHash = await compareHashes(password, hashed_pwd);

  if(verifyHash){
    const credentials = await fetchCredentials(conn, username);
    const { apiKey, uuid } = createApiKey.create();

    /*
      TODO:
        apiKey: queda expuesta del lado del cliente. Se va a utilizar para mantener a los usuarios loggeados
        uuid: queda guardada en el servidor MySQL

        Para que el usuario pueda hacer uso del API va a tener que verificar su llave API con el uuid de la base de datos
    */

    return {
      status: 200,
      credentials: credentials,
      api_token: apiKey
    }
  }
};

export default function sendCredentials(req, res) {
  return new Promise((resolve, reject) => {
    getCredentials(req, res).then(result => {
      res.status(200).send(result);
      resolve();
    });
  });
}