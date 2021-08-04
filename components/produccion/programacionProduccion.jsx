import { Table, Thead, Tbody, Tr, Th, Td, Button, Heading, Flex, Box, VStack } from "@chakra-ui/react";
import FilaPedidoProgramar from "./filaPedidoProgramar";

export default function direccionProduccion({api_key, pedidos}) {
  return (
    <div>
      <Heading>Producción por Programar</Heading>
      <Table variant="striped" colorScheme="orange" size="sm">
        <Thead>
          <Tr>
            <Th colSpan={5}>Programación Producción</Th>
          </Tr>
          <Tr>
            <Th isNumeric>Cantidad</Th>
            <Th>Código</Th>
            <Th isNumeric>Pedido</Th>
            <Th isNumeric>Programar</Th>
            <Th>Aceptar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            pedidos.map((pedido) => {
              return (
                <FilaPedidoProgramar pedido={pedido} api_key={api_key}></FilaPedidoProgramar>
              );
            })
          }
        </Tbody>
      </Table>
    </div>
  );
}