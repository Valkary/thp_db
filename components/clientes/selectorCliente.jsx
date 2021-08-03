import axios from "axios";
import { useState, useEffect } from "react";
import { Select } from "@chakra-ui/select";

export default function crearPedidos(props) {
  const [ clientes, setClientes ] = useState([]);

  useEffect(() => {
    axios({
      method: 'post',
      url: '/api/clientes/getAllClients',
    }).then(data => {
      const response = data.data;
      setClientes(response);
    });
  }, []);

  return (
    <>
      <Select variant="flushed" className="client_select">
        { clientes.map(cliente => {
          return (
            <option key={cliente.cliente_index} value={cliente.cliente_index}>{cliente.cliente_name}</option>
          );
        }) }
      </Select>
    </>
  )
}