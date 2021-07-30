import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function selectorTipoCliente() {
  const [ tiposClientes, setTiposClientes ] = useState([]);
  const apiKey = Cookies.get("api_key");

  useEffect(() => {
    axios.post("/api/clientes/getTiposClientes", { apiKey: apiKey }).then(result => {
      setTiposClientes(result.data.tipos_clientes);
    });
  }, []);

  return (
    <select name="selector_tipo_cliente" id="selector_tipo_cliente">
    {
      tiposClientes.map(tipo_cliente => {
        return <option value={tipo_cliente.tipo_index} key={tipo_cliente.tipo_index}>{tipo_cliente.tipo_nombre}</option>
      })
    }
    </select>
  )
}