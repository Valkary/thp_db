import Pedidos from "../components/produccion/pedidosProduccion";
import PedidosCodigo from "../components/produccion/pedidosPorCodigo";
import ProgramacionProduccion from "../components/produccion/programacionProduccion";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/UI/Navbar";
import { Heading, Flex } from "@chakra-ui/react";

function organizeArr(result) {
  const fetch_pedidos = result.data;

  let org_pedidos = [];
  let curr_pedido = 1;
  let curr_pedido_obj = { keys: [], quant: [], pedido: 1, cliente: "" };

  for(let i = 0; i < fetch_pedidos.length; i++){
    if(fetch_pedidos[i].no_pedido !== curr_pedido){
      if(curr_pedido_obj.keys.length > 0) {
        org_pedidos.push(curr_pedido_obj);
      }

      curr_pedido = fetch_pedidos[i].no_pedido;
      curr_pedido_obj = { keys: [], quant: [] };
      curr_pedido_obj = {
        cliente: fetch_pedidos[i].cliente,
        pedido: fetch_pedidos[i].no_pedido,
        keys: [fetch_pedidos[i].llave_producto],
        quant: [fetch_pedidos[i].cantidad]
      }

      if(i === fetch_pedidos.length - 1) {
        org_pedidos.push(curr_pedido_obj);
      }
    } else {
      curr_pedido_obj = {
        ...curr_pedido_obj,
        keys: [...curr_pedido_obj.keys, fetch_pedidos[i].llave_producto],
        quant: [...curr_pedido_obj.quant, fetch_pedidos[i].cantidad]
      }

      if(i === fetch_pedidos.length - 1) {
        org_pedidos.push(curr_pedido_obj);
      }
    }
  }

  return org_pedidos;
}

export default function produccion() {
  const apiKey = Cookies.get("api_key");

  const [ pedidos, setPedidos ] = useState([]);
  const [ pedidosProd, setPedidosProd ] = useState([]);

  useEffect(() => {
    axios.post("/api/pedidos/requestPedidos", { apiKey: apiKey }).then(result => {
      setPedidos(...pedidos, organizeArr(result));
    });

    axios.post("/api/pedidos/pedidosProd", { apiKey: apiKey }).then(result => {
      setPedidosProd(...pedidosProd, organizeArr(result));
    });
  }, []);

  return (
    <Flex 
      direction="column"
      width="100%"
    >
      <Flex
        direction="column"
        width="90%"
        justify="center"
        align="center"
      >
        <Heading>Produccion</Heading>
        <Pedidos api_key={apiKey} pedidos={pedidos}></Pedidos>
        <PedidosCodigo api_key={apiKey}></PedidosCodigo>
        <ProgramacionProduccion api_key={apiKey} pedidos={pedidosProd}></ProgramacionProduccion>
      </Flex>
      <Navbar></Navbar>
    </Flex>
  );
}