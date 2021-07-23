import uuidApiKey from "uuid-apikey";

export default function generateKeys(req, res){
  return new Promise((resolve, reject) => {
    const no_keys = req.body.keys;

    let arr_keys = [];

    for(let i = 0; i < no_keys; i++){
      arr_keys.push(uuidApiKey.create());
    }

    res.status(200).json(arr_keys);
    resolve();
  });
}