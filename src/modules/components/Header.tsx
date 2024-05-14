import {
  faChalkboardTeacher,
  faRightFromBracket,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../store/auth";
import Cookies from 'js-cookie';
export const Header = () => {
  const { user_rol, user_firstname, user_lastname } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const SignOff = () => {
    dispatch(logout({ errorMessage: null }));
    Cookies.remove('session');
  };

  const getIcon = (): JSX.Element => {
    return user_rol === "coordinador" ? (
      <FontAwesomeIcon icon={faUserTie} className="h-[45px]" />
    ) : (
      <FontAwesomeIcon icon={faChalkboardTeacher} className="h-[45px]" />
    );
  };
  return (
    <div className="flex  justify-between gap-4 items-center pt-[25px] md:pt-[50px]">
      <div className="flex gap-4 items-center">
        {getIcon()}
        <div className="flex flex-col ">
          <span className="capitalize font-semibold text-gray-600 text-[18px]">{`${user_firstname} ${user_lastname}`}</span>
          <span className="capitalize font-semibold text-gray-400 text-[14px]">
            {user_rol}
          </span>
        </div>
      </div>
      <button
        className="flex items-center hover:text-red-utp"
        onClick={SignOff}
      >
        <FontAwesomeIcon className="h-[45px]" icon={faRightFromBracket} />
      </button>
    </div>
  );
};
