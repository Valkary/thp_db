import { conn } from "../../functions/remoteConnection";

export default function testConnection(req, res){
  return new Promise(async (resolve, reject) => {
    console.log(await conn);

    res.status(200).json({ working: true });
    resolve();
  });
}