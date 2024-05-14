import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";
import { ModulesRoutes } from "../modules/routes/ModulesRoutes";

export const AppRouter = () => {
  console.log("creando");
  const { status } = useCheckAuth();
  if (status === "checking") {
    return <CheckingAuth />;
  }
  console.log("status", status);
  return (
    <Routes>
     
      {status === "authenticated" ? (
  
       
          <Route path="/*" element={<ModulesRoutes />} />
       
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
