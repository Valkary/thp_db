import axios from "axios";
import SelectorTipoCliente from "./selectorTipoCliente";
import { useState } from "react";
import PlusSVG from "../../public/svgs/plus.svg";
import Cookies from "js-cookie";

export default function crearCliente() {
  const [ nombreCliente, setNombreCliente ] = useState("");
  const [ limiteCredito, setLimiteCredito ] = useState(0);

  const createClient = async () => {
    const apiKey = Cookies.get("api_key");
    const tipo_cliente = document.querySelector("#selector_tipo_cliente").value;

    const data = {
      apiKey: apiKey,
      cliente_name: nombreCliente,
      cliente_tipo: tipo_cliente,
      cliente_limite_credito: limiteCredito
    }

    axios.post("/api/clientes/createCliente", data).then(result => {
      if(result.data.success) alert(`Cliente creado con éxito!`);
    });
  }

  return (
    <div>
      <h5>Agregar nuevo cliente</h5>
      <div>
        <input placeholder="Nombre del cliente" onChange={e => setNombreCliente(e.target.value)} value={nombreCliente}></input>
        <SelectorTipoCliente></SelectorTipoCliente>
        <input placeholder="Límite de crédito" onChange={e => setLimiteCredito(e.target.value)} value={limiteCredito}></input>
        <button onClick={createClient}><PlusSVG></PlusSVG></button>
      </div>
    </div>
  )
}