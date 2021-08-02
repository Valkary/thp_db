import { useState } from "react";
import SelectorProductos from "./productos/selectorProductos";

export default function crearPedido() {
  const [ cantProducto, setCantProducto ] = useState(1);
  
  const handleChange = (evt) => {
    if(evt.target.value.match("[0-9\b]") || evt.target.value === "") {
      const input_value = parseInt(evt.target.value);
      console.log(input_value);
    
      setCantProducto(evt.target.value === "" ? "0" : input_value);
    }
  }

  return (
    <div className="row_container" style={rowStyles.row_container}>
      <SelectorProductos mostrar={"clave"}></SelectorProductos>
      <input 
        className="cant_producto"
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