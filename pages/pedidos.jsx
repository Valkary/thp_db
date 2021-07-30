import CrearPedido from "../components/crearPedido";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import CreateClient from "../components/clientes/createCliente"

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const apiKey = Cookies.get("api_key");

    if(typeof apiKey !== "undefined") {
      axios.post("/api/verifyToken", { apiKey: apiKey }).then((result => {
        if(!result.data.verified){
          router.push("/");
        }
      }));
    } else {
      router.push("/");
    }
  }, []);

  return (
    <>
      <CrearPedido></CrearPedido>
      <CreateClient></CreateClient>
    </>
  );
}