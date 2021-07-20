import { useState } from "react";
import ProductRow from "../components/filaPedidoProducto";

export default function crearPedido(props) {
  const [ content, setContent ] = useState([]);

  const addProductRow = () => {
    setContent([...content, <ProductRow key={content.length + 1}></ProductRow>]);
  }

  return (
    <div>
      <h3>Crear Pedido</h3>
      <button onClick={addProductRow}>Agregar</button>
      <div className="cont-pedido">
        <ProductRow key="0"></ProductRow>
        { 
          content.map(row => {
            return row;
          })
        }
      </div>
    </div>
  );
}