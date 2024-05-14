
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  user_id: number,
  user_token:string,
  user_firstname:string,
  user_lastname:string,
  user_rol:"coordinador"|"docente"| ""
  errorMessage: string | null,
}

const initialState:AuthState ={
  status: "checking", //"authenticated", "checking", "not-authenticated"
  user_id: 0,
  user_token:"",
  user_firstname:"",
  user_lastname:"",
  user_rol:"", //"coordinador","docente"
  errorMessage: null,
}

export const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //login
    login: (state, { payload }: PayloadAction<AuthState>) => {
      state.status = "authenticated";
      state.user_id = payload.user_id;
      state.user_token=payload.user_token;
      state.user_firstname = payload.user_firstname;
      state.user_lastname = payload.user_lastname;
      state.user_rol = payload.user_rol;
      state.errorMessage = null;
    },
    //logout
    logout: (state, { payload }: PayloadAction<{ errorMessage: string | null }>) => {
      state.status = "not-authenticated";
      state.user_id=0
      state.user_token=""
      state.user_firstname=""
      state.user_lastname=""
      state.user_rol=""
      state.errorMessage=  payload?.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
      state;
    },
  },
});

export const { checkingCredentials, login, logout } = authSlices.actions;
export default authSlices.reducer;