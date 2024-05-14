import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { login, logout } from "../store/auth";
import Cookies from "js-cookie";
import { getTeacherInformation } from "../services";

export const useCheckAuth = () => {
  const { status, user_rol } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const userDataJSON = Cookies.get("session");
    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);

      dispatch(login(userData));
      getTeacherInformation(
        { user_id: userData.user_id, user_token: userData.user_token },
        dispatch
      );
    } else {
      dispatch(logout({ errorMessage: null }));
    }
  }, []);

  return { status, user_rol };
};
