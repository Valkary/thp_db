import { conn } from "../../../functions/remoteConnection";
import verifySession from "../../../functions/verifyCredentials";

function makeRequest() {
  return new Promise((resolve, reject) => {
    conn.query("SELECT SUM(pc.pc_cantidad) as cantidad, prod.prod_key as llave_producto FROM thp_pedidos_cont pc INNER JOIN thp_productos prod ON pc.pc_producto = prod.prod_index GROUP BY pc.pc_producto;", (err, result) => {
      return err ? reject(err) : resolve(result);
    })
  });
}

export default function requestPedidos(req, res) {
  return new Promise(async (resolve, reject) => {
    const { apiKey } = req.body;
    const session = await verifySession(apiKey);

    if(session.verified && session.u_security_lvl <= 3){
      const pedidos = await makeRequest();
      res.status(200).send(pedidos);
      resolve();
    }
  });
}