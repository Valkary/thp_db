import { conn } from "../../../connection";

async function insertarFilasContenido(conn, data) {
  return new Promise((resolve, reject) => {
    conn.query("INSERT INTO thp_pedidos_cont (pc_producto, pc_cantidad, pedido_index) VALUES ?", [data], (err, result) => {
      return err ? reject(err) : resolve(result.affectedRows);
    });
  });
}

export default function agregarContenidoPedido(req, res) {
  console.log("* Generando contenido del pedido");
  return new Promise((resolve, reject) => {
    const { contenido } = req.body;
    insertarFilasContenido(conn, contenido).then(result => {
      console.log(`* Contenido generado. Lineas insertadas a la base de datos: ${result}`);
      res.status(200).send({ affectedRows: result });
      resolve(true);
    });
  });
}