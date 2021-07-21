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
    bcrypt.compare(password, hashed_pwd, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function fetchCredentials(conn, username) {
  return new Promise((resolve, reject) => {
    conn.query("SELECT u_index, u_first_names, u_last_names FROM thp_users WHERE u_name = ?", [username], (err, result) => {
      return err ? reject(err) : resolve(result[0]);
    });
  });
}

function startSession(conn, user_index, key) {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO thp_sessions (session_key, session_start, session_user) VALUES ("${key}", CURRENT_TIMESTAMP(), ${user_index});`, (err, result) => {
      return err ? reject(err) : resolve(true);
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
    const { u_index, u_first_names, u_last_names } = credentials;
    const { apiKey, uuid } = createApiKey.create();

    const start_session = startSession(conn, u_index, uuid);

    if(start_session) {
      return {
        status: 200,
        credentials: { u_first_names, u_last_names },
        api_token: apiKey
      }
    } else {
      return {
        status: 200,
        credentials: null,
        api_token: null,
        message: "Error al crear token de API, intentelo de nuevo"
      }
    }    
  } else {
    return {
      status: 200,
      credentials: null,
      api_token: null,
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