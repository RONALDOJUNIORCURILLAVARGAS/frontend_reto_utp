import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { AuthLayout } from "../layout/AuthLayout";
import { loginWithUserPassword } from "../../services";
/* import { useForm } from "../../hooks"; */
const sendForm=  {
    user: "",
    password: "",
  }

export const LoginPage = () => {
 
  const { onInputChange, user, password } = useForm(sendForm);

  const dispatch = useDispatch();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();;
    loginWithUserPassword({ user, password }, dispatch);
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          name="user"
          value={user}
          onChange={onInputChange}
          className="outline-none p-3 mb-6 w-full border-2 rounded-[5px] border-gray-utp "
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={onInputChange}
          placeholder="Contraseña"
          className=" outline-none p-3 mb-6 w-full border-2 rounded-[5px] border-gray-utp "
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
  );
};
