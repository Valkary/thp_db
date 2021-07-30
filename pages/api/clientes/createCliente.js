import { conn } from "../../../functions/remoteConnection";
import verifySession from "../../../functions/verifyCredentials";

function queryNewClient(cliente_arr) {
  return new Promise((resolve, reject) => {
    conn.query("INSERT INTO thp_clientes (cliente_name, cliente_tipo, cliente_limite_credito) VALUES (?)", [cliente_arr], (err, result) => {
      return err ? reject({ success: false, error: err }) : resolve({ success: true, affected_rows: result.affectedRows });
    });
  });
}

export default function createClient(req, res) {
  return new Promise(async (resolve, reject) => {
    if(req.method === "POST") {
      const { cliente_name, cliente_tipo, cliente_limite_credito, apiKey } = req.body;
      const session = await verifySession(apiKey);

      if(session.verified) {
        const result_query = await queryNewClient([cliente_name, cliente_tipo, cliente_limite_credito]);

        if(result_query.success) {
          console.log("* Cliente creado con éxito!");
          res.status(200).send(result_query);
          resolve();
        } else {
          console.log("* Cliente no creado");
          res.status(200).send(result_query);
          resolve();
        }
      } else {
        console.log("* Credenciales incorrectas");
        res.status(200).send({ success: false });
        resolve();
      }
    } else {
      console.log("* Metodo HTTP incorrecto");
      res.status(200).send({ success: false });
      resolve();
    }
  });
}