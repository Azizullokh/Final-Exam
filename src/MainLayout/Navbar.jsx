import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoSVG from "../SVG/logoSVG";
import { IoLogOutOutline } from "react-icons/io5";
import DarkModeMenu from "../components/DarkMode";
import { TiDownload } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdConnectWithoutContact } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user, logoutUser, profileImage } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const likedCount = useSelector((state) => state.likes.likedImages.length);
  const downloadedImagesCount = useSelector(
    (state) => state.download.images.length
  );

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-950 shadow-md fixed w-full top-0 left-0 z-50 transition duration-300">
      <div className="hidden max-w-6xl mx-auto px-4 py-3 md:flex justify-between items-center">
        <div className="flex items-center gap-3 text-2xl font-bold text-gray-800">
          <LogoSVG />
          <Link to="/" className="text-black dark:text-white">
            Deerly
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-black dark:text-white">
          <DarkModeMenu />
          <Link to="/liked" className="relative">
            <FaHeart className="text-2xl" />
            {likedCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] rounded-full p-1">
                {likedCount}
              </span>
            )}
          </Link>
          <Link to="/downloaded" className="relative">
            <TiDownload className="text-2xl" />
            {downloadedImagesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full p-1">
                {downloadedImagesCount}
              </span>
            )}
          </Link>{" "}
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </div>{" "}
        {user ? (
          <Link to="/profile">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 dark:text-white">
                {user?.displayName || "User"}
              </span>{" "}
              <div className="relative w-14 h-14">
                {imageError ? (
                  <FaUserCircle className="w-14 h-14 text-gray-400" />
                ) : (
                  <img
                    src={profileImage}
                    alt="User profile"
                    className="w-14 h-14 rounded-full border-white shadow-md object-cover"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            </div>
          </Link>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-600">
              Register
            </Link>
          </>
        )}
      </div>
      <div className="md:hidden max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className=" text-2xl font-bold text-gray-800">
          <Link
            to="/"
            className="text-black dark:text-white flex items-center gap-3"
          >
            <LogoSVG />
            Deerly
          </Link>
        </div>
        <div className="flex items-center text-black gap-6 dark:text-white">
          <Link
            to="/liked"
            className="relative"
            onClick={() => setMenuOpen(false)}
          >
            <FaHeart className="text-2xl" />
            {likedCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {likedCount}
              </span>
            )}
          </Link>
          <Link
            to="/downloaded"
            className="relative"
            onClick={() => setMenuOpen(false)}
          >
            <TiDownload className="text-2xl" />
            {downloadedImagesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {downloadedImagesCount}
              </span>
            )}
          </Link>
          <div className="md:hidden flex">
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-18 right-0 w-[60%] bg-white dark:bg-gray-950 shadow-lg z-40">
          <div className="flex flex-col items-start py-4 px-5 space-y-4">
            {user && (
              <div className="text-black dark:text-white flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14">
                        {imageError ? (
                          <FaUserCircle className="w-14 h-14 text-gray-400" />
                        ) : (
                          <img
                            src={profileImage}
                            alt="User profile"
                            className="w-14 h-14 rounded-full border-white shadow-md object-cover"
                            onError={() => setImageError(true)}
                          />
                        )}
                      </div>
                    </div>
                  </Link>

                  <span className="text-gray-700 dark:text-white font-semibold">
                    {user?.displayName || "User"}
                  </span>
                </div>
              </div>
            )}
            <div className="md:hidden flex text-black dark:text-white">
              <DarkModeMenu />
            </div>
            <Link
              to="/"
              className="text-gray-700 dark:text-white hover:text-blue-600 flex items-center gap-2 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <FaHome /> Home
            </Link>

            <Link
              to="/about"
              className="text-gray-700 dark:text-white hover:text-blue-600 flex items-center gap-2 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <FcAbout /> About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 dark:text-white hover:text-blue-600 flex items-center gap-2 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <MdConnectWithoutContact />
              Contact
            </Link>

            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="text-red-600 flex items-center gap-3"
                >
                  <IoLogOutOutline />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-white hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 dark:text-white hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
