import { conn } from "../../../functions/remoteConnection";
import verifyToken from "../../../functions/verifyCredentials";

async function insertarFilasContenido(conn, data) {
  return new Promise((resolve, reject) => {
    conn.query("INSERT INTO thp_pedidos_cont (pc_producto, pc_cantidad, pedido_index) VALUES ?", [data], (err, result) => {
      return err ? reject(err) : resolve(result.affectedRows);
    });
  });
}

export default function agregarContenidoPedido(req, res) {
  console.log("* Generando contenido del pedido");
  return new Promise(async (resolve, reject) => {
    const { contenido, apiKey } = req.body;

    const session = await verifyToken(apiKey);
    if(session.verified) {
      const affected_rows = await insertarFilasContenido(conn, contenido);
      res.status(200).send({ affectedRows: affected_rows });
      resolve(true);
    } else {
      res.status(200).send({ affectedRows: 0 });
      resolve(false);
    }
  });
}