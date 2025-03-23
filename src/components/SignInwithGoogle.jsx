import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth, googleProvider } from "../firebase";
import { useState } from "react";

const GoogleLogin = () => {
  const navigate = useNavigate()
  const [user , setUser] = useState(null)
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage")
  );
  const loginWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        setUser(result.user);
        setProfileImage(result.user.photoURL);
        localStorage.setItem("profileImage", result.user.photoURL);
        navigate("/")
      } catch (error) {
        toast.success(error, {
          style: {
            border: "1px solid rgb(227, 61, 61)",
            padding: "10px",
            color: "red",
            fontWeight: "bold",
            background: "rgb(248, 196, 196)",
          },
        });
      }
    };

  return (
    <div onClick={loginWithGoogle} className="flex items-center justify-center gap-3 bg-black p-3 rounded-lg cursor-pointer">
      <FcGoogle />
      <button className="cursor-pointer">Continue with Google</button>
    </div>
  );
};

export default GoogleLogin
