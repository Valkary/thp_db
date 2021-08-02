import { conn } from "../../../functions/remoteConnection";
import verifySession from "../../../functions/verifyCredentials";

function makeRequest() {
  return new Promise((resolve, reject) => {
    conn.query("SELECT thp_pedidos_cont.pedido_index AS no_pedido, thp_clientes.cliente_name AS cliente,(CASE WHEN thp_pedidos_cont.pedido_index = thp_prog_prod.pedido_index AND thp_pedidos_cont.pc_producto = thp_prog_prod.pp_prod THEN SUM(thp_pedidos_cont.pc_cantidad) - thp_prog_prod.pp_quant ELSE SUM(thp_pedidos_cont.pc_cantidad) END) as cantidad, prod.prod_key AS llave_producto FROM thp_pedidos_cont LEFT JOIN thp_productos prod ON thp_pedidos_cont.pc_producto = prod.prod_index LEFT JOIN thp_pedidos p ON p.p_index = thp_pedidos_cont.pedido_index LEFT JOIN thp_clientes thp_clientes ON thp_clientes.cliente_index = p.p_cliente LEFT JOIN thp_prog_prod thp_prog_prod ON thp_prog_prod.pedido_index = thp_pedidos_cont.pedido_index GROUP BY thp_pedidos_cont.pc_producto , thp_pedidos_cont.pedido_index; ", (err, result) => {
      return err ? reject(err) : resolve(result);
    })
  });
}

export default function requestPedidosProd(req, res) {
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