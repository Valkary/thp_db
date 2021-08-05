export default function organizeArr(result) {
  const fetch_pedidos = result.data;

  let org_pedidos = [];
  let curr_pedido = 1;
  let curr_pedido_obj = { keys: [], quant: [], pedido: 1, cliente: "" };

  for(let i = 0; i < fetch_pedidos.length; i++){
    if(fetch_pedidos[i].no_pedido !== curr_pedido){
      if(curr_pedido_obj.keys.length > 0) {
        org_pedidos.push(curr_pedido_obj);
      }

      curr_pedido = fetch_pedidos[i].no_pedido;
      curr_pedido_obj = { keys: [], quant: [], prod_index: [] };
      curr_pedido_obj = {
        cliente: fetch_pedidos[i].cliente,
        pedido: fetch_pedidos[i].no_pedido,
        keys: [fetch_pedidos[i].llave_producto],
        prod_index: [fetch_pedidos[i].prod_index],
        quant: [fetch_pedidos[i].cantidad]
      }

      if(i === fetch_pedidos.length - 1) {
        org_pedidos.push(curr_pedido_obj);
      }
    } else {
      curr_pedido_obj = {
        ...curr_pedido_obj,
        keys: [...curr_pedido_obj.keys, fetch_pedidos[i].llave_producto],
        prod_index: [...curr_pedido_obj.prod_index, fetch_pedidos[i].prod_index],
        quant: [...curr_pedido_obj.quant, fetch_pedidos[i].cantidad]
      }

      if(i === fetch_pedidos.length - 1) {
        org_pedidos.push(curr_pedido_obj);
      }
    }
  }

  return org_pedidos;
}