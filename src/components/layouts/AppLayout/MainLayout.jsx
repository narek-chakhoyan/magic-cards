import { Header } from "components/features/Header/Header";
import { Outlet } from "react-router-dom";

export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
