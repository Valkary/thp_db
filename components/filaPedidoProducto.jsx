import { useState } from "react";
import SelectorProductos from "../components/productos/selectorProductos";

export default function crearPedido(props) {
  const [ cantProducto, setCantProducto ] = useState(1);
  
  return (
    <div>
      <SelectorProductos mostrar={"clave"}></SelectorProductos>
      <input className="cant-producto" type="number" min="1" step="1" value={cantProducto} value={cantProducto} onChange={evt => setCantProducto(evt.target.value)}></input>
    </div>
  );
}