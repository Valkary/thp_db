import { conn } from "../../../functions/remoteConnection";
import verifySession from "../../../functions/verifyCredentials";

function makeRequest() {
  return new Promise((resolve, reject) => {
    conn.query("SELECT thp_productos.prod_key, tmp_1.suma_total,(CASE WHEN tmp_2.total_producidos IS NULL THEN 0 ELSE tmp_2.total_producidos END) AS total_producidos, (CASE WHEN tmp_2.total_producidos IS NULL THEN tmp_1.suma_total ELSE tmp_1.suma_total - tmp_2.total_producidos END) AS total_faltantes FROM (SELECT pc_producto, SUM(pc_cantidad) as suma_total FROM thp_db.thp_pedidos_cont GROUP BY pc_producto) AS tmp_1 LEFT JOIN thp_prog_prod ON tmp_1.pc_producto = thp_prog_prod.pp_prod LEFT JOIN (SELECT pp_prod, SUM(pp_quant) as total_producidos FROM thp_db.thp_prog_prod GROUP BY pp_prod) AS tmp_2 ON tmp_2.pp_prod = tmp_1.pc_producto LEFT JOIN thp_productos ON thp_productos.prod_index = tmp_1.pc_producto GROUP BY tmp_1.pc_producto;", (err, result) => {
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