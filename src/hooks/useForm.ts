import { useEffect, useState,ChangeEvent } from "react";

interface FormState {
  [key: string]: string;
}


export const useForm = (initialForm: FormState = {}) => {
  const [formState, setFormState] = useState<FormState>(initialForm);

  

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    user: formState["user"]  || "",
    password: formState["password"] ,
    onInputChange,
    onResetForm,
  };
};
