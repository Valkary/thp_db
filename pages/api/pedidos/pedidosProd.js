import { conn } from "../../../functions/remoteConnection";
import verifySession from "../../../functions/verifyCredentials";

function makeRequest() {
  return new Promise((resolve, reject) => {
    conn.query("SELECT tmp_1.pedido_index AS no_pedido, thp_productos.prod_key AS llave_producto, tmp_1.pc_producto AS prod_index,(CASE WHEN (tmp_2.pedido_index = tmp_1.pedido_index AND tmp_2.pp_prod = tmp_1.pc_producto) THEN tmp_1.suma_total - tmp_2.total_producidos ELSE tmp_1.suma_total END) AS cantidad, thp_clientes.cliente_name AS cliente FROM (SELECT pedido_index, pc_producto, SUM(pc_cantidad) AS suma_total FROM thp_db.thp_pedidos_cont GROUP BY pc_producto , pedido_index) AS tmp_1 LEFT JOIN thp_prog_prod ON tmp_1.pc_producto = thp_prog_prod.pp_prod LEFT JOIN (SELECT pedido_index, pp_prod, SUM(pp_quant) AS total_producidos FROM thp_db.thp_prog_prod GROUP BY pp_prod , pedido_index) AS tmp_2 ON tmp_2.pp_prod = tmp_1.pc_producto AND tmp_2.pedido_index = tmp_1.pedido_index LEFT JOIN thp_productos ON thp_productos.prod_index = tmp_1.pc_producto LEFT JOIN thp_pedidos ON thp_pedidos.p_index = tmp_1.pedido_index LEFT JOIN thp_clientes ON thp_clientes.cliente_index = thp_pedidos.p_cliente GROUP BY tmp_1.pedido_index , tmp_1.pc_producto;", (err, result) => {
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