import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudentRow } from "../../types";

interface TeacherState {
  courses: {
    curso_docente_id: number;
    curso_nombre: string;
  }[];
  typesEvaluation: {
    tipo_evaluacion_id: number;
    tipo_evaluacion_nombre: string;
  }[];
  students: StudentRow[];
  lookingStudents:boolean;


}
const initialState: TeacherState = {
  courses: [],
  typesEvaluation: [],
  students:[],
  lookingStudents:false //Estado de busqueda de estudiantes
};

export const teacherSlices = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    //login
    setCourses: (state, { payload }: PayloadAction<TeacherState>) => {
      state.courses = payload.courses;
      state.typesEvaluation = payload.typesEvaluation;
    },
    setStudents:(state, { payload }: PayloadAction<StudentRow[]>) => {
        state.students = payload;
        state.lookingStudents=true
      },
    clearStudents: (state) => {
      state.students = [];
      state.lookingStudents= false
    }
  },
});

export const { setCourses,setStudents,clearStudents } = teacherSlices.actions;

export default teacherSlices.reducer;
