import { TbLockPassword } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import bgImage from "../images/deer-bg-for-login.avif";
import { useState } from "react";
import GoogleLogin from "../components/SignInwithGoogle";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { user , resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("✅ Login success!", {
              style: {
                  border: "1px solid #4CAF50",
                  padding: "10px",
                  color: "#4CAF50",
                  fontWeight: "bold",
                  background: "#f0fff0",
              },
          });
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleResetPassword = async () => {
      if (!email) {
          toast.error("❌ Please Enter Email!", {
              style: {
                  border: "1px solid #FF0000",
                  padding: "10px",
                  color: "#FF0000",
                  fontWeight: "bold",
                  background: "#fff0f0",
              },
          });
          return;
      }
      await resetPassword(email);
      toast.success("📧 Parolni tiklash uchun email yuborildi!", {
          style: {
              border: "1px solid #4CAF50",
              padding: "10px",
              color: "#4CAF50",
              fontWeight: "bold",
              background: "#f0fff0",
          },
      });
  };

    return (
        <div>
            <div className="relative w-full h-screen flex items-center justify-center bg-blue-900">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-50"
                    style={{ backgroundImage: `url(${bgImage})` }}
                ></div>
                <div className="md:min-h-0 pt-35 md:pt-8 min-h-screen relative bg-transparent bg-opacity-50 backdrop-blur-md p-8 rounded-none md:rounded-2xl shadow-lg w-full md:w-96">
                    <h2 className="text-white text-2xl font-semibold text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-white mb-1">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full p-3 rounded-lg bg-transparent bg-opacity-10 text-white placeholder-white outline-none border border-white border-opacity-30 focus:ring-2 focus:ring-white"
                                />
                                <span className="absolute right-3 top-4 text-white text-[20px]">
                                    <MdEmail />
                                </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-white mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Enter Your Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full p-3 rounded-lg bg-transparent bg-opacity-10 text-white placeholder-white outline-none border border-white border-opacity-30 focus:ring-2 focus:ring-white"
                                />
                                <span className="absolute right-3 top-4 text-white text-[20px]">
                                    <TbLockPassword />
                                </span>
                            </div>
                        </div>
                        {error && <p className="font-bold text-red-500">{error}</p>}
                        <div className="text-center mt-4 mb-4 flex items-start">
                            <button
                                type="button"
                                onClick={handleResetPassword}
                                className="text-white hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>
                       
                        <button
                            type="submit"
                            className="w-full bg-black bg-opacity-50 text-white py-3 mb-4 rounded-lg hover:bg-opacity-70 transition"
                        >
                            Login
                        </button>
                        <GoogleLogin /> 
                        <div className="text-center mt-2">
                            <p className="text-white">
                                Don't have an account?{" "}
                                <button
                                    onClick={() => navigate("/register")}
                                    className="text-blue-300 hover:underline"
                                >
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
