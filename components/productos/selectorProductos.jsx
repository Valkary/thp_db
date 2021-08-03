import axios from "axios";
import { useState, useEffect } from "react";
import { Select, Text } from "@chakra-ui/react"

export default function crearPedidos(props) {
  const [ productos, setProductos ] = useState([]);
  const [ selectedProd, setSelectedProd ] = useState(1);
  const [ selectedProdName, setSelectedProdName ] = useState("");

  useEffect(() => {
    axios({
      method: 'post',
      url: '/api/productos/getAllProducts',
    }).then(data => {
      const response = data.data;
      setProductos(response);

      if(props.mostrar === "nombre") {
        setSelectedProdName(response[0].prod_key);
      } else if(props.mostrar === "clave") {
        setSelectedProdName(response[0].prod_name);
      }
    });
  }, []);

  if(props.mostrar === "nombre"){
    return (
      <div className="selector_container">
        <Select 
          variant="flushed" 
          className="prod_select"
          onChange={e => {
              setSelectedProd(e.target.value);
              setSelectedProdName(productos[e.target.value - 1].prod_key);
            }
          } 
        >
          { 
            productos.map(producto => {
              return (
                <option 
                  key={producto.prod_index} 
                  value={producto.prod_index}
                  name={producto.prod_key}
                >
                  {producto.prod_name}
                </option>
              );
            })
          }
        </Select>
        <Text className="prod_select_description">{ selectedProdName }</Text>
      </div>
    )
  } else if(props.mostrar === "clave"){
    return (
      <div className="selector_container" style={selectorStyles.selector_container}>
        <Select 
          variant="flushed" 
          className="prod_select"
          onChange={e => {
              setSelectedProd(e.target.value);
              setSelectedProdName(productos[e.target.value - 1].prod_name);
            }
          } 
        >
          { 
            productos.map(producto => {
              return (
                <option 
                  key={producto.prod_index} 
                  value={producto.prod_index}
                  name={producto.prod_name}
                >
                  {producto.prod_key}
                </option>
              );
            })
          }
        </Select>
        <Text className="prod_select_description">{ selectedProdName }</Text>
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