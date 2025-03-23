import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import LogoSVG from "../SVG/logoSVG";

const AuthNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-black shadow-md w-full z-10 fixed top-0 left-0">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-white">
            <LogoSVG />
          <Link to="/">Deerly</Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link
            to="/login"
            className="px-5 py-2 border-2 dark:text-white dark:border-white border-black text-black rounded-lg hover:bg-black hover:text-white transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black border-2 border-black transition duration-200"
          >
            Sign Up
          </Link>
        </div>
        <button
          className="md:hidden text-2xl text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md py-4 flex flex-col items-center space-y-4">
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default AuthNavbar;
