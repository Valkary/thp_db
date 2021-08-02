import axios from "axios";
import { useEffect, useState } from "react";

export default function pedidosPorCodigo({api_key}) {
  const [ pedidos, setPedidos ] = useState([]);

  useEffect(() => {
    axios.post("/api/pedidos/pedidosPorCodigo", { apiKey: api_key }).then(result => {
      const fetch_pedidos = result.data;
      setPedidos(...pedidos, fetch_pedidos);
    });
  }, []);

  return (
    <div>
      <h2>Pedidos Por Surtir</h2>
      <table>
        <thead>
          <tr>
            <th colSpan={3}>Listado de pedidos por codigo</th>
          </tr>
          <tr>
            <th>Cantidad</th>
            <th>Codigo</th>
            <th>Completado</th>
          </tr>
        </thead>
        <tbody>
          {
            pedidos.map(pedido => {
              return (
                <tr>
                  <td>{pedido.cantidad}</td>
                  <td>{pedido.llave_producto}</td>
                  <td>
                    ✅/❌
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      
    </div>
  );
}