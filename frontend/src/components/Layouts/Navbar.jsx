import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import logo from "../../assets/logo.png";

const Navbar = ({ activeMenu }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center justify-between bg-white border-b border-gray-200 px-7 py-4 w-full z-40 fixed">
        {/* Mobile Menu Button */}
        <button
          className="block lg:hidden text-black"
          onClick={() => setMobileMenuOpen(true)}
        >
          <HiOutlineMenu className="text-3xl" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <h2 className="text-xl font-semibold text-black">Expense Tracker</h2>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar Panel */}
          <div className="relative w-72 h-full bg-white shadow-2xl p-5 z-50 animate-slideIn">
            <button
              className="text-black mb-5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <HiOutlineX className="text-3xl" />
            </button>
            <SideMenu activeMenu={activeMenu} onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
