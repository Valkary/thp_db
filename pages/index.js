import axios from 'axios'
import { useState ,useEffect } from "react";
import LoginPage from "../components/login";

export default function Home() {
  // const [ apiMsg, setApiMsg ] = useState("");

  // useEffect(() => {
  //   axios({
  //     method: 'post',
  //     url: '/api/example_query',
  //   }).then(data => {
  //     const dataJson = JSON.stringify(data.data);
  //     setApiMsg(dataJson);
  //   });
  // }, []);

  return (
    <>
      <LoginPage></LoginPage>
    </>
  );
}
