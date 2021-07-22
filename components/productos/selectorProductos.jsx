import axios from "axios";
import { useState, useEffect } from "react";

export default function crearPedidos(props) {
  const [ productos, setProductos ] = useState([]);
  const [ selectedProd, setSelectedProd ] = useState(1);
  const [ selectedProdName, setSelectedProdName ] = useState();

  useEffect(() => {
    axios({
      method: 'post',
      url: '/api/productos/getAllProducts',
    }).then(data => {
      const response = data.data;
      setProductos(response);

      if(props.mostrar === "nombre") {
        setSelectedProdName(response[0].prod_name);
      } else if(props.mostrar === "clave") {
        setSelectedProdName(response[0].prod_key);
      }
    });
  }, []);

  if(props.mostrar === "nombre"){
    return (
      <div className="selector_container">
        <select onChange={e => setSelectedProd(e.target.value)} className="prod_select">
          { 
            productos.map(producto => {
              return (
                <option 
                  key={producto.prod_index} 
                  value={producto.prod_index}
                  name={producto.prod_key}
                  onClick={e => setSelectedProdName(e.target.attributes.name.value)} 
                >
                  {producto.prod_name}
                </option>
              );
            })
          }
        </select>
        <span className="prod_select_description">{ selectedProdName }</span>
      </div>
    )
  } else if(props.mostrar === "clave"){
    return (
      <div className="selector_container" style={selectorStyles.selector_container}>
        <select onChange={e => setSelectedProd(e.target.value)} className="prod_select">
          { 
            productos.map(producto => {
              return (
                <option 
                  key={producto.prod_index} 
                  value={producto.prod_index}
                  name={producto.prod_name}
                  onClick={e => setSelectedProdName(e.target.attributes.name.value)} 
                >
                  {producto.prod_key}
                </option>
              );
            })
          }
        </select>
        <span className="prod_select_description">{ selectedProdName }</span>
      </div>
    )
  }
}

const selectorStyles = {
  selector_container: {
    display: "grid",
    gridTemplateColumns: "[ selector ] 30% [ nombre ] 70%"
  }
}