import { useState } from "react";
import axios from "axios";

export default function loginPage(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios({
      method: 'post',
      url: '/api/login',
      data: {
        username: username,
        password: password
      }
    }).then(data => {
      const response = data.data[0] ?? data;
      const keys = Object.keys(response);

      if(keys.includes("u_name")){
        // const { u_name, u_first_names, u_last_names, u_security_lvl } = response;
        // alert(`Credentials ${u_name}, ${u_first_names}, ${u_last_names}, ${u_security_lvl}`);
        // TODO: cambiar a que no sea con la sesion. Que se guarde en el servidor
        sessionStorage.setItem("credentials", JSON.stringify(response));
        // window.location("/pedidos/");
      } else {
        alert(`Error de inicio de sesion: ${response.data.message}`);
      }
    });
  }

  return (
    <>
      <div className="wrapper">
      <h1>Sistema de Control de Producción THP</h1>
      <div className="login-wrapper">
        <h1>Inicie Sesion</h1>
        <form onSubmit={handleSubmit}>
          <label>
              <p>Nombre de usuario</p>
              <input type="text" onChange={e => setUsername(e.target.value)}/>
          </label>
          <label>
              <p>Contraseña</p>
              <input type="password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <div>
              <button type="submit" value="Submit">Submit</button>
          </div>
        </form>
        </div>
      </div>
    </>
  )
}