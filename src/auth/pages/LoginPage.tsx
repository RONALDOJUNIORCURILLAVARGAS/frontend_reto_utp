import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { AuthLayout } from "../layout/AuthLayout";
import { loginWithUserPassword } from "../../services";
import { useState } from "react";
import { Toaster, toast } from "sonner";
interface ValidateFormLogin {
  user: boolean;
  password: boolean;
}
const initialValidateForm: ValidateFormLogin = {
  user: false,
  password: false,
};
const sendForm = {
  user: "",
  password: "",
};

export const LoginPage = () => {
  const { onInputChange, user, password } = useForm(sendForm);
  const [erroValidateForm, setErrorValidateForm] =
    useState<ValidateFormLogin>(initialValidateForm);

  const dispatch = useDispatch();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateInput()) {
      toast.warning("Completar los campos marcados en rojo");
      return;
    }
    loginWithUserPassword({ user, password }, dispatch).then((state) => {
      if (!state) toast.error("Usuario y/o contraseña incorrecta");
    });

    return;
  };
  //Buscando si algun input esta vacio
  const validateInput = () => {
    setErrorValidateForm({
      user: user.trim().length === 0,
      password: password.trim().length === 0,
    });
    //setErrorFile(!selectedFile);
    return user.trim().length === 0 || password.trim().length === 0;
  };

  return (
    <>
      <AuthLayout title="Login">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            name="user"
            value={user}
            onChange={onInputChange}
            className={`outline-none p-3 mb-6 w-full border-2 rounded-[5px] border-gray-utp ${
              erroValidateForm.user ? "border-red-500 border-2" : ""
            }`}
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
            placeholder="Contraseña"
            className={`outline-none p-3 mb-6 w-full border-2 rounded-[5px] border-gray-utp ${
              erroValidateForm.password ? "border-red-500 border-2" : ""
            }`}
          />

          <div className="text-center lg:text-left">
            <button
              type="submit"
              className="inline-block rounded-[5px] w-full  bg-red-utp px-7 pb-2 pt-3 text-[16px]   leading-normal text-white font-bold shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2  "
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </AuthLayout>
      <Toaster richColors />
    </>
  );
};
