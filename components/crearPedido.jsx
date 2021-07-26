import { useState } from "react";
import axios from "axios";
import ProductRow from "./filaPedidoProducto";
import ClientSelector from "./clientes/selectorCliente";
import PlusSvg from "../public/svgs/plus.svg";

export default function crearPedido() {
  const [ content, setContent ] = useState([<ProductRow key="0"></ProductRow>]);
  const [ highest, setHighest ] = useState(0);

  const addProductRow = () => {
    setHighest(highest + 1);
    setContent([...content, <ProductRow key={highest + 1}></ProductRow>]);
  }

  const removeRow = (row_key) => {
    let tmp_content = content;
    for(let i = 0; i < content.length; i++) {
      if(content[i].key === row_key) {
        tmp_content.splice(i, 1);
      }
    }

    setContent([...tmp_content]);
  }

  const createOrder = async () => {
    const product_array = document.querySelectorAll(".prod_select");
    const quant_array = document.querySelectorAll(".cant_producto");
    const client_value = document.querySelector(".client_select").value;

    const orden_pedido = await generarOrdenPedido(product_array, quant_array, client_value);

    if(orden_pedido !== false){
      const { message, order_index, prod_quant_arr } = orden_pedido;
      const contenido_pedido = await generarContenidoPedido(order_index, prod_quant_arr);

      alert(`${message}\nOrden de ${contenido_pedido} productos agregado a la base de datos de manera satisfactoria`);
      setContent([]);
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
          <div className="reg_row_0" style={style_pedidos.reg_individual}>
          </div>
          { 
            content.map(row => {
              return (
                <div className={`reg_row_${row.key}`} key={`reg_row_${row.key}`} style={style_pedidos.reg_individual}>
                  { row }
                  <button key={`del_btn_${row.key}`} onClick={() => removeRow(row.key)}>X</button>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className="footer_pedido">
        <div className="cost_div" style={style_pedidos.cost_div}>
          <span></span>
          <h5>Subtotal:</h5>
          <h5>$ 0.00</h5>
        </div>
        <div className="cost_div" style={style_pedidos.cost_div}>
          <span></span>
          <h5>IVA:</h5>
          <h5>$ 0.00</h5>
        </div>
        <div className="cost_div" style={style_pedidos.cost_div}>
          <span></span>
          <h5>Total (Sin descuentos):</h5>
          <h5>$ 0.00</h5>
        </div>
        {
          content.length === 0 ?
            <button id="btn_crear_pedido" onClick={createOrder} disabled>Crear Pedido</button> :
            <button id="btn_crear_pedido" onClick={createOrder}>Crear Pedido</button>
        }
      </div>
    </div>
  );
}

async function generarOrdenPedido(product_array, quant_array, client_value) {
  return new Promise((resolve, reject) => {
    let prod_quant_arr = [];
    let valid = true;

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
  return new Promise((resolve, reject) => {
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
      resolve(data.data.affectedRows);
    });
  });
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
    width: "90%",
  },
  reg_individual: {
    display: "grid",
    gridTemplateColumns: "95% [ del-btn ] 5%",
    justifyItems: "stretch",
  },
  cost_div: {
    display: "grid",
    gridTemplateColumns: "[ blank ] 65% [ title ] 30% [ del-btn ] 5%",
    justifyItems: "stretch",
  }
}