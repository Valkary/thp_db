import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function loginPage(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
      const { credentials } = data.data;

      if(credentials === null) {
        console.log("Inicio de sesión incorrecto");
      } else {
        Cookies.set("api_key", credentials.apiKey, { expires: 1 });
        axios.post("/api/verifyToken", { apiKey: Cookies.get("api_key") }).then(result => {
          if(result.data.verified) {
            router.push("/pedidos");
            // router.push("/produccion");
          } else {
            alert("Yo que se... no te verificaste");
          }
        });
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