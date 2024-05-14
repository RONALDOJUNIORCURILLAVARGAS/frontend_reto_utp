import { Navigate, Route, Routes } from "react-router-dom";
import { ModulesTeacherPage, ModulesCoordinatorPage } from "../pages";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const ModulesRoutes = () => {
  const rol = useSelector((state: RootState) => state.auth.user_rol);
  
  return (
    <Routes>
      {rol === "coordinador" ? (
        <Route path="/" element={<ModulesCoordinatorPage />} />
      ) : (
        <Route path="/" element={<ModulesTeacherPage />} />
      )}

      <Route path="/*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
