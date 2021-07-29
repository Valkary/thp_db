import { conn } from "../../functions/remoteConnection";
import uuidApikey from "uuid-apikey";

function searchToken(token) {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT u_security_lvl FROM thp_users WHERE u_uuid = ?`, token, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

async function matchAndVerifyToken(cookie) {
  const cookie_to_uuid = uuidApikey.toUUID(cookie);
  const token = await searchToken(cookie_to_uuid);

  return { verified: true, security_lvl: token[0].u_security_lvl };
}

export default function verifySession(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST") {
      const session_cookie = req.body.apiKey;
      console.log("* Verificando token...");
      matchAndVerifyToken(session_cookie).then(result => {
        if(result.verified){
          console.log("* Token verificado. Sesión correcta");
          res.status(200).json({ verified: true, message: "Sesion verificada" });
          resolve()
        } else {
          console.log("* Token incorrecto. Sesión denegada");
          res.status(401).json({ verified: false, message: "No se ha iniciado sesión en el sistema!" });
          reject();
        }
      });
    } else {
      console.log("* Método http incorrecto");
      res.status(405).json({ verified: false, message: "Metodo incorrecto" });
      reject();
    }
  });
}