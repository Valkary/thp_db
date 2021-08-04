import { useState } from "react";
import { Input } from "@chakra-ui/input";

export default function inputNumber({ max, min, val }) {
  const [ quant, setQuant ] = useState(val);

  const handleChange = (evt) => {
    if(evt.target.value.match("[0-9\b]") || evt.target.value === "") {
      const input_value = parseInt(evt.target.value);
    
      setQuant(evt.target.value === "" ? "0" : input_value);
    }
  }

  return (
    <Input
      variant="flushed" 
      type="number" 
      max={max}
      min={min} 
      value={quant} 
      onChange={evt => handleChange(evt)} 
    />
  )
}