import { conn } from '../../../functions/remoteConnection';
import verifyToken from "../../../functions/verifyCredentials";

function insertOrder(conn, cliente, user_index) {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO thp_pedidos (p_fecha, p_cliente, p_estado, p_usuario) VALUES (CURRENT_TIMESTAMP(), ${cliente}, 1, ${user_index});`, (err, result) => {
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

const verificarIndice = async (conn, cliente, user_index) => {
  const insert_order = await insertOrder(conn, cliente, user_index);

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

const verifyAndRequest = async (token, conn, cliente) => {
  console.log("* Verificando sesión");
  const session = await verifyToken(token);
  
  if(session.verified) {
    console.log("* Sesión verificada!");
    const order_index = await verificarIndice(conn, cliente, session.u_index);

    return order_index;
  } else {
    return false;
  }
}

export default function crearNuevoPedido(req, res) {
  console.log("* Generando orden de pedido");
  return new Promise((resolve, reject) => {
    const { cliente, apiKey } = req.body;
    verifyAndRequest(apiKey, conn, cliente).then(result => {
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