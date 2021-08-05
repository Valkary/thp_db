import { conn } from "../../../functions/remoteConnection";
import verifySession from "../../../functions/verifyCredentials";

function makeRequest() {
  return new Promise((resolve, reject) => {
    conn.query("SELECT thp_pedidos_cont.pedido_index AS no_pedido, thp_clientes.cliente_name AS cliente,(CASE WHEN thp_pedidos_cont.pedido_index = thp_prog_prod.pedido_index AND thp_pedidos_cont.pc_producto = thp_prog_prod.pp_prod THEN (TRUNCATE(SUM(thp_pedidos_cont.pc_cantidad) / COUNT(thp_pedidos_cont.pc_producto = thp_prog_prod.pp_prod AND thp_pedidos_cont.pedido_index = thp_prog_prod.pedido_index), 0) - SUM(thp_prog_prod.pp_quant)) ELSE SUM(thp_pedidos_cont.pc_cantidad) END) AS cantidad, thp_productos.prod_key AS llave_producto, thp_pedidos_cont.pc_producto AS prod_index FROM thp_pedidos_cont LEFT JOIN thp_prog_prod ON thp_pedidos_cont.pedido_index = thp_prog_prod.pedido_index AND thp_pedidos_cont.pc_producto = thp_prog_prod.pp_prod LEFT JOIN thp_productos ON thp_pedidos_cont.pc_producto = thp_productos.prod_index LEFT JOIN thp_pedidos ON thp_pedidos.p_index = thp_pedidos_cont.pedido_index LEFT JOIN thp_clientes ON thp_clientes.cliente_index = thp_pedidos.p_cliente GROUP BY thp_pedidos_cont.pc_producto , thp_pedidos_cont.pedido_index;", (err, result) => {
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