import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Heading } from "@chakra-ui/react";

export default function pedidosPorCodigo({api_key}) {
  const [ pedidos, setPedidos ] = useState([]);

  useEffect(() => {
    axios.post("/api/pedidos/pedidosPorCodigo", { apiKey: api_key }).then(result => {
      const fetch_pedidos = result.data;
      setPedidos(...pedidos, fetch_pedidos);
    });
  }, []);

  return (
    <div>
      <Heading>Pedidos Por Surtir</Heading>
      <Table variant="striped" colorScheme="orange" size="sm">
        <Thead>
          <Tr>
            <Th colSpan={5}>Listado de pedidos por codigo</Th>
          </Tr>
          <Tr>
            <Th isNumeric>Total</Th>
            <Th>Codigo</Th>
            <Th isNumeric>Producidos</Th>
            <Th isNumeric>Faltantes</Th>
            <Th>Completado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            pedidos.map((pedido, index) => {
              return (
                <Tr key={index}>
                  <Td isNumeric>{pedido.cantidad}</Td>
                  <Td>{pedido.llave_producto}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>
                    ✅/❌
                  </Td>
                </Tr>
              );
            })
          }
        </Tbody>
      </Table>
    </div>
  );
}