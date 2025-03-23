
import { useState } from "react";
import { auth} from "../firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import GoogleLogin from "../components/SignInwithGoogle";
import { toast } from "react-hot-toast";
import bgimg from '../images/sign-up-bg-img.jpg'
import { TbLockPassword } from "react-icons/tb";
import { MdEmail } from "react-icons/md";

const Register = () => {
 const [email , setEmail] = useState('');
 const [password , setPassword] = useState('');
 const [confirmPassword , setConfirmPassword] = useState('')
 const [error , setError] = useState('')
 const navigate = useNavigate()


 const handleRegister = async (e) => {
  e.preventDefault()
  if (password !== confirmPassword) {
    setError("Enter the same password")
    return;
  }
  try{
    await createUserWithEmailAndPassword(auth, email , password)
    toast.success("✅ success!", {
      style: {
          border: "1px solid #4CAF50",
          padding: "10px",
          color: "#4CAF50",
          fontWeight: "bold",
          background: "#f0fff0",
      },
  });
    navigate('/')
  }catch(error){
    setError(error.message)
  }
  
 }

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-blue-900">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: `url(${bgimg})` }}
            ></div>
            <div className="min-h-screen md:min-h-0 pt-35 md:pt-8 relative bg-transparent bg-opacity-50 backdrop-blur-md p-8 md:rounded-2xl rounded-none shadow-lg md:w-96 w-full">
                <h2 className="text-white text-2xl font-semibold text-center mb-4">Sign Up</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-white mb-1">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                value={email}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 rounded-lg bg-transparent bg-opacity-10 text-white placeholder-white outline-none border border-white border-opacity-30 focus:ring-2 focus:ring-white"
                            />
                            <span className="absolute right-3 top-4 text-white text-[20px]">
                                <TbLockPassword />
                            </span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Confirm Your Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full p-3 rounded-lg bg-transparent bg-opacity-10 text-white placeholder-white outline-none border border-white border-opacity-30 focus:ring-2 focus:ring-white"
                            />
                            <span className="absolute right-3 top-4 text-white text-[20px]">
                                <TbLockPassword />
                            </span>
                        </div>
                    </div>
                    {error && <p className="text-red-400 mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-black bg-opacity-50 text-white py-3 mb-4 rounded-lg hover:bg-opacity-70 transition"
                    >
                        Sign Up
                    </button>
                    <GoogleLogin />
                    <div className="text-center mt-2">
                        <p className="text-white">
                            Already have an account?{" "}
                            <button
                                onClick={() => navigate("/login")}
                                className="text-blue-300 hover:underline cursor-pointer"
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
  );
};

export default Register;
