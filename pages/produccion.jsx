import Pedidos from "../components/produccion/pedidosProduccion";
import PedidosCodigo from "../components/produccion/pedidosPorCodigo";
import ProgramacionProduccion from "../components/produccion/programacionProduccion";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/UI/Navbar";
import { Heading, Flex } from "@chakra-ui/react";
import organizeArr from "../functions/organizePedidosArr";

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