import { conn } from '../../../functions/remoteConnection';

// FIXME: cambiar a que el usuario sea dinámico con la sesión y agregarlo a todos los endpoints del API
const usuario = 1;

function insertOrder(conn, cliente) {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO thp_pedidos (p_fecha, p_cliente, p_estado, p_usuario) VALUES (CURRENT_TIMESTAMP(), ${cliente}, 1, ${usuario});`, (err, result) => {
      return err ? reject(err) : resolve(true);
    });
  });
}

function fetchLastOrderIndex(conn) {
  return new Promise((resolve, reject) => {
    conn.query("SELECT p_index FROM thp_pedidos ORDER BY p_index DESC LIMIT 0,1", (err, result) => {
      return err ? reject(err) : resolve(parseInt(result[0].p_index, 10));
    });
  });
}

const verificarIndice = async (conn, cliente) => {
  const insert_order = await insertOrder(conn, cliente);

  if(insert_order) {
    const order_index = await fetchLastOrderIndex(conn);
    if(typeof order_index === "number" && order_index >= 1){
      return order_index;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}

export default function crearNuevoPedido(req, res) {
  console.log("* Generando orden de pedido");
  return new Promise((resolve, reject) => {
    const { cliente } = req.body;
    verificarIndice(conn, cliente).then(result => {
      if(result !== 0) {
        console.log(`* Contenido generado! Pedido no. ${result}`);
        res.status(200).send({
          message: "Orden de pedido creada en la base de datos!",
          order_index: result
        });
        resolve(true);
      }
    });
  });
}