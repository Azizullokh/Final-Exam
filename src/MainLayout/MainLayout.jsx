
import Navbar from '../MainLayout/Navbar'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar></Navbar>
      <div className="flex-grow w-full">{children}</div>
    </div>
  );
};

export default MainLayout;
