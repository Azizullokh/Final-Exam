import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import bgimg from "../images/profile-bg-img.jpg";
import { MdEmail } from "react-icons/md";
import { MdOutlineSystemUpdate } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const { user, updateUserProfile, logoutUser, profileImage } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await updateUserProfile(displayName, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    await updateUserProfile(displayName, profileImage);
  };

  const handleSendVerifyEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Verify Email send!", {
        style: {
          border: "1px solid #4CAF50",
          padding: "10px",
          color: "#4CAF50",
          fontWeight: "bold",
          background: "#f0fff0",
        },
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogOut = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div
      className="relative min-h-screen flex items-center flex-col justify-center bg-cover bg-center bg-no-repeat w-full"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="md:min-h-0 pt-[115px] md:pt-6 relative z-10 bg-white/10 backdrop-blur-md shadow-lg rounded-none md:rounded-xl p-6 w-full md:max-w-lg text-white md:mt-20 min-h-screen">
        <h2 className="text-2xl font-bold text-start mb-6">Profile</h2>

        <div className="flex flex-col items-start gap-4">
          <div className="relative">
            <div className="relative w-35 h-35">
              {imageError ? (
                <FaUserCircle className="w-full h-full text-gray-400" />
              ) : (
                <img
                  src={profileImage}
                  alt="User profile"
                  className="w-full h-full rounded-full border-4 border-white shadow-md object-cover"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>

          <div className="w-full space-y-3">
            <div>
              <label className="text-sm font-semibold">Email:</label>
              <input
                type="email"
                value={user?.email || ""}
                className="border border-gray-300 bg-gray-100 p-2 rounded w-full text-gray-800"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Display Name:</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="border p-2 rounded w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div className="flex items-center justify-between">
              {user?.emailVerified ? (
                <span className="text-green-500 font-semibold">
                  Email Verified ✅
                </span>
              ) : (
                <button
                  onClick={handleSendVerifyEmail}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 transition text-white p-2 rounded shadow"
                >
                  <MdEmail /> Verify Email
                </button>
              )}
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>

          <button
            onClick={handleUpdateProfile}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition text-white p-2 rounded w-full shadow"
          >
            <MdOutlineSystemUpdate /> Update Profile
          </button>

          <button
            onClick={handleLogOut}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition text-white p-2 rounded w-full shadow mt-2"
          >
            <MdOutlineLogout /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
