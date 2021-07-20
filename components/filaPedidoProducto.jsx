import { useState } from "react";
import SelectorProductos from "../components/productos/selectorProductos";

export default function crearPedido(props) {
  const [ cantProducto, setCantProducto ] = useState(0);
  
  return (
    <div>
      <SelectorProductos mostrar={"clave"}></SelectorProductos>
      <input type="number" min="0" step="1" value={cantProducto} onChange={evt => setCantProducto(evt.target.value)}></input>
    </div>
  );
}