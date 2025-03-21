import { FcGoogle } from "react-icons/fc";
import { useAuth } from '../context/AuthContext';

const GoogleLogin = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="flex items-center justify-center gap-3 bg-black p-3 rounded-lg">
      <FcGoogle />
      <button onClick={loginWithGoogle}>Continue with Google</button>
    </div>
  );
};

export default GoogleLogin
