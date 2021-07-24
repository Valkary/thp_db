import axios from "axios";
import { useState, useEffect } from "react";

export default function crearPedidos(props) {
  const [ trabajadores, setTrabajadores ] = useState([]);

  useEffect(() => {
    axios({
      method: 'post',
      url: '/api/trabajadores/getAllWorkers',
    }).then(data => {
      const response = data.data;
      setTrabajadores(response);
    });
  }, []);

  return (
    <>
      <select>
        { trabajadores.map(trabajador => {
          return (
            <option key={trabajador.u_index}>{trabajador.u_first_names} {trabajador.u_last_names}</option>
          );
        }) }
      </select>
    </>
  )
}