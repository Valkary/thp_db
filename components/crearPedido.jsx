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

  const createOrder = () => {
    const prodSelectArr = document.querySelectorAll(".prod-select");
    const prodQuantArr = document.querySelectorAll(".cant-producto");
    const clienteSeccionadoValue = document.querySelector(".client-select").value;
    let valid = true;

    if(prodSelectArr.length === prodQuantArr.length){
      let prod_quant_arr = [];

      for(let i = 0; i < prodQuantArr.length; i++) {
        if(prodQuantArr[i].value >= 1 && valid){
          prod_quant_arr.push([prodSelectArr[i].value, prodQuantArr[i].value]);
        } else {
          prod_quant_arr = false;
          valid = false;
        }
      }

      // Generar un nuevo pedido con el cliente seleccionado y credenciales del usuario
      const numero_pedido = () => {
        axios({
          method: 'post',
          url: '/api/pedidos/nuevoPedido',
          data: {
            cliente: clienteSeccionadoValue
          }
        }).then(data => {
          const { message, order_index } = data;
          console.log(message, order_index);
        });
      }

      /*
        TODO:
          1) Crear un nuevo pedido en la tabla thp_pedidos [fecha, cliente, estado, usuario_que_aprobo]
          2) Crear registros del contenido del pedido creado en la tabla thp_pedidos_cont [producto, cantidad, pedido_index]
      */

      // Crear todos los registros del contenido del pedido
      // if(prod_quant_arr !== false) {
      //   let query_arr = [];

      //   prod_quant_arr.forEach(pair => {
      //     query_arr.push([...pair, pedido_index]);
      //   });

      //   console.log(query_arr);
      // }
    }
  }

  return (
    <div>
      <h3>Crear Pedido</h3>
      <h5>Cliente</h5>
      <div className="head-pedido">
        <ClientSelector></ClientSelector>
      </div>
      <h5>Contenido del Pedido</h5>
      <button onClick={addProductRow}>
        <PlusSvg></PlusSvg>
      </button>
      <div className="cont-pedido">
        <ProductRow key="0"></ProductRow>
        { 
          content.map(row => {
            return row;
          })
        }
      </div>
      <div className="footer-pedido">
        <h5>Subtotal:</h5>
        <h5>IVA:</h5>
        <h5>Total (Sin descuentos):</h5>
        <button id="btn-crear-pedido" onClick={createOrder}>Crear Pedido</button>
      </div>
    </div>
  );
}