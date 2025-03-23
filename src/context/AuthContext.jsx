import { createContext, useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { toast } from "react-hot-toast";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "default-avatar.png");


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  
  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!", {
        style: {
          border: "1px solid #4CAF50",
          padding: "10px",
          color: "#4CAF50",
          fontWeight: "bold",
          background: "#f0fff0",
        },
      });
    } catch (error) {
      toast.error("Reset Password Error" ,error, {
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


  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setProfileImage(result.user.photoURL);
      localStorage.setItem("profileImage", result.user.photoURL);
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

  const updateUserProfile = async (newDisplayName, newPhotoURL) => {
    try {
      if (!auth.currentUser) return;

      await updateProfile(auth.currentUser, {
        displayName: newDisplayName || auth.currentUser.displayName,
      });

      setUser((prevUser) => ({
        ...prevUser,
        displayName: newDisplayName || prevUser.displayName,
      }));

      if (newPhotoURL) {
        setProfileImage(newPhotoURL);
        localStorage.setItem("profileImage", newPhotoURL);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const logoutUser = async () => {
    await signOut(auth);
    setUser(null); 
  };
  
  return (
    <AuthContext.Provider value={{ user , setUser , loading, loginUser, profileImage, resetPassword  , logoutUser  , loginWithGoogle , updateUserProfile}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
