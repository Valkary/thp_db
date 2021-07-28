import { conn } from "../../functions/remoteConnection";

export default function testConnection(req, res){
  return new Promise(async (resolve, reject) => {
    console.log(await conn);

    if(typeof await conn === "undefined") {
      res.status(200).json({working: false});
      resolve()
    } else {
      res.status(200).json({working: true});
      resolve();
    }
  });
}