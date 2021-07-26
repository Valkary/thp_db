import { conn } from '../../functions/connection';
import bcrypt from 'bcrypt';

function getPassword(conn, username) {
  return new Promise((resolve, reject) => {
    conn.query("SELECT u_pass FROM thp_users WHERE u_name = ?", [username], (err, result) => {
      return err ? reject(err) : resolve(result[0].u_pass);
    });
  });
}

function compareHashes(password, hashed_pwd) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashed_pwd, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function fetchCredentials(conn, username) {
  return new Promise((resolve, reject) => {
    conn.query("SELECT u_index, u_first_names, u_last_names, u_api_key FROM thp_users WHERE u_name = ?", [username], (err, result) => {
      return err ? reject(err) : resolve(result[0]);
    });
  });
}

const getCredentials = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username, password);

  const hashed_pwd = await getPassword(conn, username);
  console.log("* Usuario encontrado!");
  const verifyHash = await compareHashes(password, hashed_pwd);
  console.log("* Contraseña verificada!");
  
  if(verifyHash){
    const credentials = await fetchCredentials(conn, username);
    console.log("* Fetching credentials");
    const { u_index, u_first_names, u_last_names, u_api_key } = credentials;
    const [ firstNames, lastNames, apiKey ] = [ u_first_names, u_last_names, u_api_key ];
    
    console.log("* Enviando credenciales de la sesion...");

    return {
      status: 200,
      credentials: { firstNames, lastNames, apiKey },
    } 
  } else {
    return {
      status: 200,
      credentials: null,
      message: "Nombre de usuario o contraseña equivocados"
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