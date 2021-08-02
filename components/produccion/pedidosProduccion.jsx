export default function direccionProduccion({api_key, pedidos}) {
  return (
    <div>
      <h2>Pedidos</h2>
      <table>
        <thead>
          <tr>
            <th colSpan={4}>Consulta pedidos</th>
          </tr>
          <tr>
            <th>Cantidad</th>
            <th>Código</th>
            <th>Pedido</th>
            <th>Cliente</th>
          </tr>
        </thead>
        <tbody>
          {
            pedidos.map(pedido => {
              return (
                <tr key={pedido.pedido}>
                  <td>
                    {
                      pedido.quant.map(cantidad => {
                        return <div>{cantidad}</div>;
                      })
                    }
                  </td>
                  <td>
                    {
                      pedido.keys.map(key => {
                        return <div>{key}</div>;
                      })
                    }
                  </td>
                  <td>{pedido.pedido}</td>
                  <td>{pedido.cliente}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}