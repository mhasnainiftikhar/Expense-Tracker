import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data.js";
import { UserContext } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu, onClose }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (path === "logout") {
      handleLogout();
      return;
    }
    navigate(path);
    if (onClose) onClose(); 
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200 p-5 fixed">
      {/* User Section */}
      <div className="flex flex-col items-center mb-8 mt-25">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-green-500"
          />
        ) : (
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-700 text-2xl font-bold border border-green-400">
            {user?.fullName ? user.fullName[0].toUpperCase() : "U"}
          </div>
        )}
        <h5 className="mt-3 text-lg font-semibold text-gray-800">
          {user?.fullName || "User"}
        </h5>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-2">
        {SIDE_MENU_DATA.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.path)}
            className={`flex items-center gap-3 p-3 rounded-lg font-medium hover:bg-green-50 hover:text-green-700 transition
              ${activeMenu === item.label ? "bg-green-700 text-white shadow" : "text-gray-700"}`}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;