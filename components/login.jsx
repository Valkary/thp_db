import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Flex, Heading, Text, Button, Input } from "@chakra-ui/react";
import { ArrowForwardIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Image from 'next/image';
import LogoTHP from "../public/img/logo_thp_color.jpg";

export default function loginPage(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [ showPwd, setShowPwd ] = useState(false);

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
          } else {
            alert("Yo que se... no te verificaste");
          }
        });
      }
    });
  }

  const hide_show_pwd = () => {
    showPwd ? setShowPwd(false) : setShowPwd(true);
  }

  return (
    <Flex 
      height="100vh" 
      width="100vw" 
      direction="column"
      justify="center" 
      align="center"
      backgroundColor="gray.200"
    >
      <Flex 
        className="wrapper" 
        bg="orange.500" 
        p="2em 1em"
        borderRadius="0.5em"
        direction="column"
      >
        <Heading as="h5" size="1x1" fontSize="xl" color="white" isTruncated>Sistema de Control de Producción THP</Heading>
        <Flex justify="center" pt="0.5em" pb="0.5em">
          <Image width="100px" height="100px" src={LogoTHP} alt="Logo THP"></Image>
        </Flex>
        <Flex className="login-wrapper" width="90%" direction="column" justify="center">
          <form onSubmit={handleSubmit} width="100%">
            <Flex direction="column" justify="flex-start" width="100%">
              <Text fontSize="md" color="white" width="100%">Nombre de usuario</Text>
              <Input 
                variant="flushed" 
                type="text" 
                bg="white" 
                width="100%" 
                placeholder="nombre de usuario"
                pl="0.25em"
                onChange={e => setUsername(e.target.value)}
              />
            </Flex>
            <Flex direction="column" justify="flex-start">
              <Text fontSize="md" color="white">Contraseña</Text>
              <Flex direction="row" bg="white" >
                <Input 
                  variant="flushed" 
                  type={showPwd ? "text" : "password"} 
                  width="100%"
                  placeholder="contraseña" 
                  pl="0.25em"
                  onChange={e => setPassword(e.target.value)}
                />
                {
                  showPwd ? 
                    <Button 
                      bg="white" 
                      onClick={() => hide_show_pwd()}
                    >
                      <ViewOffIcon></ViewOffIcon>
                    </Button> :
                    <Button 
                      bg="white" 
                      onClick={() => hide_show_pwd()}
                    >
                      <ViewIcon></ViewIcon>
                    </Button>
                }
              </Flex>
            </Flex>
            <Flex direction="row" justify="flex-end">
              <Button type="submit" value="Submit" bg="gray.300" mt="1.5em" rightIcon={<ArrowForwardIcon></ArrowForwardIcon>}>Entrar</Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  )
}