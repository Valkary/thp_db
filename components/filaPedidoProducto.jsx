import { useState } from "react";
import SelectorProductos from "../components/productos/selectorProductos";

export default function crearPedido() {
  const [ cantProducto, setCantProducto ] = useState(1);
  
  const handleChange = (evt) => {
    const input_value = evt.target.value.toString();
    if(input_value){
      setCantProducto(evt.target.value);
    }
  }

  return (
    <div className="row_container" style={rowStyles.row_container}>
      <SelectorProductos mostrar={"clave"}></SelectorProductos>
      <input 
        className="cant_producto" 
        type="number" 
        min="1" 
        step="1" 
        value={cantProducto} 
        onChange={evt => handleChange(evt)}
      ></input>
    </div>
  );
}

const rowStyles = {
  row_container: {
    display: "grid",
    gridTemplateColumns: "[ selector-pedido ] 85% [ input-cant ] 10%",
    gridTemplateRows: "100%",
    justifyItems: "stretch",
    width: "100%",
  },
}