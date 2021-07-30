import { useReducer } from "react";
import PlusSVG from "../../public/svgs/plus.svg";
import axios from "axios";
import Cookies from "js-cookie";

function createProductReducer(state, action) {
  switch(action.type) {
    case "key": {
      return {
        ...state,
        product_key: action.payload.toUpperCase(),
        btn_state: action.payload !== "" && state.product_description !== "" && state.product_price > 0 ? false : true
      }
    }
    case "description": {
      return {
        ...state,
        product_description: action.payload,
        btn_state: state.product_key !== "" && action.payload !== "" && state.product_price > 0 ? false : true
      }
    }
    case "price": {
      return {
        ...state,
        product_price: action.payload,
        btn_state: state.product_key !== "" && state.product_description !== "" && action.payload > 0 ? false : true
      }
    }
  }
}

export default function createProduct() {
  const [state, dispatch] = useReducer(createProductReducer, { product_key: "", product_description: "", product_price: 0, btn_state: true });

  const createProduct = async () => {
    const apiKey = Cookies.get("api_key");
    const { product_key, product_description, product_price } = state;

    axios.post("/api/productos/createProduct", { product_key: product_key, product_description: product_description, product_price: product_price, apiKey: apiKey }).then(result => {
      if(result.data.success) {
        alert(`Agregado${result.data.affectedRows > 1 ? "s" : ""} con exito ${result.data.affectedRows} producto${result.data.affectedRows > 1 ? "s" : ""} a la base de datos`);
      } else {
        alert("Error al agregar el producto a la base de datos!");
      }
    })
  }

  return (
    <div>
      <h5>Agregar nuevo producto</h5>
      <div>
        <input 
          type="text" 
          name="product_key" 
          id="product_key" 
          placeholder="Clave"
          value={state.product_key} 
          onChange={e => dispatch({
            type: "key",
            payload: e.currentTarget.value
          })}
        />
        <input 
          type="text" 
          name="product_description" 
          id="product_description" 
          placeholder="Descripcion"
          value={state.product_description}
          onChange={e => dispatch({
            type: "description",
            payload: e.currentTarget.value
          })} 
        />
        <input 
          type="number" 
          name="product_price" 
          id="product_price" 
          placeholder="Precio" 
          value={state.product_price}
          onChange={e => dispatch({
            type: "price",
            payload: e.currentTarget.value
          })} 
        />
        <button onClick={createProduct} disabled={state.btn_state}><PlusSVG></PlusSVG></button>
      </div>
    </div>
  )
}