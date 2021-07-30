import { conn } from "../../../functions/remoteConnection";
import verifySession from "../../../functions/verifyCredentials";

function requestClientTypes() {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM thp_cliente_tipo", (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

export default function getClientTypes(req, res) {
  return new Promise(async (resolve, reject) => {
    if(req.method === "POST"){
      const { apiKey } = req.body;
      const session = await verifySession(apiKey);

      if(session.verified) {
        const client_types_tupple = await requestClientTypes();
        res.status(200).send({ success: true, tipos_clientes: client_types_tupple });
        resolve()
      }
    }
  });
}