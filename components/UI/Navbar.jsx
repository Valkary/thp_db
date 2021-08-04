import { Flex, Text, Button } from "@chakra-ui/react"
import { useRouter } from "next/router";

export default function Navbar() { 
  const router = useRouter();

  return (
    <Flex direction="row" position="sticky" bottom="0">
      <Button flex={1} colorScheme="blue" variant="solid" onClick={() => router.push("/produccion")}>
        <Text>Producción</Text>
      </Button>  
      <Button flex={1} colorScheme="blue"  variant="solid" onClick={() => router.push("/pedidos")}>
        <Text>Pedidos</Text>
      </Button>  
    </Flex>
  ); 
}