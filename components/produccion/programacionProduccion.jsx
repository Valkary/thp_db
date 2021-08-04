import InputNumber from "../utils/inputNumber";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Heading, Flex, Box, VStack } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

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
            pedidos.map(pedido => {
              return (
                <Tr key={pedido.pedido}>
                  <Td isNumeric padding="0">
                    <VStack direction="column" height="100%">
                      {
                        pedido.quant.map((cantidad, index) => {
                          return <Box key={`show_quant_${index}`} height="100%">{cantidad}</Box>;
                        })
                      }
                    </VStack>
                  </Td>
                  <Td>
                    {
                      pedido.keys.map(key => {
                        return <div>{key}</div>;
                      })
                    }
                  </Td>
                  <Td isNumeric>{pedido.pedido}</Td>
                  <Td isNumeric>
                    {
                      pedido.quant.map((cantidad, index) => {
                        return ( 
                          <div>
                            <InputNumber key={`input_quant_${index}`} min={0} max={cantidad} val={0}></InputNumber>
                          </div>
                        );
                      })
                    }
                  </Td>
                  <Td>
                    <Button><CheckIcon></CheckIcon></Button>
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