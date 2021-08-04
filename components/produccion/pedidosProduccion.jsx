import { Table, Thead, Tbody, Tr, Th, Td, Heading } from "@chakra-ui/react";

export default function direccionProduccion({api_key, pedidos}) {
  return (
    <div>
      <Heading>Pedidos</Heading>
      <Table variant="striped" colorScheme="orange" size="sm">
        <Thead>
          <Tr>
            <Th colSpan={4}>Consulta pedidos</Th>
          </Tr>
          <Tr>
            <Th isNumeric>Cantidad</Th>
            <Th>Código</Th>
            <Th isNumeric>Pedido</Th>
            <Th>Cliente</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            pedidos.map(pedido => {
              return (
                <Tr key={pedido.pedido}>
                  <Td isNumeric>
                    {
                      pedido.quant.map(cantidad => {
                        return <div>{cantidad}</div>;
                      })
                    }
                  </Td>
                  <Td>
                    {
                      pedido.keys.map(key => {
                        return <div>{key}</div>;
                      })
                    }
                  </Td>
                  <Td isNumeric>{pedido.pedido}</Td>
                  <Td>{pedido.cliente}</Td>
                </Tr>
              );
            })
          }
        </Tbody>
      </Table>
    </div>
  );
}