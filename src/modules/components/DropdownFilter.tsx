import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDropdown } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getSearchFilterTeacher } from "../../services";
import { clearStudents } from "../../store/teacher";

export const DropdownFilter = () => {
  const { courses, typesEvaluation } = useSelector(
    (state: RootState) => state.teacher
  );
  const { user_token } = useSelector((state: RootState) => state.auth);
  const cursoDropdown = useDropdown("");
  const evaluacionDropdown = useDropdown("");
  const dispatch = useDispatch();
  const clearFilter = () => {
    cursoDropdown.reset();
    evaluacionDropdown.reset();
    dispatch(clearStudents());
  };
  const searchFilter = () => {
    console.log("buscando cursoDropdown.value", cursoDropdown.value);
    console.log("buscando evaluacionDropdown.value", evaluacionDropdown.value);
    getSearchFilterTeacher(
      {
        course: cursoDropdown.value,
        type_evaluation: evaluacionDropdown.value,
        user_token,
      },
      dispatch
    );
  };
  return (
    <div className="w-full pt-[15px] text-black md:grid md:grid-cols-4 md:gap-[12px]">
      <FormControl fullWidth sx={{ mt: "16px" }}>
        <InputLabel id="select-label-course">Seleccionar curso</InputLabel>
        <Select
          labelId="select-label-course"
          value={cursoDropdown.value}
          label="Age"
          onChange={cursoDropdown.onChange}
        >
          {courses.map((c) => (
            <MenuItem key={c.curso_docente_id} value={c.curso_docente_id}>
              {c.curso_nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: "16px" }}>
        <InputLabel id="select-label-evaluation">
          Seleccionar evaluación
        </InputLabel>
        <Select
          labelId="select-label-evaluation"
          id="demo-simple-select"
          value={evaluacionDropdown.value}
          label="Age"
          onChange={evaluacionDropdown.onChange}
        >
          {typesEvaluation.map((c) => (
            <MenuItem key={c.tipo_evaluacion_id} value={c.tipo_evaluacion_id}>
              {c.tipo_evaluacion_nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <button
        className="btn w-full mt-4 rounded-[5px] bg-red-utp text-white font-bold text-[16px] p-3 capitalize"
        onClick={searchFilter}
      >
        <span>Buscar</span>
      </button>
      <button
        className="btn w-full mt-4 rounded-[5px] bg-gray-utp text-white font-bold text-[16px] p-3 capitalize"
        onClick={clearFilter}
      >
        <span>Limpiar</span>
      </button>
    </div>
  );
};
