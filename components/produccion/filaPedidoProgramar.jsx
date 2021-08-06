import { Tr, Td, Button, Box, VStack, Input } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useReducer } from "react";
import axios from "axios";
import organizeArr from "../../functions/organizePedidosArr";

function pedidoReducer(state, action) {
  switch(action.type) {
    case "substitute": {
      let index = 0;
      for(let i = 0; i < action.payload.length; i++) {
        if(action.initial.no_pedido === action.payload[i].pedido) index = i;
      }

      const { pedido, keys, quant, prod_index } = action.payload[index];

      const new_state = {
        no_pedido: pedido,
        llaves_productos: keys.map(key => {
          return key;
        }),
        cant_productos: quant.map(cantidad => {
          return cantidad;
        }),
        cant_programados: keys.map(() => {
          return 0;
        }),
        indexes_productos: prod_index.map(key => {
          return key;
        }),
        button_disable: true
      }

      return {
        ...new_state
      }
    }
    case "update": {
      const cantidad = action.payload
      const nuevos_programados = state.cant_programados.map((programado, index) => {
        if(index === action.index) {
          return cantidad > state.cant_productos[index] ? state.cant_productos[index] : cantidad; 
        } else {
          return programado;
        }
      });

      const new_state = {
        ...state,
        cant_programados: nuevos_programados,
      }

      return {
        ...new_state,
        button_disable: new_state.cant_programados.some(programado => programado > 0) ? false : true 
      }
    }
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
    button_disable: true
  }

  const handleChange = (evt, index) => {
    if(evt.target.value.match("[0-9\b]") || evt.target.value === "") {
      const input_value = parseInt(evt.currentTarget.value);
    
      dispatch({
        type: "update",
        index: index,
        payload: evt.currentTarget.value === "" ? "0" : input_value,
      });
    }
  }

  const createProdOrder = async () => {
    const api_order = {
      no_pedido: no_pedido,
      prod_indexes: [...indexes_productos],
      prod_quants: [...cant_programados]
    }

    const generar_orden = await axios.post("/api/produccion/generarOrden", { apiKey: api_key, api_order });
    if(generar_orden.data.success) {
      const req_prod = await axios.post("/api/pedidos/pedidosProd", { apiKey: api_key });
      const organized_array = organizeArr(req_prod);
      console.log(organized_array);
      dispatch ({
        type: "substitute",
        payload: [...organized_array],
        initial: initialState,
      })
    }

  }

  const [ state_pedido, dispatch ] = useReducer(pedidoReducer, initialState);
  const { no_pedido, llaves_productos, cant_productos, cant_programados, indexes_productos } = state_pedido;
  return (
    <Tr key={no_pedido}>
      <Td isNumeric padding="0">
        <VStack direction="column" height="100%" align="stretch">
          {
            state_pedido.cant_productos.map((cantidad, index) => {
              return <Box key={`show_quant_${index}`} height="1em">{cantidad}</Box>;
            })
          }
        </VStack>
      </Td>
      <Td>
        <VStack direction="column" height="100%" align="stretch">
        {
          llaves_productos.map(key => {
            return <div key={`${no_pedido}-${key}`}>{key}</div>;
          })
        }
        </VStack>
      </Td>
      <Td isNumeric>#{no_pedido}</Td>
      <Td isNumeric width="0.3em">
        <VStack justify="flex-end" align="flex-end">
        {
          cant_productos.map((cantidad, index) => {
            return ( 
              <Input
                type="number"
                variant="flushed" 
                key={`input_quant_${index}`} 
                min={0}
                width="100%" 
                maxHeight="1em"
                margin="0"
                padding="0"
                max={cantidad} 
                value={cant_programados[index]}
                onChange={(e) => handleChange(e, index)}
              ></Input>
            );
          })
        }
        </VStack>
      </Td>
      <Td>
        <Button 
          onClick={() => createProdOrder()} 
          minHeight="100%" 
          width="100%"
          disabled={state_pedido.button_disable}
        ><CheckIcon></CheckIcon></Button>
      </Td>
    </Tr>
  );
}