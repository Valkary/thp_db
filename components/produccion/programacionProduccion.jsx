import InputNumber from "../utils/inputNumber";

export default function direccionProduccion({api_key, pedidos}) {
  return (
    <div>
      <h2>Producción por Programar</h2>
      <table>
        <thead>
          <tr>
            <th colSpan={5}>Programación Producción</th>
          </tr>
          <tr>
            <th>Cantidad</th>
            <th>Código</th>
            <th>Pedido</th>
            <th>Programar</th>
            <th>Aceptar</th>
          </tr>
        </thead>
        <tbody>
          {
            pedidos.map(pedido => {
              return (
                <tr key={pedido.pedido}>
                  <td>
                    {
                      pedido.quant.map((cantidad, index) => {
                        return <div key={`show_quant_${index}`}>{cantidad}</div>;
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
                  <td>
                    {
                      pedido.quant.map((cantidad, index) => {
                        return ( 
                          <div>
                            <InputNumber key={`input_quant_${index}`} min={0} max={cantidad} val={0}></InputNumber>
                          </div>
                        );
                      })
                    }
                  </td>
                  <td>
                    <button>✔</button>
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