import { useState } from "react";
import axios from "axios";
import ProductRow from "../components/filaPedidoProducto";
import ClientSelector from "../components/clientes/selectorCliente";
import PlusSvg from "../public/svgs/plus.svg";

export default function crearPedido() {
  const [ content, setContent ] = useState([]);

  const addProductRow = () => {
    setContent([...content, <ProductRow key={content.length + 1}></ProductRow>]);
  }

  const createOrder = async () => {
    const product_array = document.querySelectorAll(".prod_select");
    const quant_array = document.querySelectorAll(".cant_producto");
    const client_value = document.querySelector(".client_select").value;

    const orden_pedido = await generarOrdenPedido(product_array, quant_array, client_value);

    if(orden_pedido !== false){
      const { message, order_index, prod_quant_arr } = orden_pedido;
      const contenido_pedido = await generarContenidoPedido(order_index, prod_quant_arr);

      console.log(contenido_pedido);
    } else {
      alert("Error al crear la orden!");
    }
  }

  return (
    <div className="pedidos_main" style={style_pedidos.pedidos_main}>
      <h3>Crear Pedido</h3>
      <div className="head_pedido" style={style_pedidos.pedidos_head}>
        <h5>Cliente: </h5>
        <ClientSelector></ClientSelector>
      </div>
      <div className="cont_pedido" style={style_pedidos.pedidos_cont}>
        <h5>Contenido del Pedido</h5>
        <button onClick={addProductRow}>
          <PlusSvg></PlusSvg>
        </button>
        <div className="registros_pedido" style={style_pedidos.pedidos_reg}>
          <ProductRow key="0"></ProductRow>
          { 
            content.map(row => {
              return row;
            })
          }
        </div>
      </div>
      <div className="footer_pedido">
        <h5>Subtotal:</h5>
        <h5>IVA:</h5>
        <h5>Total (Sin descuentos):</h5>
        <button id="btn_crear_pedido" onClick={createOrder}>Crear Pedido</button>
      </div>
    </div>
  );
}

async function generarOrdenPedido(product_array, quant_array, client_value) {
  return new Promise((resolve, reject) => {
    let prod_quant_arr = [];
    let valid = true;
    console.log(product_array.length , quant_array.length);
    if(product_array.length === quant_array.length){  
      for(let i = 0; i < quant_array.length; i++) {
        if(parseInt(quant_array[i].value, 10) !== NaN && quant_array[i].value >= 1 && valid){
          prod_quant_arr.push([parseInt(product_array[i].value, 10), parseInt(quant_array[i].value, 10)]);
        } else {
          valid = false;
          resolve(false);
        }
      }
      
      // Generar un nuevo pedido con el cliente seleccionado y credenciales del usuario
      if(valid){
        axios({
          method: 'post',
          url: '/api/pedidos/nuevoPedido',
          data: {
            cliente: client_value
          }
        }).then(data => {
          const { message, order_index } = data.data;
          resolve({ message, order_index, prod_quant_arr });
        });
      }
    }
  });
}

async function generarContenidoPedido(pedido_index, prod_quant_arr){
  // Crear todos los registros del contenido del pedido
  let query_arr = [];

  prod_quant_arr.forEach(pair => {
    query_arr.push([...pair, pedido_index]);
  });

  axios({
    method: 'post',
    url: '/api/pedidos/agregarContPedido',
    data: {
      contenido: query_arr
    }
  }).then(data => {
    console.log(data.data);
  });

  return true;
}

const style_pedidos = {
  pedidos_main: {
    display: "flex",
    width: "100%",
    flexFlow: "column nowrap",
    justifyContent: "center"
  },
  pedidos_head: {
    display: "flex",
    width: "100%",
    flexFlow: "row nowrap",
    alignItems: "flex-start",
    height: "fit-content"
  },
  pedidos_cont: {
    display: "grid",
    justifyItems: "center",
    width: "90%",
  },
  pedidos_reg: {
    width: "90%"
  }
}