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
      const { credentials, api_token } = data.data;

      if(credentials === null || api_token === null) {
        console.log("Inicio de sesión incorrecto");
      } else {
        console.log(credentials, api_token);
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