import { conn } from "./remoteConnection";
import uuidApikey from "uuid-apikey";

function searchToken(token) {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT u_index, u_security_lvl FROM thp_users WHERE u_uuid = ?`, token, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

async function matchAndVerifyToken(cookie) {
  const cookie_to_uuid = uuidApikey.toUUID(cookie);
  const token = await searchToken(cookie_to_uuid);

  return { verified: true, u_index: token[0].u_index, u_security_lvl: token[0].u_security_lvl };
}

export default function verifySession(cookie) {
  return new Promise((resolve, reject) => {
    const session_cookie = cookie;
    
    if(session_cookie !== null) {
      console.log("* Verificando token...");
      matchAndVerifyToken(session_cookie).then(result => {
        if(result.verified){
          console.log("* Token verificado. Sesión correcta");
          return resolve({ verified: true, u_index: result.u_index, u_security_lvl: result.u_security_lvl, message: "Sesion verificada" });
        } else {
          console.log("* Token incorrecto. Sesión denegada");
          return resolve({ verified: false, u_index: 9999, message: "No se ha iniciado sesión en el sistema!" });
        }
      });
    } else {
      console.log("* Token incorrecto. Sesión denegada");
      return resolve({ verified: false, u_index: 9999, message: "No se ha iniciado sesión en el sistema!" });
    }
  });
}