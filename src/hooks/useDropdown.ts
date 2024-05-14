import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

interface DropdownFilter {
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
    reset: () => void;
  }
  
  export const useDropdown = (initialValue: string): DropdownFilter => {
    const [value, setValue] = useState<string>(initialValue);
  
    const handleChange = (event: SelectChangeEvent<string>) => {
      setValue(event.target.value);
    };
    const reset = () => {
      setValue(initialValue); 
  };
  
    return { value, onChange: handleChange, reset };
  };
  