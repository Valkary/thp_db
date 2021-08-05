import verifySession from "../../../functions/verifyCredentials";
import { conn } from "../../../functions/remoteConnection";

function insertRow(query_arr) {
  return new Promise((resolve, reject) => {
    conn.query("INSERT INTO thp_prog_prod (pedido_index, pp_prod, pp_quant) VALUES ?;", [query_arr] , (err, result) => {
      return err ? reject(err) : resolve(result);
    })
  })
}

export default function generarOrdenProducction(req, res) {
  return new Promise(async (resolve, reject) => {
    const session = await verifySession(req.body.apiKey);

    if(session.verified) {
      const { no_pedido, prod_indexes, prod_quants } = req.body.api_order;

      let query_arr = [];

      for(let i = 0; i < prod_indexes.length; i++) {
        if(prod_quants[i] > 0) query_arr.push([no_pedido, prod_indexes[i], prod_quants[i]]);
      }

      const result = await insertRow(query_arr);

      res.status(200).send({ success: true, ...result });
    }
  });
}