import { checkingCredentials, login, logout } from "../store/auth";
import { Dispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setCourses, setStudents } from "../store/teacher";

interface login {
  user: string;
  password: string;
}

interface sendChangeNote {
  user_id: string;
  file: File;
  nota_id: string;
  nota_nueva: string;
  user_token: string;
}

export const loginWithUserPassword = async (
  { user, password }: login,
  dispatch: Dispatch
) => {
  try {
    dispatch(checkingCredentials());
    const response = await fetch("http://localhost:4001/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        const payload = data.data;
        Cookies.set("session", JSON.stringify(payload), { expires: 60 });
        dispatch(login(payload));
        if (payload.user_rol === "coordinador") {
        } else {
          getTeacherInformation(
            { user_id: payload.user_id, user_token: payload.user_token },
            dispatch
          );
        }
      } else {
        dispatch(logout({ errorMessage: data.message }));
      }
    } else {
      dispatch(logout({ errorMessage: "Error de credenciales" }));
    }
  } catch (error: any) {
    return dispatch(logout({ errorMessage: error.message }));
  }
};

export const getTeacherInformation = async (
  { user_id, user_token }: { user_id: string; user_token: string },
  dispatch: Dispatch
) => {
  try {
    const response = await fetch(
      `http://localhost:4001/api/noteChanges/techaerinformation/${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user_token,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        const payload = data.data;
        dispatch(setCourses(payload));
      }
    }

    return {
      ok: true,
    };
  } catch (error: any) {
    return { ok: false, errorMessage: error.message };
  }
};

export const getSearchFilterTeacher = async (
  {
    course,
    type_evaluation,
    user_token,
  }: { course: string; type_evaluation: string; user_token: string },
  dispatch: Dispatch
) => {
  try {
    const response = await fetch(
      `http://localhost:4001/api/noteChanges/filters?course=${course}&type_evaluation=${type_evaluation}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user_token,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        const payload = data.data;
        dispatch(setStudents(payload));
      }
    }
  } catch (error: any) {
    return { ok: false, errorMessage: error.message };
  }
};
export const sendChangeNotes = async ({
  user_id,
  file,
  nota_id,
  nota_nueva,
  user_token,
}: sendChangeNote) => {
  try {
    const formData = new FormData();

    formData.append("user_id", user_id);
    formData.append("file", file);
    formData.append("nota_id", nota_id);
    formData.append("nota_nueva", nota_nueva);
    console.log("formdata", formData);
    const response = await fetch(
      `http://localhost:4001/api/noteChanges/sendChangeNotes`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + user_token,
        },
        body: formData,
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("response data:", data);
      if (data.success) {
        //const payload = data.data;
        /* console.log("payload courses", payload.courses);
        dispatch(setStudents(payload)); */
      }
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    return false;
  }
};
