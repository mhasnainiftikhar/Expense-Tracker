import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-10 lg:ml-64">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left */}
        <p className="text-gray-600 text-sm text-center md:text-left">
          © {new Date().getFullYear()} Expense Tracker — All Rights Reserved.
        </p>

        {/* Center Links */}
        <div className="flex items-center gap-6 text-gray-600 text-sm">
          <a href="#" className="hover:text-green-600 transition">Privacy Policy</a>
          <a href="#" className="hover:text-green-600 transition">Terms</a>
          <a href="#" className="hover:text-green-600 transition">Support</a>
        </div>

        {/* Right Social Icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-600 hover:text-green-600 transition text-xl"><FaGithub /></a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition text-xl"><FaLinkedin /></a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition text-xl"><FaTwitter /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
