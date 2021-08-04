import { Tr, Td, Button, Box, VStack, Input } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useReducer } from "react";
import axios from "axios";

function pedidoReducer(state, action) {
  const cantidad = action.payload
  const nuevos_programados = state.cant_programados.map((programado, index) => {
    return index === action.index ? cantidad : programado;
  });

  return {
    ...state,
    cant_programados: nuevos_programados,
  }
}

export default function filaPedidoProgramar({ api_key, pedido }) {
  const initialState = {
    no_pedido: pedido.pedido,
    llaves_productos: pedido.keys.map(key => {
      return key;
    }),
    cant_productos: pedido.quant.map(cantidad => {
      return cantidad;
    }),
    cant_programados: pedido.quant.map(() => {
      return 0;
    }),
    indexes_productos: pedido.prod_index.map(key => {
      return key;
    }),
  }

  console.log(initialState);

  const handleChange = (evt, index) => {
    if(evt.target.value.match("[0-9\b]") || evt.target.value === "") {
      const input_value = parseInt(evt.currentTarget.value);
    
      dispatch({
        index: index,
        payload: evt.currentTarget.value === "" ? "0" : input_value,
      });
    }
  }

  const createProdOrder = () => {
    const api_order = {
      no_pedido: no_pedido,
      prod_indexes: [...indexes_productos],
      prod_quants: [...cant_programados]
    }

    axios.post("/api/produccion/generarOrden", { apiKey: api_key, api_order }).then(result => {

    });
  }

  const [ state_pedido, dispatch ] = useReducer(pedidoReducer, initialState);
  const { no_pedido, llaves_productos, cant_productos, cant_programados, indexes_productos } = state_pedido;
  return (
    <Tr key={no_pedido}>
      <Td isNumeric padding="0">
        <VStack direction="column" height="100%">
          {
            state_pedido.cant_productos.map((cantidad, index) => {
              return <Box key={`show_quant_${index}`} height="100%">{cantidad}</Box>;
            })
          }
        </VStack>
      </Td>
      <Td>
        {
          llaves_productos.map(key => {
            return <div key={`${no_pedido}-${key}`}>{key}</div>;
          })
        }
      </Td>
      <Td isNumeric>{no_pedido}</Td>
      <Td isNumeric>
        {
          cant_productos.map((cantidad, index) => {
            return ( 
              <Input
                type="number"
                variant="flushed" 
                key={`input_quant_${index}`} 
                min={0} 
                max={cantidad} 
                value={cant_programados[index]}
                onChange={(e) => handleChange(e, index)}
              ></Input>
            );
          })
        }
      </Td>
      <Td>
        <Button onClick={e => createProdOrder()}><CheckIcon></CheckIcon></Button>
      </Td>
    </Tr>
  );
}