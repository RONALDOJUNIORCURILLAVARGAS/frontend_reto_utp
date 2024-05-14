import { useEffect, useState } from "react";

interface FormState {
  [key: string]: string;
}

export const useForm = (initialForm: FormState = {}) => {
  const [formState, setFormState] = useState<FormState>(initialForm);

  useEffect(() => {
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
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
    onInputChange,
    onResetForm,
  };
};
