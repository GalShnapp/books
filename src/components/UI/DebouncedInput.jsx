import Input from "./Input";
import { useState, useEffect } from "react";



const DebounceInput = () => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setDebouncedInputValue(inputValue);
      }, 500);
      return () => clearTimeout(timeoutId);
    }, [inputValue]);
  
    return <input type="text" value={inputValue} onChange={handleInputChange} />;
  };

export default function DebouncedInput ({onChange, ...rest}) {
    // <Input label='Full Name' id="full-name" type="text" />
    const debouncedExecution = useDebounce(() => {
        // send request to the backend
        // access to latest state here
        console.log(value);
        onChange();
      });

    return <Input onChange={debouncedExecution} {...rest}/>
}