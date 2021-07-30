import verifySession from "../../../functions/verifyCredentials";
import { conn } from "../../../functions/remoteConnection";

function queryNewProduct(product_key, product_description, product_price) {
  return new Promise((resolve, reject) => {
    conn.query("INSERT INTO thp_productos (prod_key, prod_name) VALUES (?)", [[product_key, product_description]], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

export default function createProduct(req, res) {
  return new Promise(async (resolve, reject) => {
    const { product_key, product_description, product_price, apiKey } = req.body;

    const session = await verifySession(apiKey);
    if(session.verified) {
      const query_result = await queryNewProduct(product_key, product_description, product_price, apiKey);
      res.status(200).send({ success: true, affectedRows: query_result.affectedRows });
      resolve();
    }
  });
}