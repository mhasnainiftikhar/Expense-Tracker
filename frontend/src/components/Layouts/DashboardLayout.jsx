import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar activeMenu={activeMenu} />

      <div className="flex flex-1">
  <div className="hidden lg:flex h-full">
    <SideMenu activeMenu={activeMenu} />
  </div>
  <div className="flex-1 p-6 lg:ml-64">{children}</div>
</div>

    </div>
  );
};

export default DashboardLayout;
