import { useState } from "react";
import axios from "axios";
import ProductRow from "./filaPedidoProducto";
import ClientSelector from "./clientes/selectorCliente";
import Cookies from "js-cookie";
import { Text, Heading  } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Flex, Spacer } from "@chakra-ui/react"
import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { HStack, VStack } from "@chakra-ui/react"

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
    const apiKey = Cookies.get("api_key");
    const product_array = document.querySelectorAll(".prod_select");
    const quant_array = document.querySelectorAll(".cant_producto");
    const client_value = document.querySelector(".client_select").value;

    const orden_pedido = await generarOrdenPedido(product_array, quant_array, client_value, apiKey);

    if(orden_pedido !== false){
      const { message, order_index, prod_quant_arr } = orden_pedido;
      const contenido_pedido = await generarContenidoPedido(order_index, prod_quant_arr, apiKey);

      alert(`${message}\nOrden de ${contenido_pedido} productos agregado a la base de datos de manera satisfactoria`);
      setContent([]);
    } else {
      alert("Error al crear la orden!");
    }
  }

  return (
    <VStack className="pedidos_main" width="100%">
      <Heading as="h1" size="2xl" isTruncated>Crear Pedido</Heading>
      <VStack className="head_pedido">
        <Text>Cliente: </Text>
        <ClientSelector></ClientSelector>
      </VStack>
      <VStack className="cont_pedido" width="80%">
        <Heading as="h5" size="1xl" isTruncated>Contenido del Pedido</Heading>
        <Button onClick={addProductRow} leftIcon={<PlusSquareIcon></PlusSquareIcon>}></Button>
        <VStack className="registros_pedido" width="100%">
          { 
            content.map(row => {
              return (
                <HStack className={`reg_row_${row.key}`} key={`reg_row_${row.key}`} width="100%">
                  { row }
                  <Button key={`del_btn_${row.key}`} onClick={() => removeRow(row.key)} leftIcon={<DeleteIcon></DeleteIcon>}></Button>
                </HStack>
              );
            })
          }
        </VStack>
      </VStack>
      <Flex direction="column" className="footer_pedido" width="80%">
        <VStack width="40%" justify="flex-end" align="flex-end" width="100%">
          <HStack className="cost_div" justify="flex-end">
            <div>Subtotal:</div>
            <div>$ 0.00</div>
          </HStack>
          <HStack className="cost_div" justify="flex-end">
            <Text>IVA:</Text>
            <Text>$ 0.00</Text>
          </HStack>
          <HStack className="cost_div" justify="flex-end">
            <Text>Total (Sin descuentos):</Text>
            <Text>$ 0.00</Text>
          </HStack>
        </VStack>
      </Flex>
      {
        content.length === 0 ?
          <Button id="btn_crear_pedido" onClick={createOrder} disabled>Crear Pedido</Button> :
          <Button id="btn_crear_pedido" onClick={createOrder}>Crear Pedido</Button>
      }
    </VStack>
  );
}

async function generarOrdenPedido(product_array, quant_array, client_value, apiKey) {
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
            cliente: client_value,
            apiKey: apiKey
          }
        }).then(data => {
          const { message, order_index } = data.data;
          resolve({ message, order_index, prod_quant_arr });
        });
      }
    }
  });
}

async function generarContenidoPedido(pedido_index, prod_quant_arr, apiKey){
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
        contenido: query_arr,
        apiKey: apiKey
      }
    }).then(data => {
      resolve(data.data.affectedRows);
    });
  });
}