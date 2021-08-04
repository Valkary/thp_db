import { conn } from "../../../functions/remoteConnection";
import verifySession from "../../../functions/verifyCredentials";

function makeRequest() {
  return new Promise((resolve, reject) => {
    conn.query("SELECT pc.pedido_index as no_pedido, pc.pc_producto as prod_index, cl.cliente_name as cliente, SUM(pc.pc_cantidad) as cantidad, prod.prod_key as llave_producto FROM thp_pedidos_cont pc INNER JOIN thp_productos prod ON pc.pc_producto = prod.prod_index INNER JOIN thp_pedidos p ON p.p_index = pc.pedido_index INNER JOIN thp_clientes cl ON cl.cliente_index = p.p_cliente GROUP BY pc.pc_producto, pc.pedido_index;", (err, result) => {
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