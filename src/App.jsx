
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./MainLayout/AuthLayout"
import { useEffect, useState } from "react";
//pagelarim-----------------------------------------
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Liked from './pages/Liked'
import DownloadedImgs from "./pages/DownloadedImgs";
import About from './pages/About'
import Contact from './pages/Contact'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [user , setUser] = useState(null)

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
     if (user) {
      setUser(user)
     }else{
      setUser(null)
     }
    })
     return unsubscribe
  },[])

  return (
    <Router>
       <Toaster position="top-right" reverseOrder={false} />
        <Routes>
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={user ? <MainLayout><Home /></MainLayout> : <Login />}/>
          <Route path="/profile" element={user ? <MainLayout><Profile /></MainLayout> : <Login />}/>
          <Route path="/liked" element={<MainLayout><Liked></Liked></MainLayout>} />
          <Route path="/downloaded" element={<MainLayout><DownloadedImgs></DownloadedImgs></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;