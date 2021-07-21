import axios from "axios";
import { useState, useEffect } from "react";

export default function crearPedidos(props) {
  const [ productos, setProductos ] = useState([]);
  const [ selectedProd, setSelectedProd ] = useState(1);

  useEffect(() => {
    axios({
      method: 'post',
      url: '/api/productos/getAllProducts',
    }).then(data => {
      const response = data.data;
      setProductos(response);
    });
  }, []);

  return (
      <select onChange={e => setSelectedProd(e.target.value)} className="prod-select">
        { productos.map(producto => {
          if(props.mostrar === "nombre"){
            return (
              <option 
                key={producto.prod_index} 
                value={producto.prod_index} 
              >
                {producto.prod_name}
              </option>
            );
          } else if(props.mostrar === "clave"){
            return (
              <option 
                key={producto.prod_index} 
                value={producto.prod_index} 
              >
                {producto.prod_key}
              </option>
            );
          }
        }) }
      </select>
  );
}