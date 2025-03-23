import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./MainLayout/AuthLayout";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Liked from "./pages/Liked";
import DownloadedImgs from "./pages/DownloadedImgs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Details from "./pages/Details";

const App = () => {
  const { user } = useAuth();
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />

        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              user ? (
                <MainLayout>
                  <Home />
                </MainLayout>
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <MainLayout>
                  <Profile />
                </MainLayout>
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/liked"
            element={
              <MainLayout>
                <Liked />
              </MainLayout>
            }
          />
          <Route
            path="/downloaded"
            element={
              <MainLayout>
                <DownloadedImgs />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />
          <Route
            path="/details/:id"
            element={
              <MainLayout>
                <Details />
              </MainLayout>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
