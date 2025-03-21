
import Authnavbar from '../MainLayout/Authnavbar'

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
  <div className="w-full h-full bg-white shadow-2xl rounded-lg">
    <Authnavbar />
    
    <div className="mt-6">{children}</div>
  </div>
</div>
  );
};

export default AuthLayout;
