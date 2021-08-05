import { Table, Thead, Tbody, Tr, Th, Heading, Flex } from "@chakra-ui/react";
import FilaPedidoProgramar from "./filaPedidoProgramar";

export default function direccionProduccion({api_key, pedidos}) {
  return (
    <div>
    <Flex width="100%" direction="column" justify="center" align="center">
      <Heading>Producción por Programar</Heading>
      <Table variant="striped" colorScheme="orange" size="sm">
        <Thead>
          <Tr>
            <Th colSpan={5}>Programación Producción</Th>
          </Tr>
          <Tr>
            <Th isNumeric>Cantidad</Th>
            <Th>Código</Th>
            <Th isNumeric>No. Pedido</Th>
            <Th isNumeric>Programar</Th>
            <Th>Aceptar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            pedidos.map((pedido, index) => {
              return (
                <FilaPedidoProgramar pedido={pedido} api_key={api_key} key={`pedido_row_${index}`}></FilaPedidoProgramar>
              );
            })
          }
        </Tbody>
      </Table>
    </Flex>
    </div>
  );
}