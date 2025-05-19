import { Navigate, Outlet } from "react-router";

const Protected = () => {
  const login = localStorage.getItem("login");
  return login === "true" ? <Outlet /> : <Navigate to={"/userlogin"}></Navigate>;
};

export default Protected;